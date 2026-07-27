import { z } from "zod";

import { getJSON, serviceBase, type RequestOpts } from "./client";

const nullableStr = z.string().nullish().transform((v) => v ?? null);

const communityThumbnail = z
  .string()
  .nullish()
  .transform((v) => {
    if (!v || v === "N/A") return null;
    return v.replace(
      /^https:\/\/cdn\.decentraland\.org(?=\/social\/communities\/)/,
      serviceBase("communitiesCdn"),
    );
  });

export const CommunityMemberSchema = z.object({
  memberAddress: z.string(),
  role: z.string().default("member"),
  joinedAt: nullableStr,
  name: z.string().default(""),
  profilePictureUrl: z.string().default(""),
  hasClaimedName: z.boolean().nullish().transform((v) => v ?? false),
});

export type CommunityMember = z.infer<typeof CommunityMemberSchema>;

export const CommunityEventSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  image: z.string().default(""),
  creatorName: z.string().default(""),
  timeLabel: z.string().default(""),
});

export type CommunityEvent = z.infer<typeof CommunityEventSchema>;

export const CommunityPostSchema = z.object({
  id: z.string(),
  authorAddress: z.string(),
  content: z.string().default(""),
  createdAt: nullableStr,
  likesCount: z.number().nullish().transform((v) => v ?? 0),
  isLikedByUser: z.boolean().nullish().transform((v) => v ?? false),
  authorName: z.string().default(""),
  authorProfilePictureUrl: z.string().default(""),
  authorHasClaimedName: z.boolean().nullish().transform((v) => v ?? false),
});

export type CommunityPost = z.infer<typeof CommunityPostSchema>;

export const CommunityPlaceSchema = z.object({
  id: z.string(),
  addedBy: z.string().default(""),
  addedAt: nullableStr,
});

export type CommunityPlace = z.infer<typeof CommunityPlaceSchema>;

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  description: z.string().default(""),
  ownerAddress: z.string().default(""),
  ownerName: nullableStr,
  thumbnailUrl: communityThumbnail,
  privacy: z.enum(["public", "private"]).default("public"),
  visibility: z.enum(["all", "unlisted"]).default("all"),
  membersCount: z.number().nullish().transform((v) => v ?? 0),
  isLive: z.boolean().nullish().transform((v) => v ?? false),
  role: z.string().default("none"),
});

export type Community = z.infer<typeof CommunitySchema>;

export type CommunityDetail = {
  community: Community;
  members: CommunityMember[];
  events: CommunityEvent[];
  source: string;
};

function projectNode(node: unknown, source: string): CommunityDetail | null {
  const obj = (node ?? {}) as Record<string, unknown>;

  const community = CommunitySchema.safeParse(obj);
  if (!community.success) {
    console.warn("[communities] community failed validation:", community.error.message);
    return null;
  }

  const members = z
    .array(CommunityMemberSchema)
    .safeParse(Array.isArray(obj.members) ? obj.members : []);
  const events = z
    .array(CommunityEventSchema)
    .safeParse(Array.isArray(obj.events) ? obj.events : []);

  return {
    community: community.data,
    members: members.success ? members.data : [],
    events: events.success ? events.data : [],
    source,
  };
}

function unwrapData(env: unknown): unknown {
  return (env as { data?: unknown } | null | undefined)?.data ?? env;
}

export async function loadCommunities(
  params: RequestOpts["query"] = {},
  opts: RequestOpts = {},
): Promise<Community[]> {
  const raw = await getJSON("/v1/communities", {
    service: "communities",
    ...opts,
    query: params,
  });
  const container = unwrapData(raw) as { results?: unknown } | null | undefined;
  const results = container?.results;
  if (!Array.isArray(results)) return [];
  return results
    .map((node) => {
      const parsed = CommunitySchema.safeParse(node ?? {});
      return parsed.success ? parsed.data : null;
    })
    .filter((c): c is Community => c !== null);
}

export async function loadCommunity(
  id?: string | null,
  opts: RequestOpts = {},
): Promise<CommunityDetail | null> {
  if (!id) return null;
  try {
    const svcOpts = { service: "communities" as const, ...opts };
    const [cRaw, mRaw] = await Promise.all([
      getJSON(`/v1/communities/${encodeURIComponent(id)}`, svcOpts),
      getJSON(`/v1/communities/${encodeURIComponent(id)}/members`, svcOpts).catch(
        () => null,
      ),
    ]);

    const community = unwrapData(cRaw) as Record<string, unknown>;
    const mData = mRaw ? (unwrapData(mRaw) as { results?: unknown }) : null;
    const members = Array.isArray(mData?.results) ? mData.results : [];

    const node = { ...community, members, events: [] };
    return projectNode(node, "live");
  } catch {
    return null;
  }
}

export async function loadCommunityPosts(
  id?: string | null,
  opts: RequestOpts = {},
): Promise<CommunityPost[]> {
  if (!id) return [];
  try {
    const raw = await getJSON(`/v1/communities/${encodeURIComponent(id)}/posts`, {
      service: "communities",
      ...opts,
    });
    const container = unwrapData(raw) as { posts?: unknown } | null | undefined;
    const posts = Array.isArray(container?.posts) ? container.posts : [];
    return posts
      .map((node) => {
        const parsed = CommunityPostSchema.safeParse(node ?? {});
        return parsed.success ? parsed.data : null;
      })
      .filter((p): p is CommunityPost => p !== null);
  } catch {
    return [];
  }
}

export async function loadCommunityPlaces(
  id?: string | null,
  opts: RequestOpts = {},
): Promise<CommunityPlace[]> {
  if (!id) return [];
  try {
    const raw = await getJSON(`/v1/communities/${encodeURIComponent(id)}/places`, {
      service: "communities",
      ...opts,
    });
    const container = unwrapData(raw) as { results?: unknown } | null | undefined;
    const places = Array.isArray(container?.results) ? container.results : [];
    return places
      .map((node) => {
        const parsed = CommunityPlaceSchema.safeParse(node ?? {});
        return parsed.success ? parsed.data : null;
      })
      .filter((p): p is CommunityPlace => p !== null);
  } catch {
    return [];
  }
}
