import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import Slider from "../../atoms/Slider.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import "./settings.css";

const pct = (v) => Math.round(v) + "%";

const PILL_ICONS = {
  graphics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  sounds: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  ),
  controls: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="7" width="19" height="10" rx="5" />
      <path d="M7 10v4M5 12h4M15.5 11h.01M18 13h.01" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  ),
};

const PILLS = [
  { id: "graphics", label: "Graphics" },
  { id: "sounds", label: "Sounds" },
  { id: "controls", label: "Controls" },
  { id: "chat", label: "Chat" },
];

const CONTENT = {
  graphics: [
    { title: "General", modules: [
      { kind: "dropdown", title: "Graphics Preset", options: ["Low", "Medium", "High", "Custom"], defaultValue: "Custom" },
    ]},
    { title: "Display", modules: [
      { kind: "dropdown", title: "Resolution", options: ["1280x720", "1920x1080", "2560x1440", "3840x2160"], defaultValue: "3840x2160" },
      { kind: "slider", title: "Resolution Scale", defaultValue: 120, min: 50, max: 200, format: pct },
      { kind: "toggle", title: "Fullscreen" },
      { kind: "dropdown", title: "FPS Limit", options: ["30", "60", "120", "144", "Unlimited"], defaultValue: "144" },
      { kind: "toggle", title: "VSync", defaultChecked: true },
    ]},
    { title: "Post Processing", modules: [
      { kind: "dropdown", title: "MSAA", options: ["Off", "X2", "X4", "X8"], defaultValue: "X8" },
      { kind: "toggle", title: "HDR", defaultChecked: true },
      { kind: "toggle", title: "Bloom", defaultChecked: true },
      { kind: "toggle", title: "Avatar Outline", defaultChecked: true },
    ]},
    { title: "Landscape and Foilage", modules: [
      { kind: "slider", title: "Detail density", defaultValue: 60, format: pct },
      { kind: "slider", title: "Draw distance", defaultValue: 80, format: pct },
    ]},
    { title: "Shadows", modules: [
      { kind: "dropdown", title: "Shadow quality", options: ["Off", "Low", "Medium", "High"], defaultValue: "Medium" },
      { kind: "slider", title: "Shadow distance", defaultValue: 70, format: pct },
    ]},
  ],
  sounds: [
    { title: "Volume", modules: [
      { kind: "slider", title: "Master volume", defaultValue: 90, format: pct },
      { kind: "slider", title: "Music", defaultValue: 75, format: pct },
      { kind: "slider", title: "World sounds", defaultValue: 80, format: pct },
      { kind: "slider", title: "Avatar sounds", defaultValue: 80, format: pct },
      { kind: "slider", title: "UI sounds", defaultValue: 60, format: pct },
    ]},
    { title: "Voice Chat & Streams", modules: [
      { kind: "slider", title: "Voice chat volume", defaultValue: 85, format: pct },
      { kind: "toggle", title: "Mute mic in background", defaultChecked: true },
      { kind: "toggle", title: "Play current scene stream" },
    ]},
  ],
  controls: [
    { title: "Mouse", modules: [
      { kind: "slider", title: "Horizontal sensitivity", defaultValue: 50, format: pct },
      { kind: "slider", title: "Vertical sensitivity", defaultValue: 50, format: pct },
      { kind: "dropdown", title: "Input device", options: ["Keyboard & Mouse", "Gamepad"] },
    ]},
    { title: "Point At", modules: [
      { kind: "dropdown", title: "Point-at marker", options: ["Everyone", "Friends", "Off"], defaultValue: "Everyone" },
    ]},
  ],
  chat: [
    { title: "General", modules: [
      { kind: "dropdown", title: "Chat sounds", options: ["All", "Mentions only", "Off"], defaultValue: "All" },
      { kind: "toggle", title: "Chat reactions", defaultChecked: true },
      { kind: "dropdown", title: "Chat privacy", options: ["Everyone", "Friends", "Nobody"], defaultValue: "Friends" },
      { kind: "toggle", title: "Hide blocked users", defaultChecked: true },
      { kind: "toggle", title: "Chat translation" },
    ]},
  ],
};

function Module({ m }) {
  return (
    <div className="set__module">
      <div className="set__modtitle">{m.title}</div>
      <div className="set__modctl">
        {m.kind === "toggle" && <Toggle defaultChecked={m.defaultChecked} />}
        {m.kind === "slider" && (
          <Slider defaultValue={m.defaultValue} min={m.min} max={m.max} format={m.format} />
        )}
        {m.kind === "dropdown" && <Dropdown options={m.options} defaultValue={m.defaultValue} />}
      </div>
    </div>
  );
}

export default function Settings() {
  const [tab, setTab] = useState("settings");
  const [pill, setPill] = useState("graphics");
  const groups = CONTENT[pill] || [];

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="set">
        <div className="set__head">
          <h1 className="set__title">Settings</h1>
          <div className="set__pills" role="tablist" aria-label="Settings sections">
            {PILLS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === pill}
                className={"set__pill" + (p.id === pill ? " is-active" : "")}
                onClick={() => setPill(p.id)}
              >
                <span className="set__pillicon">{PILL_ICONS[p.id]}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="set__card">
          <div className="set__content">
            {groups.length === 0 && (
              <div className="set__empty">No settings in this section yet.</div>
            )}
            {groups.map((g) => (
              <section className="set__group" key={g.title}>
                <h3 className="set__grouptitle">{g.title}</h3>
                <div className="set__modules">
                  {g.modules.map((m) => <Module key={m.title} m={m} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </ExploreChrome>
  );
}
