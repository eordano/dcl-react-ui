import { z } from "zod";

import { getJSON, type RequestOpts } from "./client";

const nullableStr = z
  .string()
  .nullish()
  .transform((v) => v ?? null);
const nullableNum = z
  .number()
  .nullish()
  .transform((v) => v ?? null);

export const EventSchema = z.object({
  id: z.string(),
  name: nullableStr,
  image: nullableStr,
  image_vertical: nullableStr,
  description: nullableStr,
  start_at: nullableStr,
  finish_at: nullableStr,
  next_start_at: nullableStr,
  all_day: z
    .boolean()
    .nullish()
    .transform((v) => v ?? false),
  x: nullableNum,
  y: nullableNum,
  position: z
    .array(z.number())
    .nullish()
    .transform((v) => v ?? []),
  coordinates: z
    .array(z.number())
    .nullish()
    .transform((v) => v ?? []),
  url: nullableStr,
  user_name: nullableStr,
  scene_name: nullableStr,
  estate_name: nullableStr,
  live: z
    .boolean()
    .nullish()
    .transform((v) => v ?? false),
  highlighted: z
    .boolean()
    .nullish()
    .transform((v) => v ?? false),
  trending: z
    .boolean()
    .nullish()
    .transform((v) => v ?? false),
  recurrent: z
    .boolean()
    .nullish()
    .transform((v) => v ?? false),
  total_attendees: z
    .number()
    .nullish()
    .transform((v) => v ?? 0),
  place_id: nullableStr,
  world: z
    .boolean()
    .nullish()
    .transform((v) => v ?? false),
  server: nullableStr,
});

export type DclEvent = z.infer<typeof EventSchema>;

export const EventCategorySchema = z.object({
  name: z.string(),
  active: z
    .boolean()
    .nullish()
    .transform((v) => v ?? true),
  i18n: z
    .object({ en: z.string().nullable() })
    .nullish()
    .transform((v) => v ?? { en: null }),
});

export type EventCategory = z.infer<typeof EventCategorySchema>;

export type EventsParams = {
  list?: string;
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
};

function isDev(): boolean {
  try {
    return Boolean(import.meta?.env?.DEV);
  } catch {
    return false;
  }
}

function warnInvalid(kind: string, issues: unknown): void {
  if (isDev()) console.warn(`[catalyst] ${kind} failed schema validation`, issues);
}

export function parseEvent(raw: unknown): DclEvent {
  const r = EventSchema.safeParse(raw);
  if (r.success) return r.data;
  warnInvalid("Event", r.error.issues);
  return raw as DclEvent;
}

export function parseEvents(raw?: unknown[]): DclEvent[] {
  return (raw ?? []).map(parseEvent);
}

export function parseEventCategory(raw: unknown): EventCategory {
  const r = EventCategorySchema.safeParse(raw);
  if (r.success) return r.data;
  warnInvalid("EventCategory", r.error.issues);
  return raw as EventCategory;
}

export async function fetchEvents(
  params: EventsParams = {},
  opts: RequestOpts = {},
): Promise<{ data: DclEvent[]; total: number }> {
  const env = await getJSON<{ data?: unknown[]; total?: number }>("/api/events", {
    service: "events",
    ...opts,
    query: {
      list: params.list,
      search: params.search,
      category: params.category,
      limit: params.limit,
      offset: params.offset,
    },
  });
  const data = parseEvents(env?.data ?? []);
  return { data, total: env?.total ?? data.length };
}

export async function fetchEvent(id: string, opts: RequestOpts = {}): Promise<DclEvent> {
  const env = await getJSON<{ data?: unknown }>(
    `/api/events/${encodeURIComponent(id)}`,
    { service: "events", ...opts },
  );
  return parseEvent(env?.data);
}

export async function fetchEventCategories(opts: RequestOpts = {}): Promise<EventCategory[]> {
  const env = await getJSON<{ data?: unknown[] }>("/api/events/categories", {
    service: "events",
    ...opts,
  });
  return (env?.data ?? []).map(parseEventCategory);
}

export function hueFor(id: unknown): number {
  let h = 0;
  const s = String(id ?? "");
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

export function formatEventTime(iso?: string | null): string {
  if (!iso) return "Soon";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Soon";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
}

export function formatEventWhen(iso?: string | null): string {
  if (!iso) return "Date to be announced";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Date to be announced";
  return d
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      hour12: true,
    })
    .toUpperCase();
}

export function eventCoords(e: DclEvent | null | undefined): string {
  const x = e?.x ?? e?.position?.[0] ?? e?.coordinates?.[0] ?? 0;
  const y = e?.y ?? e?.position?.[1] ?? e?.coordinates?.[1] ?? 0;
  return `(${x},${y})`;
}

export function eventStart(e: DclEvent | null | undefined): string | null {
  return e?.next_start_at ?? e?.start_at ?? null;
}

export function eventXY(e: DclEvent | null | undefined): { x: number; y: number } {
  const x = e?.x ?? e?.position?.[0] ?? e?.coordinates?.[0] ?? 0;
  const y = e?.y ?? e?.position?.[1] ?? e?.coordinates?.[1] ?? 0;
  return { x, y };
}
