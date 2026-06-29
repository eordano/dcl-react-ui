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
