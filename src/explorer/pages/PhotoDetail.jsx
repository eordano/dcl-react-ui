import { Avatar, rarityColor, rarityVars } from "../../atoms/primitives.jsx";
import "./photodetail.css";

const PEOPLE = [
  {
    name: "Mojito", tag: "#t67q", hue: 320,
    wearables: [
      { name: "Golden Jacket", rarity: "legendary" },
      { name: "Neon Visor", rarity: "epic" },
      { name: "Hover Boots", rarity: "rare" },
    ],
  },
  { name: "pixelwitch", tag: "#0c2d", hue: 200, wearables: [] },
];

const X_LOGO = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z";

const TOOLS = [
  { id: "share", logo: true, d: X_LOGO },
  { id: "link", d: "M9 15l6-6M8 13l-2 2a3 3 0 0 0 4 4l2-2M16 11l2-2a3 3 0 0 0-4-4l-2 2" },
  { id: "download", d: "M12 3v10m0 0l-4-4m4 4l4-4M5 21h14" },
];

function PersonEntry({ p }) {
  return (
    <div className="pd__person">
      <div className="pd__personhead">
        <Avatar hue={p.hue} size={32} />
        <span className="pd__pname">{p.name}<span className="pd__ptag">{p.tag}</span></span>
        <button className="pd__pview" data-sb-linkto="Explorer/Pages/Passport">View Profile</button>
      </div>
      <div className="pd__weartitle">Collectible Wearables</div>
      {p.wearables.length === 0 ? (
        <div className="pd__wearempty">No collectibles equipped when the photo was taken</div>
      ) : (
        <div className="pd__wearlist">
          {p.wearables.map((w) => (
            <div className="pd__wear" key={w.name}>
              <span className="pd__wearart" style={rarityVars(w.rarity)} />
              <div className="pd__wearinfo">
                <div className="pd__wearname u-truncate">{w.name}</div>
                <div className="pd__wearrarity" style={{ color: rarityColor(w.rarity) }}>{w.rarity}</div>
              </div>
              <button className="pd__buy">BUY</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PhotoDetail() {
  return (
    <div className="pd">
      <div className="pd__photo">
        <div className="pd__photoart" />
        <div className="pd__toolbar">
          {TOOLS.map((t) => (
            <button key={t.id} className="pd__tool" aria-label={t.id}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                {t.logo ? (
                  <path d={t.d} fill="currentColor" />
                ) : (
                  <path d={t.d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          ))}
          <span className="pd__toolsep" aria-hidden="true" />
          <button className="pd__tool" aria-label="collapse">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M7 6l5 6-5 6M13 6l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <button className="pd__close" aria-label="Close" data-sb-linkto="Explorer/Pages/Reel">×</button>
        <button className="pd__nav pd__nav--prev" aria-label="Previous">‹</button>
        <button className="pd__nav pd__nav--next" aria-label="Next">›</button>
      </div>

      <aside className="pd__info">
        <div className="pd__meta">July 27th 2023 - Taken by <b>Mojito</b></div>

        <section className="pd__sec">
          <div className="pd__seclabel">Place</div>
          <div className="pd__placerow">
            <svg viewBox="0 0 24 24" width="16" height="16" className="pd__pin" aria-hidden="true">
              <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="10" r="2.4" fill="currentColor" />
            </svg>
            <span className="pd__placename u-truncate">Genesis Plaza, 0,12</span>
            <button className="pd__go" aria-label="Jump in" data-sb-linkto="Explorer/Workflows/SceneLoading">→</button>
          </div>
        </section>

        <section className="pd__sec">
          <div className="pd__seclabel">People</div>
          {PEOPLE.map((p) => <PersonEntry key={p.name} p={p} />)}
        </section>
      </aside>
    </div>
  );
}
