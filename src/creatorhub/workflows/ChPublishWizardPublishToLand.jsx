import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, Close } from "../../atoms/icons.jsx";
import "./chpublishwizardpublishtoland.css";

const ATLAS = {
  OWNED: "#3D3A46",
  UNOWNED: "#09080A",
  PLAZA: "#70AC76",
  ROAD: "#716C7A",
  DISTRICT: "#5054D4",
  ODD: "#110E13",
  EVEN: "#0D0B0E",
};
const COLORS = {
  occupiedParcel: "#774642",
  freeParcel: "#ff9990",
  selected: "#ff9990",
  selectedStroke: "#ff0044",
  indicator: "#716b7abb",
  indicatorStroke: "#3a3541",
};

const TILE_SIZE = 14;
const MAP_HEIGHT = 480;

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const MinusIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ME = "0xme";
function buildTiles() {
  const tiles = {};
  const set = (x, y, type, owner) => {
    tiles[`${x},${y}`] = { x, y, type, owner: owner || "0x0" };
  };
  const RANGE = 22;
  for (let x = -RANGE; x <= RANGE; x++) {
    for (let y = -RANGE; y <= RANGE; y++) {
      const isRoad = x % 9 === 0 || y % 9 === 0;
      if (isRoad) {
        set(x, y, "road");
        continue;
      }
      if (x >= -3 && x <= 3 && y >= -3 && y <= 3) {
        set(x, y, "plaza");
        continue;
      }
      if (x >= 10 && x <= 16 && y >= 10 && y <= 16) {
        set(x, y, "district");
        continue;
      }
      const h = ((x * 73856093) ^ (y * 19349663)) >>> 0;
      set(x, y, h % 5 === 0 ? "owned" : "unowned");
    }
  }
  const land = {};
  for (let x = -16; x <= -12; x++) {
    for (let y = -2; y <= 1; y++) {
      const key = `${x},${y}`;
      tiles[key] = { x, y, type: "owned", owner: ME };
      land[key] = { land: { owner: ME } };
    }
  }
  return { tiles, land };
}

function withConnectivity(tiles) {
  const sameGroup = (a, b) => {
    if (!a || !b) return false;
    if (a.owner === ME && b.owner === ME) return true;
    return a.type === b.type && (a.type === "road" || a.type === "plaza" || a.type === "district");
  };
  const out = {};
  for (const key in tiles) {
    const t = tiles[key];
    const top = tiles[`${t.x},${t.y + 1}`];
    const left = tiles[`${t.x - 1},${t.y}`];
    const topLeft = tiles[`${t.x - 1},${t.y + 1}`];
    out[key] = {
      ...t,
      top: sameGroup(t, top),
      left: sameGroup(t, left),
      topLeft: sameGroup(t, topLeft),
    };
  }
  return out;
}

function colorByType(type) {
  switch (type) {
    case "owned": return ATLAS.OWNED;
    case "unowned": return ATLAS.UNOWNED;
    case "plaza": return ATLAS.PLAZA;
    case "road": return ATLAS.ROAD;
    case "district": return ATLAS.DISTRICT;
    default: return ATLAS.UNOWNED;
  }
}

function renderTile(ctx, cx, cy, size, padding, offset, color, tile) {
  const { top, left, topLeft, scale } = tile;
  ctx.fillStyle = color;
  const tileSize = scale ? size * scale : size;
  if (!top && !left) {
    ctx.fillRect(cx - tileSize + padding, cy - tileSize + padding, tileSize - padding, tileSize - padding);
  } else if (top && left && topLeft) {
    ctx.fillRect(cx - tileSize - offset, cy - tileSize - offset, tileSize + offset, tileSize + offset);
  } else {
    if (left) ctx.fillRect(cx - tileSize - offset, cy - tileSize + padding, tileSize + offset, tileSize - padding);
    if (top) ctx.fillRect(cx - tileSize + padding, cy - tileSize - offset, tileSize - padding, tileSize + offset);
  }
}

function AtlasMap({ tiles, land, projectParcels, baseOffset, placement, onHover, onClick }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [dims, setDims] = useState({ width: 980, height: MAP_HEIGHT });
  const [hover, setHover] = useState({ x: -14, y: 0 });
  const [center, setCenter] = useState({ x: -14, y: 0 });
  const [zoom, setZoom] = useState(1);

  const size = TILE_SIZE * zoom;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setDims({ width: Math.round(r.width), height: MAP_HEIGHT });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const placed = useMemo(() => {
    if (!placement) return new Set();
    return new Set(baseOffset.map(({ dx, dy }) => `${placement.x + dx},${placement.y + dy}`));
  }, [placement, baseOffset]);

  const isValid = useMemo(
    () => projectParcels.every(({ x, y }) => !!land[`${x},${y}`]),
    [projectParcels, land],
  );
  const highlighted = useMemo(() => {
    if (placement) return new Set();
    return new Set(projectParcels.map(({ x, y }) => `${x},${y}`));
  }, [projectParcels, placement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = dims;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const padding = size < 7 ? 0.5 : size < 12 ? 1 : size < 18 ? 1.5 : 2;
    const offset = 1;

    const nwX = Math.floor(center.x - halfWidth / size) - 1;
    const seX = Math.ceil(center.x + halfWidth / size) + 1;
    const seY = Math.floor(center.y - halfHeight / size) - 1;
    const nwY = Math.ceil(center.y + halfHeight / size) + 1;

    const drawLayer = (layerFn) => {
      for (let x = nwX; x < seX; x++) {
        for (let y = seY; y < nwY; y++) {
          const t = layerFn(x, y);
          if (!t) continue;
          const offsetX = (center.x - x) * size;
          const offsetY = (y - center.y) * size;
          const halfSize = t.scale ? (size * t.scale) / 2 : size / 2;
          renderTile(ctx, halfWidth - offsetX + halfSize, halfHeight - offsetY + halfSize, size, padding, offset, t.color, t);
        }
      }
    };

    drawLayer((x, y) => {
      const tile = tiles[`${x},${y}`];
      if (tile) return { ...tile, color: colorByType(tile.type) };
      return { color: (x + y) % 2 === 0 ? ATLAS.ODD : ATLAS.EVEN };
    });
    drawLayer((x, y) => {
      const key = `${x},${y}`;
      return land[key] && land[key].land.owner === tiles[key]?.owner ? { color: COLORS.freeParcel } : null;
    });
    drawLayer((x, y) => {
      const key = `${x},${y}`;
      const isPlaced = placed.has(key);
      if (highlighted.has(key) || isPlaced) {
        return { color: isValid || isPlaced ? COLORS.selectedStroke : COLORS.indicatorStroke, scale: 1.35 };
      }
      return null;
    });
    drawLayer((x, y) => {
      const key = `${x},${y}`;
      const isPlaced = placed.has(key);
      if (highlighted.has(key) || isPlaced) {
        return { color: isValid || isPlaced ? COLORS.selected : COLORS.indicator, scale: 1.15 };
      }
      return null;
    });
  }, [tiles, land, dims, size, center, placed, highlighted, isValid]);

  const toCoord = useCallback((clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const x = Math.round(center.x + (px - dims.width / 2) / size);
    const y = Math.round(center.y - (py - dims.height / 2) / size);
    return { x, y };
  }, [center, dims, size]);

  const handleMove = (e) => {
    const c = toCoord(e.clientX, e.clientY);
    if (c.x !== hover.x || c.y !== hover.y) {
      setHover(c);
      onHover(c.x, c.y);
    }
  };
  const handleClick = (e) => {
    const c = toCoord(e.clientX, e.clientY);
    onClick(c.x, c.y);
  };

  return (
    <div className="cptl__map" ref={wrapRef}>
      <canvas
        className="cptl__canvas"
        ref={canvasRef}
        onMouseMove={handleMove}
        onClick={handleClick}
        onMouseLeave={() => onHover(null)}
      />
      <div className="cptl__zoom">
        <button type="button" className="cptl__zoombtn" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(40 / TILE_SIZE, z + 0.25))}>
          <PlusIcon />
        </button>
        <button type="button" className="cptl__zoombtn" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(7 / TILE_SIZE, z - 0.25))}>
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}

const PROJECT = {
  title: "Neon Night Market",
  scene: {
    base: "0,0",
    parcels: ["0,0", "1,0", "0,1", "1,1"],
  },
};

function baseOffsets(project) {
  const [bx, by] = project.scene.base.split(",").map(Number);
  return project.scene.parcels.map((p) => {
    const [x, y] = p.split(",").map(Number);
    return { dx: x - bx, dy: y - by };
  });
}

export default function ChPublishWizardPublishToLand({ initialPlacement = null }) {
  const { tiles, land } = useMemo(buildTiles, []);
  const connectedTiles = useMemo(() => withConnectivity(tiles), [tiles]);
  const baseOffset = useMemo(() => baseOffsets(PROJECT), []);

  const [hover, setHover] = useState({ x: -14, y: 0 });
  const [placement, setPlacement] = useState(initialPlacement);

  const projectParcels = useMemo(
    () => baseOffset.map(({ dx, dy }) => ({ x: hover.x + dx, y: hover.y + dy })),
    [hover, baseOffset],
  );

  const isValid = useMemo(
    () => projectParcels.every(({ x, y }) => !!land[`${x},${y}`]),
    [projectParcels, land],
  );

  const handleHover = useCallback((x, y) => {
    if (x === null) return;
    setHover({ x, y });
  }, []);

  const handlePlacement = useCallback((x, y) => {
    const ok = baseOffset.every(({ dx, dy }) => !!land[`${x + dx},${y + dy}`]);
    if (!ok) return;
    setPlacement({ x, y });
  }, [baseOffset, land]);

  const handleReset = useCallback(() => setPlacement(null), []);

  return (
    <div className="cptl__backdrop">
      <div className="cptl__modal" role="dialog" aria-modal="true" aria-label="Publish to Land">
        <header className="cptl__header">
          <button type="button" className="cptl__iconbtn cptl__back" aria-label="back"><ChevronLeft size={22} /></button>
          <h2 className="cptl__titletext">Publish to Land</h2>
          <button type="button" className="cptl__iconbtn cptl__close" aria-label="close"><Close size={20} /></button>
        </header>

        <div className="cptl__body">
          <div className="cptl__mapbox">
            <AtlasMap
              tiles={connectedTiles}
              land={land}
              projectParcels={projectParcels}
              baseOffset={baseOffset}
              placement={placement}
              onHover={handleHover}
              onClick={handlePlacement}
            />
          </div>

          <div className="cptl__footer">
            <div className="cptl__status">
              <span className="cptl__statustext">
                {placement
                  ? `Placing Scene at ${placement.x},${placement.y}`
                  : "Select the LANDs that will host your Scene"}
              </span>
              {placement && (
                <button type="button" className="cptl__reset" onClick={handleReset}>
                  Reset
                </button>
              )}
            </div>
            <button type="button" className="cptl__publish" disabled={!placement}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
