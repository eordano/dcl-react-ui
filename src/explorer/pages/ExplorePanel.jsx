import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import "./explore.css";

const DAYS = [
  { id: "today", label: "Today", today: true },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "jun21", label: "Sun, Jun 21" },
  { id: "jun22", label: "Mon, Jun 22" },
];

export default function ExplorePanel() {
  const [tab, setTab] = useState("events");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="xp">
        <div className="xp__head">
          <h1 className="xp__title">Events</h1>
          <div className="xp__headactions">
            <button type="button" className="xp__todaybtn">Today</button>
            <button type="button" className="xp__create">+ CREATE EVENT</button>
          </div>
        </div>

        <div className="xp__main">
          <div className="xp__feed">
            <div className="xp__carousel">
              <button type="button" className="xp__chev" aria-label="Previous days">‹</button>
              <div className="xp__cols" role="tablist" aria-label="Event days">
                {DAYS.map((dd) => (
                  <div key={dd.id} className="xp__col">
                    <span className={"xp__daylabel" + (dd.today ? " is-today" : "")}>
                      {dd.label}
                    </span>
                  </div>
                ))}
              </div>
              <button type="button" className="xp__chev" aria-label="Next days">›</button>
            </div>

            <div className="xp__grid">
              {DAYS.map((dd) => (
                <div key={dd.id} className="xp__daycol" aria-hidden="true" />
              ))}
            </div>
          </div>

          <aside className="xp__feature" aria-label="Featured event" data-sb-linkto="Explorer/Pages/EventDetail">
            <div className="xp__fbanner">
              <span className="xp__fbannertext">
                <b>CAREER<br />MONDAYS</b>
                <span>2PM &amp; 6PM UTC</span>
              </span>
            </div>
            <div className="xp__fbody">
              <p className="xp__fdate">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
                  <path d="M3 9h18M8 2.5v4M16 2.5v4" />
                </svg>
                MON, JUN 22
                <span className="xp__fdivider">·</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5V12l3 2" />
                </svg>
                8:00PM
              </p>
              <h2 className="xp__ftitle">
                Career Mondays: AI, Autonomous Agents &amp; the Future of Work in Web3
              </h2>
              <p className="xp__forg">Organized by Decentraland Foundation</p>
              <div className="xp__factions">
                <button type="button" className="xp__remind">REMIND ME</button>
                <button type="button" className="xp__ficon" aria-label="Save event">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4h12v16l-6-4-6 4V4Z" />
                  </svg>
                </button>
                <button type="button" className="xp__ficon" aria-label="Share event">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.6 10.5 15.4 6.5M8.6 13.5l6.8 4" />
                  </svg>
                </button>
              </div>
              <span className="xp__flive" aria-hidden="true" />
            </div>
          </aside>
        </div>
      </div>
    </ExploreChrome>
  );
}
