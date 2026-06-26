import { useState } from "react";
import { sendBridge } from "../../overlay/bridge.js";
import "./minimap.css";

const MENU = [
  "Jump to coordinates", "Set as Home", "Copy coordinates", "Copy Link",
  "Share on Twitter", "Tip Scene Creator", "Flag this Scene",
];

const PARCEL_SIZE = 16;
function parcelToTeleport(coords) {
  if (typeof coords !== "string") return null;
  const m = coords.match(/^\s*(-?\d+)\s*,\s*(-?\d+)\s*$/);
  if (!m) return null;
  const px = Number(m[1]);
  const py = Number(m[2]);
  return {
    x: px * PARCEL_SIZE + PARCEL_SIZE / 2,
    y: 0,
    z: py * PARCEL_SIZE + PARCEL_SIZE / 2,
  };
}

const TILES = [
  { x: 1, y: 1, c: "#c43526" }, { x: 2, y: 1, c: "#a02a1f" },
  { x: 4, y: 1, c: "#d24129" }, { x: 5, y: 1, c: "#b13322" },
  { x: 1, y: 2, c: "#d8492b" }, { x: 3, y: 2, c: "#a02a1f" },
  { x: 6, y: 2, c: "#c43526" }, { x: 2, y: 3, c: "#b13322" },
  { x: 4, y: 3, c: "#d85636" }, { x: 5, y: 4, c: "#c43526" },
  { x: 2, y: 4, c: "#d24129" }, { x: 1, y: 5, c: "#a02a1f" },
  { x: 3, y: 5, c: "#c43526" }, { x: 5, y: 5, c: "#b13322" },
  { x: 4, y: 6, c: "#d24129" }, { x: 6, y: 6, c: "#a02a1f" },
];

export default function Minimap({ place = "Genesis Plaza", coords = "0,0" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function jumpToCoords() {
    const dest = parcelToTeleport(coords);
    if (!dest) return;
    sendBridge("Teleport", { ...dest, duration: 0 });
  }

  function onMenuItem(item) {
    if (item === "Jump to coordinates") jumpToCoords();
    setMenuOpen(false);
  }

  return (
    <div className="mm__stage">
      <div className="mm">
        <div className="mm__header">
          <button className="mm__expand" aria-label="Expand map" title="Expand" data-sb-linkto="Explorer/Pages/Map">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M7 8l4 4-4 4M13 8l4 4-4 4" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="mm__place">
            <span className="mm__name u-truncate">{place}</span>
            <span className="mm__coords">
              <svg className="mm__pin" viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
                <path d="M12 2c-3.9 0-7 3-7 6.9 0 4.6 7 12.1 7 12.1s7-7.5 7-12.1C19 5 15.9 2 12 2z"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="2.4" fill="currentColor" />
              </svg>
              {coords}
            </span>
          </div>

          <div className="mm__actions">
            <button className="mm__fav" aria-label="Favorite scene" title="Favorite">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M12 20.6l-1.45-1.32C5.4 14.62 2 11.54 2 7.76 2 4.68 4.42 2.26 7.5 2.26c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 20.6z"
                  fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="mm__kebab-wrap">
              <button
                className="mm__kebab"
                title="Scene options"
                aria-label="Scene options"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <circle cx="12" cy="5" r="1.7" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.7" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.7" fill="currentColor" />
                </svg>
              </button>

              {menuOpen && (
                <div className="mm__menu" role="menu">
                  {MENU.map((m) => (
                    <button
                      className="mm__item"
                      role="menuitem"
                      key={m}
                      onClick={() => onMenuItem(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mm__map" aria-hidden="true">
            <div className="mm__grid" />
            {TILES.map((t, i) => (
              <span
                key={i}
                className="mm__tile"
                style={{ left: `${t.x * 11.5 + 9}%`, top: `${t.y * 11.5 + 9}%`, background: t.c }}
              />
            ))}
            <span className="mm__compass mm__compass--n">N</span>
            <span className="mm__compass mm__compass--e">E</span>
            <span className="mm__compass mm__compass--s">S</span>
            <span className="mm__compass mm__compass--w">W</span>
            <span className="mm__world">World</span>
            <svg className="mm__player" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 3l7 16-7-4-7 4 7-16z" fill="var(--brand)"
                stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </div>
      </div>
    </div>
  );
}
