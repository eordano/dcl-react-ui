import { useQuery } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import {
  loadBackpack,
  loadBackpackEmotes,
  normalizeAddress,
} from "../catalyst/backpack.js";

function keyAddr(address) {
  return normalizeAddress(address) || "anon";
}

export function useOwnedWearables(address) {
  return useQuery({
    queryKey: qk.wearables(keyAddr(address)),
    queryFn: ({ signal }) => loadBackpack(address, { signal }),
    staleTime: STALE.wearables,
  });
}

export function useOwnedEmotes(address) {
  return useQuery({
    queryKey: qk.emotes(keyAddr(address)),
    queryFn: ({ signal }) => loadBackpackEmotes(address, { signal }),
    staleTime: STALE.emotes,
  });
}

export function useOwnedItems(address) {
  const wearables = useOwnedWearables(address);
  const emotes = useOwnedEmotes(address);
  return {
    wearables,
    emotes,
    isLoading: wearables.isLoading || emotes.isLoading,
    isFetching: wearables.isFetching || emotes.isFetching,
    isError: wearables.isError || emotes.isError,
    error: wearables.error ?? emotes.error ?? null,
  };
}

export function prefetchOwnedItems(queryClient, address) {
  queryClient.prefetchQuery({
    queryKey: qk.wearables(keyAddr(address)),
    queryFn: ({ signal }) => loadBackpack(address, { signal }),
    staleTime: STALE.wearables,
  });
  queryClient.prefetchQuery({
    queryKey: qk.emotes(keyAddr(address)),
    queryFn: ({ signal }) => loadBackpackEmotes(address, { signal }),
    staleTime: STALE.emotes,
  });
}
