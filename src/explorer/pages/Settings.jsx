import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import Slider from "../../atoms/Slider.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import { sendBridge } from "../../overlay/bridge.js";
import "./settings.css";

const pct = (v) => Math.round(v) + "%";

function emitSetting(m, raw) {
  if (m.fullscreen) {
    try {
      if (raw) document.documentElement.requestFullscreen?.();
      else if (document.fullscreenElement) document.exitFullscreen?.();
    } catch {
    }
    return;
  }
  if (!m.setting) return;
  let value;
  if (m.kind === "toggle") value = raw ? (m.on ?? 1) : (m.off ?? 0);
  else if (m.kind === "dropdown") {
    const i = m.options.indexOf(raw);
    value = m.values ? m.values[i] ?? 0 : i;
  } else value = Number(raw) * (m.scale ?? 1);
  sendBridge("SetSetting", { name: m.setting, value });
}

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
    { title: "Display", modules: [
      { kind: "toggle", title: "Fullscreen", fullscreen: true },
      { kind: "dropdown", title: "FPS Limit", setting: "Target Frame Rate",
        options: ["30", "60", "120", "144", "Unlimited"], values: [3, 4, 5, 6, 7], defaultValue: "144" },
    ]},
    { title: "Post Processing", modules: [
      { kind: "dropdown", title: "Anti-aliasing", setting: "Anti-aliasing",
        options: ["Off", "FXAA Low", "FXAA High"], values: [0, 1, 2], defaultValue: "FXAA High" },
      { kind: "toggle", title: "Bloom", setting: "Bloom", on: 2, off: 0, defaultChecked: true },
      { kind: "dropdown", title: "Depth of Field", setting: "Depth of Field",
        options: ["Off", "Low", "High"], values: [0, 1, 2], defaultValue: "High" },
      { kind: "dropdown", title: "Fog", setting: "Fog",
        options: ["Off", "Basic", "Atmospheric"], values: [0, 1, 2], defaultValue: "Atmospheric" },
    ]},
    { title: "Lighting", modules: [
      { kind: "slider", title: "Ambient brightness", setting: "Ambient Brightness", defaultValue: 50, format: pct },
    ]},
    { title: "Shadows", modules: [
      { kind: "dropdown", title: "Shadow quality", setting: "Shadow settings",
        options: ["Off", "Low", "High"], values: [0, 1, 2], defaultValue: "High" },
      { kind: "slider", title: "Shadow distance", setting: "Shadow Distance", scale: 3, defaultValue: 67, format: pct },
    ]},
  ],
  sounds: [
    { title: "Volume", modules: [
      { kind: "slider", title: "Master volume", setting: "Master Volume", defaultValue: 90, format: pct },
      { kind: "slider", title: "World sounds", setting: "Scene Volume", defaultValue: 80, format: pct },
      { kind: "slider", title: "Avatar sounds", setting: "Avatar Volume", defaultValue: 80, format: pct },
      { kind: "slider", title: "UI sounds", setting: "System Volume", defaultValue: 60, format: pct },
    ]},
    { title: "Voice Chat", modules: [
      { kind: "slider", title: "Voice chat volume", setting: "Voice Volume", defaultValue: 85, format: pct },
    ]},
  ],
  controls: [
    { title: "Mouse", modules: [
      { kind: "slider", title: "Look sensitivity", setting: "Pointer and Locked Camera sensitivity", defaultValue: 50, format: pct },
      { kind: "slider", title: "Camera sensitivity", setting: "Camera Sensitivity", defaultValue: 50, format: pct },
    ]},
    { title: "Point At", modules: [
      { kind: "dropdown", title: "Point-at marker", setting: "Point at marker visibility",
        options: ["Everyone", "Friends", "Off"], values: [0, 1, 2], defaultValue: "Everyone" },
    ]},
  ],
};

function Module({ m }) {
  return (
    <div className="set__module">
      <div className="set__modtitle">{m.title}</div>
      <div className="set__modctl">
        {m.kind === "toggle" && (
          <Toggle ariaLabel={m.title} defaultChecked={m.defaultChecked} onChange={(v) => emitSetting(m, v)} />
        )}
        {m.kind === "slider" && (
          <Slider
            ariaLabel={m.title}
            defaultValue={m.defaultValue}
            min={m.min}
            max={m.max}
            format={m.format}
            onChange={(v) => emitSetting(m, v)}
          />
        )}
        {m.kind === "dropdown" && (
          <Dropdown ariaLabel={m.title} options={m.options} defaultValue={m.defaultValue} onChange={(v) => emitSetting(m, v)} />
        )}
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
