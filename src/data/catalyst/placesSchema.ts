import { z } from "zod";

import { getJSON, type QueryParams, type RequestOpts } from "./client";
import { PLACES_LIMIT, toPlaceView, toCategoryView } from "./places";
import type { PlaceView, CategoryView } from "./places";

const nullableStr = z.string().nullish().transform((v) => v ?? null);
const numOr = (d: number) => z.number().nullish().transform((v) => (v == null ? d : v));
const boolOr = (d: boolean) => z.boolean().nullish().transform((v) => (v == null ? d : v));

export const PlaceSchema = z.object({
  id: z.string(),
  title: nullableStr,
  description: nullableStr,
  image: nullableStr,
  owner: nullableStr,
  creator_address: nullableStr,
  contact_name: nullableStr,
  base_position: z.string().nullish().transform((v) => v ?? "0,0"),
  positions: z.array(z.string()).nullish().transform((v) => v ?? []),
  categories: z.array(z.string()).nullish().transform((v) => v ?? []),
  user_count: numOr(0),
  user_visits: numOr(0),
  favorites: numOr(0),
  likes: numOr(0),
  like_rate: z.number().nullish().transform((v) => v ?? null),
  highlighted: boolOr(false),
  world: boolOr(false),
  world_name: nullableStr,
  updated_at: nullableStr,
});

export type Place = z.infer<typeof PlaceSchema>;

const ListEnvelope = z.object({
  ok: z.boolean().nullish(),
  data: z.array(z.unknown()).nullish().transform((v) => v ?? []),
  total: z.number().nullish().transform((v) => v ?? 0),
});

const ItemEnvelope = z.object({
  ok: z.boolean().nullish(),
  data: z.unknown().nullish(),
});

const CategorySchema = z.object({
  name: z.string(),
  active: z.boolean().nullish(),
  count: numOr(0),
  i18n: z.object({ en: z.string().nullish() }).nullish(),
});

export type PlaceCategory = z.infer<typeof CategorySchema>;

const CategoriesEnvelope = z.object({
  ok: z.boolean().nullish(),
  data: z.array(z.unknown()).nullish().transform((v) => v ?? []),
});

export async function fetchPlaces(
  params: QueryParams = {},
  opts: RequestOpts = {},
): Promise<PlaceView[]> {
  const env = await getJSON("/api/places", {
    service: "places",
    ...opts,
    query: { limit: PLACES_LIMIT, ...params, ...(opts.query ?? {}) },
  });
  const parsed = ListEnvelope.safeParse(env);
  const rows = parsed.success ? parsed.data.data : [];
  const out: PlaceView[] = [];
  for (const raw of rows) {
    const r = PlaceSchema.safeParse(raw);
    if (r.success) out.push(toPlaceView(r.data));
  }
  return out;
}

export async function fetchPlace(
  id?: string | null,
  opts: RequestOpts = {},
): Promise<PlaceView | null> {
  if (!id) return null;
  const env = await getJSON(`/api/places/${encodeURIComponent(id)}`, {
    service: "places",
    ...opts,
  });
  const parsed = ItemEnvelope.safeParse(env);
  const raw = parsed.success ? parsed.data.data : null;
  const r = PlaceSchema.safeParse(raw);
  return r.success ? toPlaceView(r.data) : null;
}

export async function fetchCategories(opts: RequestOpts = {}): Promise<CategoryView[]> {
  const env = await getJSON("/api/categories", { service: "places", ...opts });
  const parsed = CategoriesEnvelope.safeParse(env);
  const rows = parsed.success ? parsed.data.data : [];
  const out: CategoryView[] = [];
  for (const raw of rows) {
    const r = CategorySchema.safeParse(raw);
    if (r.success && r.data.name) out.push(toCategoryView(r.data));
  }
  return out;
}
