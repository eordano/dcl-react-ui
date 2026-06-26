import { QueryClient } from "@tanstack/react-query";

// Single in-memory cache for the whole SPA. Created once, lives for the lifetime
// of the bundle — every nav transition is served from here, zero server round
// trips. Per-resource staleTime is set on each useQuery via STALE in queryKeys.js;
// these are the conservative global defaults.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      // Forward the AbortSignal that TanStack passes in the query context into
      // getJSON so switching panels cancels in-flight reads. (Panel hooks must
      // thread `signal` from the query fn ctx — see panels/README.md.)
    },
  },
});
