import { useState } from "react";
import { asset } from "../../asset.js";
import "./bdsceneeditor.css";

const Glyph = ({ d, size = 18, vb = 24, fill = false }) => (
  <svg viewBox={`0 0 ${vb} ${vb}`} width={size} height={size} aria-hidden="true">
    <path
      d={d}
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ICON = {
  chevronLeft: "M15 6l-6 6 6 6",
  edit: "M4 20h4L18 10l-4-4L4 16v4zM14 6l4 4",
  move: "M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3",
  rotate: "M20 12a8 8 0 1 1-2.3-5.6M20 4v3.4h-3.4",
  scale: "M5 5h6M5 5v6M5 5l7 7M19 19h-6M19 19v-6M19 19l-7-7",
  undo: "M9 7L4 12l5 5M4 12h11a5 5 0 0 1 0 10h-3",
  duplicate: "M9 9h10v10H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  preview: "M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  export: "M12 3v12M8 11l4 4 4-4M5 21h14",
  sidebar: "M4 4h16v16H4zM14 4v16",
  resetCamera: "M12 5a7 7 0 1 0 7 7M12 5V2M12 5l3 2M9 11l3 3 4-5",
  zoomIn: "M7 7h-0M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM10 10l4 4M21 15v6M18 18h6",
  zoomOut: "M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM10 10l4 4M18 18h6",
  shortcuts: "M4 7h16v10H4zM7 10h0M11 10h0M15 10h0M7 14h10",
  add: "M12 5v14M5 12h14",
  alert: "M12 3l9 16H3zM12 9v5M12 17h0",
  smart: "M13 2L4 14h6l-1 8 9-12h-6z",
};

const ASSET_PACKS = [
  { id: "ap-base", title: "Base Set", count: 184, hue: 210 },
  { id: "ap-nature", title: "Nature", count: 96, hue: 122, isNew: true },
  { id: "ap-city", title: "City", count: 142, hue: 28 },
  { id: "ap-fantasy", title: "Fantasy", count: 73, hue: 282 },
  { id: "ap-vehicles", title: "Vehicles", count: 41, hue: 350 },
  { id: "ap-interiors", title: "Interiors", count: 118, hue: 48 },
];

const PACK_CATEGORIES = [
  {
    name: "structures",
    assets: [
      { id: "a1", name: "Wood Floor", hue: 30 },
      { id: "a2", name: "Stone Wall", hue: 220 },
      { id: "a3", name: "Glass Door", hue: 190, script: true },
      { id: "a4", name: "Wood Stairs", hue: 32 },
      { id: "a5", name: "Pillar", hue: 210 },
      { id: "a6", name: "Roof Tile", hue: 12 },
    ],
  },
  {
    name: "decoration",
    assets: [
      { id: "a7", name: "Potted Plant", hue: 124 },
      { id: "a8", name: "Lamp Post", hue: 48, script: true },
      { id: "a9", name: "Bench", hue: 28 },
      { id: "a10", name: "Fountain", hue: 200 },
      { id: "a11", name: "Statue", hue: 250 },
      { id: "a12", name: "Fence", hue: 36 },
    ],
  },
];

const METRICS = {
  triangles: { value: 8420, limit: 10000 },
  materials: { value: 38, limit: 75 },
  meshes: { value: 52, limit: 200 },
  bodies: { value: 61, limit: 300 },
  entities: { value: 47, limit: 200 },
  textures: { value: 12, limit: 10 },
};
const METRIC_ORDER = ["triangles", "materials", "meshes", "bodies", "entities", "textures"];
const SCENE_ROWS = 2;
const SCENE_COLS = 2;

function Chip({ icon, label, isActive, isDisabled, onClick }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={isActive || undefined}
      disabled={isDisabled}
      className={
        "bdsceneeditor__chip" +
        (isActive ? " is-active" : "") +
        (isDisabled ? " is-disabled" : "")
      }
      onClick={onClick}
    >
      <Glyph d={ICON[icon]} size={18} />
    </button>
  );
}

function SquaresGrid({ exceeded, onClick }) {
  return (
    <span
      className={"bdsceneeditor__squares" + (exceeded ? " is-exceeded" : "")}
      onClick={onClick}
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="bdsceneeditor__square" />
      ))}
    </span>
  );
}

function SidebarCard({ pack, onClick }) {
  return (
    <div className="bdsceneeditor__pack" onClick={onClick}>
      {pack.isNew ? <div className="bdsceneeditor__newBadge">New</div> : null}
      <span
        className="bdsceneeditor__packThumb u-avatar"
        style={{ "--sz": "48px", "--hue": pack.hue }}
      />
      <h3 className="bdsceneeditor__packTitle">{pack.title}</h3>
      <Glyph d="M9 6l6 6-6 6" size={16} />
    </div>
  );
}

function AssetCard({ a }) {
  return (
    <div
      className={"bdsceneeditor__asset" + (a.script ? " is-smart" : "")}
      title={a.name}
      draggable
    >
      <span
        className="bdsceneeditor__assetThumb u-avatar"
        style={{ "--sz": "62px", "--hue": a.hue }}
      />
      {a.script ? (
        <span className="bdsceneeditor__assetBadge">
          <Glyph d={ICON.smart} size={14} fill />
        </span>
      ) : null}
    </div>
  );
}

export default function BdSceneEditor({
  projectTitle = "My Awesome Scene",
  isPreviewing: previewProp = false,
  isSidebarOpen: sidebarProp = true,
  selectedPack: selectedPackProp = null,
}) {
  const [isPreviewing, setIsPreviewing] = useState(previewProp);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarProp);
  const [gizmo, setGizmo] = useState("move");
  const [search, setSearch] = useState("");
  const [selectedPack, setSelectedPack] = useState(selectedPackProp);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  const metricsExceeded = METRIC_ORDER.filter(
    (k) => METRICS[k].value > METRICS[k].limit,
  );
  const firstExceeded = metricsExceeded[0];

  const toggleGizmo = (g) => setGizmo((cur) => (cur === g ? null : g));
  const packObj = ASSET_PACKS.find((p) => p.id === selectedPack);

  return (
    <div
      className={"bdsceneeditor" + (isPreviewing ? " is-previewing" : "")}
      role="application"
      aria-label="Builder Scene Editor"
    >
      {isPreviewing ? null : (
        <header className="bdsceneeditor__topbar">
          <div className="bdsceneeditor__tbLeft">
            <button type="button" className="bdsceneeditor__goBack" aria-label="Back">
              <Glyph d={ICON.chevronLeft} size={20} />
            </button>
            <span className="bdsceneeditor__projectTitle u-truncate" title={projectTitle}>
              {projectTitle}
            </span>
            <button
              type="button"
              className="bdsceneeditor__editProject"
              aria-label="Edit project"
            >
              <Glyph d={ICON.edit} size={15} />
            </button>
          </div>

          <div className="bdsceneeditor__tbMiddle">
            <span className="bdsceneeditor__modes">
              <Chip icon="move" label="Toggle arrows" isActive={gizmo === "move"} onClick={() => toggleGizmo("move")} />
              <Chip icon="rotate" label="Toggle orbits" isActive={gizmo === "rotate"} onClick={() => toggleGizmo("rotate")} />
              <Chip icon="scale" label="Toggle scaling" isActive={gizmo === "scale"} onClick={() => toggleGizmo("scale")} />
            </span>
            <Chip icon="undo" label="Reset item" isDisabled />
            <Chip icon="duplicate" label="Duplicate item" isDisabled />
            <Chip icon="trash" label="Delete item" isDisabled />
          </div>

          <div className="bdsceneeditor__tbRight">
            <span className="bdsceneeditor__deployStatus">
              <span className="bdsceneeditor__deployDot" />
              Unpublished
            </span>
            <Chip
              icon="preview"
              label="Preview"
              isActive={isPreviewing}
              onClick={() => setIsPreviewing(true)}
            />
            <Chip icon="export" label="Download Scene" />
            <Chip
              icon="sidebar"
              label="Toggle sidebar"
              isActive={isSidebarOpen}
              onClick={() => setIsSidebarOpen((s) => !s)}
            />
            <span className="bdsceneeditor__publishWrap">
              <button type="button" className="bdsceneeditor__share">Share</button>
              <button type="button" className="bdsceneeditor__publish">Publish</button>
            </span>
          </div>
        </header>
      )}

      <div className="bdsceneeditor__wrapper">
        <div className="bdsceneeditor__viewport">
          <div className="bdsceneeditor__grid" aria-hidden="true" />
          <img
            className="bdsceneeditor__logoMark"
            src={asset("assets/dcl-logo.png")}
            alt=""
            aria-hidden="true"
          />

          {isPreviewing ? (
            <button
              type="button"
              className="bdsceneeditor__exitPreview"
              onClick={() => setIsPreviewing(false)}
            >
              <Glyph d={ICON.preview} size={16} /> Exit preview
            </button>
          ) : null}

          {isPreviewing ? null : (
            <div className="bdsceneeditor__toolbar">
              <div
                className={
                  "bdsceneeditor__metrics" +
                  (metricsExceeded.length ? " metric-exceeded" : "")
                }
              >
                <SquaresGrid
                  exceeded={metricsExceeded.length > 0}
                  onClick={() => setBubbleOpen((b) => !b)}
                />
                {bubbleOpen ? (
                  <div className="bdsceneeditor__bubble">
                    <div className="bdsceneeditor__bubbleTitle">
                      <span>
                        {SCENE_ROWS}x{SCENE_COLS} LAND
                      </span>
                      &nbsp;
                      <span className="bdsceneeditor__dimensions">
                        {SCENE_ROWS * 16}x{SCENE_COLS * 16}m
                      </span>
                    </div>
                    <div className="bdsceneeditor__divider" />
                    {METRIC_ORDER.map((key) => {
                      const m = METRICS[key];
                      const over = m.value > m.limit;
                      return (
                        <div
                          key={key}
                          className={"bdsceneeditor__metric" + (over ? " exceeded" : "")}
                        >
                          <div className="bdsceneeditor__metricLabel">{key}:</div>
                          <div className="bdsceneeditor__metricValue">
                            {m.value.toLocaleString()}
                            <span className="bdsceneeditor__metricLimit">
                              &nbsp;/&nbsp;{m.limit.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {metricsExceeded.length ? (
                  <span
                    className="bdsceneeditor__tooHigh"
                    onClick={() => setBubbleOpen((b) => !b)}
                  >
                    <Glyph d={ICON.alert} size={14} />
                    Too many {firstExceeded}
                  </span>
                ) : null}
              </div>

              <div className="bdsceneeditor__tools">
                <button type="button" className="bdsceneeditor__tool" aria-label="Reset camera">
                  <Glyph d={ICON.resetCamera} size={20} />
                </button>
                <button type="button" className="bdsceneeditor__tool" aria-label="Zoom in">
                  <Glyph d={ICON.zoomIn} size={20} />
                </button>
                <button type="button" className="bdsceneeditor__tool" aria-label="Zoom out">
                  <Glyph d={ICON.zoomOut} size={20} />
                </button>
                <button
                  type="button"
                  className="bdsceneeditor__tool bdsceneeditor__tool--shortcuts"
                  aria-label="Shortcut reference"
                >
                  <Glyph d={ICON.shortcuts} size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {isPreviewing || !isSidebarOpen ? null : (
          <aside className="bdsceneeditor__sidebar">
            <div className="bdsceneeditor__drawer">
              <div className="bdsceneeditor__sbHeader">
                {packObj ? (
                  <span
                    className="bdsceneeditor__scope"
                    onClick={() => setSelectedPack(null)}
                  >
                    <Glyph d={ICON.chevronLeft} size={18} />
                    <span className="bdsceneeditor__scopeTitle">{packObj.title}</span>
                    <span className="bdsceneeditor__scopeSpacer" />
                  </span>
                ) : search ? (
                  <span className="bdsceneeditor__scope" onClick={() => setSearch("")}>
                    <Glyph d={ICON.chevronLeft} size={18} />
                    <span className="bdsceneeditor__scopeTitle">Results</span>
                    <span className="bdsceneeditor__scopeSpacer" />
                  </span>
                ) : (
                  <>
                    <span className="bdsceneeditor__sbTitle">Asset Packs</span>
                    <button
                      type="button"
                      className="bdsceneeditor__sbAdd"
                      aria-label="Create asset pack"
                    >
                      <Glyph d={ICON.add} size={18} />
                    </button>
                  </>
                )}
              </div>

              <div className="bdsceneeditor__search">
                <Glyph
                  d="M11 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM10 10l5 5"
                  size={16}
                />
                <input
                  type="text"
                  className="bdsceneeditor__searchInput"
                  placeholder="Search items"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="bdsceneeditor__overflow">
                {!packObj && !search ? (
                  <div className="bdsceneeditor__packList">
                    {ASSET_PACKS.map((p) => (
                      <SidebarCard
                        key={p.id}
                        pack={p}
                        onClick={() => setSelectedPack(p.id)}
                      />
                    ))}
                    <div className="bdsceneeditor__createPack">
                      <Glyph d={ICON.add} size={16} /> New Asset Pack
                    </div>
                  </div>
                ) : (
                  PACK_CATEGORIES.map((cat) => (
                    <div className="bdsceneeditor__assetGroup" key={cat.name}>
                      <div className="bdsceneeditor__drawerLabel">{cat.name}</div>
                      <div className="bdsceneeditor__assetGrid">
                        {cat.assets.map((a) => (
                          <AssetCard key={a.id} a={a} />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
