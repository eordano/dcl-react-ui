import { z } from "zod";

import { getJSON, catalystBase } from "./client.js";

export function normalizeAddress(addr) {
  return (addr ?? "").trim().toLowerCase();
}

export function isEthAddress(addr) {
  return /^0x[0-9a-fA-F]{40}$/.test((addr ?? "").trim());
}

export function baseItemUrn(urn) {
  const p = String(urn).split(":");
  return p.length === 7 && /^collections-v[12]$/.test(p[3])
    ? p.slice(0, 6).join(":")
    : urn;
}

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
  name: z.string().default(""),
  wearables: z.array(z.string()).default([]),
  emotes: z.array(z.string()).default([]),
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

function contentUrl(hash, base) {
  return `${catalystBase(base)}/content/contents/${hash}`;
}

function urnNetwork(urn) {
  if (typeof urn !== "string") return null;
  const m = urn.match(/^urn:decentraland:([a-z-]+):/i);
  const chain = m?.[1]?.toLowerCase();
  if (!chain || chain === "off-chain") return null;
  return chain;
}

function prettyWearableName(urn, category) {
  let seg = String(urn ?? "").split(":").pop() || "";
  if (category !== "body_shape") seg = seg.replace(/^[fmu]_/i, "");
  return seg
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function looksLikeRawWearableName(name) {
  const s = String(name ?? "");
  return s !== "" && !/\s/.test(s) && (/[_-]/.test(s) || s === s.toLowerCase());
}

export function mapExplorerWearable(el, base) {
  const ent = el?.entity ?? {};
  const md = ent.metadata ?? {};
  const data = md.data ?? {};
  const content = Array.isArray(ent.content) ? ent.content : [];
  const hashOf = (file) => content.find((c) => c.file === file)?.hash;
  const thumbHash = hashOf(md.thumbnail || "thumbnail.png") ?? hashOf(md.image);
  const bodyShapes = [
    ...new Set(
      (Array.isArray(data.representations) ? data.representations : []).flatMap(
        (r) => (Array.isArray(r?.bodyShapes) ? r.bodyShapes : []),
      ),
    ),
  ];
  const urn = el?.urn || md.id || ent.id;
  if (!urn) return null;
  const category = el?.category || data.category || "upper_body";
  const rawName = el?.name || md.name || "";
  const name =
    !rawName || looksLikeRawWearableName(rawName) || category === "body_shape"
      ? prettyWearableName(urn, category)
      : rawName;
  const candidate = {
    urn,
    name,
    thumbnail: thumbHash ? contentUrl(thumbHash, base) : "",
    rarity: md.rarity || (el?.type === "base-wearable" ? "base" : "common"),
    category,
    bodyShapes,
    description: md.description || "",
    isSmart:
      Array.isArray(data.requiredPermissions) && data.requiredPermissions.length > 0,
    creator: null,
    network: urnNetwork(urn),
  };
  const r = WearableSchema.safeParse(candidate);
  return r.success ? r.data : null;
}

function deriveCategories(catalog) {
  const seen = new Set();
  const out = [];
  for (const w of catalog) {
    if (seen.has(w.category)) continue;
    seen.add(w.category);
    out.push({ id: w.category, label: w.category, slot: w.category });
  }
  return out;
}

function color3ToHex(c) {
  if (!c || typeof c !== "object") return undefined;
  const to255 = (n) => Math.max(0, Math.min(255, Math.round((n ?? 0) * 255)));
  const hx = (n) => n.toString(16).padStart(2, "0");
  return `#${hx(to255(c.r))}${hx(to255(c.g))}${hx(to255(c.b))}`;
}

export function hexToColor3(hex) {
  const fallback = { r: 0, g: 0, b: 0 };
  if (typeof hex !== "string") return fallback;
  let s = hex.trim().replace(/^#/, "");
  if (s.length === 3) s = s.split("").map((ch) => ch + ch).join("");
  if (s.length !== 6) return fallback;
  const n = parseInt(s, 16);
  if (!Number.isFinite(n)) return fallback;
  return {
    r: ((n >> 16) & 255) / 255,
    g: ((n >> 8) & 255) / 255,
    b: (n & 255) / 255,
  };
}

async function fetchEquipped(address, opts = {}) {
  try {
    const raw = await getJSON(
      `/lambdas/profile/${encodeURIComponent(normalizeAddress(address))}`,
      opts,
    );
    const av = raw?.avatars?.[0]?.avatar;
    if (!av) return EquippedSchema.parse({});
    return EquippedSchema.parse({
      bodyShape: av.bodyShape || undefined,
      skinColor: color3ToHex(av.skin?.color),
      hairColor: color3ToHex(av.hair?.color),
      eyeColor: color3ToHex(av.eyes?.color),
      name: raw?.avatars?.[0]?.name || undefined,
      wearables: Array.isArray(av.wearables) ? av.wearables : [],
      emotes: Array.isArray(av.emotes)
        ? av.emotes.map((e) => (typeof e === "string" ? e : e?.urn)).filter(Boolean)
        : [],
    });
  } catch (err) {
    if (opts.signal?.aborted) throw err;
    return EquippedSchema.parse({});
  }
}

async function fetchAllExplorerWearables(address, opts = {}) {
  const addr = normalizeAddress(address);
  const pageSize = 1000;
  let pageNum = 1;
  let total = Infinity;
  const all = [];
  while (all.length < total) {
    const raw = await getJSON(
      `/lambdas/explorer/${encodeURIComponent(addr)}/wearables`,
      { ...opts, query: { pageSize, pageNum } },
    );
    const els = Array.isArray(raw?.elements) ? raw.elements : [];
    total = Number.isFinite(raw?.totalAmount)
      ? raw.totalAmount
      : all.length + els.length;
    all.push(...els);
    if (!els.length || els.length < pageSize) break;
    pageNum += 1;
    if (pageNum > 25) break;
  }
  return all;
}

export const BASE_EMOTE_COLLECTION = "urn:decentraland:off-chain:base-emotes";

export const BASE_EMOTE_IDS = [
  "handsair",
  "wave",
  "fistpump",
  "dance",
  "raiseHand",
  "clap",
  "money",
  "kiss",
  "headexplode",
  "shrug",
  "dab",
  "robot",
  "hammer",
  "tik",
  "tektonik",
  "dontsee",
  "disco",
  "snowfall",
  "hohoho",
  "cry",
  "confettipopper",
];

function baseEmoteUrn(id) {
  return `${BASE_EMOTE_COLLECTION}:${id}`;
}

function prettyEmoteName(id) {
  return String(id ?? "")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function i18nName(md) {
  if (!Array.isArray(md?.i18n)) return null;
  return md.i18n.find((t) => t?.code === "en")?.text ?? md.i18n[0]?.text ?? null;
}

function projectEmoteEntity(ent, { urn, rarity, base } = {}) {
  const md = ent?.metadata ?? {};
  const data = md.emoteDataADR74 ?? {};
  const content = Array.isArray(ent?.content) ? ent.content : [];
  const thumbHash = content.find(
    (c) => c.file === (md.thumbnail || "thumbnail.png"),
  )?.hash;
  const resolvedUrn =
    urn || md.id || (Array.isArray(ent?.pointers) ? ent.pointers[0] : null) || ent?.id;
  if (!resolvedUrn) return null;
  return projectRawEmote({
    urn: resolvedUrn,
    name: i18nName(md) || md.name || prettyEmoteName(String(resolvedUrn).split(":").pop()),
    description: md.description,
    thumbnail: thumbHash ? contentUrl(thumbHash, base) : "",
    rarity: rarity || md.rarity,
    emoteDataADR74: { category: data.category, loop: data.loop },
  });
}

export function mapExplorerEmote(el, base) {
  const e = projectEmoteEntity(el?.entity, {
    urn: el?.urn || el?.entity?.metadata?.id,
    rarity: el?.entity?.metadata?.rarity || (el?.type === "base-emote" ? "base" : "common"),
    base,
  });
  return e;
}

export async function fetchEmoteGlbUrl(urn, opts = {}) {
  const base = catalystBase(opts.base);
  const res = await (opts.fetchImpl ?? fetch)(`${base}/content/entities/active`, {
    method: "POST",
    signal: opts.signal,
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ pointers: [urn] }),
  });
  if (!res.ok) return null;
  const entities = await res.json();
  const ent = Array.isArray(entities) ? entities[0] : null;
  const content = Array.isArray(ent?.content) ? ent.content : [];
  const reps = ent?.metadata?.emoteDataADR74?.representations ?? [];
  const main = reps[0]?.mainFile;
  const hash =
    (main && content.find((c) => c.file === main)?.hash) ||
    content.find((c) => /\.glb$/i.test(c.file))?.hash;
  return hash ? contentUrl(hash, opts.base) : null;
}

async function fetchBaseEmotes(opts = {}) {
  const byUrn = new Map();
  for (const id of BASE_EMOTE_IDS) {
    const urn = baseEmoteUrn(id);
    const e = projectRawEmote({
      urn,
      name: prettyEmoteName(id),
      rarity: "base",
      emoteDataADR74: { category: "miscellaneous", loop: false },
    });
    if (e) byUrn.set(urn.toLowerCase(), e);
  }

  try {
    const base = catalystBase(opts.base);
    const res = await (opts.fetchImpl ?? fetch)(`${base}/content/entities/active`, {
      method: "POST",
      signal: opts.signal,
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ pointers: BASE_EMOTE_IDS.map(baseEmoteUrn) }),
    });
    if (res.ok) {
      const entities = await res.json();
      if (Array.isArray(entities)) {
        for (const ent of entities) {
          const e = projectEmoteEntity(ent, { rarity: "base", base: opts.base });
          if (e) byUrn.set(e.urn.toLowerCase(), e);
        }
      }
    }
  } catch (err) {
    if (opts.signal?.aborted) throw err;
  }

  return BASE_EMOTE_IDS.map((id) => byUrn.get(baseEmoteUrn(id).toLowerCase())).filter(
    Boolean,
  );
}

async function fetchAllExplorerEmotes(address, opts = {}) {
  const addr = normalizeAddress(address);
  const pageSize = 1000;
  let pageNum = 1;
  let total = Infinity;
  const all = [];
  while (all.length < total) {
    const raw = await getJSON(`/lambdas/explorer/${encodeURIComponent(addr)}/emotes`, {
      ...opts,
      query: { collectionType: "on-chain", pageSize, pageNum },
    });
    const els = Array.isArray(raw?.elements) ? raw.elements : [];
    total = Number.isFinite(raw?.totalAmount)
      ? raw.totalAmount
      : all.length + els.length;
    all.push(...els);
    if (!els.length || els.length < pageSize) break;
    pageNum += 1;
    if (pageNum > 25) break;
  }
  return all;
}

export async function loadOutfits(address, opts = {}) {
  const addr = normalizeAddress(address);
  if (!isEthAddress(addr)) return [];
  try {
    const env = await getJSON(
      `/lambdas/outfits/${encodeURIComponent(addr)}`,
      opts,
    );
    const list = env?.metadata?.outfits || env?.outfits || [];
    return list
      .map((o) => ({
        slot: o.slot,
        bodyShape: o.outfit?.bodyShape,
        wearables: Array.isArray(o.outfit?.wearables) ? o.outfit.wearables : [],
        skinColor: color3ToHex(o.outfit?.skin?.color),
        hairColor: color3ToHex(o.outfit?.hair?.color),
        eyeColor: color3ToHex(o.outfit?.eyes?.color),
      }))
      .filter((o) => Number.isInteger(o.slot));
  } catch (err) {
    if (opts.signal?.aborted) throw err;
    return [];
  }
}

export async function loadRecentOutfits(count = 4, opts = {}) {
  try {
    const raw = await getJSON(`/content/deployments`, {
      ...opts,
      query: {
        entityType: "profile",
        limit: 60,
        sortingField: "local_timestamp",
        sortingOrder: "DESC",
      },
    });
    const ds = Array.isArray(raw?.deployments) ? raw.deployments : [];
    const seen = new Set();
    const out = [];
    for (const d of ds) {
      const av = d?.metadata?.avatars?.[0]?.avatar;
      const addr = (d?.pointers?.[0] || "").toLowerCase();
      const wearables = Array.isArray(av?.wearables) ? av.wearables : [];
      if (!av || !addr || seen.has(addr) || wearables.length < 4) continue;
      seen.add(addr);
      out.push({
        slot: out.length,
        address: addr,
        name: d?.metadata?.avatars?.[0]?.name || "",
        bodyShape: av.bodyShape,
        wearables,
        skinColor: color3ToHex(av.skin?.color),
        hairColor: color3ToHex(av.hair?.color),
        eyeColor: color3ToHex(av.eyes?.color),
      });
      if (out.length >= count) break;
    }
    return out;
  } catch (err) {
    if (opts.signal?.aborted) throw err;
    return [];
  }
}

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

export async function loadBackpack(address, opts = {}) {
  const addr = normalizeAddress(address);
  const fetchAddr = isEthAddress(addr)
    ? addr
    : "0x0000000000000000000000000000000000000000";

  const elements = await fetchAllExplorerWearables(fetchAddr, opts);

  const catalog = [];
  const ownedUrns = [];
  for (const el of elements) {
    const w = mapExplorerWearable(el, opts.base);
    if (!w) continue;
    catalog.push(w);
    if (el?.type && el.type !== "base-wearable") ownedUrns.push(w.urn);
  }

  const categories = deriveCategories(catalog);
  const equipped = await fetchEquipped(addr, opts);

  const ownedSet = new Set(ownedUrns);
  const owned = catalog.filter((w) => ownedSet.has(w.urn));

  return {
    address: addr,
    owned,
    ownedUrns,
    catalog,
    categories,
    equipped,
    ownedEmpty: owned.length === 0,
    source: "live",
  };
}

export async function loadBackpackEmotes(address, opts = {}) {
  const addr = normalizeAddress(address);

  const baseEmotes = await fetchBaseEmotes(opts);

  let ownedEmotes = [];
  if (isEthAddress(addr)) {
    try {
      const els = await fetchAllExplorerEmotes(addr, opts);
      const seen = new Set();
      for (const el of els) {
        const e = mapExplorerEmote(el, opts.base);
        if (!e || seen.has(e.urn)) continue;
        seen.add(e.urn);
        ownedEmotes.push(e);
      }
    } catch (err) {
      if (opts.signal?.aborted) throw err;
      ownedEmotes = [];
    }
  }

  const catalog = [];
  const inCatalog = new Set();
  for (const e of [...baseEmotes, ...ownedEmotes]) {
    if (inCatalog.has(e.urn)) continue;
    inCatalog.add(e.urn);
    catalog.push(e);
  }

  const ownedUrns = ownedEmotes.map((e) => e.urn);

  const loadout = sortLoadout(
    parseLoadout(
      baseEmotes.slice(0, SLOT_ORDER.length).map((e, i) => ({
        slot: SLOT_ORDER[i],
        urn: e.urn,
        name: e.name,
      })),
    ),
  );

  return {
    address: addr || "anon",
    catalog,
    owned: ownedEmotes,
    ownedUrns,
    loadout,
    slotOrder: [...SLOT_ORDER],
    liveEmpty: ownedUrns.length === 0,
    source: "live",
  };
}

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
  }
  return {
    ok: false,
    stubbed: true,
    reason: "writes disabled (reads-only milestone)",
  };
}
