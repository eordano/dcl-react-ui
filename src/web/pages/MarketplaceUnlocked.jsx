import "./creditsunlocked.css";

const CREDITS = 250;

function Rays() {
  const n = 24, c = 150, r0 = 22;
  return (
    <svg className="cu__rays" viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <linearGradient id="cu-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        {Array.from({ length: n }).map((_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const long = i % 2 === 0;
          const r1 = long ? 150 : 128;
          const half = (long ? 4.5 : 3) * Math.PI / 180;
          const bx = c + Math.cos(a) * r0, by = c + Math.sin(a) * r0;
          const t1x = c + Math.cos(a - half) * r1, t1y = c + Math.sin(a - half) * r1;
          const t2x = c + Math.cos(a + half) * r1, t2y = c + Math.sin(a + half) * r1;
          return (
            <polygon
              key={i}
              points={`${bx},${by} ${t1x},${t1y} ${t2x},${t2y}`}
              fill="url(#cu-ray)"
              opacity={long ? 1 : 0.85}
            />
          );
        })}
      </g>
    </svg>
  );
}

const STARS = [
  { x: 6, y: 24, s: 14, gold: false }, { x: 90, y: 16, s: 11, gold: true },
  { x: 96, y: 60, s: 10, gold: true }, { x: 2, y: 66, s: 12, gold: true },
  { x: 50, y: -2, s: 9, gold: false }, { x: 78, y: 86, s: 9, gold: true },
  { x: 18, y: 92, s: 10, gold: false }, { x: 84, y: 38, s: 9, gold: true },
  { x: 12, y: 50, s: 10, gold: true }, { x: 66, y: 8, s: 8, gold: true },
  { x: 30, y: 100, s: 9, gold: true }, { x: 100, y: 84, s: 8, gold: true },
];
function Star({ size, gold }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"
      className={gold ? "cu__dot" : "cu__spark"}>
      {gold ? (
        <circle cx="12" cy="12" r="6" fill="var(--gold)" />
      ) : (
        <path d="M12 2l2.4 6.4L21 11l-6.6 2.6L12 20l-2.4-6.4L3 11l6.6-2.6z" fill="#fff" />
      )}
    </svg>
  );
}

export default function MarketplaceUnlocked() {
  return (
    <div className="cu">
      <div className="cu__inner">
        <div className="cu__kicker">WEEKLY REWARDS</div>
        <h2 className="cu__title">CREDITS UNLOCKED!</h2>

        <div className="cu__badgewrap" aria-hidden="true">
          <Rays />
          {STARS.map((s, i) => (
            <span className="cu__star" key={i} style={{ left: s.x + "%", top: s.y + "%" }}>
              <Star size={s.s} gold={s.gold} />
            </span>
          ))}
          <span className="cu__badge">
            <svg className="cu__seal" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">
              <defs>
                <linearGradient id="cu-seal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cfe0ff" />
                  <stop offset="48%" stopColor="#b6a4ff" />
                  <stop offset="100%" stopColor="#8a63f0" />
                </linearGradient>
              </defs>
              <path d="M50 4 60 13 73 11 78 23 90 29 87 42 96 52 87 62 90 75 78 81 73 93 60 91 50 100 40 91 27 93 22 81 10 75 13 62 4 52 13 42 10 29 22 23 27 11 40 13Z" />
            </svg>
            <svg className="cu__bag" viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l-1 11.5a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8Z" />
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
            </svg>
          </span>
        </div>

        <div className="cu__amount">+{CREDITS} Marketplace Credits</div>
      </div>
    </div>
  );
}
