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

export async function fetchLiveNotifications(opts = {}) {
  const raw = await getJSON("/notifications", opts);
  return parseNotifications(raw);
}
