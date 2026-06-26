import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chinspectorrenderertoolbar.css";

const FreeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8.21354 8.49996L8.29316 8.29366L8.49937 8.21377L13.5 6.27639V6.18949L0.932542 0.932101L6.1971 13.5H6.2837L8.21354 8.49996Z" stroke="white" />
  </svg>
);
const PositionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <g fill="none" fillRule="evenodd">
      <path d="M-4-4h24v24H-4z" />
      <path fill="#FFF" d="M15.875 7.698l-1.97-1.97a.427.427 0 0 0-.604.604l1.03 1.03a.123.123 0 0 1-.088.21H8.551a.123.123 0 0 1-.124-.123V1.757c0-.11.133-.165.211-.087l1.03 1.03a.427.427 0 0 0 .604-.605L8.302.125a.428.428 0 0 0-.604 0l-1.97 1.97a.427.427 0 0 0 .604.604l1.03-1.03a.123.123 0 0 1 .21.088v5.692a.123.123 0 0 1-.123.124H1.757a.123.123 0 0 1-.087-.211l1.03-1.03a.427.427 0 0 0-.605-.604l-1.97 1.97a.428.428 0 0 0 0 .604l1.97 1.97a.427.427 0 0 0 .604-.604l-1.03-1.03a.123.123 0 0 1 .088-.21h5.692c.068 0 .124.055.124.123v5.692c0 .11-.133.165-.211.088l-1.03-1.03a.428.428 0 0 0-.604.604l1.97 1.97a.428.428 0 0 0 .604 0l1.97-1.97a.427.427 0 0 0-.604-.604l-1.03 1.03a.123.123 0 0 1-.21-.088V8.551c0-.068.055-.124.123-.124h5.692c.11 0 .165.133.088.211l-1.03 1.03a.427.427 0 0 0 .604.604l1.97-1.97a.428.428 0 0 0 0-.604z" />
    </g>
  </svg>
);
const RotationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" aria-hidden="true">
    <g fill="none" fillRule="evenodd">
      <path d="M-5-4h24v24H-5z" />
      <path fill="#FFF" d="M13.143 0c.315 0 .571.256.571.571V4a.571.571 0 0 1-.39.544l-3.43 1.143a.572.572 0 0 1-.36-1.086l2.531-.844A6.286 6.286 0 0 0 1.143 8 .571.571 0 1 1 0 8a7.414 7.414 0 0 1 12.571-5.341V.57c0-.315.256-.571.572-.571zm1.143 7.429c.315 0 .571.255.571.571a7.414 7.414 0 0 1-12.571 5.341v2.088a.571.571 0 1 1-1.143 0V12c-.001-.247.157-.466.39-.544l3.43-1.143a.572.572 0 0 1 .36 1.086l-2.531.844A6.286 6.286 0 0 0 13.714 8c0-.316.256-.571.572-.571z" />
    </g>
  </svg>
);
const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#FFF" d="M11 4h-2l3-3 3 3h-2v2h-2v-2zm2 16h2l-3 3-3-3h2v-2h2v2zm-10-7v2l-3-3 3-3v2h2v2h-2zm18-2v-2l3 3-3 3v-2h-2v-2h2zm-4-3h-10v8h10v-8z" />
  </svg>
);

const UndoIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M8 7H14a5 5 0 0 1 0 10H9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 4 6.5 7 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const RedoIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M16 7H10a5 5 0 0 0 0 10h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 4 17.5 7 14 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CaretDown = ({ className, onClick }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className} onClick={onClick}>
    <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CogIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.1 5.1l2.1 2.1M16.8 16.8l2.1 2.1M18.9 5.1l-2.1 2.1M7.2 16.8l-2.1 2.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const ListSettingsIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <path d="M2 4.5h9M2 9h9M2 13.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="14" cy="4.5" r="1.6" fill="currentColor" />
    <circle cx="14" cy="9" r="1.6" fill="currentColor" />
    <circle cx="14" cy="13.5" r="1.6" fill="currentColor" />
  </svg>
);
const PencilIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <path d="M12.2 2.6 15.4 5.8 6.2 15 2.5 15.5 3 11.8 12.2 2.6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <circle cx="9" cy="9" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="5.6" r="0.95" fill="currentColor" />
    <path d="M9 8.2v4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Checkbox = ({ checked, onClick }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="cir__cbicon" onClick={onClick} aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    {checked && (
      <path d="M8 12.5 11 15.5 16.5 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <rect x="2" y="2" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="2" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="10" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="10" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const ResetCameraIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <circle cx="9" cy="9" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 1.8v2.4M9 13.8v2.4M1.8 9h2.4M13.8 9h2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const ZoomInIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5.6v4.8M5.6 8h4.8M12 12l3.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const ZoomOutIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.6 8h4.8M12 12l3.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const KeyboardIcon = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <rect x="1.5" y="4.5" width="15" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 7h.01M6.5 7h.01M9 7h.01M11.5 7h.01M14 7h.01M4 9.5h.01M6.5 9.5h.01M9 9.5h.01M11.5 9.5h.01M14 9.5h.01M6 11.8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const WarningGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" className="cir__warnicon" aria-hidden="true">
    <path d="M8 1.5 15 14H1L8 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11.4" r="0.85" fill="currentColor" />
  </svg>
);

function Toolbar({ activeGizmo, onGizmo, autosaveEnabled }) {
  const [gizmoPanel, setGizmoPanel] = useState(false);
  const [prefPanel, setPrefPanel] = useState(false);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [worldAligned, setWorldAligned] = useState(false);
  const [invertCamera, setInvertCamera] = useState(false);
  const [autosave, setAutosave] = useState(autosaveEnabled);
  const [snaps, setSnaps] = useState({ Position: "0.25", Rotation: "15", Scale: "0.1" });

  return (
    <div className="cir__toolbar">
      {!autosave && (
        <button className="cir__btn cir__save" title="Save changes" type="button">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" style={{ transform: "translateY(2px)" }}>
            <path d="M5 4h11l3 3v13H5V4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 4h7v5H8z" fill="currentColor" />
          </svg>
        </button>
      )}
      <button className="cir__btn cir__undo" title="Undo" type="button">
        <span style={{ display: "inline-flex", transform: "translateY(2px)" }}><UndoIcon /></span>
      </button>
      <button className="cir__btn cir__redo" title="Redo" type="button">
        <span style={{ display: "inline-flex", transform: "translateY(2px)" }}><RedoIcon /></span>
      </button>

      <div className="cir__gizmos">
        <button
          className={"cir__btn cir__gizmo cir__gizmo--free" + (activeGizmo === "free" ? " is-active" : "")}
          title="Free movement tool"
          type="button"
          onClick={() => onGizmo("free")}
        >
          <FreeIcon />
        </button>
        <button
          className={"cir__btn cir__gizmo cir__gizmo--position" + (activeGizmo === "position" ? " is-active" : "")}
          title="Translation tool"
          type="button"
          onClick={() => onGizmo("position")}
        >
          <PositionIcon />
        </button>
        <button
          className={"cir__btn cir__gizmo cir__gizmo--rotation" + (activeGizmo === "rotation" ? " is-active" : "")}
          title="Rotation tool"
          type="button"
          onClick={() => onGizmo("rotation")}
        >
          <RotationIcon />
        </button>
        <button
          className={"cir__btn cir__gizmo cir__gizmo--scale" + (activeGizmo === "scale" ? " is-active" : "")}
          title="Scaling tool"
          type="button"
          onClick={() => onGizmo("scale")}
        >
          <ScaleIcon />
        </button>
        <CaretDown className="cir__open-panel" onClick={() => setGizmoPanel((v) => !v)} />
        <div className={"cir__panel cir__panel--gizmos" + (gizmoPanel ? " is-visible" : "")}>
          <div className="cir__panel-title">
            <label>Snap</label>
            <Checkbox checked={snapEnabled} onClick={() => setSnapEnabled((v) => !v)} />
          </div>
          <div className="cir__snaps">
            {["Position", "Rotation", "Scale"].map((g) => (
              <div className="cir__snap" key={g}>
                <div className="cir__snap-label">{g}</div>
                <input
                  type="number"
                  value={snaps[g]}
                  onChange={(e) => setSnaps((s) => ({ ...s, [g]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <div className="cir__panel-title">
            <label>Align to world</label>
            <Checkbox checked={worldAligned} onClick={() => setWorldAligned((v) => !v)} />
          </div>
        </div>
      </div>

      <div className="cir__preferences">
        <button className="cir__btn cir__pref-btn" title="Preferences" type="button" onClick={() => setPrefPanel((v) => !v)}>
          <span style={{ display: "inline-flex", transform: "translateX(0.5px) translateY(2px)" }}><CogIcon /></span>
        </button>
        <div className={"cir__panel cir__panel--prefs" + (prefPanel ? " is-visible" : "")}>
          <div className="cir__pref-row">
            <label>Invert camera rotation</label>
            <Checkbox checked={invertCamera} onClick={() => setInvertCamera((v) => !v)} />
          </div>
          <div className="cir__pref-row">
            <label>Enable autosave</label>
            <Checkbox checked={autosave} onClick={() => setAutosave((v) => !v)} />
          </div>
        </div>
      </div>

      <button className="cir__btn cir__babylon" title="Inspector" type="button">
        <span style={{ display: "inline-flex", transform: "translateY(2px)" }}><ListSettingsIcon /></span>
      </button>

      <div className="cir__rightcontent">
        <button className="cir__btn cir__edit-scene" title="Edit Scene" type="button">
          <span style={{ display: "inline-flex", transform: "translateY(2px)" }}><PencilIcon /></span>
        </button>
        <button className="cir__btn cir__scene-info is-active" title="Scene Info" type="button">
          <span style={{ display: "inline-flex", transform: "translateY(2px)" }}><InfoIcon /></span>
        </button>
      </div>
    </div>
  );
}

const METRICS = {
  triangles: 412, entities: 18, bodies: 24, materials: 9, textures: 14, geometries: 11,
};
const LIMITS = {
  triangles: 30000, entities: 200, bodies: 300, materials: 25, textures: 30, geometries: 198,
};

function Metrics({ open, onToggle }) {
  return (
    <div className="cir__metrics">
      {open && (
        <div className="cir__metrics-overlay">
          <div className="cir__metrics-header">
            <div>Scene 2x2</div>
            <div>
              800 m<sup>2</sup>
            </div>
          </div>
          <div className="cir__metrics-items">
            {Object.entries(METRICS).map(([key, value]) => (
              <div className="cir__metric" key={key}>
                <div className="cir__metric-title">{key.toUpperCase()}</div>
                <div className="cir__metric-desc">
                  <span className="cir__metric-primary">{value}</span>
                  {"/"}
                  <span className="cir__metric-secondary">{LIMITS[key]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="cir__metrics-buttons">
        <button className={"cir__overlay-btn" + (open ? " is-active" : "")} type="button" onClick={onToggle} title="Scene metrics">
          <GridIcon />
        </button>
      </div>
    </div>
  );
}

function Shortcuts() {
  return (
    <div className="cir__shortcuts">
      <div className="cir__shortcuts-buttons">
        <button className="cir__overlay-btn" type="button" title="Reset camera"><ResetCameraIcon /></button>
        <div className="cir__zoom-buttons">
          <button className="cir__overlay-btn" type="button" title="Zoom in"><ZoomInIcon /></button>
          <button className="cir__overlay-btn" type="button" title="Zoom out"><ZoomOutIcon /></button>
        </div>
        <button className="cir__overlay-btn" type="button" title="View Shortcuts"><KeyboardIcon /></button>
      </div>
    </div>
  );
}

function AxisHelper() {
  return (
    <div className="cir__axis" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="64" height="64">
        <line x1="32" y1="32" x2="56" y2="38" stroke="#e5484d" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="32" x2="32" y2="8" stroke="#46a758" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="32" x2="12" y2="44" stroke="#4493f8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="56" cy="38" r="6" fill="#e5484d" />
        <circle cx="32" cy="8" r="6" fill="#46a758" />
        <circle cx="12" cy="44" r="6" fill="#4493f8" />
        <text x="56" y="41" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">X</text>
        <text x="32" y="11" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">Y</text>
        <text x="12" y="47" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">Z</text>
      </svg>
    </div>
  );
}

export default function ChInspectorRendererToolbar({
  activeGizmo = "position",
  autosaveEnabled = false,
  showWarning = true,
  showCameraSpeed = false,
  metricsOpen = false,
}) {
  const [gizmo, setGizmo] = useState(activeGizmo);
  const [metrics, setMetrics] = useState(metricsOpen);

  const handleGizmo = (g) => setGizmo((cur) => (cur === g ? "free" : g));

  return (
    <CreatorHubChrome active="scenes">
      <div className="cir">
        <Toolbar activeGizmo={gizmo} onGizmo={handleGizmo} autosaveEnabled={autosaveEnabled} />

        <div className="cir__renderer">
          <canvas className="cir__canvas" id="canvas" />

          <div className="cir__warnings">
            {showWarning && (
              <div className="cir__warning">
                <WarningGlyph />
                <span>
                  The <b>rotation gizmo</b> can't be aligned to the entity when it's not scaled
                  proportionally
                </span>
              </div>
            )}
          </div>

          <div className={"cir__camera-speed" + (showCameraSpeed ? " is-visible" : " is-invisible")}>
            Camera speed: 1.0 m/s
          </div>

          <AxisHelper />

          <Metrics open={metrics} onToggle={() => setMetrics((v) => !v)} />

          <div className="cir__minimap" aria-hidden="true">
            <div className="cir__minimap-grid" />
            <div className="cir__minimap-cam" />
          </div>

          <Shortcuts />
        </div>
      </div>
    </CreatorHubChrome>
  );
}
