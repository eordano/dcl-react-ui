// Browser-only twin of sites/app/lib/catalyst/notifications.ts.
// Pure helpers (category mapping, zod schemas, parse + presentation getters,
// relative time) are ported byte-for-byte minus TS types — zod is isomorphic, so
// the schemas are reused as-is. The *.server.ts variant (node fixture import,
// best-effort orchestration) is NOT ported; the live fetch here THROWS on failure
// so the hook can distinguish loading / live-empty / error and pick the fixture
// fallback. No node/server imports.

import { z } from "zod";
import { getJSON } from "./client.js";
import { notificationsFixture } from "../fixtures.js";

export const NOTIFICATION_CATEGORIES = [
  "friends",
  "badge",
  "gift",
  "community",
  "marketplace",
  "system",
];

// Canonical NotificationType (decentraland/schemas) -> ui3 Notifications.jsx card
// category (friends/badge/gift/community/marketplace/system).
export function categoryForType(type) {
  const t = String(type ?? "").toLowerCase();
  if (t.startsWith("social_service_friendship")) return "friends";
  if (t === "badge_granted") return "badge";
  if (t === "tip_received" || t === "transfer_received") return "gift";
  if (t.startsWith("community_")) return "community";
  if (
    t === "item_sold" ||
    t === "item_published" ||
    t === "bid_accepted" ||
    t === "bid_received" ||
    t === "royalties_earned" ||
    t.startsWith("credits_") ||
    t.startsWith("rental_")
  ) {
    return "marketplace";
  }
  return "system";
}

const MetadataSchema = z.record(z.string(), z.unknown()).default({});

export const NotificationSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  address: z.string().default(""),
  timestamp: z.number().default(0),
  read: z.boolean().default(false),
  created_at: z.string().default(""),
  updated_at: z.string().default(""),
  metadata: MetadataSchema,
});

// The live edge replies with a bare array OR a `{ notifications: [...] }`
// envelope depending on version; accept either.
const ListEnvelopeSchema = z.object({
  notifications: z.array(z.unknown()).default([]),
});

export function parseNotifications(raw) {
  let rows = [];
  if (Array.isArray(raw)) {
    rows = raw;
  } else {
    const env = ListEnvelopeSchema.safeParse(raw);
    rows = env.success ? env.data.notifications : [];
  }
  const out = [];
  for (const item of rows) {
    const r = NotificationSchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  out.sort((a, b) => b.timestamp - a.timestamp);
  return out;
}

export function humanizeType(type) {
  return String(type ?? "")
    .split("_")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function notificationTitle(n) {
  const t = n?.metadata?.title;
  if (typeof t === "string" && t.trim()) return t;
  return humanizeType(n?.type);
}

export function notificationBody(n) {
  const d = n?.metadata?.description;
  return typeof d === "string" ? d : "";
}

// Real artwork carried in metadata (badge art / community thumb / reward token
// image) if present — else null and the card draws its category glyph.
export function notificationImage(n) {
  const m = n?.metadata ?? {};
  for (const k of ["badgeImageUrl", "thumbnailUrl", "tokenImage", "imageUrl", "image"]) {
    const v = m[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return null;
}

export function unreadCount(rows) {
  return (rows ?? []).filter((n) => !n.read).length;
}

export function relativeTime(timestamp, now) {
  const diff = Math.max(0, now - timestamp);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Just Now";
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Yesterday";
  return `${day}d`;
}

// ---- fixture (degraded / auth-gated fallback) --------------------------------

export const FIXTURE_ADDRESS = notificationsFixture.address;

let _fixtureRows = null;
export function fixtureNotifications() {
  if (!_fixtureRows) {
    _fixtureRows = parseNotifications({
      notifications: notificationsFixture.notifications,
    });
  }
  return _fixtureRows;
}

// ---- live read ---------------------------------------------------------------

/**
 * GET /notifications (live). Requires a signed auth-chain header (require_signer);
 * the public edge 301-redirects / 401s anonymous requests, so without a signed
 * header this REJECTS (CatalystError) and the hook falls back to the fixture.
 *
 * Flip to live with ZERO structural change: pass a signed header through
 * `opts.headers` (e.g. `{ authorization: ... }` or the auth-chain triplet) — the
 * same getJSON path then returns the real feed (incl. an authed-empty array,
 * which surfaces the panel's empty state instead of the fixture).
 *
 * Forwards `opts.signal` so a panel switch cancels the in-flight read.
 */
export async function fetchLiveNotifications(opts = {}) {
  const raw = await getJSON("/notifications", opts);
  return parseNotifications(raw);
}
