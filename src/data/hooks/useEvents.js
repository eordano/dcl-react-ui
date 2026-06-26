// TanStack Query hooks for the Events panel.
// Keys come from `qk`, staleTime from `STALE`, and the AbortSignal from the
// query context is forwarded into getJSON so panel switches cancel in-flight
// reads. These same key+fn+stale tuples back the route's `prefetch` export so
// hover-intent and on-click render resolve to one cache entry.

import { useQuery } from "@tanstack/react-query";

import { fetchEvents, fetchEventCategories } from "../catalyst/events.js";
import { qk, STALE } from "../queryKeys.js";

/**
 * @param {{ list?: string, search?: string, category?: string, limit?: number, offset?: number }} [params]
 */
export function useEvents(params = {}) {
  return useQuery({
    queryKey: qk.events(params),
    queryFn: ({ signal }) => fetchEvents(params, { signal }),
    staleTime: STALE.events,
  });
}

export function useEventCategories() {
  return useQuery({
    queryKey: qk.eventCategories(),
    queryFn: ({ signal }) => fetchEventCategories({ signal }),
    staleTime: STALE.eventCategories,
  });
}
