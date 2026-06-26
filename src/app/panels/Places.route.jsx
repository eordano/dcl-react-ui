// Places panel — route id "places" (nav PLACES [Z]).
//
// The LIST companion to the Map: the SAME live catalyrst places (catalyrst-places
// via /places/api), rendered as the reused Places page's cards. The PLACES tab
// was previously dead (no route → empty HUD). We pass live rows only (never the
// page's built-in fixture CARDS) so the list stays consistent with the Map's
// pins; while loading / empty it renders the page's own empty state.
import { useMemo } from "react";

import Places from "../../explorer/pages/Places.jsx";
import { usePlaces } from "../../data/hooks/usePlaces.js";
import { fetchPlaces } from "../../data/catalyst/places.js";
import { qk, STALE } from "../../data/queryKeys.js";

const LIST_PARAMS = { limit: 60 };

// Warm the cache on hover/focus intent (the shell calls this).
export function prefetch(queryClient) {
  try {
    queryClient.prefetchQuery({
      queryKey: qk.places(LIST_PARAMS),
      queryFn: ({ signal }) => fetchPlaces(LIST_PARAMS, { signal }),
      staleTime: STALE.places,
    });
  } catch {
    /* prefetch is best-effort */
  }
}

export default function PlacesPanel() {
  const q = usePlaces(LIST_PARAMS);
  // fetchPlaces returns toPlaceView objects whose fields already match PlaceCard
  // (players, rating, creator, coords, title, image, featured) — pass them
  // straight through. My earlier adapter re-mapped from RAW field names
  // (user_count/like_rate) that don't exist on the view, zeroing every card.
  // Only normalize `live`: toPlaceView gives a boolean, but PlaceCard shows the
  // LIVE badge whenever `live != null`, so `false` would wrongly badge non-live
  // places — coerce to the player count (truthy) or undefined.
  const places = useMemo(
    () =>
      (Array.isArray(q.data) ? q.data : []).map((p) => ({
        ...p,
        live: p.players > 0 ? p.players : undefined,
        to: "Explorer/Pages/PlaceDetail",
      })),
    [q.data],
  );

  // Always pass the live array (even empty) so we never render the page's fake
  // fixture CARDS — the list matches the Map's live data.
  return <Places places={places} />;
}
