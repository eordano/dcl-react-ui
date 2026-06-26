import { useState } from "react";
import { Avatar, fmt } from "../../atoms/primitives.jsx";
import UpcomingEventCard from "../../web/components/UpcomingEventCard.jsx";
import "./communitymembers.css";

const TABS = [
  { id: "announcements", label: "Announcements" },
  { id: "members", label: "Members" },
  { id: "places", label: "Places" },
  { id: "photos", label: "Photos" },
];

const MEMBERS = [
  { name: "DCLDfuse", role: "Owner", online: true, friend: false, hue: 320 },
  { name: "Kimbo", role: "Moderator", online: true, friend: false, hue: 270 },
  { name: "KaijuWolfson", role: "Moderator", online: true, friend: false, hue: 285 },
  { name: "Sephiroten", role: "Moderator", online: false, friend: false, hue: 200 },
  { name: "MET.kAEZ.f", role: "Member", online: false, friend: true, hue: 95 },
  { name: "Rashiyo", role: "Member", online: true, friend: false, hue: 35 },
  { name: "izumimusa", role: "Member", online: true, friend: false, hue: 190 },
  { name: "Souldarsoa", role: "Member", online: false, friend: false, hue: 255 },
  { name: "Eve.0", role: "Member", online: true, friend: false, hue: 330 },
  { name: "KaldhiyaShae", role: "Member", online: false, friend: false, hue: 145 },
  { name: "Thoot.d", role: "Member", online: false, friend: false, hue: 215 },
  { name: "siorra", role: "Member", online: true, friend: false, hue: 120 },
];

const EVENTS = [
  { title: "Celebrate Pride in Decentra…", when: "", started: "Started 10 hour ago", live: true, hue: 330 },
  { title: "Monthly Community Meet-Up", when: "MON, JUN 23 @ 6:00PM", hue: 280 },
  { title: "Career Mondays: AI, Autom…", when: "MON, JUN 23 @ 8:00PM", hue: 210 },
  { title: "PRIDE: Join Watch Party We…", when: "WED, JUN 24 @ 8:00PM", hue: 350 },
  { title: "PRIDE: Join Watch Party We…", when: "WED, JUN 24 @ 10:00PM", hue: 300 },
  { title: "PRIDE EDITION: Watch scar…", when: "FRI, JUN 26 @ 7:00AM", hue: 40 },
];

const ROLE_CLASS = { Owner: "is-owner", Moderator: "is-mod", Member: "" };

export default function CommunityMembers() {
  const [tab, setTab] = useState("members");

  return (
    <div className="cmb__backdrop">
      <div className="cmb">
        <button className="cmb__close" aria-label="Close" data-sb-linkto="Explorer/Pages/Communities">×</button>

        <div className="cmb__main">
          <header className="cmb__header">
            <span className="cmb__thumb" />
            <div className="cmb__headinfo">
              <h2 className="cmb__cname">Decentraland Foundation</h2>
              <div className="cmb__meta">
                <svg className="cmb__globe" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                </svg>
                Public · {fmt(1200)} Members
              </div>
              <p className="cmb__about">
                Your hub for official Decentraland updates and events
                <br />
                Keep up with All Hands, Art Week, Music Festival, Fashion Week, workshops, and more—all in one place.
              </p>
            </div>
            <button className="cmb__join">JOIN</button>
          </header>

          <nav className="cmb__tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === tab}
                className={"cmb__tab" + (t.id === tab ? " is-active" : "")}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="cmb__body">
            {tab === "members" ? (
              <ul className="cmb__grid">
                {MEMBERS.map((m) => (
                  <li className="cmb__row" key={m.name} data-sb-linkto="Explorer/Pages/Passport">
                    <Avatar hue={m.hue} size={44} status={m.online ? "online" : "offline"} />
                    <div className="cmb__info">
                      <div className="cmb__name u-truncate">{m.name}</div>
                      {m.role !== "Member" && (
                        <span className={"cmb__role " + ROLE_CLASS[m.role]}>{m.role}</span>
                      )}
                    </div>
                    <button className={"cmb__add" + (m.friend ? " is-friend" : "")}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 20a8 8 0 0 1 16 0z" />
                      </svg>
                      {m.friend ? "ALREADY FRIEND" : "ADD FRIEND"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="cmb__empty">{TABS.find((t) => t.id === tab).label}</div>
            )}
          </div>

          <div className="cmb__search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input type="text" placeholder="Search member or name" aria-label="Search members" />
            <button className="cmb__searchgo" type="button" aria-label="Search">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <aside className="cmb__events">
          <h3 className="cmb__eventstitle">Upcoming Events</h3>
          <div className="cmb__eventlist">
            {EVENTS.map((e, i) => (
              <UpcomingEventCard key={i} event={e} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
