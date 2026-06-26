// Browser-only catalyst wrappers for the Places API, mirroring the conventions
// of sites/app/lib/catalyst/places.ts + map-jump.ts (zod validation, envelope
// unwrapping, pure mapping helpers) — but client-side only: it imports nothing
// from node/server, just getJSON from ./client.js. zod is isomorphic, so the
// schemas below are the same shape as the SSR app's.
//
// Endpoints (LIVE, GET, https://catalyst.dcl.one):
//   /places/api/places?limit=40   -> { ok, data: Place[], total }
//   /places/api/places/{id}       -> { ok, data: Place }
//   /places/api/categories        -> { ok, data: Category[] }

import { z } from "zod";

import { getJSON } from "./client.js";

export const PLACES_LIMIT = 40;

// Genesis City spans roughly -150..150 on each axis; pad a little so edge
// parcels aren't clipped against the CSS-grid frame. The engine owns the real
// tile raster — this is the lightweight overlay projection onto a 0..100% grid.
const GRID_MIN = -170;
const GRID_SPAN = 340;
const GRID_MAX = GRID_MIN + GRID_SPAN;

// ---------------------------------------------------------------------------
// schemas (defensive: unknown rows are skipped, never throw on a single bad row)
// ---------------------------------------------------------------------------

const nullableStr = z.string().nullish().transform((v) => v ?? null);
const numOr = (d) => z.number().nullish().transform((v) => (v == null ? d : v));
const boolOr = (d) => z.boolean().nullish().transform((v) => (v == null ? d : v));

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

const CategoriesEnvelope = z.object({
  ok: z.boolean().nullish(),
  data: z.array(z.unknown()).nullish().transform((v) => v ?? []),
});

// ---------------------------------------------------------------------------
// pure helpers
// ---------------------------------------------------------------------------

export function parseCoords(pos) {
  const [xs, ys] = String(pos ?? "0,0").split(",");
  const x = Number.parseInt((xs ?? "0").trim(), 10);
  const y = Number.parseInt((ys ?? "0").trim(), 10);
  return [Number.isFinite(x) ? x : 0, Number.isFinite(y) ? y : 0];
}

function clampPct(n) {
  return Math.max(2, Math.min(98, n));
}

// Project parcel coords onto the CSS grid: x -> left%, y -> top% (y flipped so
// north points up, matching the in-world map).
export function coordsToPercent(coords) {
  const [x, y] = parseCoords(coords);
  return {
    left: clampPct(((x - GRID_MIN) / GRID_SPAN) * 100),
    top: clampPct(((GRID_MAX - y) / GRID_SPAN) * 100),
  };
}

function creatorOf(p) {
  return (p.contact_name || p.owner || p.creator_address || "Unknown creator").trim();
}

function hueFor(seed) {
  const s = String(seed ?? "");
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

// Map a place to a ui3 map.css pin class kind (map__pin--<kind>).
function pinKind(p) {
  if (p.user_count > 0) return "live";
  const c = p.categories.map((s) => s.toLowerCase());
  if (c.includes("poi") || c.includes("featured")) return "poi";
  if (c.includes("game") || c.includes("parkour") || c.includes("casino")) return "place";
  if (p.highlighted) return "fav";
  return "place";
}

const CAT_COLORS = {
  social: "#5db0ff",
  music: "#b07bff",
  art: "#ff8a5c",
  game: "#5fd38a",
  fashion: "#ff6fb5",
  education: "#ffd24d",
  shop: "#6ee0d2",
  sports: "#7d8cff",
  business: "#c0c8d6",
  crypto: "#f3ba2f",
  casino: "#ff4d6d",
  poi: "#ffb019",
  parkour: "#a14bff",
  featured: "#ffd700",
};

function catColor(name) {
  return CAT_COLORS[name] || `hsl(${hueFor(name)} 70% 62%)`;
}

// Presentational view of a place: drives both the CSS-grid pins and the info
// card. Keeps raw coords (for teleport) plus derived left/top% (for layout).
export function toPlaceView(p) {
  const [x, y] = parseCoords(p.base_position);
  const { left, top } = coordsToPercent(p.base_position);
  const players = p.user_count ?? 0;
  return {
    id: p.id,
    title: p.title || "Untitled parcel",
    description: p.description || "",
    image: p.image || undefined,
    coords: p.base_position,
    x,
    y,
    left,
    top,
    players,
    live: players > 0,
    featured: p.highlighted,
    rating: Math.round((p.like_rate ?? 0) * 100),
    favorites: p.favorites ?? 0,
    likes: p.likes ?? 0,
    visits: p.user_visits ?? 0,
    parcels: p.positions.length || 1,
    categories: p.categories,
    creator: creatorOf(p),
    world: p.world,
    worldName: p.world_name,
    updated: fmtDate(p.updated_at),
    hue: hueFor(p.id),
    kind: pinKind(p),
  };
}

// Adapt a place view into the prop shape expected by the reused
// explorer/pages/PlaceDetail.jsx component.
export function toPlaceDetail(view) {
  if (!view) return null;
  return {
    title: view.title,
    coords: view.coords,
    parcels: view.parcels,
    favorites: view.favorites,
    views: view.visits,
    approval: view.rating,
    creator: view.creator,
    updated: view.updated,
    description: view.description || "No description provided.",
    hue: view.hue,
    image: view.image,
  };
}

export function toCategoryView(c) {
  const label = (c.i18n?.en || c.name || "").trim();
  return {
    key: c.name,
    name: c.name,
    label: label || c.name,
    count: c.count ?? 0,
    color: catColor(c.name),
  };
}

// Decentraland jump URL (used for world realm switches via engine.changerealm).
export function jumpUrlFor(view) {
  if (view?.world && view?.worldName) {
    return `https://decentraland.org/jump/?realm=${encodeURIComponent(view.worldName)}`;
  }
  const pos = (view?.coords || "0,0").trim();
  return `https://decentraland.org/jump/?position=${pos}`;
}

// ---------------------------------------------------------------------------
// fetchers (opts.signal is forwarded into getJSON so panel switches cancel reads)
// ---------------------------------------------------------------------------

export async function fetchPlaces(params = {}, opts = {}) {
  const env = await getJSON("/places/api/places", {
    ...opts,
    query: { limit: PLACES_LIMIT, ...params, ...(opts.query ?? {}) },
  });
  const parsed = ListEnvelope.safeParse(env);
  const rows = parsed.success ? parsed.data.data : [];
  const out = [];
  for (const raw of rows) {
    const r = PlaceSchema.safeParse(raw);
    if (r.success) out.push(toPlaceView(r.data));
  }
  return out;
}

export async function fetchPlace(id, opts = {}) {
  if (!id) return null;
  const env = await getJSON(`/places/api/places/${encodeURIComponent(id)}`, opts);
  const parsed = ItemEnvelope.safeParse(env);
  const raw = parsed.success ? parsed.data.data : null;
  const r = PlaceSchema.safeParse(raw);
  return r.success ? toPlaceView(r.data) : null;
}

export async function fetchCategories(opts = {}) {
  const env = await getJSON("/places/api/categories", opts);
  const parsed = CategoriesEnvelope.safeParse(env);
  const rows = parsed.success ? parsed.data.data : [];
  const out = [];
  for (const raw of rows) {
    const r = CategorySchema.safeParse(raw);
    if (r.success && r.data.name) out.push(toCategoryView(r.data));
  }
  return out;
}
