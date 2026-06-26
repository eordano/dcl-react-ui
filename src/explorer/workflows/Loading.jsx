import "./loading.css";

const TIP = {
  title: "What's On",
  body:
    "Movie nights, trivia, dance parties, there's usually something happening. " +
    "Drop in enough times and you'll start to recognize the regulars.",
};

function DclGem() {
  return (
    <svg className="loading__gem" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#ff2d55" />
      <path
        d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
        fill="#fff"
      />
    </svg>
  );
}

export default function Loading({ progress = 65 }) {
  const tip = TIP;
  const dots = 10;

  return (
    <div className="loading">
      <header className="loading__header">
        <div className="loading__brand">
          <DclGem />
          <span>Decentraland</span>
        </div>
        <div className="loading__pct">LOADING {progress}%</div>
      </header>
      <div className="loading__bar">
        <div className="loading__bar-fill" style={{ width: progress + "%" }} />
      </div>

      <div className="loading__cards" aria-hidden="true">
        <div className="loading__card loading__card--back">
          <div className="loading__card-art loading__card-art--wtf">
            <span className="loading__card-kicker">W.T.F.</span>
            <span className="loading__card-kicker2">WE TALK FUN</span>
          </div>
          <div className="loading__card-info">
            <div className="loading__card-title">W.T.F — We Talk Fun</div>
            <div className="loading__card-sub">By ToxicWaifu</div>
            <div className="loading__card-time">
              <span className="loading__clock" /> 10:30 PM
            </div>
          </div>
        </div>

        <div className="loading__card loading__card--front">
          <div className="loading__card-art loading__card-art--beast">
            <div className="loading__card-badge">
              <DclGem />
              <span>Decentraland</span>
            </div>
            <span className="loading__card-kicker">THE META</span>
            <span className="loading__card-beast">Beast!</span>
            <span className="loading__card-kicker2">ROAMING PARTY</span>
            <span className="loading__card-dj">DJ AKIDcalledMAKE</span>
          </div>
          <div className="loading__card-info">
            <div className="loading__card-title">THE META BEAST</div>
            <div className="loading__card-sub">By AKIDcalledMAKE</div>
            <div className="loading__card-time">
              <span className="loading__clock" /> 2:00 AM
            </div>
            <div className="loading__card-actions">
              <button className="loading__remind" type="button" tabIndex={-1}>
                <span className="loading__bell" /> REMIND ME
              </button>
              <button className="loading__iconbtn" type="button" tabIndex={-1} aria-hidden="true">
                <span className="loading__ic loading__ic--save" />
              </button>
              <button className="loading__iconbtn" type="button" tabIndex={-1} aria-hidden="true">
                <span className="loading__ic loading__ic--share" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="loading__tip">
        <h1 className="loading__title">{tip.title}</h1>
        <p className="loading__body">{tip.body}</p>
        <div className="loading__dots">
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              className={"loading__dot" + (i === 0 ? " is-active" : "")}
            />
          ))}
        </div>
      </div>

      <button className="loading__arrow loading__arrow--left" aria-label="Previous">‹</button>
      <button className="loading__arrow loading__arrow--right" aria-label="Next">›</button>
    </div>
  );
}
