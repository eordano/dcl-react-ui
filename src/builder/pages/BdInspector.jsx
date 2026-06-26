import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import { ChevronLeft } from "../../atoms/icons.jsx";
import "./bdinspector.css";

const Ico = {
  pencil: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  undo: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62A7.06 7.06 0 0112.5 11c3.04 0 5.62 1.98 6.54 4.72l2.37-.78A9.005 9.005 0 0012.5 8z" />
    </svg>
  ),
  redo: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.4 10.6A9.95 9.95 0 0011.5 8a9.005 9.005 0 00-8.91 7.94l2.37.78A7.04 7.04 0 0111.5 11c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  arrowDown: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 7l5 5-5 5z" /></svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12l9-5M12 12v10M12 12L3 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
};

const GizmoGlyph = {
  free: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.6" /><path d="M5 7l-2 5 2 5M19 7l2 5-2 5M7 5l5-2 5 2M7 19l5 2 5-2" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  move: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  rotate: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12a9 9 0 11-3-6.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M21 3v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h7M4 4v7M4 4l7 7M20 20h-7M20 20v-7M20 20l-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};

const TREE = [
  { id: 5, label: "Player", kind: "player", leaf: true },
  { id: 6, label: "Camera", kind: "camera", leaf: true },
  {
    id: 0, label: "Scene", kind: "group", open: true, children: [
      { id: 512, label: "Ground", kind: "tile", leaf: true },
      {
        id: 513, label: "Town Square", kind: "group", open: true, children: [
          { id: 514, label: "Fountain", kind: "entity", leaf: true },
          { id: 515, label: "Door", kind: "smart", leaf: true },
          { id: 516, label: "Sign", kind: "entity", leaf: true, selected: true },
        ],
      },
      { id: 520, label: "Spawn Point", kind: "entity", leaf: true },
    ],
  },
];

const COMPONENTS = [
  { id: "transform", name: "Transform", open: true },
  { id: "gltf", name: "GLTF", open: false },
  { id: "meshcollider", name: "Mesh Collider", open: false },
  { id: "textshape", name: "Text Shape", open: false },
];

const CATALOG = [
  {
    name: "Ground", assets: [
      { id: "g1", name: "Grass" }, { id: "g2", name: "Sand" },
      { id: "g3", name: "Stone" }, { id: "g4", name: "Wood" },
    ],
  },
  {
    name: "Structures", assets: [
      { id: "s1", name: "Wall" }, { id: "s2", name: "Door" },
      { id: "s3", name: "Window" }, { id: "s4", name: "Roof" },
      { id: "s5", name: "Pillar" }, { id: "s6", name: "Stairs" },
    ],
  },
  {
    name: "Nature", assets: [
      { id: "n1", name: "Tree" }, { id: "n2", name: "Bush" },
      { id: "n3", name: "Rock" }, { id: "n4", name: "Flower" },
    ],
  },
];

function TopBar({ project }) {
  return (
    <div className="bdinspector__topbar">
      <div className="bdinspector__name">
        <button type="button" className="bdinspector__back" aria-label="Back">
          <ChevronLeft />
        </button>
        <button type="button" className="bdinspector__titlebtn">
          {project.title}
          {Ico.pencil}
        </button>
      </div>
      <div className="bdinspector__actions">
        <span className="bdinspector__deploy">
          <span className="bdinspector__dot" />
          Published
        </span>
        <button type="button" className="bdinspector__btn bdinspector__btn--secondary bdinspector__btn--icon" aria-label="Download">
          {Ico.download}
        </button>
        <button type="button" className="bdinspector__btn bdinspector__btn--secondary">
          {Ico.eye} Preview
        </button>
        <button type="button" className="bdinspector__btn bdinspector__btn--primary">
          {Ico.globe} Publish
        </button>
      </div>
    </div>
  );
}

function HierarchyRow({ node, depth }) {
  const [open, setOpen] = useState(!!node.open);
  const leaf = node.leaf || !node.children?.length;
  const iconClass =
    "bdinspector__rowicon" + (node.kind === "smart" ? " is-smart" : "");
  return (
    <>
      <div
        className={"bdinspector__row" + (node.selected ? " is-selected" : "")}
        style={{ paddingLeft: 2 + depth * 0 }}
      >
        <span
          className={"bdinspector__chevron" + (leaf ? " is-leaf" : "")}
          onClick={() => !leaf && setOpen((o) => !o)}
        >
          {open ? Ico.arrowDown : Ico.arrowRight}
        </span>
        <span className={iconClass}>{Ico.cube}</span>
        <span className="bdinspector__rowlabel">{node.label}</span>
      </div>
      {!leaf && open && (
        <div className="bdinspector__children">
          {node.children.map((c) => (
            <HierarchyRow key={c.id} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
}

function Hierarchy() {
  return (
    <div className="bdinspector__hierarchy">
      <div className="bdinspector__tree">
        {TREE.map((n) => (
          <HierarchyRow key={n.id} node={n} depth={0} />
        ))}
      </div>
    </div>
  );
}

function Toolbar() {
  const [gizmo, setGizmo] = useState("move");
  return (
    <div className="bdinspector__toolbar">
      <div className="bdinspector__tbgroup">
        <button type="button" className="bdinspector__tbbtn" title="Undo">{Ico.undo}</button>
        <button type="button" className="bdinspector__tbbtn" title="Redo" disabled>{Ico.redo}</button>
      </div>
      <div className="bdinspector__tbgroup" style={{ marginLeft: 8 }}>
        {[["free", "Free", GizmoGlyph.free], ["move", "Move", GizmoGlyph.move], ["rotate", "Rotate", GizmoGlyph.rotate], ["scale", "Scale", GizmoGlyph.scale]].map(
          ([id, title, glyph]) => (
            <button
              key={id}
              type="button"
              title={title}
              className={"bdinspector__tbbtn" + (gizmo === id ? " is-active" : "")}
              onClick={() => setGizmo(id)}
            >
              {glyph}
            </button>
          )
        )}
      </div>
      <button type="button" className="bdinspector__tbbtn" title="Inspector" style={{ marginLeft: 8 }}>{Ico.list}</button>
      <div className="bdinspector__tbright">
        <button type="button" className="bdinspector__tbbtn" title="Edit Scene">{Ico.pencil}</button>
        <button type="button" className="bdinspector__tbbtn is-active" title="Scene Info">{Ico.info}</button>
      </div>
    </div>
  );
}

function Renderer() {
  return (
    <div className="bdinspector__renderer">
      <div className="bdinspector__grid" />
      <div className="bdinspector__gizmoplaceholder" />
      <svg className="bdinspector__gizmoaxes" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
        <line x1="60" y1="60" x2="108" y2="60" stroke="#ff4d5e" strokeWidth="3" />
        <line x1="60" y1="60" x2="60" y2="12" stroke="#5ad35a" strokeWidth="3" />
        <line x1="60" y1="60" x2="28" y2="92" stroke="#4d8dff" strokeWidth="3" />
      </svg>
      <svg className="bdinspector__axisbadge" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.35)" />
        <line x1="32" y1="32" x2="56" y2="32" stroke="#ff4d5e" strokeWidth="3" />
        <line x1="32" y1="32" x2="32" y2="8" stroke="#5ad35a" strokeWidth="3" />
        <line x1="32" y1="32" x2="16" y2="48" stroke="#4d8dff" strokeWidth="3" />
        <text x="58" y="35" fill="#ff4d5e" fontSize="9">x</text>
        <text x="29" y="9" fill="#5ad35a" fontSize="9">y</text>
        <text x="9" y="50" fill="#4d8dff" fontSize="9">z</text>
      </svg>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="bdinspector__field">
      <span className="bdinspector__fieldlabel">{label}</span>
      <input className="bdinspector__input" defaultValue={value} />
    </div>
  );
}

function Vector3({ label, x, y, z }) {
  return (
    <div className="bdinspector__field">
      <span className="bdinspector__fieldlabel">{label}</span>
      <div className="bdinspector__vector">
        {[["X", x], ["Y", y], ["Z", z]].map(([l, v]) => (
          <div className="bdinspector__vfield" key={l}>
            <span className="bdinspector__vlabel">{l}</span>
            <input className="bdinspector__input" defaultValue={v} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ComponentContainer({ component, children }) {
  const [open, setOpen] = useState(!!component.open);
  return (
    <div className={"bdinspector__container" + (open ? " is-open" : "")}>
      <div className="bdinspector__ctitle" onClick={() => setOpen((o) => !o)}>
        {open
          ? <span className="bdinspector__cicon" style={{ display: "inline-flex" }}>{Ico.arrowDown}</span>
          : <span className="bdinspector__cicon" style={{ display: "inline-flex" }}>{Ico.arrowRight}</span>}
        <span>{component.name}</span>
      </div>
      {open && <div className="bdinspector__ccontent">{children}</div>}
    </div>
  );
}

function EntityInspector({ entity }) {
  return (
    <div className="bdinspector__inspector">
      <div className="bdinspector__entityheader">
        <div className="bdinspector__entitytitlewrap">
          <div className="bdinspector__entitytitle">
            <div className="bdinspector__entityname">{entity.name}</div>
            <div className="bdinspector__entityhint">Double click to rename</div>
          </div>
          <button type="button" className="bdinspector__addcomponent">
            {Ico.plus} Add Component
          </button>
        </div>
      </div>
      {COMPONENTS.map((c) => (
        <ComponentContainer key={c.id} component={c}>
          {c.id === "transform" ? (
            <>
              <Vector3 label="Position" x="8" y="0" z="12" />
              <Vector3 label="Scale" x="1" y="1" z="1" />
              <Vector3 label="Rotation" x="0" y="90" z="0" />
            </>
          ) : c.id === "gltf" ? (
            <Field label="Path" value="assets/scene/sign.glb" />
          ) : null}
        </ComponentContainer>
      ))}
    </div>
  );
}

function Assets() {
  const TABS = [
    { id: "asset-packs", label: "Asset Packs", icon: Ico.cube },
    { id: "local-assets", label: "Local Assets", icon: Ico.list },
    { id: "custom", label: "Custom Items", icon: Ico.plus },
  ];
  const [tab, setTab] = useState("asset-packs");
  return (
    <div className="bdinspector__assets">
      <div className="bdinspector__assetstabs">
        <div className="bdinspector__assetsleft">
          <button type="button" className="bdinspector__importbtn">
            {Ico.plus} Import
          </button>
        </div>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={"bdinspector__assetstab" + (tab === t.id ? " is-active" : "")}
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className="bdinspector__assetsbody">
        {CATALOG.map((pack) => (
          <div className="bdinspector__catalogrow" key={pack.name} style={{ marginBottom: 16 }}>
            <div className="bdinspector__catalogtitle">{pack.name}</div>
            <div className="bdinspector__catalog">
              {pack.assets.map((a) => (
                <div className="bdinspector__asset" key={a.id}>
                  <div className="bdinspector__assetthumb">{Ico.cube}</div>
                  <div className="bdinspector__assetname">{a.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorApp() {
  const selected = { name: "Sign" };
  return (
    <div className="bdinspector__app">
      <div className="bdinspector__top">
        <div className="bdinspector__col--hierarchy">
          <div className="bdinspector__box">
            <div className="bdinspector__boxcontent">
              <Hierarchy />
            </div>
          </div>
        </div>
        <div className="bdinspector__hhandle" />
        <div className="bdinspector__col--renderer">
          <div className="bdinspector__box">
            <div className="bdinspector__boxcontent">
              <div className="bdinspector__center">
                <Toolbar />
                <Renderer />
              </div>
            </div>
          </div>
        </div>
        <div className="bdinspector__hhandle" />
        <div className="bdinspector__col--inspector">
          <div className="bdinspector__box">
            <div className="bdinspector__boxcontent">
              <EntityInspector entity={selected} />
            </div>
          </div>
        </div>
      </div>
      <div className="bdinspector__vhandle" />
      <div style={{ flex: "0 0 30%", minHeight: 0 }}>
        <div className="bdinspector__box">
          <div className="bdinspector__boxcontent">
            <Assets />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BdInspector({
  state = "ready",
  project = { id: "f3c1-9a", title: "Genesis Plaza Remix" },
}) {
  return (
    <BuilderChrome active="overview">
      <div className="bdinspector">
        {state === "signin" ? (
          <div className="bdinspector__signin">
            <h2>Sign in required</h2>
            <p>You need to sign in with your wallet to open this scene in the Web Editor.</p>
            <button type="button" className="bdinspector__signinbtn">Sign in</button>
          </div>
        ) : (
          <>
            <TopBar project={project} />
            <div className="bdinspector__stage">
              {state === "ready" ? (
                <EditorApp />
              ) : (
                <div className="bdinspector__loader">
                  <Spinner size={42} />
                  <span className="bdinspector__loadertext">Loading scene editor…</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </BuilderChrome>
  );
}
