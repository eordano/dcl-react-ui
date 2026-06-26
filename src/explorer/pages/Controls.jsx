import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import "./controls.css";

const SECTIONS = [
  { id: "graphics", label: "Graphics" },
  { id: "sounds", label: "Sounds" },
  { id: "controls", label: "Controls" },
  { id: "chat", label: "Chat" },
];

function Sensitivity({ label }) {
  const [v, setV] = useState(50);
  const readout = (v / 50).toFixed(2);
  const step = (d) => setV((x) => Math.max(0, Math.min(100, x + d)));
  return (
    <div className="ct__field">
      <div className="ct__fieldhead">
        <span className="ct__label">{label}</span>
        <span className="ct__value">{readout}</span>
      </div>
      <div className="ct__sense">
        <button type="button" className="ct__step" aria-label={label + " down"} onClick={() => step(-5)}>
          <svg viewBox="0 0 8 14" aria-hidden="true"><path d="M6.5 1 1 7l5.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <input
          type="range" className="ct__track" aria-label={label}
          min={0} max={100} value={v}
          onChange={(e) => setV(Number(e.target.value))}
          style={{ "--pct": v + "%" }}
        />
        <button type="button" className="ct__step" aria-label={label + " up"} onClick={() => step(5)}>
          <svg viewBox="0 0 8 14" aria-hidden="true"><path d="M1.5 1 7 7l-5.5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

// In-world Settings overlay for the Explorer HUD. Pass `bare` to render just the
// settings panel without the surrounding ExploreChrome nav (used by the story).
export default function Controls({ bare = false }) {
  const [tab, setTab] = useState("settings");
  const [section, setSection] = useState("controls");

  const panel = (
    <div className={"ct" + (bare ? " ct--bare" : "")}>
        <div className="ct__head">
          <h1 className="ct__pagetitle">Settings</h1>
          <nav className="ct__sections" aria-label="Settings sections">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={"ct__sectionbtn" + (s.id === section ? " is-active" : "")}
                aria-current={s.id === section ? "page" : undefined}
                onClick={() => setSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="ct__card">
          <section className="ct__group">
            <h2 className="ct__grouptitle">Mouse</h2>
            <div className="ct__grid">
              <Sensitivity label="Vertical sensitivity" />
              <Sensitivity label="Horizontal sensitivity" />
            </div>
            <div className="ct__field ct__field--toggle">
              <span className="ct__label">Head Sync</span>
              <Toggle defaultChecked />
            </div>
          </section>

          <section className="ct__group">
            <h2 className="ct__grouptitle">Point At</h2>
            <div className="ct__field ct__field--narrow">
              <span className="ct__label">Marker Visibility</span>
              <Dropdown options={["Everyone", "Friends Only", "Off"]} defaultValue="Friends Only" />
            </div>
          </section>
        </div>
      </div>
  );

  if (bare) return panel;

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      {panel}
    </ExploreChrome>
  );
}
