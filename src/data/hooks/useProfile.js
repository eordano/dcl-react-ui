// TanStack Query hooks for the Passport panel.
//
// Resources, freshness + degradation strategy:
//   profile -> /lambdas/profile/{addr}            LIVE; empty -> fixture profile
//   badges  -> /badges/users/{addr}/badges        LIVE 200 but empty here -> fixture
//   photos  -> /camera-reel/users/{addr}/images   edge-404 today          -> fixture
//
// The query fns thread the AbortSignal from the query context into getJSON so
// switching panels cancels in-flight reads. Keys + staleTimes come from the
// shared factory (qk / STALE) so hover-prefetch and the on-click useQuery resolve
// to the same cache entry. Identity is read-only; the wallet key never crosses
// into JS, so this is a READS-ONLY milestone (no signed/auth headers yet — when
// they land they attach through the same getJSON path with zero structural change).

import { useQuery } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import { passportFixture } from "../fixtures.js";
import { FALLBACK_STATE, getDeployIdentity } from "../../overlay/bridge.js";
import {
  fetchProfile,
  fetchUserBadges,
  fetchUserPhotos,
  mapProfile,
  profileFaceUrl,
  normalizeAddress,
} from "../catalyst/profile.js";

// Best-effort synchronous self-address resolution, shared by the hooks and by
// prefetch so both target the SAME cache key. Prefers the read-only deploy
// identity from the bridge; otherwise the fallback identity (so the panel still
// has a stable address to key on with no engine attached).
export function resolveSelfAddress() {
  const id = getDeployIdentity();
  if (id?.signerAddress) return normalizeAddress(id.signerAddress);
  return normalizeAddress(FALLBACK_STATE.identity.address);
}

// ---------------------------------------------------------------------------
// individual resource hooks
// ---------------------------------------------------------------------------

export function useProfile(address) {
  const addr = address ?? resolveSelfAddress();
  return useQuery({
    queryKey: qk.profile(addr),
    queryFn: ({ signal }) => fetchProfile(addr, { signal }),
    staleTime: STALE.profile,
    enabled: Boolean(addr),
  });
}

export function useUserBadges(address) {
  const addr = address ?? resolveSelfAddress();
  return useQuery({
    queryKey: qk.badges(addr),
    queryFn: ({ signal }) => fetchUserBadges(addr, { signal }),
    staleTime: STALE.badges,
    enabled: Boolean(addr),
    retry: false, // edge endpoint is empty/404 today — no point retrying
  });
}

export function useUserPhotos(address) {
  const addr = address ?? resolveSelfAddress();
  return useQuery({
    queryKey: qk.photos(addr),
    queryFn: ({ signal }) => fetchUserPhotos(addr, { signal }),
    staleTime: STALE.photos,
    enabled: Boolean(addr),
    retry: false, // camera-reel gateway is edge-404 today
  });
}

// ---------------------------------------------------------------------------
// fixture fallbacks (degraded / un-deployed / auth-gated surfaces)
// ---------------------------------------------------------------------------

function fixtureProfileVM(addr) {
  const p = passportFixture.profile ?? {};
  return {
    address: addr || p.address || "",
    name: p.name ?? "",
    tag: p.tag ?? "",
    hasClaimedName: Boolean(p.hasClaimedName),
    nameColor: p.nameColor ?? "#FF8362",
    mutualCount: 0,
    bio: p.description ?? "",
    accountUrl: `https://decentraland.org/marketplace/accounts/${addr || p.address || ""}`,
    info: p.info ?? [],
    links: p.links ?? [],
    equipped: p.equipped ?? [],
  };
}

function fixtureBadges() {
  const b = passportFixture.badges ?? {};
  return {
    categories: b.categories ?? [],
    earned: b.earned ?? [],
    sections: b.sections ?? [],
    achieved: [],
    notAchieved: [],
  };
}

// ---------------------------------------------------------------------------
// combined view-model the panel consumes
// ---------------------------------------------------------------------------

/**
 * Assemble the full passport view-model for `address` (defaults to self).
 * Always returns a renderable shape: live data where catalyst answers, faithful
 * fixtures where it is empty / edge-404. `isLive` flags whether the profile came
 * back from catalyst; `isLoading` gates only on the primary (profile) read so the
 * panel paints immediately; `isError` means even the primary read failed (the UI
 * still renders the fixture, so this is informational, never fatal).
 */
export function usePassport(address) {
  const addr = address ?? resolveSelfAddress();

  const profileQ = useProfile(addr);
  const badgesQ = useUserBadges(addr);
  const photosQ = useUserPhotos(addr);

  const liveAvatar = profileQ.data ?? null;
  const liveProfile = liveAvatar ? mapProfile(liveAvatar, addr) : null;
  const profile = liveProfile ?? fixtureProfileVM(addr);
  const faceUrl = liveAvatar ? profileFaceUrl(liveAvatar) : null;

  const liveBadges = badgesQ.data;
  const hasLiveBadges =
    !!liveBadges && (liveBadges.achieved.length > 0 || liveBadges.notAchieved.length > 0);
  const badges = hasLiveBadges
    ? { categories: [], earned: [], sections: [], ...liveBadges }
    : fixtureBadges();

  const livePhotos = photosQ.data;
  const photos =
    livePhotos && livePhotos.length > 0 ? livePhotos : passportFixture.photos ?? [];

  return {
    address: addr,
    profile,
    faceUrl,
    badges,
    photos,
    isLive: Boolean(liveProfile),
    isLoading: profileQ.isLoading,
    isError: profileQ.isError && !liveProfile,
    error: profileQ.error ?? badgesQ.error ?? photosQ.error ?? null,
  };
}

// ---------------------------------------------------------------------------
// hover / focus intent prefetch (called by the shell via the route's prefetch)
// ---------------------------------------------------------------------------

export function prefetchPassport(queryClient, address) {
  const addr = address ?? resolveSelfAddress();
  if (!addr) return;
  // prefetchQuery never throws synchronously; rejected fetches are swallowed.
  queryClient.prefetchQuery({
    queryKey: qk.profile(addr),
    queryFn: ({ signal }) => fetchProfile(addr, { signal }),
    staleTime: STALE.profile,
  });
  queryClient.prefetchQuery({
    queryKey: qk.badges(addr),
    queryFn: ({ signal }) => fetchUserBadges(addr, { signal }),
    staleTime: STALE.badges,
    retry: false,
  });
  queryClient.prefetchQuery({
    queryKey: qk.photos(addr),
    queryFn: ({ signal }) => fetchUserPhotos(addr, { signal }),
    staleTime: STALE.photos,
    retry: false,
  });
}
