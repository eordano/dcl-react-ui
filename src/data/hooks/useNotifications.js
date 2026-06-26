// useNotifications — TanStack Query hook for the Notifications panel.
//
// Reads identity (read-only) from the bridge and attempts the LIVE GET
// /notifications. That endpoint is auth-gated (require_signer) so anonymous
// reads reject -> we serve the bundled fixture (`fromFixture: true`). When a
// signed auth-chain header is available (window.__DCL_AUTH_HEADERS__), it is
// threaded through getJSON and the live feed replaces the fixture with no
// structural change. AbortSignal from the query ctx is forwarded so a panel
// switch cancels the in-flight read.
//
// State surface for the route:
//   notifications: undefined while loading; live rows on success (incl. []);
//                  fixture rows on error.
//   isLoading / isError: query status. fromFixture: live read failed.

import { useQuery } from "@tanstack/react-query";
import { qk, STALE } from "../queryKeys.js";
import {
  fetchLiveNotifications,
  fixtureNotifications,
  FIXTURE_ADDRESS,
} from "../catalyst/notifications.js";
import { useBridgeState } from "../../overlay/bridge.js";

function authHeaders() {
  if (typeof window === "undefined") return undefined;
  // Future single chokepoint: the rig/bridge can inject a signed auth-chain
  // header here to flip this read live. Absent today (reads-only milestone).
  return window.__DCL_AUTH_HEADERS__ || undefined;
}

export function useNotifications() {
  const { identity } = useBridgeState();
  const address = identity?.address;

  const query = useQuery({
    queryKey: qk.notifications(address),
    queryFn: ({ signal }) =>
      fetchLiveNotifications({ signal, headers: authHeaders(), address }),
    staleTime: STALE.notifications,
    retry: false,
  });

  // The /notifications feed is auth-gated (signed header). An anonymous/failed
  // read returns an honest EMPTY list, not fabricated notifications; live data
  // replaces it once a signed read succeeds. (fixtureNotifications retained for
  // the signed-path wiring + tests.)
  const notifications = query.isSuccess
    ? query.data
    : query.isError
      ? []
      : undefined;
  void fixtureNotifications;

  return {
    notifications,
    fromFixture: query.isError,
    address: query.isSuccess ? address ?? FIXTURE_ADDRESS : FIXTURE_ADDRESS,
    isLoading: query.isPending,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
