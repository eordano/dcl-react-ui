import { z } from "zod";

import { CatalystError, getJSON, sendSignedJSON } from "./client.js";
import fixtureRaw from "../../../../sites/app/fixtures/landings-community-detail.json";

const nullableStr = z.string().nullish().transform((v) => v ?? null);

export const CommunityMemberSchema = z.object({
  memberAddress: z.string(),
  role: z.string().default("member"),
  joinedAt: nullableStr,
  name: z.string().default(""),
  profilePictureUrl: z.string().default(""),
  hasClaimedName: z.boolean().nullish().transform((v) => v ?? false),
});

export const CommunityEventSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  image: z.string().default(""),
  creatorName: z.string().default(""),
  timeLabel: z.string().default(""),
});

export const CommunitySchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  description: z.string().default(""),
  ownerAddress: z.string().default(""),
  ownerName: nullableStr,
  thumbnailUrl: nullableStr,
  privacy: z.enum(["public", "private"]).default("public"),
  visibility: z.enum(["all", "unlisted"]).default("all"),
  membersCount: z.number().nullish().transform((v) => v ?? 0),
  isLive: z.boolean().nullish().transform((v) => v ?? false),
  role: z.string().default("none"),
});

const fixture = fixtureRaw;

function projectNode(node, source) {
  const obj = node ?? {};

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

export function fixtureCommunity(id) {
  const node = fixture.communities?.[id] ?? null;
  if (!node) return null;
  return projectNode(node, "fixture");
}

export function fixtureCommunityIds() {
  return Object.keys(fixture.communities ?? {});
}

export function fixtureCommunities() {
  return Object.values(fixture.communities ?? {})
    .map((node) => {
      const parsed = CommunitySchema.safeParse(node ?? {});
      return parsed.success ? parsed.data : null;
    })
    .filter(Boolean);
}

function unwrapData(env) {
  return env?.data ?? env;
}

export async function loadCommunities(params = {}, opts = {}) {
  const raw = await getJSON("/v1/communities", { ...opts, query: params });
  const results = unwrapData(raw)?.results;
  if (!Array.isArray(results)) return [];
  return results
    .map((node) => {
      const parsed = CommunitySchema.safeParse(node ?? {});
      return parsed.success ? parsed.data : null;
    })
    .filter(Boolean);
}

export async function loadCommunity(id, opts = {}) {
  if (!id) return null;
  try {
    const [cRaw, mRaw] = await Promise.all([
      getJSON(`/v1/communities/${encodeURIComponent(id)}`, opts),
      getJSON(`/v1/communities/${encodeURIComponent(id)}/members`, opts).catch(
        () => null,
      ),
    ]);

    const community = unwrapData(cRaw);
    const mData = mRaw ? unwrapData(mRaw) : null;
    const members = Array.isArray(mData?.results) ? mData.results : [];

    const node = { ...community, members, events: [] };
    const detail = projectNode(node, "live");
    if (detail) return detail;
    return fixtureCommunity(id);
  } catch {
    return fixtureCommunity(id);
  }
}

export async function joinCommunity(id, opts = {}) {
  if (!id) throw new CatalystError("Missing community id", "", 0);
  const { privacy, ...rest } = opts;
  if (privacy === "private") {
    await sendSignedJSON(`/v1/communities/${encodeURIComponent(id)}/requests`, {
      ...rest,
      method: "POST",
      body: { type: "request_to_join" },
    });
    return { id, status: "requested" };
  }
  await sendSignedJSON(`/v1/communities/${encodeURIComponent(id)}/members`, {
    ...rest,
    method: "POST",
  });
  return { id, status: "joined" };
}

export async function leaveCommunity(id, opts = {}) {
  if (!id) throw new CatalystError("Missing community id", "", 0);
  const { address, ...rest } = opts;
  if (!address) {
    throw new CatalystError("Sign in to manage this community", "", 401);
  }
  await sendSignedJSON(
    `/v1/communities/${encodeURIComponent(id)}/members/${encodeURIComponent(address)}`,
    { ...rest, method: "DELETE" },
  );
  return { id, status: "left" };
}
