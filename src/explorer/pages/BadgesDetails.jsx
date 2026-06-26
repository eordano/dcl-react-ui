import { useState } from "react";
import Tabs from "../components/Tabs.jsx";
import Passport from "./Passport.jsx";
import "./badgesdetail.css";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "photos", label: "Photos" },
];

const FILTERS = [
  "All", "Explorer", "Collector", "Creator", "Socializer", "Builder",
];

const TIER = {
  bronze: "#cd7f32", silver: "#c7ccd1", gold: "#ffc647",
  platinum: "#6cd0e0", diamond: "#b9f2ff",
};

const SECTIONS = [
  {
    id: "Explorer", label: "EXPLORER",
    badges: [
      { name: "Decentraland Citizen", tint: TIER.gold, unlocked: true },
      { name: "Traveler Starter", tint: TIER.bronze, isNew: true },
      { name: "Movee Master", tint: TIER.silver },
      { name: "Vertical Voyager", tint: TIER.bronze },
      { name: "Walkabout Wanderer", tint: TIER.platinum },
    ],
  },
  {
    id: "Collector", label: "COLLECTOR",
    badges: [
      { name: "Epic Ensemble", tint: TIER.platinum },
      { name: "Rapidly Rare", tint: TIER.silver },
      { name: "Legendary Look", tint: TIER.gold },
      { name: "Mythic Model", tint: TIER.diamond },
      { name: "Unique Unicorn", tint: TIER.bronze },
      { name: "Exotic Elegance", tint: TIER.gold },
    ],
  },
];

function BadgeArt({ b, size = 56 }) {
  return (
    <span
      className={"bgd__art" + (b.unlocked ? "" : " is-locked")}
      style={{ "--t": b.tint, width: size, height: size }}
    >
      <svg viewBox="0 0 64 64" width="56%" height="56%" aria-hidden="true">
        <path d="M32 5l23.4 13.5v27L32 59 8.6 45.5v-27z" fill="rgba(255,255,255,.18)"
          stroke="rgba(255,255,255,.55)" strokeWidth="2" />
        <circle cx="32" cy="30" r="9.5" fill="rgba(255,255,255,.7)" />
      </svg>
    </span>
  );
}

function BadgeCard({ b, active, onSelect }) {
  return (
    <button
      type="button"
      className={"bgd__card" + (active ? " is-active" : "") + (b.unlocked ? "" : " is-locked")}
      style={{ "--t": b.tint }}
      onClick={onSelect}
      title={b.name}
      aria-pressed={active}
    >
      {b.isNew && <span className="bgd__new">NEW</span>}
      <BadgeArt b={b} />
      <span className="bgd__cardname">{b.name}</span>
      <span className="bgd__nexttier">{b.unlocked ? "Jan. 2026" : "NEXT TIER"}</span>
    </button>
  );
}

export default function BadgesDetails() {
  const [tab, setTab] = useState("badges");
  const [filter, setFilter] = useState("All");
  const [sel, setSel] = useState("Decentraland Citizen");

  const sections = SECTIONS.filter((s) => filter === "All" || s.id === filter);

  return (
    <>
      <div className="u-behind" aria-hidden="true" inert>
        <Passport />
      </div>
      <div className="ep__backdrop">
      <div className="ps bgd">
        <button className="ep__close ps__close" aria-label="Close" data-sb-linkto="Explorer/Pages/Passport">×</button>

        <div className="ps__preview">
          <div className="bgd__passport" aria-hidden="true">
            <div className="bgd__pptop">DCL CITIZEN</div>
            <div className="bgd__ppglobe">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <circle cx="50" cy="50" r="40" fill="rgba(255,198,71,.18)" stroke="#ffc647" strokeWidth="5" />
                <ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="#ffc647" strokeWidth="3.5" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#ffc647" strokeWidth="3.5" />
                <line x1="14" y1="32" x2="86" y2="32" stroke="#ffc647" strokeWidth="3.5" />
                <line x1="14" y1="68" x2="86" y2="68" stroke="#ffc647" strokeWidth="3.5" />
                <circle cx="62" cy="22" r="6" fill="#ffc647" />
              </svg>
            </div>
            <div className="bgd__ppbottom">PASSPORT</div>
          </div>
          <div className="bgd__ppmeta">
            <div className="bgd__ppname">Decentraland Citizen</div>
            <div className="bgd__ppsub">Unlocked: Jun. 2026</div>
            <div className="bgd__ppsub">Landed in Decentraland</div>
          </div>
        </div>

        <div className="ps__main">
          <header className="ps__head">
            <div className="ps__idblock">
              <div className="ps__idline">
                <h2 className="ps__name">Evaristo<span className="ps__tag">#d5f0</span></h2>
                <button className="ps__icon" aria-label="Edit name">✎</button>
              </div>
              <div className="ps__addrline">
                <span className="ps__addr">0x3fe...7d99</span>
                <button className="ps__icon" aria-label="Copy address">⧉</button>
              </div>
            </div>
            <button className="ps__claim">CLAIM NAME</button>
          </header>

          <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />

          <div className="bgd__filters" role="tablist" aria-label="Badge category">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={f === filter}
                className={"bgd__filter" + (f === filter ? " is-active" : "")}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="bgd__body">
            {sections.map((s) => (
              <section className="bgd__section" key={s.id}>
                <h3 className="bgd__secttitle">{s.label}</h3>
                <div className="bgd__grid">
                  {s.badges.map((b) => (
                    <BadgeCard
                      key={b.name}
                      b={b}
                      active={b.name === sel}
                      onSelect={() => setSel(b.name)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
