// Map panel — route id "map" (#/map), matches EXPLORE_TABS "map".
//
// Reuses the ui3 explorer Map look-and-feel: it imports map.css and reproduces
// the chrome-free `map__shell` (pins on a CSS grid, the category bar, the info
// card) driven by LIVE catalyst data, and reuses the PlaceDetail page verbatim
// for the expanded view. It deliberately does NOT render ExploreChrome itself —
// AppLayout already wraps every panel in the router-wired chrome, and ExploreChrome
// is `position:fixed;inset:0`, so a nested one would cover the nav and break
// instant-nav. The reused Map.jsx page bundles its own ExploreChrome + hardcoded
// pins and takes no props, so it can't be dropped in as-is; this wrapper is the
// chrome-free, data-driven binding of the same design.
//
// Engine coupling is outbound-only: jump-in -> window.engine.teleport(x, y)
// (parcel coords), world realms -> window.engine.changerealm(url). Identity/scene
// are read-only from the bridge (player marker position).

import { useCallback, useEffect, useMemo, useState } from "react";

import SearchField from "../../atoms/SearchField.jsx";
import PlaceDetail from "../../explorer/pages/PlaceDetail.jsx";
import { useBridgeState } from "../../overlay/bridge.js";
import { usePlaces, usePlace, useCategories } from "../../data/hooks/usePlaces.js";
import {
  fetchPlaces,
  fetchCategories,
  toPlaceDetail,
  jumpUrlFor,
  coordsToPercent,
  PLACES_LIMIT,
} from "../../data/catalyst/places.js";
import { qk, STALE } from "../../data/queryKeys.js";
import "../../explorer/pages/map.css";

const LIST_PARAMS = { limit: PLACES_LIMIT };

// Warm the cache on hover/focus intent over the Map tab (best-effort).
export function prefetch(queryClient) {
  try {
    queryClient.prefetchQuery({
      queryKey: qk.places(LIST_PARAMS),
      queryFn: ({ signal }) => fetchPlaces(LIST_PARAMS, { signal }),
      staleTime: STALE.places,
    });
    queryClient.prefetchQuery({
      queryKey: qk.categories(),
      queryFn: ({ signal }) => fetchCategories({ signal }),
      staleTime: STALE.categories,
    });
  } catch {
    /* prefetch is best-effort, never throw */
  }
}

function PinIcon({ kind }) {
  if (kind === "friend") return <span className="map__pinfriend" />;
  return (
    <svg viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">
      <path
        d="M12 0C5.4 0 0 5.2 0 11.7 0 20 12 32 12 32s12-12 12-20.3C24 5.2 18.6 0 12 0z"
        className="map__pindrop"
      />
      <circle cx="12" cy="11.5" r="4.6" fill="#fff" />
    </svg>
  );
}

// Outbound engine action: teleport to a place (or switch realm for a world).
function teleportTo(view) {
  if (!view || typeof window === "undefined") return;
  const engine = window.engine;
  if (!engine) return;
  if (view.world && view.worldName && typeof engine.changerealm === "function") {
    engine.changerealm(jumpUrlFor(view));
    return;
  }
  if (typeof engine.teleport === "function") engine.teleport(view.x, view.y);
}

export default function MapPanel() {
  const bridge = useBridgeState();
  const placesQ = usePlaces(LIST_PARAMS);
  const catsQ = useCategories();

  const [cat, setCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const places = placesQ.data ?? [];

  // Live detail fetch when the expanded view opens; fall back to the list row so
  // the overlay renders instantly while the per-id read is in flight.
  const detailQ = usePlace(detailOpen ? selectedId : null);
  const selectedFromList = useMemo(
    () => places.find((p) => p.id === selectedId) ?? null,
    [places, selectedId],
  );
  const detailView = detailQ.data ?? selectedFromList;

  // Category bar: ALL + FAVORITES (ui-only) + live categories from the API.
  const cats = useMemo(() => {
    const live = catsQ.data ?? [];
    return [
      { key: "ALL", label: "ALL", color: "#ffffff" },
      { key: "FAVORITES", label: "FAVORITES", color: "#ff4d6d" },
      ...live.map((c) => ({
        key: c.name.toUpperCase(),
        label: c.label.toUpperCase(),
        color: c.color,
        count: c.count,
      })),
    ];
  }, [catsQ.data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return places.filter((p) => {
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.coords.toLowerCase().includes(q) &&
        !p.creator.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (cat === "ALL") return true;
      if (cat === "FAVORITES") return p.featured;
      return p.categories.some((c) => c.toUpperCase() === cat);
    });
  }, [places, search, cat]);

  const sel =
    filtered.find((p) => p.id === selectedId) ?? selectedFromList ?? null;

  const player = useMemo(
    () => coordsToPercent(bridge.scene?.coords),
    [bridge.scene?.coords],
  );

  const clearSel = useCallback(() => {
    setSelectedId(null);
    setDetailOpen(false);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") clearSel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearSel]);

  // The reused PlaceDetail's JUMP IN / START NAVIGATION buttons are presentational
  // (their data-sb-linkto is unmapped, so AppLayout ignores the click) and its ×
  // close is unwired here — bind both via this bubble handler over the overlay.
  const onDetailClick = useCallback(
    (e) => {
      const t = e.target;
      if (t.closest?.(".pld__jump") || t.closest?.(".pld__nav")) {
        teleportTo(detailView ?? sel);
        setDetailOpen(false);
        return;
      }
      if (t.closest?.(".pld__close")) {
        setDetailOpen(false);
        return;
      }
      if (!t.closest?.(".pld")) setDetailOpen(false); // backdrop click
    },
    [detailView, sel],
  );

  const loading = placesQ.isLoading;
  const error = placesQ.isError;
  const empty = !loading && !error && filtered.length === 0;

  return (
    <div className="map__shell">
      <div className="map__tiles" onClick={clearSel}>
        <div className="map__grid" />
        <div className="map__roads" />
        {/* Removed 4 hardcoded decorative "district" rectangles: fixed positions,
            no underlying map data, and they read as stray colored artifacts
            overlapping the category bar. The real regions are the place pins. */}

        <div
          className="map__player"
          style={{ left: player.left + "%", top: player.top + "%" }}
          aria-label="Your location"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M12 3 20 21l-8-5-8 5 8-18z" fill="#fff" />
          </svg>
        </div>

        {filtered.map((p) => (
          <button
            key={p.id}
            className={
              "map__pin map__pin--" +
              p.kind +
              (p.id === selectedId ? " is-selected" : "")
            }
            style={{ left: p.left + "%", top: p.top + "%" }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(p.id);
              setDetailOpen(false);
            }}
            aria-label={p.title}
            title={`${p.title} (${p.coords})`}
          >
            <PinIcon kind={p.kind} />
          </button>
        ))}
      </div>

      <div className="map__catbar">
        <div className="map__cats" role="tablist" aria-label="Place categories">
          {cats.map((c) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={c.key === cat}
              className={"map__catpill" + (c.key === cat ? " is-on" : "")}
              onClick={() => {
                setCat(c.key);
                setSelectedId(null);
              }}
            >
              {c.key === "ALL" ? (
                <span className="map__catglyph map__catglyph--all" aria-hidden="true">
                  ▦
                </span>
              ) : c.key === "FAVORITES" ? (
                <span
                  className="map__catglyph map__catglyph--heart"
                  aria-hidden="true"
                  style={{ color: c.color }}
                >
                  ♥
                </span>
              ) : (
                <span
                  className="map__catdot"
                  aria-hidden="true"
                  style={{ background: c.color }}
                />
              )}
              {c.label}
            </button>
          ))}
        </div>
        <div className="map__search">
          <SearchField placeholder="Search" value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="map__zoom">
        <div className="map__zgroup">
          <button className="map__zbtn" aria-label="Zoom in">
            +
          </button>
          <button className="map__zbtn" aria-label="Zoom out">
            −
          </button>
        </div>
        <button
          className="map__zbtn map__locate"
          aria-label="Recenter"
          onClick={clearSel}
        >
          ⊕
        </button>
      </div>

      <div className="map__minimap" aria-hidden="true">
        <div className="map__minigrid" />
        <div
          className="map__minihere"
          style={{ left: player.left + "%", top: player.top + "%" }}
        />
      </div>

      <div className="map__credit">
        {loading
          ? "Loading places…"
          : `${filtered.length} place${filtered.length === 1 ? "" : "s"} · live from catalyst.dcl.one`}
      </div>

      {loading && (
        <div className="map__info" role="status">
          <div className="map__infobody">
            <div className="map__infoname">Loading places…</div>
            <div className="map__infocreator">fetching live data from catalyst</div>
          </div>
        </div>
      )}

      {error && (
        <div className="map__info" role="alert">
          <div className="map__infobody">
            <div className="map__infoname">Couldn&apos;t load places</div>
            <div className="map__infocreator">
              {placesQ.error?.message || "Network error"}
            </div>
            <div className="map__infoactions">
              <button className="map__jump" onClick={() => placesQ.refetch()}>
                retry
              </button>
            </div>
          </div>
        </div>
      )}

      {empty && (
        <div className="map__info">
          <div className="map__infobody">
            <div className="map__infoname">No places match</div>
            <div className="map__infocreator">
              try a different category or search term
            </div>
          </div>
        </div>
      )}

      {sel && !detailOpen && (
        <div className="map__info">
          <div
            className="map__infothumb"
            style={{
              "--hue": sel.hue,
              ...(sel.image
                ? {
                    background: `#0e0e12 center/cover no-repeat url("${sel.image}")`,
                  }
                : null),
            }}
          >
            {sel.live && <span className="map__infolive">● {sel.players} LIVE</span>}
            <button
              className="map__infoclose"
              onClick={clearSel}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="map__infobody">
            <div className="map__infoname">{sel.title}</div>
            <div className="map__infocreator">
              created by <b>{sel.creator}</b>
            </div>
            <div className="map__inforow">
              <span className="map__infostat">
                <b>{sel.coords}</b>
                <span>LOCATION</span>
              </span>
              <span className="map__infostat">
                <b>{sel.rating}%</b>
                <span>RATING</span>
              </span>
              <span className="map__infostat">
                <b>{sel.players}</b>
                <span>VISITORS</span>
              </span>
            </div>
            <div className="map__infoactions">
              <button className="map__jump" onClick={() => teleportTo(sel)}>
                jump in
              </button>
              <button className="map__nav" onClick={() => setDetailOpen(true)}>
                details
              </button>
            </div>
          </div>
        </div>
      )}

      {detailOpen && sel && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div className="map__pldwrap" onClick={onDetailClick}>
          <PlaceDetail
            place={toPlaceDetail(detailView ?? sel)}
            notFound={detailQ.isError && !selectedFromList}
          />
        </div>
      )}
    </div>
  );
}
