import { useState } from "react";
import DclEditorChrome from "../frames/DclEditorChrome.jsx";

const S = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const IconSelect = () => (
  <svg {...S}><path d="m4 4 7.07 17 2.51-7.39L21 11.07 4 4z" /></svg>
);
export const IconMove = () => (
  <svg {...S}><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" /></svg>
);
export const IconRotate = () => (
  <svg {...S}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></svg>
);
export const IconScale = () => (
  <svg {...S}><path d="M21 3 9 15" /><path d="M12 3H3v18h18v-9" /><path d="M16 3h5v5" /></svg>
);
export const IconPlay = () => (
  <svg {...S}><path d="M6 4l14 8-14 8V4z" /></svg>
);
export const IconPause = () => (
  <svg {...S}><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);
export const IconStep = () => (
  <svg {...S}><path d="M5 4l10 8-10 8V4z" /><path d="M19 5v14" /></svg>
);
export const IconStop = () => (
  <svg {...S}><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
);
export const IconDots = () => (
  <svg {...S}><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></svg>
);
export const IconPlus = () => (
  <svg {...S}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconImport = () => (
  <svg {...S}><path d="M4 4h6l2 2h8v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z" /><path d="M12 11v6M9 14l3 3 3-3" /></svg>
);
export const IconTrash = () => (
  <svg {...S}><path d="M3 6h18M8 6V4h8v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" /><path d="M10 11v6M14 11v6" /></svg>
);
export const IconSidebarLeft = () => (
  <svg {...S}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg>
);
export const IconSidebarRight = () => (
  <svg {...S}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M15 4v16" /></svg>
);
export const IconCamera = () => (
  <svg {...S}><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 6-3v10l-6-3" /></svg>
);
export const IconEdit = () => (
  <svg {...S}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
);
export const IconUndo = () => (
  <svg {...S}><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-1" /></svg>
);
export const IconRedo = () => (
  <svg {...S}><path d="m15 14 5-5-5-5" /><path d="M20 9H9a5 5 0 0 0 0 10h1" /></svg>
);
export const ModelGlyph = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2.5 21 7v10l-9 4.5L3 17V7l9-4.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M3 7l9 4.5L21 7M12 11.5V21.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

export const SCENE_TITLE = "Genesis Plaza Booth";

export const SAMPLE_TREE = [
  { id: "512", name: "Ground", children: [] },
  {
    id: "513",
    name: "Kiosk",
    expanded: true,
    children: [
      { id: "514", name: "Counter", children: [] },
      { id: "515", name: "Sign", children: [] },
      { id: "516", name: "Spotlight", children: [] },
    ],
  },
  { id: "520", name: "Display Cube", selected: true, children: [] },
  { id: "521", name: "Ambient Audio", children: [] },
  { id: "530", name: "Spawn Point", children: [] },
];

export const SAMPLE_CATALOG = [
  { id: "a1", name: "Oak Tree", pack: "Nature", hue: 140 },
  { id: "a2", name: "Park Bench", pack: "Props", hue: 32 },
  { id: "a3", name: "Street Lamp", pack: "City", hue: 48 },
  { id: "a4", name: "Fountain", pack: "City", hue: 198 },
  { id: "a5", name: "Wooden Crate", pack: "Props", hue: 28 },
  { id: "a6", name: "Neon Sign", pack: "Decor", hue: 300 },
  { id: "a7", name: "Stone Arch", pack: "Structures", hue: 16 },
  { id: "a8", name: "Potted Palm", pack: "Nature", hue: 120 },
  { id: "a9", name: "Sci-Fi Door", pack: "Structures", hue: 220 },
];

export const SAMPLE_LOCAL = [
  { path: "assets/models/booth.glb", folder: "models" },
  { path: "assets/models/banner.glb", folder: "models" },
  { path: "assets/podium.glb", folder: "" },
  { path: "assets/props/lamp.glb", folder: "props" },
];

const TOOLS = [
  { id: "select", Icon: IconSelect, title: "Select (V)" },
  { id: "translate", Icon: IconMove, title: "Move" },
  { id: "rotate", Icon: IconRotate, title: "Rotate" },
  { id: "scale", Icon: IconScale, title: "Scale" },
];

export function DeToolbar({
  tool = "translate",
  playing = false,
  menuOpen = false,
  camMode = "free",
  showAll = false,
  saveLabel = "Saved",
  saveClass = "ok",
}) {
  const [open, setOpen] = useState(menuOpen);
  const chip = playing
    ? { label: "Runtime", cls: "dim" }
    : { label: saveLabel, cls: saveClass };

  return (
    <div className="eui-panel eui-toolbar">
      <button className="eui-btn icon" title="Hide hierarchy">
        <IconSidebarLeft />
      </button>

      <div className="eui-tool-group">
        {TOOLS.map((t) => (
          <button key={t.id} title={t.title} className={"eui-btn icon" + (tool === t.id ? " active" : "")}>
            <t.Icon />
          </button>
        ))}
      </div>

      <div className="eui-tool-group">
        {playing ? (
          <button className="eui-btn icon active" title="Scene is running — pause">
            <IconPause />
          </button>
        ) : (
          <>
            <button className="eui-btn icon" title="Run the scene">
              <IconPlay />
            </button>
            <button className="eui-btn icon" title="Advance one tick">
              <IconStep />
            </button>
          </>
        )}
        <button className="eui-btn icon" title="Restart the scene from tick 0">
          <IconStop />
        </button>
      </div>

      <div className="eui-tool-group">
        <button className="eui-btn icon" title="Undo (⌘Z)">
          <IconUndo />
        </button>
        <button className="eui-btn icon" title="Redo (⇧⌘Z)" disabled>
          <IconRedo />
        </button>
      </div>

      <button className={"eui-btn icon" + (camMode !== "none" ? " active" : "")} title="Free camera on — click to return to player">
        <IconCamera />
      </button>

      <span className={"eui-autosave " + chip.cls} title="Auto-save status">
        <span className="dot" />
        {chip.label}
      </span>

      <div style={{ position: "relative", display: "flex" }}>
        <button className={"eui-btn icon" + (open ? " active" : "")} title="More options" onClick={() => setOpen(!open)}>
          <IconDots />
        </button>
        {open && (
          <div className="eui-menu">
            <div className="eui-menu-label">Camera</div>
            <button className="eui-menu-item">Player camera<span className="hint">{camMode === "none" ? "●" : ""}</span></button>
            <button className="eui-menu-item">Free fly<span className="hint">{camMode === "free" ? "●" : ""}</span></button>
            <button className="eui-menu-item">Orbit selection<span className="hint">{camMode === "target" ? "●" : ""}</span></button>
            {camMode !== "none" && (
              <div style={{ display: "flex", gap: 2, padding: "2px 4px" }}>
                {["+x", "-x", "+y", "-y", "+z", "-z"].map((a) => (
                  <button key={a} className="eui-btn" style={{ flex: 1, height: 24, padding: 0, fontSize: 11 }}>{a}</button>
                ))}
              </div>
            )}
            <div className="eui-menu-sep" />
            <div className="eui-menu-label">Hierarchy</div>
            <button className="eui-menu-item">Show all entities<span className="hint">{showAll ? "on" : "off"}</span></button>
          </div>
        )}
      </div>

      <button className="eui-btn icon" title="Hide inspector">
        <IconSidebarRight />
      </button>
    </div>
  );
}

export function DeLeftTabs({ view = "scene" }) {
  return (
    <div className="eui-left-tabs">
      {["scene", "assets"].map((v) => (
        <button key={v} className={"eui-ltab" + (view === v ? " active" : "")}>
          {v === "scene" ? "Scene" : "Assets"}
        </button>
      ))}
    </div>
  );
}

function TreeRow({ node, depth }) {
  const kids = node.children ?? [];
  const expanded = node.expanded;
  return (
    <>
      <div
        className={"eui-row" + (node.selected ? " selected" : "")}
        style={{ paddingLeft: 4 + depth * 14 }}
      >
        <span className="twisty">{kids.length > 0 ? (expanded ? "▾" : "▸") : ""}</span>
        <span className="label">
          {node.name}
          {kids.length > 0 && <span className="dim">{kids.length}</span>}
        </span>
      </div>
      {expanded && kids.map((c) => <TreeRow key={c.id} node={c} depth={depth + 1} />)}
    </>
  );
}

export function DeHierarchyPanel({
  tree = SAMPLE_TREE,
  title = SCENE_TITLE,
  width = 300,
  empty = false,
  contextMenu = null,
}) {
  return (
    <div className="eui-panel eui-left" style={{ width }}>
      <DeLeftTabs view="scene" />
      <div className="eui-panel-head">
        <div className="eui-head-text">
          <span className="eui-overline">Scene</span>
          <span className="eui-title">{title}</span>
        </div>
        <button className="eui-btn icon" title="Browse assets">
          <IconImport />
        </button>
        <button className="eui-btn icon" title="New entity">
          <IconPlus />
        </button>
      </div>
      <div className="eui-search">
        <input className="eui-input" placeholder="Search…" defaultValue="" />
      </div>
      <div className="eui-panel-body" style={{ padding: "8px 0" }}>
        {empty ? (
          <div className="eui-empty">No named entities yet — create one with +</div>
        ) : (
          tree.map((node) => <TreeRow key={node.id} node={node} depth={0} />)
        )}
      </div>
      {contextMenu && <DeContextMenu {...contextMenu} />}
    </div>
  );
}

export function DeContextMenu({ x = 96, y = 188, kids = 0 }) {
  return (
    <div className="eui-ctx" style={{ left: x, top: y }}>
      <button className="eui-menu-item"><IconCamera /> Focus camera</button>
      <button className="eui-menu-item"><IconEdit /> Rename</button>
      <button className="eui-menu-item"><IconPlus /> New child entity</button>
      <button className="eui-menu-item"><IconPlus /> Duplicate</button>
      <div className="eui-menu-sep" />
      <button className="eui-menu-item">Unparent</button>
      <div className="eui-menu-sep" />
      {kids === 0 ? (
        <button className="eui-menu-item danger"><IconTrash /> Delete</button>
      ) : (
        <>
          <button className="eui-menu-item danger"><IconTrash /> Delete, keep children</button>
          <button className="eui-menu-item danger"><IconTrash /> Delete with {kids} child{kids === 1 ? "" : "ren"}</button>
        </>
      )}
    </div>
  );
}

function AxisRow({ label, v, axes = ["x", "y", "z"] }) {
  return (
    <div className="eui-prop">
      <span className="plabel">{label}</span>
      <span className="pvalue">
        {axes.map((ax) => (
          <span className="eui-axis" key={ax}>
            <span className="ax" title="drag to scrub · shift for fine">{ax.toUpperCase()}</span>
            <input className="eui-num" defaultValue={v[ax]} spellCheck={false} />
          </span>
        ))}
      </span>
    </div>
  );
}

function PropRow({ label, children }) {
  return (
    <div className="eui-prop">
      <span className="plabel">{label}</span>
      <span className="pvalue">{children}</span>
    </div>
  );
}

function CompCard({ ns = null, name, expanded = true, readonly = false, hasJson = true, children }) {
  return (
    <div className="eui-comp">
      <div className={"eui-comp-head" + (readonly ? " readonly" : "")}>
        <span className="twisty">{expanded ? "▾" : "▸"}</span>
        <span className="name">
          {ns && <span className="ns">{ns} / </span>}
          {name}
        </span>
        <span className="spacer" />
        {expanded && !readonly && hasJson && <button className="eui-link">json</button>}
        <button className="eui-btn icon" style={{ width: 20, height: 20 }} title="Remove component">
          <IconTrash />
        </button>
      </div>
      {expanded && <div className="eui-comp-body">{children}</div>}
    </div>
  );
}

export function DeInspectorPanel({
  name = "Display Cube",
  id = "520",
  addOpen = false,
}) {
  return (
    <div className="eui-panel eui-right">
      <div className="eui-panel-head">
        <div className="eui-head-text">
          <span className="eui-overline">Inspector</span>
          <input className="eui-name-input" defaultValue={name} spellCheck={false} title="Entity name — edit and press enter" />
        </div>
        <span className="eui-id-badge">#{id}</span>
        <button className={"eui-btn icon" + (addOpen ? " active" : "")} title="Add component">
          <IconPlus />
        </button>
      </div>
      <div className="eui-panel-body">
        {addOpen && <DeAddComponentPicker />}

        <CompCard name="Transform" hasJson={false}>
          <AxisRow label="position" v={{ x: 8, y: 1.5, z: 8 }} />
          <AxisRow label="rotation °" v={{ x: 0, y: 45, z: 0 }} />
          <AxisRow label="scale" v={{ x: 1, y: 1, z: 1 }} />
        </CompCard>

        <CompCard name="Mesh Renderer">
          <div className="eui-group-label">mesh</div>
          <PropRow label="primitive">
            <select className="eui-select" defaultValue="box">
              <option value="box">box</option>
              <option value="sphere">sphere</option>
              <option value="cylinder">cylinder</option>
            </select>
          </PropRow>
          <PropRow label="uvs">
            <span className="eui-axis"><span className="ax">N</span><input className="eui-num" defaultValue={0} /></span>
          </PropRow>
        </CompCard>

        <CompCard name="Material">
          <div className="eui-group-label">pbr</div>
          <PropRow label="albedo color">
            <span className="eui-color-swatch" style={{ background: "#8c5bf6" }} />
            <span className="eui-axis"><span className="ax">A</span><input className="eui-num" defaultValue={1} /></span>
          </PropRow>
          <PropRow label="metallic">
            <span className="eui-axis"><span className="ax">N</span><input className="eui-num" defaultValue={0.1} /></span>
          </PropRow>
          <PropRow label="roughness">
            <span className="eui-axis"><span className="ax">N</span><input className="eui-num" defaultValue={0.5} /></span>
          </PropRow>
          <PropRow label="cast shadows">
            <span className="eui-toggle on" />
          </PropRow>
        </CompCard>
      </div>
    </div>
  );
}

const COMPONENT_NAMES = [
  "Animator",
  "AudioSource",
  "Billboard",
  "GltfContainer",
  "NftShape",
  "PointerEvents",
  "TextShape",
  "VisibilityComponent",
];

export function DeAddComponentPicker() {
  return (
    <div className="eui-pop">
      <input className="eui-input" placeholder="Add component…" defaultValue="" />
      <div className="eui-pop-list">
        {COMPONENT_NAMES.map((n) => (
          <div key={n} className="eui-pop-item">{n}</div>
        ))}
      </div>
    </div>
  );
}

export function DeAssetsPanel({ tab = "catalog", width = 300 }) {
  const [active, setActive] = useState(tab);
  return (
    <div className="eui-panel eui-left" style={{ width }}>
      <DeLeftTabs view="assets" />
      <div className="eui-seg">
        {["catalog", "local"].map((t) => (
          <button
            key={t}
            className={"eui-seg-btn" + (active === t ? " active" : "")}
            onClick={() => setActive(t)}
          >
            {t === "catalog" ? "Catalog" : "Local"}
          </button>
        ))}
      </div>
      {active === "catalog" ? <DeCatalogTab /> : <DeLocalTab />}
    </div>
  );
}

export function DeCatalogTab({ items = SAMPLE_CATALOG }) {
  return (
    <>
      <div className="eui-search" style={{ display: "flex", gap: 6 }}>
        <input className="eui-input" style={{ flex: 1 }} placeholder="Search models…" defaultValue="" />
        <select className="eui-input" style={{ width: 96, flex: "none" }} defaultValue="">
          <option value="">All</option>
          <option value="Nature">Nature</option>
          <option value="Props">Props</option>
          <option value="City">City</option>
        </select>
      </div>
      <div className="eui-asset-count">{items.length} models</div>
      <div className="eui-panel-body">
        <div className="eui-asset-grid">
          {items.map((a) => (
            <div key={a.id} className="eui-asset" title={`${a.name} — ${a.pack}`}>
              <div
                className="thumb"
                style={{ background: `linear-gradient(150deg, hsl(${a.hue} 60% 46%), hsl(${a.hue + 30} 56% 28%))` }}
              >
                <ModelGlyph />
              </div>
              <span className="name">{a.name}</span>
              <span className="pack">{a.pack}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function DeLocalTab({ items = SAMPLE_LOCAL }) {
  return (
    <>
      <div className="eui-search" style={{ display: "flex", gap: 6 }}>
        <input className="eui-input" style={{ flex: 1 }} placeholder="Filter local models…" defaultValue="" />
        <button className="eui-btn" title="Refresh" style={{ flex: "none" }}>↻</button>
      </div>
      <div className="eui-asset-count">{items.length} models in this project</div>
      <div className="eui-panel-body">
        <div className="eui-asset-grid">
          <label className="eui-asset eui-asset-upload" title="Add a .glb / .gltf from your computer">
            <div className="glyph">+</div>
            <span className="name">Add model</span>
            <span className="pack">from your computer</span>
          </label>
          {items.map((p) => {
            const name = (p.path.split("/").pop() ?? p.path).replace(/\.(glb|gltf)$/i, "");
            return (
              <div key={p.path} className="eui-asset" title={`Place ${p.path}`}>
                <div className="glyph"><ModelGlyph /></div>
                <span className="name">{name}</span>
                <span className="pack">{p.folder || "model"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function DeWorkspace({ left = "scene" }) {
  return (
    <DclEditorChrome>
      <DeToolbar />
      {left === "assets" ? <DeAssetsPanel /> : <DeHierarchyPanel />}
      <DeInspectorPanel />
    </DclEditorChrome>
  );
}
