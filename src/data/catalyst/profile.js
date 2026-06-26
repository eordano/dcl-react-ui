// Browser-only twin of sites/app/lib/catalyst/{profile.ts,passport.ts}.
// Pure / browser-safe: no node, no *.server imports. zod is isomorphic so the
// schemas are ported verbatim (minus the TS types). Every wrapper is a thin GET
// over the shared getJSON() and threads the AbortSignal from its caller so panel
// switches cancel in-flight reads.
//
// Endpoints used by the Passport panel:
//   /lambdas/profile/{addr}            -> LIVE (200; empty {avatars:[]} on this realm)
//   /badges/users/{addr}/badges        -> LIVE 200 but empty on this realm -> fixture
//   /camera-reel/users/{addr}/images   -> edge-404 today                   -> fixture

import { z } from "zod";
import { getJSON, catalystBase } from "./client.js";

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
// profile (/lambdas/profile/{addr})
// ---------------------------------------------------------------------------

const Color3Schema = z
  .object({ r: z.number(), g: z.number(), b: z.number() })
  .partial()
  .passthrough();

const LinkSchema = z.object({
  title: z.string().default(""),
  url: z.string().default(""),
});

const AvatarInfoSchema = z
  .object({
    wearables: z.array(z.string()).default([]),
    snapshots: z
      .object({ face256: z.string().optional(), body: z.string().optional() })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const AvatarSchema = z
  .object({
    name: z.string().default(""),
    hasClaimedName: z.boolean().default(false),
    nameColor: z.union([Color3Schema, z.string()]).optional(),
    description: z.string().default(""),
    links: z.array(LinkSchema).optional(),
    country: z.string().optional(),
    gender: z.string().optional(),
    pronouns: z.string().optional(),
    relationshipStatus: z.string().optional(),
    sexualOrientation: z.string().optional(),
    language: z.string().optional(),
    profession: z.string().optional(),
    birthdate: z.number().optional(),
    realName: z.string().optional(),
    hobbies: z.string().optional(),
    ethAddress: z.string().optional(),
    userId: z.string().optional(),
    avatar: AvatarInfoSchema.optional(),
  })
  .passthrough();

export const ProfileEnvelopeSchema = z
  .object({
    avatars: z.array(AvatarSchema).default([]),
    timestamp: z.number().optional(),
  })
  .passthrough();

export function parseProfileEnvelope(raw) {
  return ProfileEnvelopeSchema.parse(raw);
}

// Returns the first deployed Avatar, or null when no profile is deployed
// (catalyst answers 200 with {avatars:[]} for un-deployed addresses).
export async function fetchProfile(address, opts = {}) {
  const raw = await getJSON(
    `/lambdas/profile/${encodeURIComponent(normalizeAddress(address))}`,
    opts,
  );
  const env = parseProfileEnvelope(raw);
  return env.avatars[0] ?? null;
}

const DEFAULT_NAME_COLOR = "#FF8362";

function color3ToHex(c) {
  const to255 = (n) => Math.max(0, Math.min(255, Math.round((n ?? 0) * 255)));
  const hex = (n) => n.toString(16).padStart(2, "0");
  return `#${hex(to255(c.r))}${hex(to255(c.g))}${hex(to255(c.b))}`;
}

const INFO_FIELDS = [
  { src: "country", key: "country", label: "Country", icon: "globe" },
  { src: "language", key: "language", label: "Language", icon: "translate" },
  { src: "pronouns", key: "pronouns", label: "Pronouns", icon: "pronouns" },
  { src: "gender", key: "gender", label: "Gender", icon: "gender" },
  { src: "profession", key: "profession", label: "Profession", icon: "games" },
  { src: "hobbies", key: "favorite_hobby", label: "Favorite hobby", icon: "heart" },
];

// Map a raw Avatar into the presentational view-model the Passport surface wants.
export function mapProfile(avatar, address) {
  const nameColor =
    typeof avatar.nameColor === "string"
      ? avatar.nameColor
      : avatar.nameColor
        ? color3ToHex(avatar.nameColor)
        : DEFAULT_NAME_COLOR;

  const info = [];
  for (const f of INFO_FIELDS) {
    const value = avatar[f.src];
    if (typeof value === "string" && value.trim()) {
      info.push({ key: f.key, label: f.label, value, icon: f.icon });
    }
  }

  const links = (avatar.links ?? [])
    .filter((l) => /^https?:\/\//i.test(l.url))
    .map((l) => ({ title: l.title || l.url, url: l.url }));

  const addr = normalizeAddress(address) || avatar.ethAddress || address || "";
  const shortTag = addr ? `#${addr.slice(-4)}` : "";

  return {
    address: addr,
    name: avatar.name || addr,
    tag: shortTag,
    hasClaimedName: Boolean(avatar.hasClaimedName),
    nameColor,
    mutualCount: 0,
    bio: avatar.description ?? "",
    accountUrl: `https://decentraland.org/marketplace/accounts/${addr}`,
    info,
    links,
    equipped: avatar.avatar?.wearables ?? [],
  };
}

// Resolve the avatar face snapshot into a usable <img src>. Deployed profiles
// usually carry an absolute URL; a bare content hash is resolved against the
// catalyst content endpoint.
export function profileFaceUrl(avatar, opts = {}) {
  const snap = avatar?.avatar?.snapshots?.face256;
  if (!snap || typeof snap !== "string") return null;
  if (/^https?:\/\//i.test(snap) || snap.startsWith("data:")) return snap;
  return `${catalystBase(opts.base)}/content/contents/${snap}`;
}

// ---------------------------------------------------------------------------
// badges (/badges/users/{addr}/badges + /badges/categories)
// ---------------------------------------------------------------------------

const CategoriesEnvelopeSchema = z
  .object({
    data: z
      .object({ categories: z.array(z.string()).default([]) })
      .passthrough()
      .default({ categories: [] }),
  })
  .passthrough();

export const BadgeDataSchema = z
  .object({
    id: z.string().default(""),
    name: z.string().default(""),
    description: z.string().nullish(),
    category: z.string().nullish(),
    isTier: z.boolean().optional(),
    completedAt: z.string().nullish(),
    progress: z
      .object({
        stepsDone: z.number().optional(),
        totalStepsTarget: z.number().optional(),
        lastCompletedTierName: z.string().nullish(),
        lastCompletedTierImage: z.string().nullish(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const UserBadgesEnvelopeSchema = z
  .object({
    data: z
      .object({
        achieved: z.array(BadgeDataSchema).default([]),
        notAchieved: z.array(BadgeDataSchema).default([]),
      })
      .passthrough()
      .default({ achieved: [], notAchieved: [] }),
  })
  .passthrough();

export async function fetchBadgeCategories(opts = {}) {
  const raw = await getJSON("/badges/categories", opts);
  return CategoriesEnvelopeSchema.parse(raw).data.categories;
}

export async function fetchUserBadges(address, opts = {}) {
  const raw = await getJSON(
    `/badges/users/${encodeURIComponent(normalizeAddress(address))}/badges`,
    opts,
  );
  const env = UserBadgesEnvelopeSchema.parse(raw);
  return { achieved: env.data.achieved, notAchieved: env.data.notAchieved };
}

// ---------------------------------------------------------------------------
// photos (/camera-reel/users/{addr}/images)
// ---------------------------------------------------------------------------

export const GalleryImageSchema = z
  .object({
    id: z.string().default(""),
    url: z.string().default(""),
    thumbnailUrl: z.string().default(""),
    isPublic: z.boolean().optional(),
    dateTime: z.string().default(""),
  })
  .passthrough();

const GalleryEnvelopeSchema = z
  .object({
    images: z.array(GalleryImageSchema).default([]),
    userData: z
      .object({
        currentImages: z.number().optional(),
        maxImages: z.number().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export async function fetchUserPhotos(address, opts = {}) {
  const raw = await getJSON(
    `/camera-reel/users/${encodeURIComponent(normalizeAddress(address))}/images`,
    opts,
  );
  return GalleryEnvelopeSchema.parse(raw).images;
}
