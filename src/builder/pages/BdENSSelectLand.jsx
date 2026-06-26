import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdensselectland.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const OWNER = {
  fill: "#ff2d55",
  empty: "#ab2039",
  border: "#ff0044",
};
const HOVER = "#fcc6d1";

const COPY = {
  title: (name) => `Use ${name} as a link`,
  subtitle: "Select a land where the link should point to:",
  land_selected: "Selection:",
  already_assigned: "Already assigned",
  cancel: "Cancel",
  continue: "Continue",
  locate_land: "Locate next LAND",
  zoom_in: "Zoom in",
  zoom_out: "Zoom out",
};

const ENS = {
  subdomain: "myplot.dcl.eth",
  landId: "-45,12",
};

const LAND_TILES = [
  { id: "-45,12", name: "My Genesis Plot", x: -45, y: 12 },
  { id: "-44,12", name: "Genesis Annex", x: -44, y: 12 },
  { id: "-45,11", name: "South Plot", x: -45, y: 11 },
  { id: "12,-30", name: "Aurora Estate", x: 12, y: -30 },
  { id: "13,-30", name: "Aurora Estate", x: 13, y: -30 },
];

const LocateGlyph = () => (
  <svg viewBox="0 0 18 18" width="15" height="15" aria-hidden="true">
    <circle cx="9" cy="9" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 1v3M9 14v3M1 9h3M14 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const ZoomOutGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const ZoomInGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

function MiniAtlas({ tiles, selectedId, onSelect }) {
  const [hoveredId, setHoveredId] = useState(undefined);
  const cell = 34;
  const ownedById = useMemo(() => {
    const m = {};
    for (const tl of tiles) m[tl.id] = tl;
    return m;
  }, [tiles]);

  const xs = tiles.map((p) => p.x);
  const ys = tiles.map((p) => p.y);
  const minX = Math.min(...xs) - 5;
  const maxX = Math.max(...xs) + 5;
  const minY = Math.min(...ys) - 4;
  const maxY = Math.max(...ys) + 4;
  const cols = maxX - minX + 1;
  const rows = maxY - minY + 1;

  const rects = [];
  for (let gy = maxY; gy >= minY; gy--) {
    for (let gx = minX; gx <= maxX; gx++) {
      const id = `${gx},${gy}`;
      const owned = !!ownedById[id];
      const selected = owned && id === selectedId;
      const hovered = owned && id === hoveredId && id !== selectedId;
      let fill = "#18141a";
      let stroke = "#241f2b";
      let strokeW = 1;
      if (owned) {
        fill = OWNER.fill;
        stroke = OWNER.empty;
        strokeW = 1.5;
      }
      if (hovered) {
        fill = HOVER;
        stroke = HOVER;
      }
      if (selected) {
        stroke = OWNER.border;
        strokeW = 2.6;
      }
      rects.push(
        <rect
          key={id}
          x={(gx - minX) * cell + 1}
          y={(maxY - gy) * cell + 1}
          width={cell - 2}
          height={cell - 2}
          rx={3}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeW}
          style={{ cursor: owned ? "pointer" : "default" }}
          onClick={owned ? () => onSelect(id) : undefined}
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId((v) => (v === id ? undefined : v))}
        />
      );
    }
  }

  return (
    <div className="bdensselectland__atlaswrapper">
      <svg
        className="bdensselectland__atlas"
        viewBox={`0 0 ${cols * cell} ${rows * cell}`}
        preserveAspectRatio="xMidYMid slice"
        aria-label="LAND map"
      >
        <rect x="0" y="0" width={cols * cell} height={rows * cell} fill="#13101a" />
        {rects}
      </svg>

      <div className="bdensselectland__controls">
        <button type="button" className="bdensselectland__control" title={COPY.locate_land} aria-label={COPY.locate_land}>
          <LocateGlyph />
        </button>
        <div className="bdensselectland__controlgroup">
          <button type="button" className="bdensselectland__control" title={COPY.zoom_out} aria-label={COPY.zoom_out}>
            <ZoomOutGlyph />
          </button>
          <button type="button" className="bdensselectland__control" title={COPY.zoom_in} aria-label={COPY.zoom_in}>
            <ZoomInGlyph />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BdENSSelectLand({
  ens = ENS,
  landTiles = LAND_TILES,
  isLoading = false,
  notFound = false,
}) {
  const [tab, setTab] = useState("names");

  const firstAvailable = useMemo(() => {
    if (!landTiles || landTiles.length === 0) return undefined;
    if (landTiles.length === 1) return landTiles[0];
    return landTiles.find((tl) => tl.id !== (ens && ens.landId)) || undefined;
  }, [landTiles, ens]);

  const [selectedId, setSelectedId] = useState(firstAvailable ? firstAvailable.id : undefined);
  const selectedLand = useMemo(
    () => landTiles.find((tl) => tl.id === selectedId),
    [landTiles, selectedId]
  );

  if (isLoading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdensselectland bdensselectland--loading">
          <Spinner size={56} />
        </div>
      </BuilderChrome>
    );
  }

  if (notFound || !ens) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdensselectland bdensselectland--notfound">
          <div className="bdensselectland__notfound">
            <div className="bdensselectland__notfoundcode">404</div>
            <div className="bdensselectland__notfoundtext">Page not found</div>
          </div>
        </div>
      </BuilderChrome>
    );
  }

  const isSameLand = !!selectedLand && selectedLand.id === ens.landId;
  const continueDisabled = !selectedLand || isSameLand;

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdensselectland">
        <div className="bdensselectland__container">
          <button type="button" className="bdensselectland__back" aria-label="Back">
            <ChevronLeft size={18} />
          </button>

          <div className="bdensselectland__section">
            <h1 className="bdensselectland__title">{COPY.title(ens.subdomain)}</h1>
            <span className="bdensselectland__subtitle">{COPY.subtitle}</span>
          </div>

          <MiniAtlas tiles={landTiles} selectedId={selectedId} onSelect={setSelectedId} />

          <div className="bdensselectland__footer">
            <div className="bdensselectland__footerleft">
              {selectedLand ? (
                <div className="bdensselectland__selected">
                  <div className="bdensselectland__label">{COPY.land_selected}</div>
                  <div className="bdensselectland__land">
                    {selectedLand.name} ({selectedLand.id})
                  </div>
                </div>
              ) : null}
            </div>
            <div className="bdensselectland__actions">
              <button type="button" className="bdensselectland__btn bdensselectland__btn--secondary">
                {COPY.cancel}
              </button>
              <button
                type="button"
                className="bdensselectland__btn bdensselectland__btn--primary"
                disabled={continueDisabled}
              >
                {isSameLand ? COPY.already_assigned : COPY.continue}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { ENS, LAND_TILES };
