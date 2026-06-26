import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import { CATEGORIES } from "../../atoms/mapCategories.js";
import "./map.css";
import "./mapfilters.css";

const FIND = [
  {
    k: "live", label: "Live Events", color: "#ff7a18", on: true,
    icon: <path d="M8 5v14l11-7z" />,
  },
  {
    k: "poi", label: "Points of interest", color: "#ffb019", on: true,
    icon: <path d="M12 2a6 6 0 0 0-6 6c0 4.4 6 12 6 12s6-7.6 6-12a6 6 0 0 0-6-6zm0 8.2A2.2 2.2 0 1 1 12 5.8a2.2 2.2 0 0 1 0 4.4z" />,
  },
  {
    k: "minigames", label: "Quest Mini-Games", color: "#a14bff", on: true,
    icon: <path d="M12 2l8 3v6c0 4.5-3.2 8.5-8 9-4.8-.5-8-4.5-8-9V5l8-3z" />,
  },
];

function FindRow({ label, color, icon, on }) {
  return (
    <label className="mf__row">
      <span className="mf__icon" style={{ "--ic": color }}>
        <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true" fill="#fff">{icon}</svg>
      </span>
      <span className="mf__rowlabel">{label}</span>
      <Toggle defaultChecked={on} />
    </label>
  );
}

export default function MapFilters() {
  const [tab, setTab] = useState("map");
  const [type, setType] = useState("satellite");
  const [cat, setCat] = useState("ALL");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="map__shell">
        <div className="map__tiles">
          <div className="map__grid" />
          <div className="map__roads" />
          <div className="map__district map__district--plaza" style={{ left: "46%", top: "44%", width: "8%", height: "9%" }} />
          <div className="map__district map__district--purple" style={{ left: "26%", top: "28%", width: "10%", height: "12%" }} />
          <div className="map__district map__district--blue" style={{ left: "60%", top: "56%", width: "13%", height: "11%" }} />
          <div className="map__district map__district--pink" style={{ left: "58%", top: "23%", width: "9%", height: "8%" }} />

          <div className="map__player" style={{ left: "50%", top: "48%" }}>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d="M12 2 19 21l-7-4-7 4 7-19z" fill="var(--explore-orange)" />
            </svg>
          </div>
        </div>

        <div className="map__catbar">
          <div className="map__cats" role="tablist" aria-label="Place categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={c.key === cat}
                className={"map__catpill" + (c.key === cat ? " is-on" : "")}
                onClick={() => setCat(c.key)}
              >
                {c.key === "ALL" ? (
                  <span className="map__catglyph map__catglyph--all" aria-hidden="true">▦</span>
                ) : c.key === "FAVORITES" ? (
                  <span className="map__catglyph map__catglyph--heart" aria-hidden="true" style={{ color: c.color }}>♥</span>
                ) : (
                  <span className="map__catdot" aria-hidden="true" style={{ background: c.color }} />
                )}
                {c.key}
              </button>
            ))}
          </div>
          <div className="map__search">
            <SearchField placeholder="Search" />
          </div>
        </div>

        <div className="map__zoom mf__controls">
          <button className="map__zbtn map__locate" aria-label="Recenter">⊕</button>
          <div className="map__zgroup">
            <button className="map__zbtn" aria-label="Zoom in">+</button>
            <button className="map__zbtn" aria-label="Zoom out">−</button>
          </div>
        </div>

        <aside className="mf" aria-label="Map layers">
          <h2 className="mf__title">Layers</h2>

          <section className="mf__sec">
            <h3 className="mf__sectitle">Pins</h3>
            <div className="mf__rows">
              {FIND.map((p) => <FindRow key={p.k} {...p} />)}
            </div>
          </section>

          <section className="mf__sec">
            <h3 className="mf__sectitle">Details</h3>
            <div className="mf__rows">
              <label className="mf__row">
                <span className="mf__icon" style={{ "--ic": "#5db0ff" }}>
                  <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true" fill="#fff">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
                  </svg>
                </span>
                <span className="mf__rowlabel">People</span>
                <Toggle defaultChecked />
              </label>
            </div>
          </section>

          <section className="mf__sec">
            <h3 className="mf__sectitle">Map Type</h3>
            <div className="mf__types">
              {[["satellite", "Satellite"], ["parcels", "Parcels"]].map(([id, label]) => (
                <button
                  key={id}
                  className={"mf__type mf__type--" + id + (type === id ? " is-active" : "")}
                  onClick={() => setType(id)}
                >
                  <span className="mf__thumb" />
                  <span className="mf__typelabel">{label}</span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </ExploreChrome>
  );
}
