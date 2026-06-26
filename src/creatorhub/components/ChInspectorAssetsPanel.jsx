import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { ChevronLeft } from "../../atoms/icons.jsx";
import { asset } from "../../asset.js";
import "./chinspectorassetspanel.css";

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
    <path d="M20 11a8 8 0 0 0-14.3-4.9M4 4v4h4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 13a8 8 0 0 0 14.3 4.9M20 20v-4h-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FolderOpenIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
    <path d="M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v2H4.5L3 17V7Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M4.5 11h17l-1.8 6.6a1 1 0 0 1-1 .7H3.4l1.1-7.3Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const CleanupIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
    <path d="M14 3l7 7-9 9-7 1 1-7 8-10Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M11 6l7 7" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const FolderTab = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path d="M2 5a1 1 0 0 1 1-1h4l1.6 1.6H17a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  </svg>
);
const CustomTabIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="13" aria-hidden="true">
    <path d="M10 1.5 17.5 5 10 8.5 2.5 5 10 1.5Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    <path d="M2.5 10 10 13.5 17.5 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
  </svg>
);
const ImageSearchIcon = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <rect x="2.5" y="2.5" width="12" height="12" rx="1.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="7" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="m4.5 12 3-3 2.2 2.2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
    <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="m16.4 16.4 1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const TerminalTabIcon = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <rect x="2.5" y="3.5" width="15" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="m5.5 8 2.2 2.2L5.5 12.4M10 12.5h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden="true" className="chiap__chev">
    <path d="M1 1l5.5 6L1 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LightningIcon = () => (
  <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
    <path d="M9 1 3 9h4l-1 6 6-8H8l1-6Z" fill="currentColor" />
  </svg>
);
const FileGlyph = ({ ext }) => (
  <span className="chiap__fileglyph">
    <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
      <path d="M6 2h8l4 4v16H6V2Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <path d="M14 2v4h4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    </svg>
    <em className="chiap__fileext">{ext}</em>
  </span>
);

const THEMES = [
  { id: "shapes", name: "shapes", thumb: 18, count: 24 },
  { id: "nature", name: "nature", thumb: 96, count: 58 },
  { id: "structures", name: "structures", thumb: 152, count: 41 },
  { id: "furniture", name: "furniture", thumb: 204, count: 73 },
  { id: "decorations", name: "decorations", thumb: 280, count: 36 },
  { id: "appliances", name: "appliances", thumb: 332, count: 19 },
  { id: "lighting", name: "lighting", thumb: 12, count: 22 },
  { id: "kitchen", name: "kitchen", thumb: 60, count: 31 },
  { id: "bathroom", name: "bathroom", thumb: 120, count: 27 },
  { id: "garden", name: "garden", thumb: 180, count: 44 },
  { id: "art", name: "art", thumb: 240, count: 15 },
  { id: "smart items", name: "smart items", thumb: 300, count: 52 },
];

const CATEGORY_DATA = {
  shapes: [
    {
      name: "Primitives",
      assets: [
        { id: "cube", hue: 18, smart: false },
        { id: "sphere", hue: 200, smart: false },
        { id: "cylinder", hue: 96, smart: false },
        { id: "plane", hue: 280, smart: false },
        { id: "cone", hue: 40, smart: false },
        { id: "torus", hue: 320, smart: false },
      ],
    },
    {
      name: "Smart shapes",
      assets: [
        { id: "button-cube", hue: 290, smart: true },
        { id: "trigger-box", hue: 290, smart: true },
        { id: "door", hue: 290, smart: true },
        { id: "lever", hue: 290, smart: true },
      ],
    },
  ],
};

const LOCAL_TREE = [
  { name: "assets", folder: true, open: true, depth: 0 },
  { name: "scene", folder: true, open: true, depth: 1 },
  { name: "models", folder: true, open: false, depth: 1 },
  { name: "images", folder: true, open: false, depth: 1 },
  { name: "main.composite", folder: false, depth: 1 },
];
const LOCAL_FILES = [
  { name: "Tree_01.glb", ext: "GLB", hue: 110 },
  { name: "Rock_02.glb", ext: "GLB", hue: 30 },
  { name: "House.glb", ext: "GLB", hue: 210 },
  { name: "floor.png", ext: "PNG", hue: 280 },
  { name: "scene.json", ext: "JSON", hue: 50 },
  { name: "Bench.glb", ext: "GLB", hue: 160 },
];

const CUSTOM_ITEMS = [
  { id: "ci-1", name: "Spinning platform", hue: 290 },
  { id: "ci-2", name: "Reward chest", hue: 40 },
  { id: "ci-3", name: "Teleport pad", hue: 200 },
  { id: "ci-4", name: "NPC stand", hue: 320 },
];

const CONSOLE_LINES = [
  "[12:04:01] Scene loaded — 6 entities",
  "[12:04:01] Composite main.composite deserialized",
  "[12:04:02] [warn] MeshRenderer on entity 512 has no material",
  "[12:04:03] Pointer event registered on entity 514",
  "[12:04:05] System tick 120 — 60fps",
];

const TABS = [
  { id: "local", label: "LOCAL ASSETS", icon: <FolderTab /> },
  { id: "custom", label: "CUSTOM ITEMS", icon: <CustomTabIcon /> },
  { id: "packs", label: "ASSET PACKS", icon: <ImageSearchIcon /> },
];

function AssetTile({ a }) {
  return (
    <div className={"chiap__asset" + (a.smart ? " is-smart" : "")} title={a.id}>
      <span className="chiap__assetimg" style={{ "--hue": a.hue }} />
      {a.smart && (
        <span className="chiap__assetbadge">
          <LightningIcon />
        </span>
      )}
    </div>
  );
}

function PacksView({ theme, onTheme }) {
  const drilled = theme && CATEGORY_DATA[theme] ? theme : null;
  const title = drilled ? drilled : "Asset Packs";
  const placeholder = drilled ? `Search ${drilled}` : "Search Asset Packs";
  return (
    <div className="chiap__catalog">
      <div className="chiap__cathead">
        <h2
          className={"chiap__cattitle" + (drilled ? " is-clickable" : "")}
          onClick={() => drilled && onTheme?.(null)}
        >
          {drilled && <span className="chiap__back"><ChevronLeft size={24} /></span>}
          {title}
        </h2>
        <div className="chiap__catsearch">
          <SearchField placeholder={placeholder} />
        </div>
      </div>

      {drilled ? (
        <div className="chiap__categories">
          {CATEGORY_DATA[drilled].map((cat) => (
            <div className="chiap__category" key={cat.name}>
              <h4 className="chiap__catname">{cat.name}</h4>
              <div className="chiap__assets">
                {cat.assets.map((a) => (
                  <AssetTile a={a} key={a.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="chiap__themescroll">
          <div className="chiap__themes">
            {THEMES.map((t) => (
              <div
                className="chiap__theme"
                key={t.id}
                onClick={() => CATEGORY_DATA[t.id] && onTheme?.(t.id)}
              >
                <span className="chiap__thumb" style={{ "--hue": t.thumb }} />
                <span className="chiap__themeinfo">
                  <h4 className="chiap__themename">{t.name}</h4>
                  <span className="chiap__themecount">{t.count} items</span>
                </span>
                <ChevronRight />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LocalView() {
  return (
    <div className="chiap__project">
      <div className="chiap__tree">
        <div className="chiap__treesearch">
          <SearchField placeholder="Search" />
        </div>
        <ul className="chiap__treelist">
          {LOCAL_TREE.map((n, i) => (
            <li
              className="chiap__treerow"
              key={i}
              style={{ paddingLeft: 8 + n.depth * 14 + "px" }}
            >
              {n.folder ? (
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="chiap__twist" data-open={n.open ? "1" : "0"}>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="chiap__twist chiap__twist--empty" />
              )}
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="chiap__treeicon">
                {n.folder ? (
                  <path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                ) : (
                  <path d="M6 2h8l4 4v16H6V2Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                )}
              </svg>
              <span className="chiap__treelabel u-truncate">{n.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chiap__folderview">
        {LOCAL_FILES.map((f) => (
          <div className="chiap__filetile" key={f.name} title={f.name}>
            <span className="chiap__filebox" style={{ "--hue": f.hue }}>
              <FileGlyph ext={f.ext} />
            </span>
            <span className="chiap__filelabel u-truncate">{f.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomView() {
  if (CUSTOM_ITEMS.length === 0) {
    return (
      <div className="chiap__customempty">
        <div className="chiap__customcard">
          <div className="chiap__customcardrow">
            <span className="chiap__customglyph">
              <CustomTabIcon />
            </span>
            <p>
              Create custom items by selecting one or more entities, then choosing
              {" “"}
              <strong>Create Custom Item</strong>
              {"”"} from the right-click menu.
            </p>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()}>
            WATCH TUTORIAL
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="chiap__customgrid">
      {CUSTOM_ITEMS.map((c) => (
        <div className="chiap__customitem" key={c.id}>
          <span className="chiap__custombox" style={{ "--hue": c.hue }} title={c.name} />
          <span className="chiap__customlabel">{c.name}</span>
        </div>
      ))}
    </div>
  );
}

function ConsoleView() {
  return (
    <div className="chiap__console">
      {CONSOLE_LINES.map((l, i) => (
        <span
          className={"chiap__line" + (l.includes("[warn]") ? " is-warn" : "")}
          key={i}
        >
          {l}
        </span>
      ))}
    </div>
  );
}

function AssetsDock({ tab: tabProp = "packs", theme: themeProp = null }) {
  const [tab, setTab] = useState(tabProp);
  const [theme, setTheme] = useState(themeProp);

  const showCleanup = tab === "local";
  const showOpenFolder = tab === "local" || tab === "custom";

  return (
    <div className="chiap">
      <div className="chiap__viewport">
        <div className="chiap__grid" aria-hidden="true" />
        <div className="chiap__vp-hint">Renderer</div>
      </div>

      <div className="chiap__handle" aria-hidden="true" />

      <div className="chiap__panel">
        <div className="chiap__bar">
          {tab !== "console" && (
            <div className="chiap__barleft">
              <button type="button" className="chiap__import">
                <PlusIcon />
                IMPORT ASSETS
              </button>
              <button type="button" className="chiap__iconitem" title="Refresh assets">
                <RefreshIcon />
              </button>
              {showOpenFolder && (
                <button type="button" className="chiap__iconitem" title="Open scene folder in Explorer">
                  <FolderOpenIcon />
                </button>
              )}
              {showCleanup && (
                <button type="button" className="chiap__iconitem" title="Clean unused assets">
                  <CleanupIcon />
                </button>
              )}
            </div>
          )}

          {TABS.map((t) => (
            <div className="chiap__tab" key={t.id} onClick={() => setTab(t.id)}>
              <div className={tab === t.id ? "is-underlined" : ""}>
                {t.icon}
                <span>{t.label}</span>
              </div>
            </div>
          ))}
          {tab === "console" && (
            <div className="chiap__tab" onClick={() => setTab("console")}>
              <div className="is-underlined">
                <TerminalTabIcon />
                <span>CONSOLE</span>
              </div>
            </div>
          )}
        </div>

        <div className="chiap__content">
          {tab === "packs" && <PacksView theme={theme} onTheme={setTheme} />}
          {tab === "local" && <LocalView />}
          {tab === "custom" && <CustomView />}
          {tab === "console" && <ConsoleView />}
        </div>
      </div>
    </div>
  );
}

export default function ChInspectorAssetsPanel({ tab = "packs", theme = null }) {
  return (
    <CreatorHubChrome active="scenes">
      <AssetsDock tab={tab} theme={theme} key={tab + String(theme)} />
    </CreatorHubChrome>
  );
}
