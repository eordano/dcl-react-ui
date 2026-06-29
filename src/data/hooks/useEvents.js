import { useQuery } from "@tanstack/react-query";

import { fetchEvents, fetchEventCategories } from "../catalyst/events.js";
import { qk, STALE } from "../queryKeys.js";

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
