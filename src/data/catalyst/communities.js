// Browser-only twin of sites/app/lib/catalyst/communities.ts.
// Schemas + projectNode + loadCommunity are ported (minus TS types). The LIST is
// served from the curated fixture: the LIVE `GET /v1/communities` IS routed on
// catalyst.dcl.one today but returns feed-gated / unmoderated junk (test rows,
// XSS payloads, membersCount:1), so this reads-only milestone shows the fixture
// browse grid. DETAIL + members are fetched LIVE with the fixture as fallback.
// No node/server imports.

import { z } from "zod";

import { getJSON } from "./client.js";
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

// Browse list derived from the detail fixture — each node validated through
// CommunitySchema so the grid sees the exact shape a live enriched row carries.
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

// LIST. Returns the curated fixture grid (see header note on the junk feed).
// `params`/`opts` are accepted for forward-compat with the live path: flip to
// live by `getJSON("/v1/communities", { ...opts, query: params })` and returning
// `unwrapData(raw).results` once the feed is moderated — no caller change needed.
export async function loadCommunities(_params = {}, _opts = {}) {
  // The LIVE GET /v1/communities is empty / feed-gated (test rows + XSS payloads)
  // today, so the curated fixture grid would be fabricated data. Return an honest
  // EMPTY browse list instead; wire the live feed here once it's populated and
  // sanitized. fixtureCommunities is kept for the detail/members fallback + tests.
  void fixtureCommunities;
  return [];
}

// DETAIL. Fetches GET /v1/communities/{id} + /members LIVE in parallel (signal
// forwarded so a panel switch cancels both), falling back to the fixture when
// the endpoint 404s / returns an unparseable body.
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
