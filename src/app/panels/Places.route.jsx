import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import Places from "../../explorer/pages/Places.jsx";
import PlaceDetail from "../../explorer/pages/PlaceDetail.jsx";
import JumpLoading from "../../explorer/components/JumpLoading.jsx";
import { usePlaces } from "../../data/hooks/usePlaces.js";
import { fetchPlaces, toPlaceDetail } from "../../data/catalyst/places.js";
import { sendBridge } from "../../overlay/bridge.js";
import { qk, STALE } from "../../data/queryKeys.js";

const LIST_PARAMS = { limit: 60 };
const PARCEL_SIZE = 16;

export function prefetch(queryClient) {
  try {
    queryClient.prefetchQuery({
      queryKey: qk.places(LIST_PARAMS),
      queryFn: ({ signal }) => fetchPlaces(LIST_PARAMS, { signal }),
      staleTime: STALE.places,
    });
  } catch {
  }
}

export default function PlacesPanel() {
  const navigate = useNavigate();
  const [jumping, setJumping] = useState(null);
  const q = usePlaces(LIST_PARAMS);
  const [selected, setSelected] = useState(null);
  const places = useMemo(
    () =>
      (Array.isArray(q.data) ? q.data : []).map((p) => ({
        ...p,
        live: p.players > 0 ? p.players : undefined,
        to: "Explorer/Pages/PlaceDetail",
      })),
    [q.data],
  );

  const onGridClick = useCallback(
    (e) => {
      const card = e.target?.closest?.(".pl__card");
      const grid = card?.parentElement;
      if (!card || !grid) return;
      const idx = Array.prototype.indexOf.call(
        grid.querySelectorAll(".pl__card"),
        card,
      );
      const place = idx >= 0 ? places[idx] : null;
      if (!place) return;
      setSelected(place);
    },
    [places],
  );

  const onJumpIn = useCallback(() => {
    const place = selected;
    setSelected(null);
    if (!place) return;
    let jumped = false;
    if (place.world) {
      if (place.worldName && typeof window !== "undefined") {
        window.engine?.changerealm?.(place.worldName);
        jumped = true;
      }
    } else {
      const px = Number(place.x);
      const py = Number(place.y);
      if (Number.isFinite(px) && Number.isFinite(py)) {
        sendBridge("Teleport", {
          x: px * PARCEL_SIZE + PARCEL_SIZE / 2,
          y: 0,
          z: py * PARCEL_SIZE + PARCEL_SIZE / 2,
          duration: 0,
        });
        jumped = true;
      }
    }
    if (!jumped) return;
    setJumping(place.title || place.name || "destination");
    setTimeout(() => {
      setJumping(null);
      navigate("/");
    }, 3500);
  }, [selected, navigate]);

  return (
    <div
      style={{ display: "contents" }}
      onClick={onGridClick}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const card = e.target?.closest?.(".pl__card");
        const grid = card?.parentElement;
        if (!card || !grid) return;
        e.preventDefault();
        const idx = Array.prototype.indexOf.call(grid.querySelectorAll(".pl__card"), card);
        const place = idx >= 0 ? places[idx] : null;
        if (place) setSelected(place);
      }}
    >
      <Places places={places} loading={q.isLoading} error={q.isError} />
      {selected ? (
        <PlaceDetail
          place={toPlaceDetail(selected)}
          onClose={() => setSelected(null)}
          onJumpIn={onJumpIn}
        />
      ) : null}
      {jumping && <JumpLoading name={jumping} />}
    </div>
  );
}
