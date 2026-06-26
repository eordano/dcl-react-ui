import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import "./navigation.css";

const CATEGORIES = [
  { id: "all", label: "All", color: "#3d7dff", glyph: "grid" },
  { id: "favorites", label: "Favorites", color: "#ff2d55", glyph: "heart" },
  { id: "social", label: "Social", color: "#3d7dff", glyph: "social" },
  { id: "music", label: "Music", color: "#22b14c", glyph: "music" },
  { id: "art", label: "Art", color: "#7a3bd6", glyph: "art" },
  { id: "game", label: "Game", color: "#7a3bd6", glyph: "game" },
  { id: "fashion", label: "Fashion", color: "#e83bb0", glyph: "fashion" },
  { id: "education", label: "Education", color: "#2a2f6b", glyph: "education" },
  { id: "shop", label: "Shop", color: "#d83bc8", glyph: "shop" },
  { id: "sports", label: "Sports", color: "#f08a2c", glyph: "sports" },
  { id: "business", label: "Business", color: "#5a6478", glyph: "business" },
];

const GLYPHS = {
  grid: <path d="M3 3h3v3H3V3Zm4.5 0h3v3h-3V3ZM12 3h3v3h-3V3ZM3 7.5h3v3H3v-3Zm4.5 0h3v3h-3v-3Zm4.5 0h3v3h-3v-3ZM3 12h3v3H3v-3Zm4.5 0h3v3h-3v-3Zm4.5 0h3v3h-3v-3Z" fill="#fff" />,
  heart: <path d="M8 14S2 10.4 2 6.2A3.2 3.2 0 0 1 8 4.6 3.2 3.2 0 0 1 14 6.2C14 10.4 8 14 8 14Z" fill="#fff" />,
  social: <g fill="#fff"><circle cx="6" cy="6" r="2.2" /><circle cx="11" cy="6.6" r="1.8" /><path d="M2 13c0-2.2 1.8-3.6 4-3.6S10 10.8 10 13H2Z" /><path d="M10.3 9.6c1.7.1 3.7 1.1 3.7 3.4h-3.2c0-1.3-.4-2.5-.5-3.4Z" /></g>,
  music: <g fill="#fff"><path d="M6 3.5 13 2v8.2A2.2 2.2 0 1 1 11.5 8V4.3L7.5 5.2V12A2.2 2.2 0 1 1 6 10V3.5Z" /></g>,
  art: <path d="M8 2a6 6 0 0 0 0 12c.9 0 1.4-.7 1.4-1.4 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.6.5-1.1 1.1-1.1H11a3 3 0 0 0 3-3C14 4.2 11.3 2 8 2Zm-3.4 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1.6-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3.6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.6 2.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="#fff" />,
  game: <path d="M5 5h6a3.5 3.5 0 0 1 3.5 3.5v.4a2.6 2.6 0 0 1-4.6 1.6l-.3-.4H6.4l-.3.4A2.6 2.6 0 0 1 1.5 8.9v-.4A3.5 3.5 0 0 1 5 5Zm-.4 1.8v1H3.6v1.1h1v1h1.1v-1h1V7.8h-1v-1H4.6Zm6.4-.1a.85.85 0 1 0 0 1.7.85.85 0 0 0 0-1.7Zm-1.4 1.4a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z" fill="#fff" />,
  fashion: <path d="M6 2c0 1.1.9 2 2 2s2-.9 2-2l3 3-1.4 1.4-1-.9V14H5.4V5.5l-1 .9L3 5l3-3Z" fill="#fff" />,
  education: <path d="M8 3 2 6l6 3 4.4-2.2V10h1.1V6.1L8 3Zm-3 5.6V11c0 .8 1.3 1.6 3 1.6s3-.8 3-1.6V8.6L8 10 5 8.6Z" fill="#fff" />,
  shop: <path d="M5 5V4.5a3 3 0 0 1 6 0V5h2l.7 8.2A1 1 0 0 1 12.7 14H3.3a1 1 0 0 1-1-1.1L3 5h2Zm1.4 0h3.2v-.5a1.6 1.6 0 0 0-3.2 0V5Z" fill="#fff" />,
  sports: <g fill="none" stroke="#fff" strokeWidth="1.1"><circle cx="8" cy="8" r="5.6" /><path d="M8 2.4 8 13.6M2.4 8h11.2M4 4l8 8M12 4 4 12" /></g>,
  business: <path d="M3 13.5V5l5-2 5 2v8.5H3Zm2-6.5h2V8.5H5V7Zm0 3h2v1.5H5V10Zm4-3h2V8.5H9V7Zm0 3h2v1.5H9V10Z" fill="#fff" />,
};

const PINS = [
  { id: "gp", x: 50, y: 46, kind: "poi" },
  { id: "sm", x: 31, y: 33, kind: "live" },
  { id: "mi", x: 70, y: 60, kind: "place" },
  { id: "fw", x: 62, y: 28, kind: "fav" },
];

function PinIcon() {
  return (
    <svg viewBox="0 0 24 32" width="22" height="29" aria-hidden="true">
      <path
        d="M12 0C5.4 0 0 5.2 0 11.7 0 20 12 32 12 32s12-12 12-20.3C24 5.2 18.6 0 12 0z"
        className="nv__pindrop"
      />
      <circle cx="12" cy="11.5" r="4.6" fill="#fff" />
    </svg>
  );
}

export default function Navigation() {
  const [tab, setTab] = useState("map");
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="nv">
        <div className="nv__filters">
          <div className="nv__cats">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={"nv__cat" + (c.id === cat ? " is-active" : "")}
                aria-pressed={c.id === cat}
                onClick={() => setCat(c.id)}
              >
                <span className="nv__catbadge" style={{ background: c.color }} aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11">{GLYPHS[c.glyph]}</svg>
                </span>
                {c.label}
              </button>
            ))}
          </div>
          <div className="nv__search">
            <SearchField placeholder="Search" value={query} onChange={setQuery} debounce={0} />
          </div>
        </div>

        <div className="nv__map">
          <div className="nv__tiles">
            <div className="nv__grid" />
            <div className="nv__roads" />
            <div className="nv__district nv__district--plaza" style={{ left: "46%", top: "42%", width: "8%", height: "9%" }} />
            <div className="nv__district nv__district--purple" style={{ left: "26%", top: "26%", width: "10%", height: "12%" }} />
            <div className="nv__district nv__district--blue" style={{ left: "60%", top: "54%", width: "13%", height: "11%" }} />
            <div className="nv__district nv__district--pink" style={{ left: "58%", top: "22%", width: "9%", height: "8%" }} />
          </div>

          {PINS.map((p) => (
            <span
              key={p.id}
              className={"nv__pin nv__pin--" + p.kind}
              style={{ left: p.x + "%", top: p.y + "%" }}
              aria-hidden="true"
            >
              <PinIcon />
            </span>
          ))}

          <div className="nv__compass" role="img" aria-label="You are here">
            <svg viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
              <path d="M36 12 14 22l9 4 4 9 9-23Z" className="nv__arrow" />
            </svg>
          </div>

          <div className="nv__controls">
            <button type="button" className="nv__cbtn nv__cbtn--dark" aria-label="Recenter on me">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="3.4" fill="currentColor" />
                <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <span className="nv__cdivider" aria-hidden="true" />
            <div className="nv__group">
              <button type="button" className="nv__gbtn" aria-label="Map layers">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M12 3 2 9l10 6 10-6-10-6Zm0 9.5L4.2 8 12 4.2 19.8 8 12 12.5Z" fill="currentColor" />
                  <path d="M2 15l10 6 10-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="nv__gsep" aria-hidden="true" />
              <button type="button" className="nv__gbtn nv__gbtn--text" aria-label="Zoom in">+</button>
              <span className="nv__gsep" aria-hidden="true" />
              <button type="button" className="nv__gbtn nv__gbtn--text" aria-label="Zoom out">−</button>
            </div>
          </div>

          <div className="nv__credit">Powered by the Decentraland Foundation</div>
        </div>
      </div>
    </ExploreChrome>
  );
}
