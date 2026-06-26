// TanStack Query hooks for the Backpack panel: owned wearables + owned emotes.
// Keys come from the shared `qk` factory and staleTime from `STALE` so the
// on-click useQuery and the hover-prefetch resolve to the SAME cache entry.
// The query fn forwards the AbortSignal from the query ctx into getJSON so a
// panel switch cancels in-flight catalyst reads.

import { useQuery } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import {
  loadBackpack,
  loadBackpackEmotes,
  normalizeAddress,
} from "../catalyst/backpack.js";

// Stable cache-key address: lowercase, or "anon" so guest/empty addresses still
// land on a deterministic key (the loaders fall back to the fixture seed).
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

// Convenience aggregate the route wrapper consumes: both queries plus rolled-up
// loading / error flags.
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

// Warm both caches on hover/focus intent. Best-effort: prefetchQuery never
// rejects to the caller, but guard anyway so the shell prefetch handler is safe.
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
