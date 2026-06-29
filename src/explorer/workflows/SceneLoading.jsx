import { useEffect, useState } from "react";
import { asset } from "../../asset.js";
import { SCENE_TIPS } from "./sceneTips.js";
import "./sceneloading.css";

function renderRich(text) {
  const cleaned = String(text).replace(/<\/?size[^>]*>/g, "");
  return cleaned
    .split(/(<b>[\s\S]*?<\/b>)/g)
    .filter(Boolean)
    .map((part, i) => {
      const m = part.match(/^<b>([\s\S]*?)<\/b>$/);
      return m ? <b key={i}>{m[1]}</b> : <span key={i}>{part}</span>;
    });
}

const EVENTS = [
  {
    title: "W.T.F. — We Talk F...",
    author: "By ToxicWafu",
    time: "10:30 PM",
    back: true,
  },
  {
    title: "THE META BEAST",
    author: "By AKIDcalledMAKE",
    time: "2:00 AM",
    back: false,
  },
];

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0-6 6v3l-1.5 3h15L18 12V9a6 6 0 0 0-6-6z" fill="currentColor" />
      <path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M6 4h12v16l-6-4-6 4V4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="6" cy="12" r="2.4" fill="currentColor" />
      <circle cx="18" cy="6" r="2.4" fill="currentColor" />
      <circle cx="18" cy="18" r="2.4" fill="currentColor" />
      <path d="M8 11l8-4M8 13l8 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function SceneLoading({
  progress = 31,
  tips = SCENE_TIPS,
  tip,
  rotate = true,
  intervalMs = 5000,
}) {
  const count = tips.length;
  const controlled = typeof tip === "number";
  const [idx, setIdx] = useState(controlled ? tip : 0);
  const [auto, setAuto] = useState(!controlled);

  useEffect(() => {
    if (controlled) setIdx(((tip % count) + count) % count);
  }, [controlled, tip, count]);

  useEffect(() => {
    if (controlled || !rotate || !auto || count <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [controlled, rotate, auto, count, intervalMs]);

  const go = (delta) => {
    setAuto(false);
    setIdx((i) => (((i + delta) % count) + count) % count);
  };

  const active = tips[idx] || tips[0];

  return (
    <div className="sl">
      <header className="sl__header">
        <div className="sl__brand">
          <img src={asset("assets/dcl-logo.png")} alt="" />
          <span>Decentraland</span>
        </div>
        <div className="sl__pct">LOADING {progress}%</div>
      </header>
      <div className="sl__bar">
        <div className="sl__bar-fill" style={{ width: progress + "%" }} />
      </div>

      <div className="sl__cards" aria-hidden="true">
        {EVENTS.map((ev) => (
          <article
            key={ev.title}
            className={"sl__card" + (ev.back ? " sl__card--back" : " sl__card--front")}
          >
            <div className="sl__thumb" />
            <div className="sl__meta">
              <h3 className="sl__card-title">{ev.title}</h3>
              <p className="sl__card-author">{ev.author}</p>
              <p className="sl__card-time">
                <ClockIcon /> {ev.time}
              </p>
              {!ev.back && (
                <div className="sl__card-actions">
                  <button type="button" className="sl__remind">
                    <BellIcon /> REMIND ME
                  </button>
                  <button type="button" className="sl__iconbtn" aria-label="Save">
                    <SaveIcon />
                  </button>
                  <button type="button" className="sl__iconbtn" aria-label="Share">
                    <ShareIcon />
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="sl__tip">
        <h1 className="sl__title">{renderRich(active.title)}</h1>
        <p className="sl__body">{renderRich(active.body)}</p>
        <div className="sl__dots">
          {tips.map((_, i) => (
            <span
              key={i}
              className={"sl__dot" + (i === idx ? " is-active" : "")}
            />
          ))}
        </div>
      </div>

      <button
        className="sl__arrow sl__arrow--left"
        aria-label="Previous tip"
        onClick={() => go(-1)}
      >
        ‹
      </button>
      <button
        className="sl__arrow sl__arrow--right"
        aria-label="Next tip"
        onClick={() => go(1)}
      >
        ›
      </button>
    </div>
  );
}
