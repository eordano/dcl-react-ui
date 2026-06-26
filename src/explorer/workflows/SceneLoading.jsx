import { asset } from "../../asset.js";
import "./sceneloading.css";

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

export default function SceneLoading({ progress = 31 }) {
  const dots = 12;
  const activeDot = 8;

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
        <h1 className="sl__title">What's On</h1>
        <p className="sl__body">
          Movie nights, trivia, dance parties, there's usually something happening.
          Drop in enough times and you'll start to recognize the regulars.
        </p>
        <div className="sl__dots">
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              className={"sl__dot" + (i === activeDot ? " is-active" : "")}
            />
          ))}
        </div>
      </div>

      <button className="sl__arrow sl__arrow--left" aria-label="Previous">‹</button>
      <button className="sl__arrow sl__arrow--right" aria-label="Next">›</button>
    </div>
  );
}
