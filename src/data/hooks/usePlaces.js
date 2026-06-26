// TanStack Query hooks for the Map panel. Keys come from the qk factory and
// staleTime from STALE so hover-prefetch (router.prefetchPanel -> Map.route
// prefetch) and the on-click useQuery resolve to the same cache entry — panel
// switches render instantly from memory. The AbortSignal from the query ctx is
// threaded into the fetchers so switching away cancels in-flight reads.

import { useQuery } from "@tanstack/react-query";

import { fetchPlaces, fetchPlace, fetchCategories } from "../catalyst/places.js";
import { qk, STALE } from "../queryKeys.js";

export function usePlaces(params) {
  return useQuery({
    queryKey: qk.places(params),
    queryFn: ({ signal }) => fetchPlaces(params, { signal }),
    staleTime: STALE.places,
  });
}

export function usePlace(id) {
  return useQuery({
    queryKey: qk.place(id),
    queryFn: ({ signal }) => fetchPlace(id, { signal }),
    enabled: Boolean(id),
    staleTime: STALE.place,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: qk.categories(),
    queryFn: ({ signal }) => fetchCategories({ signal }),
    staleTime: STALE.categories,
  });
}
