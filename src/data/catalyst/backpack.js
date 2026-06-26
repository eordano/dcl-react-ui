// Browser twin of sites/app/lib/catalyst/backpack(.server).ts + backpack-emotes.ts.
// Pure / browser-safe: no node, no *.server.ts, no fs/pg. LIVE reads go over the
// public catalyst origin via getJSON; catalog / categories / equipped / emote
// loadout SEED comes from the captured fixtures (src/data/fixtures.js) — those
// catalyst endpoints return 200-but-[] for empty wallets, so the fixture is the
// browsable inventory until a wallet with items is wired. WRITE (save) is the
// signed POST /content/entities deploy path and is STUBBED this reads-only
// milestone (the wallet key never crosses into JS; it routes through the bridge
// SignRequest chokepoint).
//
// zod schemas are ported from the SSR lib (zod is isomorphic) so parsing stays
// identical between server + browser without importing the .ts source cross-root.

import { z } from "zod";

import { getJSON } from "./client.js";
import { backpackEquipFixture, backpackEmotesFixture } from "../fixtures.js";

// ---------------------------------------------------------------------------
// address helpers
// ---------------------------------------------------------------------------
export function normalizeAddress(addr) {
  return (addr ?? "").trim().toLowerCase();
}

export function isEthAddress(addr) {
  return /^0x[0-9a-fA-F]{40}$/.test((addr ?? "").trim());
}

// ---------------------------------------------------------------------------
// enums (ported from decentraland/schemas via backpack.ts / backpack-emotes.ts)
// ---------------------------------------------------------------------------
export const RARITIES = [
  "unique",
  "mythic",
  "exotic",
  "legendary",
  "epic",
  "rare",
  "uncommon",
  "common",
];

export const WEARABLE_CATEGORIES = [
  "body_shape",
  "hair",
  "eyebrows",
  "eyes",
  "mouth",
  "facial_hair",
  "upper_body",
  "hands_wear",
  "lower_body",
  "feet",
  "hat",
  "eyewear",
  "earring",
  "mask",
  "tiara",
  "helmet",
  "top_head",
  "skin",
];

export const EMOTE_CATEGORIES = [
  "dance",
  "stunt",
  "greetings",
  "fun",
  "poses",
  "reactions",
  "horror",
  "miscellaneous",
];

export const SLOT_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function isSlotNumber(n) {
  return Number.isInteger(n) && n >= 0 && n <= 9;
}

// ---------------------------------------------------------------------------
// schemas
// ---------------------------------------------------------------------------
export const WearableSchema = z.object({
  urn: z.string().min(1),
  name: z.string().default(""),
  thumbnail: z.string().default(""),
  rarity: z.string().default("common"),
  category: z.string().default("upper_body"),
  bodyShapes: z.array(z.string()).default([]),
  description: z.string().default(""),
  isSmart: z.boolean().default(false),
  creator: z
    .string()
    .nullish()
    .transform((v) => v ?? null),
  network: z
    .string()
    .nullish()
    .transform((v) => v ?? null),
});

export const CategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  slot: z.string(),
});

export const EquippedSchema = z.object({
  bodyShape: z
    .string()
    .default("urn:decentraland:off-chain:base-avatars:BaseMale"),
  skinColor: z.string().default("#c98c63"),
  hairColor: z.string().default("#5c3824"),
  eyeColor: z.string().default("#3a6ea5"),
  wearables: z.array(z.string()).default([]),
});

export const OwnedElementSchema = z
  .object({
    urn: z.string(),
    amount: z
      .number()
      .nullish()
      .transform((v) => v ?? 1),
  })
  .passthrough();

export const EmoteSchema = z
  .object({
    urn: z.string().min(1),
    name: z.string().default(""),
    description: z.string().default(""),
    thumbnail: z.string().default(""),
    rarity: z.string().default("base"),
    category: z.string().default("miscellaneous"),
    loop: z.boolean().default(false),
  })
  .transform((e) => ({
    ...e,
    category: EMOTE_CATEGORIES.includes(e.category) ? e.category : "miscellaneous",
  }));

export const SlotBindingSchema = z.object({
  slot: z.number().int().min(0).max(9),
  urn: z.string().min(1),
  name: z.string().default(""),
});

export const OwnedEmoteElementSchema = z
  .object({
    urn: z.string(),
    amount: z
      .number()
      .nullish()
      .transform((v) => v ?? 1),
  })
  .passthrough();

// ---------------------------------------------------------------------------
// parsers
// ---------------------------------------------------------------------------
export function parseCatalog(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    const r = WearableSchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  return out;
}

export function parseCategories(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    const r = CategorySchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  return out;
}

export function parseOwned(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    const r = OwnedElementSchema.safeParse(item);
    if (r.success) out.push(r.data.urn);
  }
  return out;
}

export function projectRawEmote(raw) {
  if (!raw || typeof raw !== "object") return null;
  const o = raw;
  const data = o.emoteDataADR74 ?? {};
  const candidate = {
    urn: o.urn ?? o.id,
    name: o.name,
    description: o.description,
    thumbnail: o.thumbnail,
    rarity: o.rarity,
    category: data.category,
    loop: data.loop,
  };
  const r = EmoteSchema.safeParse(candidate);
  return r.success ? r.data : null;
}

export function parseEmoteCatalog(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    const e = projectRawEmote(item);
    if (e) out.push(e);
  }
  return out;
}

export function parseOwnedEmotes(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    const r = OwnedEmoteElementSchema.safeParse(item);
    if (r.success) out.push(r.data.urn);
  }
  return out;
}

export function parseLoadout(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    const r = SlotBindingSchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  return out;
}

// ---------------------------------------------------------------------------
// pure view helpers
// ---------------------------------------------------------------------------
export function findWearable(catalog, urn) {
  return catalog.find((w) => w.urn === urn);
}

export function byCategory(catalog) {
  const out = {};
  for (const w of catalog) {
    (out[w.category] ??= []).push(w);
  }
  return out;
}

export function findEmote(catalog, urn) {
  return catalog.find((e) => e.urn === urn);
}

export function bindingForSlot(loadout, slot) {
  return loadout.find((b) => b.slot === slot);
}

export function sortLoadout(loadout) {
  const rank = (slot) => (slot === 0 ? 10 : slot);
  return [...loadout].sort((a, b) => rank(a.slot) - rank(b.slot));
}

export function rarityLabel(rarity) {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

// ---------------------------------------------------------------------------
// fixture seed accessors
// ---------------------------------------------------------------------------
export const WEARABLE_FIXTURE_ADDRESS = backpackEquipFixture.address;
export const EMOTE_FIXTURE_ADDRESS = backpackEmotesFixture.address;

function fixtureWearableCatalog() {
  return parseCatalog(backpackEquipFixture.catalog);
}
function fixtureWearableCategories() {
  return parseCategories(backpackEquipFixture.categories);
}
function fixtureEquipped() {
  return EquippedSchema.parse(backpackEquipFixture.equipped);
}
function fixtureEmoteCatalog() {
  return parseEmoteCatalog(backpackEmotesFixture.ownedEmotes);
}
function fixtureEmoteLoadout() {
  return sortLoadout(parseLoadout(backpackEmotesFixture.defaultLoadout));
}
function fixtureSlotOrder() {
  return Array.isArray(backpackEmotesFixture.slotOrder)
    ? backpackEmotesFixture.slotOrder
    : [...SLOT_ORDER];
}

// ---------------------------------------------------------------------------
// LIVE fetchers (owned URNs only — catalyst returns 200 [] for empty wallets)
// ---------------------------------------------------------------------------
export async function fetchOwnedWearableUrns(address, opts = {}) {
  const raw = await getJSON(
    `/lambdas/collections/wearables-by-owner/${encodeURIComponent(
      normalizeAddress(address),
    )}`,
    opts,
  );
  return parseOwned(raw);
}

export async function fetchOwnedEmoteUrns(address, opts = {}) {
  const raw = await getJSON(
    `/lambdas/collections/emotes-by-owner/${encodeURIComponent(
      normalizeAddress(address),
    )}`,
    opts,
  );
  return parseOwnedEmotes(raw);
}

// ---------------------------------------------------------------------------
// combined loaders — what the hooks call. Always resolve with the fixture seed
// so the panel renders even for guests / before identity / on transient error;
// overlay live owned URNs when the address is a real wallet. AbortError is
// re-thrown so panel switches cancel cleanly.
// ---------------------------------------------------------------------------
export async function loadBackpack(address, opts = {}) {
  const addr = normalizeAddress(address);
  const catalog = fixtureWearableCatalog();
  const categories = fixtureWearableCategories();
  const equipped = fixtureEquipped();

  let ownedUrns = [];
  let source = "fixture";
  if (isEthAddress(addr)) {
    try {
      ownedUrns = await fetchOwnedWearableUrns(addr, opts);
      source = "live";
    } catch (err) {
      if (opts.signal?.aborted) throw err;
      ownedUrns = [];
      source = "fixture";
    }
  }

  const ownedSet = new Set(ownedUrns);
  const owned = catalog.filter((w) => ownedSet.has(w.urn));

  return {
    address: addr || WEARABLE_FIXTURE_ADDRESS,
    owned,
    ownedUrns,
    catalog,
    categories,
    equipped,
    ownedEmpty: owned.length === 0,
    source,
  };
}

export async function loadBackpackEmotes(address, opts = {}) {
  const addr = normalizeAddress(address);
  const catalog = fixtureEmoteCatalog();
  const loadout = fixtureEmoteLoadout();
  const slotOrder = fixtureSlotOrder();

  let ownedUrns = [];
  let source = "fixture";
  if (isEthAddress(addr)) {
    try {
      ownedUrns = await fetchOwnedEmoteUrns(addr, opts);
      source = "live";
    } catch (err) {
      if (opts.signal?.aborted) throw err;
      ownedUrns = [];
      source = "fixture";
    }
  }

  const ownedSet = new Set(ownedUrns);
  // When the wallet has live emotes, surface those; otherwise fall back to the
  // seed catalog so the grid is never empty.
  const owned = ownedUrns.length ? catalog.filter((e) => ownedSet.has(e.urn)) : catalog;

  return {
    address: addr || EMOTE_FIXTURE_ADDRESS,
    catalog,
    owned,
    ownedUrns,
    loadout,
    slotOrder,
    liveEmpty: ownedUrns.length === 0,
    source,
  };
}

// ---------------------------------------------------------------------------
// WRITE (signed) — STUBBED. The real save deploys a new avatar profile entity
// via POST /content/entities under a signed auth-chain. The wallet key never
// crosses into JS, so the write routes through the bridge SignRequest
// chokepoint. Reads-only milestone: this records intent and returns a marker
// without deploying. Never throws.
// ---------------------------------------------------------------------------
export function saveBackpack(payload) {
  try {
    if (typeof window !== "undefined") {
      window.dclBridge?.send?.("SignRequest", {
        kind: "deploy-profile",
        endpoint: "/content/entities",
        payload,
      });
    }
  } catch {
    /* bridge optional; the signed write path is not wired this milestone */
  }
  return {
    ok: false,
    stubbed: true,
    reason: "writes disabled (reads-only milestone)",
  };
}
