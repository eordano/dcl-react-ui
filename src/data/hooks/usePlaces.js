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
