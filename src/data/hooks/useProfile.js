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

export function resolveSelfAddress() {
  const id = getDeployIdentity();
  if (id?.signerAddress) return normalizeAddress(id.signerAddress);
  return normalizeAddress(FALLBACK_STATE.identity.address);
}

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
  });
}

export function useUserPhotos(address) {
  const addr = address ?? resolveSelfAddress();
  return useQuery({
    queryKey: qk.photos(addr),
    queryFn: ({ signal }) => fetchUserPhotos(addr, { signal }),
    staleTime: STALE.photos,
    enabled: Boolean(addr),
    retry: false,
  });
}

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
  const badges = {
    achieved: liveBadges?.achieved ?? [],
    notAchieved: liveBadges?.notAchieved ?? [],
  };

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

export function prefetchPassport(queryClient, address) {
  const addr = address ?? resolveSelfAddress();
  if (!addr) return;
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
