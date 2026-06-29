import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ChPublishWizardDestinationSelect from "./ChPublishWizardDestinationSelect.jsx";
import ChPublishWizardDeployProgressResult from "./ChPublishWizardDeployProgressResult.jsx";
import { ChevronLeft, Close } from "../../atoms/icons.jsx";
import "./chpublishwizardpublishtoland.css";
import "./deploylandview.css";

export default function DeployLandView({
  view = "destination",
  step = "destination",
  scene =(undefined),
  offsets =([]),
  owned =(new Set()),
  occupied =(new Set()),
  choices =([]),
  source =(undefined),
  reviewBase =(null),
  reviewParcels =([]),
  sizeLabel = "",
  files =([]),
  summary =({ count: 0, totalBytes: 0, exceeded: false }),
  result =(undefined),
  validate =(() => null),
  placementMessage =(() => ""),
  coordKey =((c) => `${c.x},${c.y}`),
  formatBytes =((n) => `${n}`),
  onSelectLand =(undefined),
  onPublishWorld =(undefined),
  onAltServers =(undefined),
  onClose =(undefined),
  onPlacingBack =(undefined),
  onPlace =(undefined),
  onReviewBack =(undefined),
  onConfirm =(undefined),
  onRetry =(undefined),
}) {
  return (
    <div className="deploy-land-wizard" data-step={step}>
      {view === "destination" && (
        <ChPublishWizardDestinationSelect
          state="select"
          onPublishLand={onSelectLand}
          onPublishWorld={onPublishWorld}
          onAltServers={onAltServers}
          onBack={onClose}
          onClose={onClose}
        />
      )}

      {view === "placing" && (
        <PlaceOnMap
          scene={scene}
          offsets={offsets}
          owned={owned}
          occupied={occupied}
          choices={choices}
          source={source}
          validate={validate}
          placementMessage={placementMessage}
          coordKey={coordKey}
          onBack={onPlacingBack}
          onPlace={onPlace}
          onClose={onClose}
        />
      )}

      {view === "review" && (
        <ReviewStep
          base={reviewBase}
          parcels={reviewParcels}
          sizeLabel={sizeLabel}
          files={files}
          summary={summary}
          coordKey={coordKey}
          formatBytes={formatBytes}
          onBack={onReviewBack}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      )}

      {view === "deploying" && (
        <ChPublishWizardDeployProgressResult state="deploying" />
      )}
      {view === "finishing" && (
        <ChPublishWizardDeployProgressResult state="finishing" />
      )}
      {view === "complete" && (
        <>
          <ChPublishWizardDeployProgressResult state="complete" />
          {result?.jumpUrl && (
            <p className="deploy-land-wizard__note">
              Simulated deploy — no scene was uploaded (the deployer is
              read-only). Jump-in URL:{" "}
              <code>{result.jumpUrl}</code>
            </p>
          )}
        </>
      )}
      {view === "error" && (
        <>
          <ChPublishWizardDeployProgressResult state="error" />
          <div className="deploy-land-wizard__controls">
            <button
              type="button"
              className="cptl__publish"
              onClick={onRetry}
            >
              Retry
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const ATLAS = { OWNED: "#3D3A46", UNOWNED: "#09080A", ODD: "#110E13", EVEN: "#0D0B0E" };
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

function PlaceOnMap({
  scene,
  offsets,
  owned,
  occupied,
  choices,
  source,
  validate,
  placementMessage,
  coordKey,
  onBack,
  onPlace,
  onClose,
}) {
  const start = useMemo(() => {
    const first = choices[0]?.parcels[0];
    return first ?? { x: 0, y: 0 };
  }, [choices]);

  const [hover, setHover] = useState(start);
  const [placement, setPlacement] = useState(null);

  const projectParcels = useMemo(
    () => offsets.map((o) => ({ x: hover.x + o.x, y: hover.y + o.y })),
    [hover, offsets],
  );
  const isValid = useMemo(() => validate(hover) === null, [validate, hover]);
  const rejection = placement ? null : validate(hover);

  const handleClick = useCallback(
    (base) => {
      if (validate(base) === null) {
        setPlacement(base);
      } else {
        onPlace(base);
      }
    },
    [onPlace, validate],
  );

  const activeBase = placement ?? hover;
  const statusText = placementMessage(placement ?? (isValid ? hover : null), rejection);

  return (
    <div className="cptl__backdrop" style={{ position: "relative" }}>
      <div className="cptl__modal" role="dialog" aria-modal="true" aria-label="Publish to Land">
        <header className="cptl__header">
          <button
            type="button"
            className="cptl__iconbtn cptl__back"
            aria-label="back"
            onClick={onBack}
          >
            <ChevronLeft size={22} className="" />
          </button>
          <h2 className="cptl__titletext">Publish to Land</h2>
          <button
            type="button"
            className="cptl__iconbtn cptl__close"
            aria-label="close"
            onClick={onClose}
          >
            <Close size={20} className="" />
          </button>
        </header>

        <div className="cptl__body">
          <div className="cptl__mapbox">
            <AtlasMap
              owned={owned}
              occupied={occupied}
              projectParcels={projectParcels}
              placement={placement}
              offsets={offsets}
              center={start}
              valid={isValid}
              onHover={setHover}
              onClick={handleClick}
            />
          </div>

          <div className="cptl__footer">
            <div className="cptl__status">
              <span className="cptl__statustext">{statusText}</span>
              {placement && (
                <button
                  type="button"
                  className="cptl__reset"
                  onClick={() => setPlacement(null)}
                >
                  Reset
                </button>
              )}
            </div>
            <button
              type="button"
              className="cptl__publish"
              disabled={!placement}
              onClick={() => placement && onPlace(placement)}
            >
              Publish
            </button>
          </div>
        </div>
        {source === "fixture" && (
          <p className="deploy-land-wizard__note">
            Owned LAND loaded from the bundled fixture (live catalyst returned no
            coordinate-bearing parcels for this wallet).
          </p>
        )}
      </div>
      <span className="deploy-land-wizard__coord" aria-hidden="true">
        {coordKey(activeBase)}
      </span>
    </div>
  );
}

function renderTile(ctx, cx, cy, size, padding, color, scale) {
  ctx.fillStyle = color;
  const tileSize = scale ? size * scale : size;
  ctx.fillRect(cx - tileSize + padding, cy - tileSize + padding, tileSize - padding, tileSize - padding);
}

function AtlasMap({
  owned,
  occupied,
  projectParcels,
  placement,
  offsets,
  center,
  valid,
  onHover,
  onClick,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [dims, setDims] = useState({ width: 980, height: MAP_HEIGHT });
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
    return new Set(offsets.map((o) => `${placement.x + o.x},${placement.y + o.y}`));
  }, [placement, offsets]);
  const highlighted = useMemo(() => {
    if (placement) return new Set();
    return new Set(projectParcels.map((c) => `${c.x},${c.y}`));
  }, [projectParcels, placement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = dims;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const padding = size < 7 ? 0.5 : size < 12 ? 1 : size < 18 ? 1.5 : 2;

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
          renderTile(ctx, halfWidth - offsetX + halfSize, halfHeight - offsetY + halfSize, size, padding, t.color, t.scale);
        }
      }
    };

    drawLayer((x, y) => {
      const key = `${x},${y}`;
      if (owned.has(key)) {
        return { color: occupied.has(key) ? COLORS.occupiedParcel : ATLAS.OWNED };
      }
      return { color: (x + y) % 2 === 0 ? ATLAS.ODD : ATLAS.EVEN };
    });
    drawLayer((x, y) => {
      const key = `${x},${y}`;
      return owned.has(key) && !occupied.has(key) ? { color: COLORS.freeParcel } : null;
    });
    drawLayer((x, y) => {
      const key = `${x},${y}`;
      const isPlaced = placed.has(key);
      if (highlighted.has(key) || isPlaced) {
        return {
          color: valid || isPlaced ? COLORS.selectedStroke : COLORS.indicatorStroke,
          scale: 1.35,
        };
      }
      return null;
    });
    drawLayer((x, y) => {
      const key = `${x},${y}`;
      const isPlaced = placed.has(key);
      if (highlighted.has(key) || isPlaced) {
        return { color: valid || isPlaced ? COLORS.selected : COLORS.indicator, scale: 1.15 };
      }
      return null;
    });
  }, [owned, occupied, dims, size, center, placed, highlighted, valid]);

  const toCoord = useCallback(
    (clientX, clientY) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      return {
        x: Math.round(center.x + (px - dims.width / 2) / size),
        y: Math.round(center.y - (py - dims.height / 2) / size),
      };
    },
    [center, dims, size],
  );

  return (
    <div className="cptl__map" ref={wrapRef}>
      <canvas
        className="cptl__canvas"
        ref={canvasRef}
        onMouseMove={(e) => onHover(toCoord(e.clientX, e.clientY))}
        onClick={(e) => onClick(toCoord(e.clientX, e.clientY))}
      />
      <div className="cptl__zoom">
        <button
          type="button"
          className="cptl__zoombtn"
          aria-label="Zoom in"
          onClick={() => setZoom((z) => Math.min(40 / TILE_SIZE, z + 0.25))}
        >
          <PlusIcon />
        </button>
        <button
          type="button"
          className="cptl__zoombtn"
          aria-label="Zoom out"
          onClick={() => setZoom((z) => Math.max(7 / TILE_SIZE, z - 0.25))}
        >
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ base, parcels, sizeLabel, files, summary, coordKey, formatBytes, onBack, onConfirm, onClose }) {
  return (
    <div className="cptl__backdrop">
      <div className="cptl__modal" role="dialog" aria-modal="true" aria-label="Review deployment">
        <header className="cptl__header">
          <button
            type="button"
            className="cptl__iconbtn cptl__back"
            aria-label="back"
            onClick={onBack}
          >
            <ChevronLeft size={22} className="" />
          </button>
          <h2 className="cptl__titletext">Review &amp; publish to Land</h2>
          <button
            type="button"
            className="cptl__iconbtn cptl__close"
            aria-label="close"
            onClick={onClose}
          >
            <Close size={20} className="" />
          </button>
        </header>

        <div className="cptl__body" style={{ padding: "0 24px 8px" }}>
          <div className="deploy-land-review">
            <div className="deploy-land-review__row">
              <span className="deploy-land-review__label">Base parcel</span>
              <span className="deploy-land-review__value">{base ? coordKey(base) : "—"}</span>
            </div>
            <div className="deploy-land-review__row">
              <span className="deploy-land-review__label">Scene size</span>
              <span className="deploy-land-review__value">{sizeLabel}</span>
            </div>
            <div className="deploy-land-review__row">
              <span className="deploy-land-review__label">Parcels ({parcels.length})</span>
              <span className="deploy-land-review__value">{parcels.join("  ·  ")}</span>
            </div>
            <div className="deploy-land-review__row">
              <span className="deploy-land-review__label">
                Files ({summary.count})
              </span>
              <span className="deploy-land-review__value">
                {formatBytes(summary.totalBytes)} / 50MB
              </span>
            </div>

            <ul className="deploy-land-review__files">
              {files.map((f) => (
                <li key={f.name} className="deploy-land-review__file">
                  <span className="deploy-land-review__filename">{f.name}</span>
                  <span className="deploy-land-review__filesize">{formatBytes(f.size)}</span>
                </li>
              ))}
            </ul>
            {summary.exceeded && (
              <p className="deploy-land-review__error">
                The scene bundle exceeds the 50MB deploy limit. Optimize or remove
                large files and try again.
              </p>
            )}
          </div>
        </div>

        <div className="cptl__footer">
          <div className="cptl__status">
            <span className="cptl__statustext">
              Deploy is SIMULATED — no scene is uploaded (the deployer is read-only).
            </span>
          </div>
          <button
            type="button"
            className="cptl__publish"
            disabled={summary.exceeded}
            onClick={onConfirm}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
