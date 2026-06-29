import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import JumpLoading from "../../explorer/components/JumpLoading.jsx";

import SearchField from "../../atoms/SearchField.jsx";
import PlaceDetail from "../../explorer/pages/PlaceDetail.jsx";
import { sendBridge, useBridgeState } from "../../overlay/bridge.js";
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

const SAT_BASE = "https://catalyst.dcl.one/satellite";
const SAT_WORLD_MIN = -256;
const SAT_WORLD_SPAN = 512;
const SAT_GRID_MIN = -170;
const SAT_GRID_SPAN = 340;
const SAT_TILE = (z, x, y) => `${SAT_BASE}/${z}/${x}/${y}.png`;

function slippyTilesFor(zoom, view) {
  const z = Math.max(1, Math.min(7, Math.round(2.6 + Math.log2(zoom))));
  const n = 1 << z;
  const span = SAT_WORLD_SPAN / n;

  let west;
  let east;
  let south;
  let north;
  if (view && view.square > 0) {
    const scaled = view.square * zoom;
    const u0 = 0.5 + (-view.w / 2 - view.panX) / scaled;
    const u1 = 0.5 + (view.w / 2 - view.panX) / scaled;
    const v0 = 0.5 + (-view.h / 2 - view.panY) / scaled;
    const v1 = 0.5 + (view.h / 2 - view.panY) / scaled;
    west = SAT_GRID_MIN + u0 * SAT_GRID_SPAN;
    east = SAT_GRID_MIN + u1 * SAT_GRID_SPAN;
    north = SAT_GRID_MIN + SAT_GRID_SPAN - v0 * SAT_GRID_SPAN;
    south = SAT_GRID_MIN + SAT_GRID_SPAN - v1 * SAT_GRID_SPAN;
  } else {
    west = -170 / zoom;
    east = 170 / zoom;
    south = -170 / zoom;
    north = 170 / zoom;
  }

  const xIdx = (w) => Math.floor((w - SAT_WORLD_MIN) / span);
  const yIdx = (w) => Math.floor((SAT_WORLD_MIN + SAT_WORLD_SPAN - w) / span);
  const loX = Math.max(0, xIdx(west) - 1);
  const hiX = Math.min(n - 1, xIdx(east) + 1);
  const loY = Math.max(0, yIdx(north) - 1);
  const hiY = Math.min(n - 1, yIdx(south) + 1);

  const tiles = [];
  for (let x = loX; x <= hiX; x++) {
    const wx0 = SAT_WORLD_MIN + x * span;
    for (let y = loY; y <= hiY; y++) {
      const wyTop = SAT_WORLD_MIN + SAT_WORLD_SPAN - y * span;
      tiles.push({
        key: `${z}/${x}/${y}`,
        src: SAT_TILE(z, x, y),
        left: ((wx0 - SAT_GRID_MIN) / SAT_GRID_SPAN) * 100,
        top: ((SAT_GRID_MIN + SAT_GRID_SPAN - wyTop) / SAT_GRID_SPAN) * 100,
        size: (span / SAT_GRID_SPAN) * 100,
      });
    }
  }
  return tiles;
}

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

const PARCEL_SIZE = 16;

function teleportTo(view) {
  if (!view || typeof window === "undefined") return;
  if (view.world && view.worldName) {
    const engine = window.engine;
    if (engine && typeof engine.changerealm === "function") {
      engine.changerealm(view.worldName);
    }
    return;
  }
  const px = Number(view.x);
  const py = Number(view.y);
  if (!Number.isFinite(px) || !Number.isFinite(py)) return;
  sendBridge("Teleport", {
    x: px * PARCEL_SIZE + PARCEL_SIZE / 2,
    y: 0,
    z: py * PARCEL_SIZE + PARCEL_SIZE / 2,
    duration: 0,
  });
}

export default function MapPanel() {
  const bridge = useBridgeState();
  const placesQ = usePlaces(LIST_PARAMS);
  const catsQ = useCategories();

  const navigate = useNavigate();
  const [cat, setCat] = useState("ALL");
  const [search, setSearch] = useState("");
  const [jumping, setJumping] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(true);
  const [grabbing, setGrabbing] = useState(false);
  const [box, setBox] = useState(null);

  const ZOOM_MIN = 0.6;
  const ZOOM_MAX = 4;
  const ZOOM_STEP = 0.25;
  const clampZoom = (z) =>
    Math.round(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z)) * 100) / 100;

  const shellRef = useRef(null);
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  zoomRef.current = zoom;
  panRef.current = pan;
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const wheelEndRef = useRef(0);

  const metrics = () => {
    const el = shellRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      w: r.width,
      h: r.height,
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
      square: Math.min(r.width, r.height),
    };
  };

  const clampPan = (px, py, z, m) => {
    const mm = m || metrics();
    if (!mm) return { x: px, y: py };
    const max = (mm.square * z) / 2;
    return {
      x: Math.max(-max, Math.min(max, px)),
      y: Math.max(-max, Math.min(max, py)),
    };
  };

  const applyView = (nz, np) => {
    zoomRef.current = nz;
    panRef.current = np;
    setZoom(nz);
    setPan(np);
  };

  const zoomAround = (nz, ax, ay) => {
    const z = zoomRef.current;
    const cz = clampZoom(nz);
    const m = metrics();
    if (!m || cz === z) {
      applyView(cz, clampPan(panRef.current.x, panRef.current.y, cz, m));
      return;
    }
    const f = cz / z;
    const mx = (ax == null ? m.cx : ax) - m.cx;
    const my = (ay == null ? m.cy : ay) - m.cy;
    const nx = panRef.current.x + (mx - panRef.current.x) * (1 - f);
    const ny = panRef.current.y + (my - panRef.current.y) * (1 - f);
    applyView(cz, clampPan(nx, ny, cz, m));
  };

  const wheelHandlerRef = useRef(null);
  wheelHandlerRef.current = (e) => {
    if (e.target.closest?.(".map__info, .map__pldwrap, .map__catbar")) return;
    e.preventDefault();
    setAnimate(false);
    window.clearTimeout(wheelEndRef.current);
    wheelEndRef.current = window.setTimeout(() => setAnimate(true), 180);
    zoomAround(zoomRef.current * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
  };

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return undefined;
    const onWheel = (e) => wheelHandlerRef.current?.(e);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = shellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: r.width, h: r.height, square: Math.min(r.width, r.height) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onTilesPointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    if (e.target.closest?.(".map__pin")) return;
    dragRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      px: panRef.current.x,
      py: panRef.current.y,
      moved: false,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
    }
  };
  const onTilesPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 3) {
      d.moved = true;
      setGrabbing(true);
      setAnimate(false);
    }
    if (d.moved) {
      applyView(zoomRef.current, clampPan(d.px + dx, d.py + dy, zoomRef.current));
    }
  };
  const onTilesPointerUp = (e) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
    }
    if (d.moved) {
      draggedRef.current = true;
      setGrabbing(false);
      setAnimate(true);
    }
  };

  const places = placesQ.data ?? [];

  const detailQ = usePlace(detailOpen ? selectedId : null);
  const selectedFromList = useMemo(
    () => places.find((p) => p.id === selectedId) ?? null,
    [places, selectedId],
  );
  const detailView = detailQ.data ?? selectedFromList;

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

  const onJumpIn = useCallback(
    (view) => {
      if (!view) return;
      teleportTo(view);
      setJumping(view.name || "destination");
      setTimeout(() => {
        setJumping(null);
        navigate("/");
      }, 3500);
    },
    [navigate],
  );

  const onDetailClick = useCallback(
    (e) => {
      const t = e.target;
      if (t.closest?.(".pld__jump") || t.closest?.(".pld__nav")) {
        onJumpIn(detailView ?? sel);
        setDetailOpen(false);
        return;
      }
      if (t.closest?.(".pld__close")) {
        setDetailOpen(false);
        return;
      }
      if (!t.closest?.(".pld")) setDetailOpen(false);
    },
    [detailView, sel, onJumpIn],
  );

  const loading = placesQ.isLoading;
  const error = placesQ.isError;
  const empty = !loading && !error && filtered.length === 0;

  return (
    <div className="map__shell" ref={shellRef}>
      {jumping && <JumpLoading name={jumping} />}
      <div
        className={"map__tiles" + (grabbing ? " is-grabbing" : "")}
        onClick={() => {
          if (draggedRef.current) {
            draggedRef.current = false;
            return;
          }
          clearSel();
        }}
        onPointerDown={onTilesPointerDown}
        onPointerMove={onTilesPointerMove}
        onPointerUp={onTilesPointerUp}
        onPointerCancel={onTilesPointerUp}
        style={{
          transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
          transition: animate ? "transform 0.15s ease" : "none",
        }}
      >
        <div className="map__grid" />
        <div className="map__roads" />
        {slippyTilesFor(zoom, box && { ...box, panX: pan.x, panY: pan.y }).map((t) => (
          <img
            key={t.key}
            className="map__satellite"
            src={t.src}
            alt=""
            draggable={false}
            loading="lazy"
            style={{
              position: "absolute",
              left: t.left + "%",
              top: t.top + "%",
              width: `calc(${t.size}% + 0.5px)`,
              height: `calc(${t.size}% + 0.5px)`,
              imageRendering: "pixelated",
              pointerEvents: "none",
            }}
          />
        ))}

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
          <button
            className="map__zbtn"
            aria-label="Zoom in"
            onClick={() => zoomAround(zoomRef.current + ZOOM_STEP)}
          >
            +
          </button>
          <button
            className="map__zbtn"
            aria-label="Zoom out"
            onClick={() => zoomAround(zoomRef.current - ZOOM_STEP)}
          >
            −
          </button>
        </div>
        <button
          className="map__zbtn map__locate"
          aria-label="Recenter"
          onClick={() => {
            clearSel();
            applyView(1, { x: 0, y: 0 });
          }}
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

      {empty && !sel && (
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
              <button className="map__jump" onClick={() => onJumpIn(sel)}>
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
