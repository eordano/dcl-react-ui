import { z } from "zod";
import { getJSON, type RequestOpts } from "./client";
import type { Notification } from "./notificationsView";
import { serviceBase, signedFetch } from "./client";

export * from "./notificationsView";

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

export function parseNotifications(raw: unknown): Notification[] {
  let rows: unknown[] = [];
  if (Array.isArray(raw)) {
    rows = raw;
  } else {
    const env = ListEnvelopeSchema.safeParse(raw);
    rows = env.success ? env.data.notifications : [];
  }
  const out: Notification[] = [];
  for (const item of rows) {
    const r = NotificationSchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  out.sort((a, b) => b.timestamp - a.timestamp);
  return out;
}

export async function fetchLiveNotifications(
  opts: RequestOpts & { address?: string | null } = {},
): Promise<Notification[]> {
  const bridge = typeof window !== "undefined" ? window.dclBridge : undefined;
  if (bridge && typeof bridge.send === "function" && !opts.headers) {
    const res = await signedFetch(`${serviceBase("notifications")}/notifications`, {
      method: "GET",
    });
    if (res.status !== 200) {
      throw new Error(`notifications fetch failed: ${res.status}`);
    }
    return parseNotifications(JSON.parse(res.body));
  }
  const raw = await getJSON("/notifications", { service: "notifications", ...opts });
  return parseNotifications(raw);
}
