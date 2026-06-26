import { useState } from "react";
import Spinner from "../../atoms/Spinner.jsx";
import { asset } from "../../asset.js";
import "./cheditor.css";

const ArrowBackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m9.4 16.6 1.4 1.4 4.6-4.6L10.8 9 9.4 10.4 12.6 13.4zm5.2-9.2L13.2 6 8.6 10.6 13.2 15.2 14.6 13.8 11.4 10.6z" opacity="0" />
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zM14.6 16.6 19.2 12l-4.6-4.6L16 6l6 6-6 6z" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM9.5 16.5v-9l7 4.5z" />
  </svg>
);
const PublicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 17.93A8.01 8.01 0 0 1 4 12c0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41A8 8 0 0 1 17.9 17.39z" />
  </svg>
);
const CaretIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m7 10 5 5 5-5z" />
  </svg>
);
const Chevron = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
    style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .12s" }}>
    <path d="m9 6 6 6-6 6z" />
  </svg>
);
const UndoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62A7.5 7.5 0 0 1 19.6 15l2.4-.8A10 10 0 0 0 12.5 8z" />
  </svg>
);
const RedoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62A7.5 7.5 0 0 1 19.6 15l2.4-.8A10 10 0 0 0 12.5 8z" />
  </svg>
);
const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7zM12 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10H5V5h10z" />
  </svg>
);
const MoveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2 8 6h3v5H6V8l-4 4 4 4v-3h5v5H8l4 4 4-4h-3v-5h5v3l4-4-4-4v3h-5V6h3z" />
  </svg>
);
const RotateIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 6V3L8 7l4 4V8a4 4 0 1 1-4 4H6a6 6 0 1 0 6-6z" />
  </svg>
);
const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 3h8v2H5v6H3zm18 18h-8v-2h6v-6h2zM7 7h10v10H7z" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2zm0-8h-2V7h2z" />
  </svg>
);
const CubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 2.8 20 7v10l-8 4.2L4 17V7z" strokeLinejoin="round" />
    <path d="M4 7l8 4.2L20 7M12 11.2V21" strokeLinejoin="round" />
  </svg>
);

const TREE = [
  { id: "scene", label: "Scene", depth: 0, open: true },
  { id: "player", label: "Player", depth: 1, icon: "player" },
  { id: "camera", label: "Camera", depth: 1, icon: "camera" },
  { id: "ground", label: "Ground", depth: 1, icon: "tile" },
  { id: "house", label: "Wooden House", depth: 1, icon: "entity", selected: true },
  { id: "door", label: "Front Door", depth: 2, icon: "smart", smart: true },
  { id: "lamp", label: "Street Lamp", depth: 1, icon: "entity" },
  { id: "sign", label: "Welcome Sign", depth: 1, icon: "smart", smart: true },
  { id: "spawn", label: "Spawn Point", depth: 1, icon: "spawn" },
];

const COMPONENTS = [
  {
    id: "transform",
    name: "Transform",
    open: true,
    fields: [
      { label: "Position", parts: [["X", "8.0"], ["Y", "0.0"], ["Z", "12.0"]] },
      { label: "Rotation", parts: [["X", "0.0"], ["Y", "90.0"], ["Z", "0.0"]] },
      { label: "Scale", parts: [["X", "1.0"], ["Y", "1.0"], ["Z", "1.0"]] },
    ],
  },
  { id: "gltf", name: "GLTF", open: false },
  { id: "material", name: "Material", open: false },
];

const ASSET_CATS = [
  { id: "all", label: "All assets" },
  { id: "art", label: "Art" },
  { id: "nature", label: "Nature" },
  { id: "structures", label: "Structures", active: true },
  { id: "furniture", label: "Furniture" },
  { id: "smart", label: "Smart Items" },
];
const ASSET_TILES = [
  { id: "wood-house", label: "Wooden House" },
  { id: "cabin", label: "Log Cabin" },
  { id: "tower", label: "Watch Tower" },
  { id: "fence", label: "Fence" },
  { id: "door", label: "Door", smart: true },
  { id: "elevator", label: "Elevator", smart: true },
  { id: "bridge", label: "Bridge" },
  { id: "well", label: "Stone Well" },
];

function HierarchyNode({ node }) {
  const cls =
    "cheditor__node" +
    (node.selected ? " is-selected" : "") +
    (node.smart ? " is-smart" : "");
  return (
    <div className={cls} style={{ paddingLeft: 6 + node.depth * 16 }}>
      <span className="cheditor__caret">{node.open ? "▾" : node.depth === 0 ? "▾" : "▸"}</span>
      <span className="cheditor__nodeicon"><CubeIcon /></span>
      <span className="u-truncate">{node.label}</span>
    </div>
  );
}

export default function ChEditor({ loading = false, title = "Genesis Plaza Demo" }) {
  const [preview, setPreview] = useState(false);
  const [publish, setPublish] = useState(false);
  const [opts, setOpts] = useState({
    debugger: false,
    enableLandscapeTerrains: true,
    multiInstance: false,
  });
  const [open, setOpen] = useState({ transform: true, gltf: false, material: false });

  const toggleOpt = (k) => setOpts((o) => ({ ...o, [k]: !o[k] }));

  if (loading) {
    return (
      <main className="cheditor">
        <div className="cheditor__loading">
          <img src={asset("assets/loading-illus.png")} alt="" />
          <span className="cheditor__loadingrow">
            <Spinner size={34} />
            Loading...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="cheditor">
      <nav className="cheditor__header">
        <div className="cheditor__left">
          <div className="cheditor__back" aria-label="Back">
            <ArrowBackIcon />
          </div>
          <div className="cheditor__title">{title}</div>
          <div className="cheditor__refresh" aria-label="refresh-inspector" title="Reload scene from disk">
            <RefreshIcon />
          </div>
        </div>

        <div className="cheditor__right">
          <button type="button" className="cheditor__btn cheditor__btn--secondary">
            <CodeIcon />
            Code
          </button>

          <div className="cheditor__group cheditor__group--secondary">
            <button type="button" className="cheditor__btn cheditor__btn--secondary cheditor__btn--main">
              <PlayIcon />
              Preview
            </button>
            <button
              type="button"
              className="cheditor__extra"
              aria-label="Preview options"
              aria-expanded={preview}
              onClick={() => { setPreview((v) => !v); setPublish(false); }}
            >
              <CaretIcon />
            </button>
            {preview && (
              <div className="cheditor__menu cheditor__menu--preview" role="menu">
                <span className="cheditor__menutitle">Preview Options</span>
                <label className="cheditor__check">
                  <input type="checkbox" checked={opts.debugger} onChange={() => toggleOpt("debugger")} />
                  Open Debug Console
                </label>
                <label className="cheditor__check">
                  <input
                    type="checkbox"
                    checked={opts.enableLandscapeTerrains}
                    onChange={() => toggleOpt("enableLandscapeTerrains")}
                  />
                  Enable Landscape Terrains
                </label>
                <label className="cheditor__check">
                  <input type="checkbox" checked={opts.multiInstance} onChange={() => toggleOpt("multiInstance")} />
                  Multi-Instance Preview
                </label>
                <div className="cheditor__menudiv" />
                <button type="button" className="cheditor__menuitem">Show QR Code for Mobile</button>
              </div>
            )}
          </div>

          <div className="cheditor__group cheditor__group--primary">
            <button type="button" className="cheditor__btn cheditor__btn--primary cheditor__btn--main">
              <PublicIcon />
              Publish
            </button>
            <button
              type="button"
              className="cheditor__extra"
              aria-label="Publish options"
              aria-expanded={publish}
              onClick={() => { setPublish((v) => !v); setPreview(false); }}
            >
              <CaretIcon />
            </button>
            {publish && (
              <div className="cheditor__menu cheditor__menu--publish" role="menu">
                <button type="button" className="cheditor__menuitem">Publish Scene</button>
                <button type="button" className="cheditor__menuitem">Republish to my-world.dcl.eth</button>
                <button type="button" className="cheditor__menuitem">Republish to 8,12</button>
              </div>
            )}
          </div>

          <span className="cheditor__conn" aria-label="Connection status">
            <span className="u-dot u-dot--online" style={{ width: 8, height: 8 }} />
            Online
          </span>
        </div>
      </nav>

      <div className="cheditor__inspector">
        <div className="cheditor__row">
          <div className="cheditor__box cheditor__hierarchy">
            <div className="cheditor__tree" aria-label="Hierarchy">
              {TREE.map((n) => (
                <HierarchyNode key={n.id} node={n} />
              ))}
            </div>
          </div>

          <div className="cheditor__handle-h" />

          <div className="cheditor__box cheditor__renderbox cheditor__center">
            <div className="cheditor__toolbar" aria-label="Toolbar">
              <button type="button" className="cheditor__tbtn" disabled aria-label="Undo"><UndoIcon /></button>
              <button type="button" className="cheditor__tbtn" disabled aria-label="Redo"><RedoIcon /></button>
              <span className="cheditor__tbgap" />
              <button type="button" className="cheditor__tbtn is-active" aria-label="Translate"><MoveIcon /></button>
              <button type="button" className="cheditor__tbtn" aria-label="Rotate"><RotateIcon /></button>
              <button type="button" className="cheditor__tbtn" aria-label="Scale"><ScaleIcon /></button>
              <span className="cheditor__tbgrow" />
              <button type="button" className="cheditor__tbtn" aria-label="Save"><SaveIcon /></button>
              <button type="button" className="cheditor__tbtn" aria-label="Scene info"><InfoIcon /></button>
            </div>
            <div className="cheditor__canvas">
              <div className="cheditor__grid" />
              <div className="cheditor__metrics">
                <span className="cheditor__metric">Triangles 24.3k</span>
                <span className="cheditor__metric">Entities 9</span>
                <span className="cheditor__metric">60 FPS</span>
              </div>
              <svg className="cheditor__gizmo" viewBox="0 0 64 64" aria-hidden="true">
                <line x1="32" y1="32" x2="58" y2="32" stroke="#ff4d4d" strokeWidth="2.5" />
                <line x1="32" y1="32" x2="32" y2="6" stroke="#5cff7a" strokeWidth="2.5" />
                <line x1="32" y1="32" x2="14" y2="50" stroke="#5c8cff" strokeWidth="2.5" />
                <circle cx="32" cy="32" r="3" fill="#fff" />
              </svg>
              <svg className="cheditor__axis" viewBox="0 0 48 48" aria-hidden="true">
                <line x1="24" y1="24" x2="42" y2="24" stroke="#ff4d4d" strokeWidth="2" />
                <line x1="24" y1="24" x2="24" y2="6" stroke="#5cff7a" strokeWidth="2" />
                <line x1="24" y1="24" x2="11" y2="37" stroke="#5c8cff" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="cheditor__handle-h" />

          <div className="cheditor__box cheditor__compbox cheditor__components">
            <div className="cheditor__entityhead">
              <span className="cheditor__nodeicon"><CubeIcon /></span>
              <span className="cheditor__entityname">Wooden House</span>
              <button type="button" className="cheditor__addcomp">+ Add Component</button>
            </div>
            <div className="cheditor__compscroll">
              {COMPONENTS.map((c) => (
                <div className="cheditor__comp" key={c.id}>
                  <div
                    className="cheditor__comphead"
                    onClick={() => setOpen((o) => ({ ...o, [c.id]: !o[c.id] }))}
                  >
                    <span className="cheditor__caret"><Chevron open={!!open[c.id]} /></span>
                    {c.name}
                  </div>
                  {open[c.id] && c.fields && (
                    <div className="cheditor__compbody">
                      {c.fields.map((f) => (
                        <div className="cheditor__field" key={f.label}>
                          <span className="cheditor__fieldlabel">{f.label}</span>
                          <div className="cheditor__inputs">
                            {f.parts.map(([tag, val]) => (
                              <span className="cheditor__input" key={tag}>
                                <span className="cheditor__inputtag">{tag}</span>
                                <span className="cheditor__inputval">{val}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cheditor__handle-v" />

        <div className="cheditor__box cheditor__assetsbox cheditor__assets">
          <div className="cheditor__assetrail" aria-label="Asset categories">
            {ASSET_CATS.map((c) => (
              <div
                key={c.id}
                className={"cheditor__assetcat" + (c.active ? " is-active" : "")}
              >
                <CubeIcon />
                {c.label}
              </div>
            ))}
          </div>
          <div className="cheditor__assetmain">
            <div className="cheditor__assetbar">
              <span className="cheditor__assetsearch">Search assets…</span>
            </div>
            <div className="cheditor__assetgrid">
              {ASSET_TILES.map((t) => (
                <div
                  key={t.id}
                  className={"cheditor__assettile" + (t.smart ? " is-smart" : "")}
                >
                  <span className="cheditor__assetthumb"><CubeIcon /></span>
                  <span className="cheditor__assetlabel u-truncate">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
