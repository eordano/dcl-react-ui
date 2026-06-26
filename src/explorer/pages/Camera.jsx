import { useState } from "react";
import "./camera.css";

const SHORTCUTS = [
  { action: "Take a photo", keys: ["Space"] },
  { action: "Move camera", keys: ["W", "A", "S", "D"] },
  { action: "Up / Down", keys: ["Q", "/", "E"] },
  { action: "Rotate", keys: ["Right Mouse"] },
  { action: "Zoom", keys: ["Scroll"] },
  { action: "Adjust speed", keys: ["Shift"] },
  { action: "Roll camera", keys: [",", "/", "."] },
  { action: "Reset roll", keys: ["R"] },
  { action: "Toggle UI", keys: ["H"] },
  { action: "Exit camera", keys: ["Esc"] },
];

function Keys({ keys }) {
  return (
    <span className="cam__keys">
      {keys.map((k, i) =>
        k === "/" ? (
          <span key={i} className="cam__keysep">/</span>
        ) : (
          <kbd key={i} className={"cam__key" + (k.length > 2 ? " cam__key--wide" : "")}>{k}</kbd>
        )
      )}
    </span>
  );
}

export default function Camera() {
  const [showShortcuts, setShowShortcuts] = useState(true);

  return (
    <div className="cam">
      <div className="cam__view">
        <div className="cam__sky" />
        <div className="cam__ground" />
        <div className="cam__sun" />
        <div className="cam__guides">
          <span className="cam__gv" style={{ left: "33.33%" }} />
          <span className="cam__gv" style={{ left: "66.66%" }} />
          <span className="cam__gh" style={{ top: "33.33%" }} />
          <span className="cam__gh" style={{ top: "66.66%" }} />
        </div>
        <span className="cam__crop cam__crop--tl" />
        <span className="cam__crop cam__crop--tr" />
        <span className="cam__crop cam__crop--bl" />
        <span className="cam__crop cam__crop--br" />
      </div>

      {showShortcuts && (
        <aside className="cam__shortcuts">
          <div className="cam__shorthead">
            <h3 className="cam__shorttitle">Camera Controls</h3>
            <button className="cam__shortclose" onClick={() => setShowShortcuts(false)} aria-label="Close">×</button>
          </div>
          <div className="cam__shortlist">
            {SHORTCUTS.map((s) => (
              <div className="cam__shortrow" key={s.action}>
                <span className="cam__shortaction">{s.action}</span>
                <Keys keys={s.keys} />
              </div>
            ))}
          </div>
        </aside>
      )}

      <div className="cam__hud">
        <button className="cam__reel" title="Camera Reel" data-sb-linkto="Explorer/Pages/Reel">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <rect x="3" y="6" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12.5" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 6l1.5-2h5L16 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          <span>Camera Reel</span>
        </button>

        <div className="cam__shutterwrap">
          <button className="cam__shutter" aria-label="Take photo"><span /></button>
          <span className="cam__spacebar">[ SPACE BAR ]</span>
        </div>

        <div className="cam__hudright">
          <button
            className={"cam__iconbtn" + (showShortcuts ? " is-active" : "")}
            onClick={() => setShowShortcuts((s) => !s)}
            title="Camera Controls"
          >?</button>
          <button className="cam__iconbtn" aria-label="Close camera">×</button>
        </div>
      </div>
    </div>
  );
}
