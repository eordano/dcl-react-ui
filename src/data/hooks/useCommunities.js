// TanStack Query hooks for the Communities panel.
// - useCommunities(): the browse list (fixture-backed this milestone).
// - useCommunity(id): detail + members, fetched LIVE on select with fixture
//   fallback; disabled until an id is selected.
// Keys come from `qk`, staleTime from `STALE`, and the query-fn ctx `signal` is
// forwarded into the data layer so panel switches cancel in-flight reads.

import { useQuery } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import { loadCommunities, loadCommunity } from "../catalyst/communities.js";

export function useCommunities(params = {}) {
  return useQuery({
    queryKey: qk.communities(params),
    queryFn: ({ signal }) => loadCommunities(params, { signal }),
    staleTime: STALE.communities,
  });
}

export function useCommunity(id) {
  return useQuery({
    queryKey: qk.community(id),
    queryFn: ({ signal }) => loadCommunity(id, { signal }),
    staleTime: STALE.community,
    enabled: Boolean(id),
  });
}
