// Browser-only twin of sites/app/lib/catalyst/events.ts.
// Pure HTTP wrappers over getJSON for the Events panel. No node/server imports.
// zod is isomorphic, so the schemas are reused verbatim (minus TS types).

import { z } from "zod";

import { getJSON } from "./client.js";

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
});

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

function isDev() {
  try {
    return Boolean(import.meta?.env?.DEV);
  } catch {
    return false;
  }
}

function warnInvalid(kind, issues) {
  if (isDev()) console.warn(`[catalyst] ${kind} failed schema validation`, issues);
}

// Lenient parsing: on schema drift we warn (dev only) and pass the raw object
// through so the UI degrades gracefully instead of throwing.
export function parseEvent(raw) {
  const r = EventSchema.safeParse(raw);
  if (r.success) return r.data;
  warnInvalid("Event", r.error.issues);
  return raw;
}

export function parseEvents(raw) {
  return (raw ?? []).map(parseEvent);
}

export function parseEventCategory(raw) {
  const r = EventCategorySchema.safeParse(raw);
  if (r.success) return r.data;
  warnInvalid("EventCategory", r.error.issues);
  return raw;
}

/**
 * GET /events/api/events
 * @param {{ list?: "live"|"active"|"highlight", search?: string, category?: string, limit?: number, offset?: number }} params
 * @returns {Promise<{ data: object[], total: number }>}
 */
export async function fetchEvents(params = {}, opts = {}) {
  const env = await getJSON("/events/api/events", {
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

/** GET /events/api/events/{id} */
export async function fetchEvent(id, opts = {}) {
  const env = await getJSON(`/events/api/events/${encodeURIComponent(id)}`, opts);
  return parseEvent(env?.data);
}

/** GET /events/api/events/categories */
export async function fetchEventCategories(opts = {}) {
  const env = await getJSON("/events/api/events/categories", opts);
  return (env?.data ?? []).map(parseEventCategory);
}

// ---------------------------------------------------------------------------
// Presentational helpers (ported from events.ts — pure, browser-safe).
// ---------------------------------------------------------------------------

export function hueFor(id) {
  let h = 0;
  const s = String(id ?? "");
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

export function formatEventTime(iso) {
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

export function formatEventWhen(iso) {
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

export function eventCoords(e) {
  const x = e?.x ?? e?.position?.[0] ?? e?.coordinates?.[0] ?? 0;
  const y = e?.y ?? e?.position?.[1] ?? e?.coordinates?.[1] ?? 0;
  return `(${x},${y})`;
}

/** Effective next occurrence (recurring events surface next_start_at). */
export function eventStart(e) {
  return e?.next_start_at ?? e?.start_at ?? null;
}

export function eventXY(e) {
  const x = e?.x ?? e?.position?.[0] ?? e?.coordinates?.[0] ?? 0;
  const y = e?.y ?? e?.position?.[1] ?? e?.coordinates?.[1] ?? 0;
  return { x, y };
}
