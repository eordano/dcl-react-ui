import { useEffect, useMemo, useRef, useState } from "react";
import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { createEditorBus } from "../editor-bus.js";
import DeInteractionsPanel from "../components/DeInteractionsPanel.jsx";

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
export const IconBolt = () => (
  <svg {...S}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>
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
  onTool,
  hideLeft = false,
  onToggleLeft,
  hideRight = false,
  onToggleRight,
  onPlay,
  onPause,
  onStep,
  onStop,
  live = false,
  showGizmo = !live,
}) {
  const [open, setOpen] = useState(menuOpen);
  const chip = playing
    ? { label: "Runtime", cls: "dim" }
    : { label: saveLabel, cls: saveClass };

  return (
    <div className="eui-panel eui-toolbar">
      <button
        className={"eui-btn icon" + (hideLeft ? " active" : "")}
        title={hideLeft ? "Show hierarchy" : "Hide hierarchy"}
        onClick={onToggleLeft}
      >
        <IconSidebarLeft />
      </button>

      {showGizmo && (
        <div className="eui-tool-group">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              title={t.title}
              className={"eui-btn icon" + (tool === t.id ? " active" : "")}
              onClick={() => onTool?.(t.id)}
            >
              <t.Icon />
            </button>
          ))}
        </div>
      )}

      <div className="eui-tool-group">
        {(!live || onPlay || onPause) &&
          (playing ? (
            <button type="button" className="eui-btn icon active" title="Scene is running — pause" onClick={onPause}>
              <IconPause />
            </button>
          ) : (
            <>
              <button type="button" className="eui-btn icon" title="Run the scene" onClick={onPlay}>
                <IconPlay />
              </button>
              <button type="button" className="eui-btn icon" title="Advance one tick" onClick={onStep}>
                <IconStep />
              </button>
            </>
          ))}
        {(!live || onStop) && (
          <button
            type="button"
            className="eui-btn icon"
            title={live ? "Reload the preview — restarts the scene at tick 0" : "Restart the scene from tick 0"}
            onClick={onStop}
          >
            <IconStop />
          </button>
        )}
      </div>

      {!live && (
        <div className="eui-tool-group">
          <button className="eui-btn icon" title="Undo (⌘Z)" disabled={live}>
            <IconUndo />
          </button>
          <button className="eui-btn icon" title="Redo (⇧⌘Z)" disabled>
            <IconRedo />
          </button>
        </div>
      )}

      {!live && (
        <button
          className={"eui-btn icon" + (camMode !== "none" ? " active" : "")}
          title="Free camera on — click to return to player"
          disabled={live}
        >
          <IconCamera />
        </button>
      )}

      {!live && (
        <span className={"eui-autosave " + chip.cls} title="Auto-save status">
          <span className="dot" />
          {chip.label}
        </span>
      )}

      {!live && (
        <div style={{ position: "relative", display: "flex" }}>
          <button className={"eui-btn icon" + (open ? " active" : "")} title="More options" onClick={() => setOpen(!open)} disabled={live}>
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
      )}

      <button
        className={"eui-btn icon" + (hideRight ? " active" : "")}
        title={hideRight ? "Show inspector" : "Hide inspector"}
        onClick={onToggleRight}
      >
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

function countNodes(nodes) {
  let total = 0;
  for (const node of nodes) {
    total += 1;
    const kids = node.children ?? [];
    if (kids.length) total += countNodes(kids);
  }
  return total;
}

function filterTree(nodes, q) {
  const out = [];
  for (const node of nodes) {
    const kids = filterTree(node.children ?? [], q);
    if (node.name.toLowerCase().includes(q) || kids.length) {
      out.push({ ...node, children: kids });
    }
  }
  return out;
}

function TreeRow({ node, depth, expandAll = false, live = false, onSelect, activeId = null }) {
  const kids = node.children ?? [];
  const hasKids = kids.length > 0;
  const [open, setOpen] = useState(node.expanded ?? false);
  const isOpen = expandAll || open;
  const selectable = typeof onSelect === "function";
  const selected =
    node.selected || (activeId != null && String(node.id) === String(activeId));
  return (
    <>
      <div
        className={
          "eui-row" +
          (selected ? " selected" : "") +
          (live && !selectable ? " is-readonly" : "")
        }
        style={{ paddingLeft: 4 + depth * 14 }}
        title={node.name}
        onClick={selectable ? () => onSelect(node.id) : undefined}
      >
        <span
          className="twisty"
          onClick={hasKids ? (e) => { e.stopPropagation(); setOpen((v) => !v); } : undefined}
        >
          {hasKids ? (isOpen ? "▾" : "▸") : ""}
        </span>
        <span className="label">
          {node.name}
          {hasKids && <span className="dim">{kids.length}</span>}
        </span>
      </div>
      {isOpen &&
        kids.map((c) => (
          <TreeRow
            key={c.id}
            node={c}
            depth={depth + 1}
            expandAll={expandAll}
            live={live}
            onSelect={onSelect}
            activeId={activeId}
          />
        ))}
    </>
  );
}

export function DeHierarchyPanel({
  tree = SAMPLE_TREE,
  title = SCENE_TITLE,
  width = 300,
  empty = false,
  contextMenu = null,
  live = false,
  onSelect,
  activeId = null,
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q ? filterTree(tree, q) : tree;
  const total = countNodes(tree);
  const shown = q ? countNodes(filtered) : total;
  const noun = total === 1 ? "entity" : "entities";

  return (
    <div className="eui-panel eui-left" style={{ width }}>
      {!live && <DeLeftTabs view="scene" />}
      <div className="eui-panel-head">
        <div className="eui-head-text">
          <span className="eui-overline">Scene</span>
          <span className="eui-title" title={title}>{title}</span>
        </div>
        {!live && (
          <>
            <button className="eui-btn icon" title="Browse assets">
              <IconImport />
            </button>
            <button className="eui-btn icon" title="New entity">
              <IconPlus />
            </button>
          </>
        )}
      </div>
      <div className="eui-search">
        <input
          className="eui-input"
          placeholder="Search entities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck={false}
        />
      </div>
      {!empty && (
        <div className="eui-asset-count">
          {q ? `${shown} of ${total} ${noun}` : `${total} ${noun}`}
        </div>
      )}
      <div className="eui-panel-body" style={{ padding: "8px 0" }}>
        {empty ? (
          <div className="eui-empty">No named entities yet — create one with +</div>
        ) : filtered.length === 0 ? (
          <div className="eui-empty">No entities match “{query.trim()}”</div>
        ) : (
          filtered.map((node) => (
            <TreeRow
              key={node.id}
              node={node}
              depth={0}
              expandAll={!!q}
              live={live}
              onSelect={onSelect}
              activeId={activeId}
            />
          ))
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

function AxisRow({ label, v, axes = ["x", "y", "z"], readOnly = false }) {
  return (
    <div className="eui-prop">
      <span className="plabel">{label}</span>
      <span className="pvalue">
        {axes.map((ax) => (
          <span className="eui-axis" key={ax}>
            <span className="ax" title="drag to scrub · shift for fine">{ax.toUpperCase()}</span>
            <input className="eui-num" defaultValue={v[ax]} readOnly={readOnly} spellCheck={false} />
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

function CompCard({ ns = null, name, expanded = true, readonly = false, hasJson = true, live = false, children }) {
  const [open, setOpen] = useState(expanded);
  const stop = (e) => e.stopPropagation();
  return (
    <div className="eui-comp">
      <div
        className={"eui-comp-head" + (readonly ? " readonly" : "")}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="twisty">{open ? "▾" : "▸"}</span>
        <span className="name">
          {ns && <span className="ns">{ns} / </span>}
          {name}
        </span>
        <span className="spacer" />
        {!live && open && !readonly && hasJson && (
          <button className="eui-link" onClick={stop}>json</button>
        )}
        {!live && (
          <button
            className="eui-btn icon"
            style={{ width: 20, height: 20 }}
            title="Remove component"
            onClick={stop}
          >
            <IconTrash />
          </button>
        )}
      </div>
      {open && <div className="eui-comp-body">{children}</div>}
    </div>
  );
}

const HIDDEN_COMPONENTS = new Set([
  "composite::root",
  "core-schema::Name",
  "core-schema::Network-Entity",
  "core-schema::Sync-Components",
  "core-schema::Tags",
  "inspector::Selection",
  "inspector::Nodes",
  "inspector::TransformConfig",
  "inspector::SceneMetadata-v3",
  "inspector::Config",
  "asset-packs::Placeholder",
]);

const NS_LABEL = {
  core: null,
  "core-schema": null,
  "asset-packs": "Smart Item",
  inspector: "Inspector",
};

function splitComp(name) {
  const i = name.indexOf("::");
  const ns = i === -1 ? null : name.slice(0, i);
  const raw = i === -1 ? name : name.slice(i + 2);
  const label =
    raw
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[-_]+/g, " ")
      .trim() || name;
  const nsLabel = ns == null ? null : ns in NS_LABEL ? NS_LABEL[ns] : ns;
  return { nsLabel, label };
}

function bodyFor(name, transform, live = false) {
  switch (name) {
    case "core::Transform":
      return (
        <>
          <AxisRow label="position" v={transform?.position ?? { x: 0, y: 0, z: 0 }} readOnly={live} />
          <AxisRow label="rotation °" v={transform?.rotation ?? { x: 0, y: 0, z: 0 }} readOnly={live} />
          <AxisRow label="scale" v={transform?.scale ?? { x: 1, y: 1, z: 1 }} readOnly={live} />
        </>
      );
    case "core::Material":
      return (
        <>
          <div className="eui-group-label">pbr</div>
          <PropRow label="albedo color">
            <span className="eui-color-swatch" style={{ background: "#ffffff" }} />
            <span className="eui-axis"><span className="ax">A</span><input className="eui-num" defaultValue={1} /></span>
          </PropRow>
          <PropRow label="metallic">
            <span className="eui-axis"><span className="ax">N</span><input className="eui-num" defaultValue={0} /></span>
          </PropRow>
          <PropRow label="roughness">
            <span className="eui-axis"><span className="ax">N</span><input className="eui-num" defaultValue={0.5} /></span>
          </PropRow>
          <PropRow label="cast shadows">
            <span className="eui-toggle on" />
          </PropRow>
        </>
      );
    case "core::MeshRenderer":
      return (
        <>
          <div className="eui-group-label">mesh</div>
          <PropRow label="primitive">
            <select className="eui-select" defaultValue="box">
              <option value="box">box</option>
              <option value="sphere">sphere</option>
              <option value="cylinder">cylinder</option>
              <option value="plane">plane</option>
            </select>
          </PropRow>
        </>
      );
    case "core::MeshCollider":
      return (
        <PropRow label="collider">
          <select className="eui-select" defaultValue="box">
            <option value="box">box</option>
            <option value="plane">plane</option>
            <option value="sphere">sphere</option>
          </select>
        </PropRow>
      );
    case "core::VisibilityComponent":
      return (
        <PropRow label="visible">
          <span className="eui-toggle on" />
        </PropRow>
      );
    case "core::VideoPlayer":
      return (
        <>
          <PropRow label="src">
            <input className="eui-input" defaultValue="" placeholder="video url or file" spellCheck={false} />
          </PropRow>
          <PropRow label="playing">
            <span className="eui-toggle on" />
          </PropRow>
          <PropRow label="volume">
            <span className="eui-axis"><span className="ax">N</span><input className="eui-num" defaultValue={1} /></span>
          </PropRow>
        </>
      );
    case "core::GltfContainer":
      return (
        <PropRow label="src">
          <input className="eui-input" defaultValue="" placeholder="model.glb" spellCheck={false} />
        </PropRow>
      );
    default:
      return null;
  }
}

function RealComponentCards({ components, transform, live = false }) {
  const visible = (components ?? []).filter((c) => !HIDDEN_COMPONENTS.has(c));
  if (visible.length === 0) {
    return <div className="eui-empty">No editable components on this entity — add one with +</div>;
  }
  const ordered = visible.includes("core::Transform")
    ? ["core::Transform", ...visible.filter((c) => c !== "core::Transform")]
    : visible;
  return (
    <>
      {ordered.map((cname) => {
        const { nsLabel, label } = splitComp(cname);
        const isTransform = cname === "core::Transform";
        const body = bodyFor(cname, transform, live);
        return (
          <CompCard
            key={cname}
            ns={nsLabel}
            name={label}
            expanded={isTransform}
            hasJson={!isTransform}
            live={live}
          >
            {body ? (
              isTransform ? (
                live ? (
                  <>
                    {body}
                    <div className="eui-comp-note">
                      Read-only in the web editor — transforms are edited from the canvas.
                    </div>
                  </>
                ) : (
                  body
                )
              ) : (
                <>
                  {body}
                  <div className="eui-comp-note">
                    Sample values — representative defaults, not read from the scene.
                  </div>
                </>
              )
            ) : (
              <div className="eui-comp-note">No inline fields — edit this component as JSON.</div>
            )}
          </CompCard>
        );
      })}
    </>
  );
}

export function DeInspectorPanel({
  name = "Display Cube",
  id = "520",
  addOpen = false,
  components = null,
  transform = null,
  live = false,
  onAuthorComponent = undefined,
  interactionsOpen = false,
}) {
  const [interOpen, setInterOpen] = useState(interactionsOpen);
  return (
    <div className="eui-panel eui-right">
      <div className="eui-panel-head">
        <div className="eui-head-text">
          <span className="eui-overline">Inspector</span>
          <input
            key={name}
            className="eui-name-input"
            defaultValue={name}
            spellCheck={false}
            readOnly={live}
            title={live ? "Entity name" : "Entity name — edit and press enter"}
          />
        </div>
        <span className="eui-id-badge">#{id}</span>
        <button
          className={"eui-btn icon" + (interOpen ? " active" : "")}
          title="Add interaction"
          onClick={() => setInterOpen((v) => !v)}
        >
          <IconBolt />
        </button>
        {!live && (
          <button className={"eui-btn icon" + (addOpen ? " active" : "")} title="Add component">
            <IconPlus />
          </button>
        )}
      </div>
      <div className="eui-panel-body">
        {addOpen && <DeAddComponentPicker />}
        {interOpen && (
          <DeInteractionsPanel
            entityId={id}
            entityName={name}
            onWrite={
              onAuthorComponent ? (cname, json) => onAuthorComponent(id, cname, json) : null
            }
          />
        )}

        {components ? (
          <RealComponentCards components={components} transform={transform} live={live} />
        ) : (
          <>
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
          </>
        )}
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

export function DeAssetsPanel({
  tab = "catalog",
  width = 300,
  catalog,
  local = SAMPLE_LOCAL,
  live = false,
  onPlace = undefined,
}) {
  const [active, setActive] = useState(tab);
  return (
    <div className="eui-panel eui-left" style={{ width }}>
      {!live && <DeLeftTabs view="assets" />}
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
      {active === "catalog" ? <DeCatalogTab items={catalog} live={live} onPlace={onPlace} /> : <DeLocalTab items={local} live={live} />}
    </div>
  );
}

export function DeCatalogTab({ items = SAMPLE_CATALOG, live = false, onPlace = undefined }) {
  const placeable = typeof onPlace === "function";
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
            <div
              key={a.id}
              className={"eui-asset" + (live && !placeable ? " is-readonly" : "")}
              title={placeable ? `Place ${a.name} in the scene` : `${a.name} — ${a.pack}`}
              onClick={placeable ? () => onPlace(a) : undefined}
            >
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

export function DeLocalTab({ items = SAMPLE_LOCAL, live = false }) {
  return (
    <>
      <div className="eui-search" style={{ display: "flex", gap: 6 }}>
        <input className="eui-input" style={{ flex: 1 }} placeholder="Filter local models…" defaultValue="" />
        <button className="eui-btn" title="Refresh" style={{ flex: "none" }}>↻</button>
      </div>
      <div className="eui-asset-count">{items.length} models in this project</div>
      <div className="eui-panel-body">
        <div className="eui-asset-grid">
          <label className={"eui-asset eui-asset-upload" + (live ? " is-readonly" : "")} title="Add a .glb / .gltf from your computer">
            <div className="glyph">+</div>
            <span className="name">Add model</span>
            <span className="pack">from your computer</span>
          </label>
          {items.length === 0 && (
            <div className="eui-empty" style={{ gridColumn: "1 / -1" }}>
              No models in this project yet — add a .glb / .gltf to place it in the scene.
            </div>
          )}
          {items.map((p) => {
            const name = (p.path.split("/").pop() ?? p.path).replace(/\.(glb|gltf)$/i, "");
            return (
              <div key={p.path} className={"eui-asset" + (live ? " is-readonly" : "")} title={`Place ${p.path}`}>
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

function findNodeName(nodes, id) {
  if (id == null) return null;
  const target = String(id);
  for (const node of nodes ?? []) {
    if (String(node.id) === target) return node.name;
    const kid = findNodeName(node.children ?? [], target);
    if (kid != null) return kid;
  }
  return null;
}

export default function DeWorkspace({
  left = "scene",
  title = SCENE_TITLE,
  tree = SAMPLE_TREE,
  inspector = { name: "Display Cube", id: "520" },
  addOpen = false,
  catalog = SAMPLE_CATALOG,
  local = SAMPLE_LOCAL,
  viewportSrc =(null),
}) {
  const viewportRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [tool, setTool] = useState("translate");
  const [hideLeft, setHideLeft] = useState(false);
  const [hideRight, setHideRight] = useState(false);
  const live = !!viewportSrc;
  const postToViewport = (action, extra) => {
    const f = viewportRef.current;
    if (!f || !f.contentWindow) return;
    let target = "*";
    try {
      target = new URL(viewportSrc).origin;
    } catch (e) {
    }
    f.contentWindow.postMessage({ type: "dcl-bridge", action, ...(extra || {}) }, target);
  };
  const controls = live
    ? {
        playing,
        onPlay: () => {
          postToViewport("UnfreezeScene");
          setPlaying(true);
        },
        onPause: () => {
          postToViewport("FreezeScene");
          setPlaying(false);
        },
        onStep: () => {
          postToViewport("TickScene", { count: 1 });
        },
        onStop: () => {
          const f = viewportRef.current;
          if (f) f.src = f.src;
          setPlaying(true);
        },
      }
    : {};

  const busRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [liveSel, setLiveSel] = useState(null);
  const [liveXform, setLiveXform] = useState({});

  useEffect(() => {
    if (!live) return undefined;
    const bus = createEditorBus();
    if (!bus.ok) return undefined;
    busRef.current = bus;
    let handshook = false;
    let initTimer = null;
    const stopInit = () => {
      if (initTimer != null) {
        clearInterval(initTimer);
        initTimer = null;
      }
    };
    const off = bus.onMessage((msg) => {
      if (!msg || typeof msg !== "object") return;
      switch (msg.type) {
        case "scene-ready":
          handshook = true;
          stopInit();
          setSceneReady(true);
          setLiveSel({ selected: msg.selected ?? [], active: msg.active ?? null });
          if (msg.tool) setTool(msg.tool);
          break;
        case "selection":
          setLiveSel({ selected: msg.selected ?? [], active: msg.active ?? null });
          break;
        case "tool":
          if (msg.tool) setTool(msg.tool);
          break;
        case "drag-end":
        case "transform":
          if (msg.transforms && typeof msg.transforms === "object") {
            setLiveXform((prev) => ({ ...prev, ...msg.transforms }));
          }
          break;
        default:
          break;
      }
    });
    bus.init();
    initTimer = setInterval(() => {
      if (handshook) return stopInit();
      bus.init();
    }, 1200);
    return () => {
      stopInit();
      off();
      bus.close();
      busRef.current = null;
      setSceneReady(false);
      setLiveSel(null);
    };
  }, [live]);

  const handleTool = (t) => {
    setTool(t);
    busRef.current?.setTool(t);
  };

  const authorComponent = (entity, name, json) =>
    busRef.current?.setComponent(entity, name, json);

  const placeAsset = (asset) =>
    busRef.current?.addEntity(asset?.name || "Item", 0);

  const busLive = live && sceneReady;
  const activeId = liveSel?.active ?? null;
  const onHierSelect = busLive
    ? (id) => busRef.current?.setSelection([String(id)], String(id))
    : undefined;

  const effInspector = useMemo(() => {
    if (!live || !inspector || activeId == null) return inspector;
    const sameId = String(inspector.id) === String(activeId);
    const xform = liveXform[activeId];
    const baseT = inspector.transform ?? null;
    const transform = xform
      ? {
          position: xform.position ?? baseT?.position,
          rotation: baseT?.rotation,
          scale: xform.scale ?? baseT?.scale,
        }
      : baseT;
    return {
      ...inspector,
      id: String(activeId),
      name: findNodeName(tree, activeId) ?? (sameId ? inspector.name : `Entity ${activeId}`),
      components: sameId ? inspector.components : [],
      transform,
    };
  }, [live, inspector, activeId, liveXform, tree]);

  return (
    <DclEditorChrome viewportSrc={viewportSrc} viewportRef={viewportRef}>
      <DeToolbar
        {...controls}
        live={live}
        showGizmo={!live || sceneReady}
        tool={tool}
        onTool={handleTool}
        hideLeft={hideLeft}
        onToggleLeft={() => setHideLeft((v) => !v)}
        hideRight={hideRight}
        onToggleRight={() => setHideRight((v) => !v)}
      />
      {!hideLeft &&
        (left === "assets" ? (
          <DeAssetsPanel
            catalog={catalog}
            local={local}
            live={live}
            onPlace={busLive ? placeAsset : undefined}
          />
        ) : (
          <DeHierarchyPanel
            title={title}
            tree={tree}
            live={live}
            onSelect={onHierSelect}
            activeId={activeId}
          />
        ))}
      {!hideRight && (
        <DeInspectorPanel
          name={effInspector.name}
          id={effInspector.id}
          addOpen={addOpen}
          components={effInspector.components}
          transform={effInspector.transform}
          live={live}
          onAuthorComponent={busLive ? authorComponent : undefined}
        />
      )}
      {playing && viewportSrc && (
        <div className="eui-play-frame eui-play-frame--preview" aria-hidden="true">
          <span className="eui-play-badge eui-play-badge--preview">● Live preview</span>
        </div>
      )}
    </DclEditorChrome>
  );
}
