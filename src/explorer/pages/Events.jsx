import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import "./events.css";

const DAYS = [
  { id: "today", label: "Today", today: true },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "jun21", label: "Sun, Jun 21" },
  { id: "jun22", label: "Mon, Jun 22" },
  { id: "jun23", label: "Tue, Jun 23" },
];

const COLUMNS = [
  [
    { featured: true, title: "Celebrate Pride in Decentraland", org: "Decentraland Foundation", time: "Started 8 hour ago", badge: "84 LIVE", live: true },
    { featured: true, title: "PRIDE EDITION Watch scary movies wit…", org: "Decentraland Foundation", time: "Started 1 hour ago", badge: "96 LIVE", live: true, viewers: true },
    { title: "FRIDAY GAME NIGHT", org: "vidiya", time: "1:30AM" },
    { title: "The Meta Beast Roa…", org: "metainvaderkeey", time: "1:30AM" },
  ],
  [
    { title: "Flag Tag Friday!", org: "Cordova", time: "12:00AM" },
    { title: "Volpolachno: Parafit…", org: "EmpressTrash", time: "12:00AM" },
    { title: "Panel Haus: OPEN Th…", org: "urrwsiapa", time: "1:30AM" },
    { title: "The Avatalks show a…", org: "MordRivers", time: "3:00AM" },
    { title: "Kathmonjo's Magic Bo…", org: "Kathmonjo", time: "3:00AM" },
  ],
  [
    { title: "ABC DCL Tours - Adv…", org: "EmpressTrash", time: "12:00AM" },
    { title: "Classic Royal", org: "vidiya", time: "12:00AM" },
    { title: "BACK TO THE BU…", org: "EmpressTrash", time: "3:00AM" },
    { title: "Metaverse AFTER H…", org: "CryptidNomad", time: "3:00AM" },
    { title: "Noob Plays Live: Gam…", org: "Noob", time: "5:00AM" },
  ],
  [
    { title: "Live DJ Music and De…", org: "SaffYazel", time: "12:00AM" },
    { title: "Static Party: Chri-K0…", org: "MiguelAtzinga", time: "1:00AM" },
    { title: "The Praetorian Loung…", org: "Praeix", time: "3:00AM" },
    { title: "L'impératrice Atelier…", org: "EmpressTrash", time: "5:00AM" },
    { title: "Poker Night", org: "PartenonNight", time: "5:00AM" },
  ],
  [
    { title: "", org: "", time: "12:00AM" },
    { title: "Classic Royal", org: "vidiya", time: "1:00AM" },
    { title: "L'empereur Atelier des Dieux…", org: "EmpressTrash", time: "3:00AM" },
    { title: "ZG CSL One Cologn…", org: "esportscom", time: "5:00AM" },
    { title: "Poker Night", org: "PartenonNight", time: "5:00AM" },
  ],
];

function EventCard({ ev, hue = 270 }) {
  return (
    <div className={"ev__card" + (ev.featured ? " is-featured" : "")} data-sb-linkto="Explorer/Pages/EventDetail">
      <div className="ev__thumb" style={{ "--hue": hue }} aria-hidden="true">
        {ev.badge ? (
          <span className={"ev__badge" + (ev.live ? " is-live" : "") + (ev.viewers ? " is-viewers" : "")}>{ev.badge}</span>
        ) : null}
      </div>
      <div className="ev__cardbody">
        <h3 className="ev__cardtitle u-truncate">{ev.title || " "}</h3>
        {ev.org ? <p className="ev__cardorg u-truncate">By {ev.org}</p> : null}
        <p className="ev__cardtime">
          <span className="ev__clock" aria-hidden="true">🕑</span>
          {ev.time}
        </p>
      </div>
    </div>
  );
}

export default function Events() {
  const [tab, setTab] = useState("events");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="ev">
        <div className="ev__head">
          <h1 className="ev__title">Events</h1>
          <div className="ev__headactions">
            <button type="button" className="ev__todaybtn">Today</button>
            <button type="button" className="ev__create">+ CREATE EVENT</button>
          </div>
        </div>

        <div className="ev__body">
          <div className="ev__main">
            <div className="ev__carousel">
              <button type="button" className="ev__chev" aria-label="Previous days">‹</button>
              <div className="ev__cols" role="tablist" aria-label="Event days">
                {DAYS.map((dd) => (
                  <div key={dd.id} className="ev__col">
                    <span
                      className={"ev__daylabel" + (dd.today ? " is-today" : "")}
                    >
                      {dd.label}
                    </span>
                  </div>
                ))}
              </div>
              <button type="button" className="ev__chev" aria-label="Next days">›</button>
            </div>

            <div className="ev__grid">
              {COLUMNS.map((col, ci) => (
                <div key={DAYS[ci].id} className="ev__gridcol">
                  {col.map((ev, ri) => (
                    <EventCard key={ri} ev={ev} hue={(ci * 47 + ri * 61) % 360} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <aside className="ev__feature" aria-label="Featured event">
            <div className="ev__featurehero" aria-hidden="true">
              <span className="ev__featuretag">CAREER<br />MONDAYS</span>
              <span className="ev__featuresub">2PM &amp; 6PM UTC</span>
            </div>
            <div className="ev__featurebody">
              <p className="ev__featuredate">
                <span className="ev__clock" aria-hidden="true">📅</span>
                MON, JUN 22 · 8:00PM
              </p>
              <h2 className="ev__featuretitle">
                Career Mondays: AI, Autonomous Agents &amp; the Future of Work in Web3
              </h2>
              <p className="ev__featureorg">Organized by Decentraland Foundation</p>
              <div className="ev__featureactions">
                <button type="button" className="ev__remind">REMIND ME</button>
                <button type="button" className="ev__iconbtn" aria-label="Share">↗</button>
                <button type="button" className="ev__iconbtn" aria-label="More">⋯</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ExploreChrome>
  );
}
