
export type Notification = {
  id: string;
  type: string;
  address: string;
  timestamp: number;
  read: boolean;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
};

export const NOTIFICATION_CATEGORIES = [
  "friends",
  "badge",
  "gift",
  "community",
  "marketplace",
  "system",
];

export function categoryForType(type: unknown): string {
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

export function humanizeType(type: unknown): string {
  return String(type ?? "")
    .split("_")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function notificationTitle(n: Notification | null | undefined): string {
  const t = n?.metadata?.title;
  if (typeof t === "string" && t.trim()) return t;
  return humanizeType(n?.type);
}

export function notificationBody(n: Notification | null | undefined): string {
  const d = n?.metadata?.description;
  return typeof d === "string" ? d : "";
}

export function notificationLink(n: Notification | null | undefined): string | null {
  const l = n?.metadata?.link;
  return typeof l === "string" && /^https?:\/\//.test(l) ? l : null;
}

export function notificationImage(n: Notification | null | undefined): string | null {
  const m = n?.metadata ?? {};
  for (const k of ["badgeImageUrl", "thumbnailUrl", "tokenImage", "imageUrl", "image"]) {
    const v = m[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  return null;
}

const ADDR_RE = /^0x[0-9a-fA-F]{40}$/;

export function actorAddress(n: Notification | null | undefined): string | null {
  const recipient = (n?.address ?? "").toLowerCase();
  let found: string | null = null;
  const scan = (v: unknown, depth: number): void => {
    if (found) return;
    if (typeof v === "string") {
      if (ADDR_RE.test(v) && v.toLowerCase() !== recipient) found = v;
      return;
    }
    if (v && typeof v === "object" && depth < 2) {
      for (const val of Object.values(v as Record<string, unknown>)) scan(val, depth + 1);
    }
  };
  scan(n?.metadata ?? {}, 0);
  return found;
}

export function unreadCount(rows?: Notification[] | null): number {
  return (rows ?? []).filter((n) => !n.read).length;
}

export function parseNotificationsLoose(raw: unknown): Notification[] {
  const rows: unknown[] = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" &&
        Array.isArray((raw as { notifications?: unknown }).notifications)
      ? ((raw as { notifications: unknown[] }).notifications)
      : [];
  const out: Notification[] = [];
  for (const item of rows) {
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    if (typeof r.id !== "string" || !r.id || typeof r.type !== "string" || !r.type) continue;
    out.push({
      id: r.id,
      type: r.type,
      address: typeof r.address === "string" ? r.address : "",
      timestamp: typeof r.timestamp === "number" ? r.timestamp : 0,
      read: typeof r.read === "boolean" ? r.read : false,
      created_at: typeof r.created_at === "string" ? r.created_at : "",
      updated_at: typeof r.updated_at === "string" ? r.updated_at : "",
      metadata:
        r.metadata && typeof r.metadata === "object" && !Array.isArray(r.metadata)
          ? (r.metadata as Record<string, unknown>)
          : {},
    });
  }
  out.sort((a, b) => b.timestamp - a.timestamp);
  return out;
}

export function relativeTime(timestamp: number, now: number): string {
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
