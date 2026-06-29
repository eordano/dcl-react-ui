import { useState, useEffect, useRef } from "react";
import { sendBridge } from "../../overlay/bridge.js";
import { useMinimapVisibility } from "../../overlay/minimapVisibility.jsx";
import "./minimap.css";

const MENU = [
  "Jump to coordinates", "Copy coordinates", "Copy Link", "Share on Twitter",
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

export default function Minimap({ place = "", coords = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const kebabRef = useRef(null);
  const { minimapHidden } = useMinimapVisibility();

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [menuOpen]);

  function jumpToCoords() {
    const dest = parcelToTeleport(coords);
    if (!dest) return;
    sendBridge("Teleport", { ...dest, duration: 0 });
  }

  function copyText(text) {
    if (!text) return;
    try {
      navigator.clipboard?.writeText(text);
    } catch {
    }
  }

  function placeUrl() {
    const m =
      typeof coords === "string"
        ? coords.match(/^\s*(-?\d+)\s*,\s*(-?\d+)\s*$/)
        : null;
    const pos = m ? `${m[1]},${m[2]}` : "0,0";
    return `https://decentraland.org/play/?position=${pos}`;
  }

  function onMenuItem(item) {
    switch (item) {
      case "Jump to coordinates":
        jumpToCoords();
        break;
      case "Copy coordinates":
        copyText(coords);
        break;
      case "Copy Link":
        copyText(placeUrl());
        break;
      case "Share on Twitter":
        if (typeof window !== "undefined")
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Check out ${place} in Decentraland`,
            )}&url=${encodeURIComponent(placeUrl())}`,
            "_blank",
            "noopener,noreferrer",
          );
        break;
      default:
        break;
    }
    setMenuOpen(false);
  }

  if (minimapHidden) return null;

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
            <div className="mm__kebab-wrap" ref={kebabRef}>
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

        <button
          type="button"
          className="mm__map"
          data-sb-linkto="Explorer/Pages/Map"
          aria-label="Open full map"
          title="Open map"
        >
            <div className="mm__grid" aria-hidden="true" />
            <span className="mm__compass mm__compass--n" aria-hidden="true">N</span>
            <span className="mm__compass mm__compass--e" aria-hidden="true">E</span>
            <span className="mm__compass mm__compass--s" aria-hidden="true">S</span>
            <span className="mm__compass mm__compass--w" aria-hidden="true">W</span>
            <svg className="mm__player" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 3l7 16-7-4-7 4 7-16z" fill="var(--brand)"
                stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </button>
      </div>
    </div>
  );
}
