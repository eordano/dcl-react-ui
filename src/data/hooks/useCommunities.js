import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import {
  joinCommunity,
  leaveCommunity,
  loadCommunities,
  loadCommunity,
} from "../catalyst/communities.js";
import { getDeployIdentity } from "../../overlay/bridge.js";

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

export function useJoinCommunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, privacy }) => joinCommunity(id, { privacy }),
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: qk.community(id) });
      qc.invalidateQueries({ queryKey: ["communities"] });
    },
  });
}

export function useLeaveCommunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => {
      const ident = getDeployIdentity();
      return leaveCommunity(id, { address: ident?.signerAddress });
    },
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: qk.community(id) });
      qc.invalidateQueries({ queryKey: ["communities"] });
    },
  });
}
