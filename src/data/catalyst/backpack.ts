import { z } from "zod";

import { getJSON, catalystBase, type RequestOpts } from "./client";

export function normalizeAddress(addr?: string | null): string {
  return (addr ?? "").trim().toLowerCase();
}

export function isEthAddress(addr?: string | null): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test((addr ?? "").trim());
}

export function baseItemUrn(urn: string): string {
  const p = String(urn).split(":");
  return p.length === 7 && /^collections-v[12]$/.test(p[3] ?? "")
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

export function isSlotNumber(n: unknown): boolean {
  return typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 9;
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

export type Wearable = z.infer<typeof WearableSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  slot: z.string(),
});

export type WearableCategory = z.infer<typeof CategorySchema>;

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

export type Equipped = z.infer<typeof EquippedSchema>;

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

export type Emote = z.infer<typeof EmoteSchema>;

export const SlotBindingSchema = z.object({
  slot: z.number().int().min(0).max(9),
  urn: z.string().min(1),
  name: z.string().default(""),
});

export type SlotBinding = z.infer<typeof SlotBindingSchema>;

export const OwnedEmoteElementSchema = z
  .object({
    urn: z.string(),
    amount: z
      .number()
      .nullish()
      .transform((v) => v ?? 1),
  })
  .passthrough();

interface RawContentFile {
  file?: string;
  hash?: string;
}
interface RawRepresentation {
  bodyShapes?: unknown;
  mainFile?: string;
}
interface RawEmoteData {
  category?: string;
  loop?: boolean;
  representations?: RawRepresentation[];
}
interface RawWearableData {
  category?: string;
  representations?: unknown;
  requiredPermissions?: unknown;
}
interface RawMetadata {
  id?: string;
  name?: string;
  thumbnail?: string;
  image?: string;
  rarity?: string;
  description?: string;
  data?: RawWearableData;
  emoteDataADR74?: RawEmoteData;
  i18n?: unknown;
}
interface RawEntity {
  id?: string;
  metadata?: RawMetadata;
  content?: unknown;
  pointers?: string[];
}
interface RawElement {
  urn?: string;
  id?: string;
  category?: string;
  name?: string;
  type?: string;
  entity?: RawEntity;
}
interface RawColorHolder {
  color?: unknown;
}
interface RawAvatarInner {
  bodyShape?: string;
  skin?: RawColorHolder;
  hair?: RawColorHolder;
  eyes?: RawColorHolder;
  wearables?: unknown;
  emotes?: unknown;
}
interface RawProfileAvatar {
  name?: string;
  avatar?: RawAvatarInner;
}
interface RawProfileEnv {
  avatars?: RawProfileAvatar[];
}
interface RawOutfitEntry {
  slot?: number;
  outfit?: {
    bodyShape?: string;
    wearables?: unknown;
    skin?: RawColorHolder;
    hair?: RawColorHolder;
    eyes?: RawColorHolder;
  };
}
interface RawOutfitsEnv {
  metadata?: { outfits?: RawOutfitEntry[] };
  outfits?: RawOutfitEntry[];
}
interface RawDeployment {
  metadata?: { avatars?: RawProfileAvatar[] };
  pointers?: string[];
}
interface RawEmoteInput {
  urn?: string;
  id?: string;
  name?: string;
  description?: string;
  thumbnail?: string;
  rarity?: string;
  emoteDataADR74?: RawEmoteData;
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : [];
}

export function parseCatalog(raw: unknown): Wearable[] {
  if (!Array.isArray(raw)) return [];
  const out: Wearable[] = [];
  for (const item of raw) {
    const r = WearableSchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  return out;
}

export function parseCategories(raw: unknown): WearableCategory[] {
  if (!Array.isArray(raw)) return [];
  const out: WearableCategory[] = [];
  for (const item of raw) {
    const r = CategorySchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  return out;
}

export function parseOwned(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    const r = OwnedElementSchema.safeParse(item);
    if (r.success) out.push(r.data.urn);
  }
  return out;
}

export function projectRawEmote(raw: unknown): Emote | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as RawEmoteInput;
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

export function parseEmoteCatalog(raw: unknown): Emote[] {
  if (!Array.isArray(raw)) return [];
  const out: Emote[] = [];
  for (const item of raw) {
    const e = projectRawEmote(item);
    if (e) out.push(e);
  }
  return out;
}

export function parseOwnedEmotes(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out: string[] = [];
  for (const item of raw) {
    const r = OwnedEmoteElementSchema.safeParse(item);
    if (r.success) out.push(r.data.urn);
  }
  return out;
}

export function parseLoadout(raw: unknown): SlotBinding[] {
  if (!Array.isArray(raw)) return [];
  const out: SlotBinding[] = [];
  for (const item of raw) {
    const r = SlotBindingSchema.safeParse(item);
    if (r.success) out.push(r.data);
  }
  return out;
}

export function findWearable(catalog: Wearable[], urn: string): Wearable | undefined {
  return catalog.find((w) => w.urn === urn);
}

export function byCategory(catalog: Wearable[]): Record<string, Wearable[]> {
  const out: Record<string, Wearable[]> = {};
  for (const w of catalog) {
    (out[w.category] ??= []).push(w);
  }
  return out;
}

export function findEmote(catalog: Emote[], urn: string): Emote | undefined {
  return catalog.find((e) => e.urn === urn);
}

export function bindingForSlot(loadout: SlotBinding[], slot: number): SlotBinding | undefined {
  return loadout.find((b) => b.slot === slot);
}

export function sortLoadout(loadout: SlotBinding[]): SlotBinding[] {
  const rank = (slot: number) => (slot === 0 ? 10 : slot);
  return [...loadout].sort((a, b) => rank(a.slot) - rank(b.slot));
}

export function rarityLabel(rarity: string): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

function contentUrl(hash: string, base?: string): string {
  return `${catalystBase(base)}/content/contents/${hash}`;
}

function urnNetwork(urn: unknown): string | null {
  if (typeof urn !== "string") return null;
  const m = urn.match(/^urn:decentraland:([a-z-]+):/i);
  const chain = m?.[1]?.toLowerCase();
  if (!chain || chain === "off-chain") return null;
  return chain;
}

function prettyWearableName(urn: unknown, category: string): string {
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

function looksLikeRawWearableName(name: unknown): boolean {
  const s = String(name ?? "");
  return s !== "" && !/\s/.test(s) && (/[_-]/.test(s) || s === s.toLowerCase());
}

export function mapExplorerWearable(el: unknown, base?: string): Wearable | null {
  const element = (el ?? {}) as RawElement;
  const ent = element.entity ?? {};
  const md = ent.metadata ?? {};
  const data = md.data ?? {};
  const content: RawContentFile[] = Array.isArray(ent.content) ? ent.content : [];
  const hashOf = (file?: string) => content.find((c) => c.file === file)?.hash;
  const thumbHash = hashOf(md.thumbnail || "thumbnail.png") ?? hashOf(md.image);
  const reps: RawRepresentation[] = Array.isArray(data.representations)
    ? data.representations
    : [];
  const bodyShapes = [
    ...new Set(
      reps.flatMap((r): string[] => (Array.isArray(r?.bodyShapes) ? r.bodyShapes : [])),
    ),
  ];
  const urn = element.urn || md.id || ent.id;
  if (!urn) return null;
  const category = element.category || data.category || "upper_body";
  const rawName = element.name || md.name || "";
  const name =
    !rawName || looksLikeRawWearableName(rawName) || category === "body_shape"
      ? prettyWearableName(urn, category)
      : rawName;
  const candidate = {
    urn,
    name,
    thumbnail: thumbHash ? contentUrl(thumbHash, base) : "",
    rarity: md.rarity || (element.type === "base-wearable" ? "base" : "common"),
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

function deriveCategories(catalog: Wearable[]): WearableCategory[] {
  const seen = new Set<string>();
  const out: WearableCategory[] = [];
  for (const w of catalog) {
    if (seen.has(w.category)) continue;
    seen.add(w.category);
    out.push({ id: w.category, label: w.category, slot: w.category });
  }
  return out;
}

function color3ToHex(c: unknown): string | undefined {
  if (!c || typeof c !== "object") return undefined;
  const col = c as { r?: number; g?: number; b?: number };
  const to255 = (n?: number) => Math.max(0, Math.min(255, Math.round((n ?? 0) * 255)));
  const hx = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hx(to255(col.r))}${hx(to255(col.g))}${hx(to255(col.b))}`;
}

export function hexToColor3(hex: unknown): { r: number; g: number; b: number } {
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

async function fetchEquipped(address?: string | null, opts: RequestOpts = {}): Promise<Equipped> {
  try {
    const addr = normalizeAddress(address);
    if (!addr) return EquippedSchema.parse({});
    const raw = await getJSON<RawProfileEnv>(
      `/lambdas/profile/${encodeURIComponent(addr)}`,
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
      wearables: asStringArray(av.wearables),
      emotes: Array.isArray(av.emotes)
        ? (av.emotes as unknown[])
            .map((e) => (typeof e === "string" ? e : (e as { urn?: string } | null)?.urn))
            .filter(Boolean)
        : [],
    });
  } catch (err) {
    if (opts.signal?.aborted) throw err;
    return EquippedSchema.parse({});
  }
}

async function fetchAllExplorerWearables(
  address: string,
  opts: RequestOpts = {},
): Promise<unknown[]> {
  const addr = normalizeAddress(address);
  const pageSize = 1000;
  let pageNum = 1;
  let total = Infinity;
  const all: unknown[] = [];
  while (all.length < total) {
    const raw = await getJSON<{ elements?: unknown[]; totalAmount?: number }>(
      `/lambdas/users/${encodeURIComponent(addr)}/wearables`,
      { ...opts, query: { pageSize, pageNum } },
    );
    const els = Array.isArray(raw?.elements) ? raw.elements : [];
    total = Number.isFinite(raw?.totalAmount)
      ? (raw?.totalAmount ?? all.length + els.length)
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

function baseEmoteUrn(id: string): string {
  return `${BASE_EMOTE_COLLECTION}:${id}`;
}

function prettyEmoteName(id: unknown): string {
  return String(id ?? "")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function i18nName(md: RawMetadata | undefined): string | null {
  const arr = md?.i18n;
  if (!Array.isArray(arr)) return null;
  const list = arr as Array<{ code?: string; text?: string }>;
  return list.find((t) => t?.code === "en")?.text ?? list[0]?.text ?? null;
}

function projectEmoteEntity(
  ent: RawEntity | null | undefined,
  { urn, rarity, base }: { urn?: string; rarity?: string; base?: string } = {},
): Emote | null {
  const md = ent?.metadata ?? {};
  const data = md.emoteDataADR74 ?? {};
  const content: RawContentFile[] = Array.isArray(ent?.content) ? ent.content : [];
  const thumbHash = content.find(
    (c) => c.file === (md.thumbnail || "thumbnail.png"),
  )?.hash;
  const pointers: string[] = Array.isArray(ent?.pointers) ? ent.pointers : [];
  const resolvedUrn = urn || md.id || pointers[0] || ent?.id;
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

export function mapExplorerEmote(el: unknown, base?: string): Emote | null {
  const element = (el ?? {}) as RawElement;
  const e = projectEmoteEntity(element.entity, {
    urn: element.urn || element.entity?.metadata?.id,
    rarity:
      element.entity?.metadata?.rarity || (element.type === "base-emote" ? "base" : "common"),
    base,
  });
  return e;
}

export async function fetchEmoteGlbUrl(
  urn: string,
  opts: RequestOpts = {},
): Promise<string | null> {
  const base = catalystBase(opts.base);
  const res = await (opts.fetchImpl ?? fetch)(`${base}/content/entities/active`, {
    method: "POST",
    signal: opts.signal,
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ pointers: [urn] }),
  });
  if (!res.ok) return null;
  const entities: unknown = await res.json();
  const entitiesArr: RawEntity[] = Array.isArray(entities) ? entities : [];
  const ent = entitiesArr[0] ?? null;
  const content: RawContentFile[] = Array.isArray(ent?.content) ? ent.content : [];
  const reps: RawRepresentation[] = ent?.metadata?.emoteDataADR74?.representations ?? [];
  const main = reps[0]?.mainFile;
  const hash =
    (main && content.find((c) => c.file === main)?.hash) ||
    content.find((c) => /\.glb$/i.test(c.file ?? ""))?.hash;
  return hash ? contentUrl(hash, opts.base) : null;
}

async function fetchBaseEmotes(opts: RequestOpts = {}): Promise<Emote[]> {
  const byUrn = new Map<string, Emote>();
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
      const entities: unknown = await res.json();
      if (Array.isArray(entities)) {
        for (const ent of entities as unknown[]) {
          const e = projectEmoteEntity(ent as RawEntity, { rarity: "base", base: opts.base });
          if (e) byUrn.set(e.urn.toLowerCase(), e);
        }
      }
    }
  } catch (err) {
    if (opts.signal?.aborted) throw err;
  }

  return BASE_EMOTE_IDS.map((id) => byUrn.get(baseEmoteUrn(id).toLowerCase())).filter(
    (e): e is Emote => Boolean(e),
  );
}

async function fetchAllExplorerEmotes(
  address: string,
  opts: RequestOpts = {},
): Promise<unknown[]> {
  const addr = normalizeAddress(address);
  const pageSize = 1000;
  let pageNum = 1;
  let total = Infinity;
  const all: unknown[] = [];
  while (all.length < total) {
    const raw = await getJSON<{ elements?: unknown[]; totalAmount?: number }>(
      `/lambdas/users/${encodeURIComponent(addr)}/emotes`,
      {
        ...opts,
        query: { collectionType: "on-chain", pageSize, pageNum },
      },
    );
    const els = Array.isArray(raw?.elements) ? raw.elements : [];
    total = Number.isFinite(raw?.totalAmount)
      ? (raw?.totalAmount ?? all.length + els.length)
      : all.length + els.length;
    all.push(...els);
    if (!els.length || els.length < pageSize) break;
    pageNum += 1;
    if (pageNum > 25) break;
  }
  return all;
}

export async function loadOutfits(address?: string | null, opts: RequestOpts = {}) {
  const addr = normalizeAddress(address);
  if (!isEthAddress(addr)) return [];
  try {
    const env = await getJSON<RawOutfitsEnv>(
      `/lambdas/outfits/${encodeURIComponent(addr)}`,
      opts,
    );
    const list = env?.metadata?.outfits || env?.outfits || [];
    return list
      .map((o) => ({
        slot: Number(o.slot),
        bodyShape: o.outfit?.bodyShape,
        wearables: asStringArray(o.outfit?.wearables),
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

export async function loadRecentOutfits(count = 4, opts: RequestOpts = {}) {
  try {
    const raw = await getJSON<{ deployments?: RawDeployment[] }>(`/content/deployments`, {
      ...opts,
      query: {
        entityType: "profile",
        limit: 60,
        sortingField: "local_timestamp",
        sortingOrder: "DESC",
      },
    });
    const ds = Array.isArray(raw?.deployments) ? raw.deployments : [];
    const seen = new Set<string>();
    const out: Array<{
      slot: number;
      address: string;
      name: string;
      bodyShape: string | undefined;
      wearables: string[];
      skinColor: string | undefined;
      hairColor: string | undefined;
      eyeColor: string | undefined;
    }> = [];
    for (const d of ds) {
      const av = d?.metadata?.avatars?.[0]?.avatar;
      const addr = (d?.pointers?.[0] || "").toLowerCase();
      const wearables = asStringArray(av?.wearables);
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

export async function fetchOwnedWearableUrns(
  address?: string | null,
  opts: RequestOpts = {},
): Promise<string[]> {
  const raw = await getJSON(
    `/lambdas/collections/wearables-by-owner/${encodeURIComponent(
      normalizeAddress(address),
    )}`,
    opts,
  );
  return parseOwned(raw);
}

export async function fetchOwnedEmoteUrns(
  address?: string | null,
  opts: RequestOpts = {},
): Promise<string[]> {
  const raw = await getJSON(
    `/lambdas/collections/emotes-by-owner/${encodeURIComponent(
      normalizeAddress(address),
    )}`,
    opts,
  );
  return parseOwnedEmotes(raw);
}

export async function loadBackpack(address?: string | null, opts: RequestOpts = {}) {
  const addr = normalizeAddress(address);
  const fetchAddr = isEthAddress(addr)
    ? addr
    : "0x0000000000000000000000000000000000000000";

  const elements = await fetchAllExplorerWearables(fetchAddr, opts);

  const catalog: Wearable[] = [];
  const ownedUrns: string[] = [];
  for (const el of elements) {
    const w = mapExplorerWearable(el, opts.base);
    if (!w) continue;
    catalog.push(w);
    const elem = el as RawElement;
    if (elem.type && elem.type !== "base-wearable") ownedUrns.push(w.urn);
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

export async function loadBackpackEmotes(address?: string | null, opts: RequestOpts = {}) {
  const addr = normalizeAddress(address);

  const baseEmotes = await fetchBaseEmotes(opts);

  let ownedEmotes: Emote[] = [];
  if (isEthAddress(addr)) {
    try {
      const els = await fetchAllExplorerEmotes(addr, opts);
      const seen = new Set<string>();
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

  const catalog: Emote[] = [];
  const inCatalog = new Set<string>();
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

export function saveBackpack(payload: unknown) {
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


export type OutfitInput = {
  slot: number;
  bodyShape?: string;
  wearables?: string[];
  skinColor?: string;
  hairColor?: string;
  eyeColor?: string;
};

export const MAX_BASE_OUTFIT_SLOTS = 5;

export function buildOutfitsMetadata(outfits: OutfitInput[]) {
  const seen = new Set<number>();
  const valid = (outfits ?? []).filter((o) => {
    const ok =
      Number.isInteger(o.slot) &&
      o.slot >= 0 &&
      o.slot < MAX_BASE_OUTFIT_SLOTS &&
      !!o.bodyShape &&
      !seen.has(o.slot);
    if (ok) seen.add(o.slot);
    return ok;
  });
  return {
    outfits: valid.map((o) => ({
      slot: o.slot,
      outfit: {
        bodyShape: o.bodyShape,
        eyes: { color: hexToColor3(o.eyeColor) },
        hair: { color: hexToColor3(o.hairColor) },
        skin: { color: hexToColor3(o.skinColor) },
        wearables: o.wearables ?? [],
        forceRender: [] as string[],
      },
    })),
    namesForExtraSlots: [] as string[],
  };
}

export function saveOutfits(
  address: string | null | undefined,
  outfits: OutfitInput[],
) {
  const addr = normalizeAddress(address);
  const payload = {
    entityType: "outfits",
    pointers: [`${addr}:outfits`],
    metadata: buildOutfitsMetadata(outfits),
    files: [] as unknown[],
  };
  try {
    if (typeof window !== "undefined" && isEthAddress(addr)) {
      window.dclBridge?.send?.("SignRequest", {
        kind: "deploy-outfits",
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
