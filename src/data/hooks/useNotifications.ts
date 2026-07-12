import { useQuery } from "@tanstack/react-query";
import { qk, STALE } from "../queryKeys";
import { fetchLiveNotifications } from "../catalyst/notifications";
import { useBridgeState } from "../../overlay/bridge";

function authHeaders(): Record<string, string> | undefined {
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

  return {
    notifications,
    address,
    isLoading: query.isPending,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
