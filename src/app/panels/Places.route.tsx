import type { QueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";
import { useNavigate } from "react-router";

import Places from "../../explorer/pages/Places";
import PlaceDetail from "../../explorer/pages/PlaceDetail";
import JumpLoading from "../../explorer/components/JumpLoading";
import { usePlaces } from "../../data/hooks/usePlaces";
import { toPlaceDetail } from "../../data/catalyst/places";
import { fetchPlaces } from "../../data/catalyst/placesSchema";
import type { PlaceView } from "../../data/catalyst/places";
import { sendBridge, getDeployIdentity } from "../../overlay/bridge";
import { qk, STALE } from "../../data/queryKeys";

const LIST_PARAMS = { limit: 60 };
const PARCEL_SIZE = 16;
const RECENT_KEY = "dcl.recentPlaces";

const CONTENTS_STYLE: CSSProperties = { display: "contents" };

function getRecent(): PlaceView[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const r = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(r) ? (r as PlaceView[]) : [];
  } catch {
    return [];
  }
}

function pushRecent(p: PlaceView): void {
  if (typeof localStorage === "undefined") return;
  try {
    const cur = getRecent().filter((x) => x.id !== p.id);
    cur.unshift(p);
    localStorage.setItem(RECENT_KEY, JSON.stringify(cur.slice(0, 24)));
  } catch {
  }
}

export function prefetch(queryClient: QueryClient) {
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
  const [jumping, setJumping] = useState<string | null>(null);
  const [section, setSection] = useState("explore");
  const addr = getDeployIdentity()?.signerAddress ?? null;
  const params = useMemo(() => {
    if (section === "favorites") return { limit: 60, only_favorites: true };
    if (section === "myplaces")
      return { limit: 60, owner: addr ?? "0x0000000000000000000000000000000000000000" };
    return { limit: 60 };
  }, [section, addr]);
  const q = usePlaces(params);
  const [selected, setSelected] = useState<(PlaceView & { name?: string }) | null>(null);
  const places: PlaceView[] = useMemo(
    () => (section === "recent" ? getRecent() : Array.isArray(q.data) ? q.data : []),
    [section, q.data],
  );
  const cards = useMemo(
    () =>
      places.map((p) => ({
        ...p,
        live: p.players > 0 ? p.players : undefined,
        to: "Explorer/Pages/PlaceDetail",
      })),
    [places],
  );

  const onGridClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target;
      const card = target instanceof Element ? target.closest(".pl__card") : null;
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
    pushRecent(place);
    let jumped = false;
    if (place.world) {
      if (place.worldName) {
        sendBridge("ChangeRealm", { realm: place.worldName });
        jumped = true;
      }
    } else {
      const px = Number(place.x);
      const py = Number(place.y);
      if (Number.isFinite(px) && Number.isFinite(py)) {
        sendBridge("Teleport", {
          x: px * PARCEL_SIZE + PARCEL_SIZE / 2,
          z: py * PARCEL_SIZE + PARCEL_SIZE / 2,
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
      style={CONTENTS_STYLE}
      onClick={onGridClick}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const target = e.target;
        const card = target instanceof Element ? target.closest(".pl__card") : null;
        const grid = card?.parentElement;
        if (!card || !grid) return;
        e.preventDefault();
        const idx = Array.prototype.indexOf.call(grid.querySelectorAll(".pl__card"), card);
        const place = idx >= 0 ? places[idx] : null;
        if (place) setSelected(place);
      }}
    >
      <Places
        places={cards}
        loading={section === "recent" ? false : q.isLoading}
        error={section === "recent" ? false : q.isError}
        section={section}
        onSectionChange={setSection}
      />
      {selected ? (
        <PlaceDetail
          place={toPlaceDetail(selected) ?? undefined}
          onClose={() => setSelected(null)}
          onJumpIn={onJumpIn}
        />
      ) : null}
      {jumping && <JumpLoading name={jumping} />}
    </div>
  );
}
