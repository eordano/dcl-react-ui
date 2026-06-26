import { useState } from "react";
import UpcomingEventCard from "../../web/components/UpcomingEventCard.jsx";
import "./communitycontent.css";

const TABS = [
  { id: "announcements", label: "Announcements" },
  { id: "members", label: "Members" },
  { id: "places", label: "Places" },
  { id: "photos", label: "Photos" },
];

const PLACES = [{ name: "Music Festival Main Stage", coords: "-66,-56", rating: 100, hue: 280, glyph: "🎶" }];

const EVENTS = [
  { live: "LIVE & 15", when: "Started 6 hours ago", title: "Celebrate Pride in Decentra...", hue: 16, glyph: "🏳️‍🌈" },
  { live: "LIVE & 15", when: "Started 1 hour ago", title: "PRIDE EDITION Watch scar...", hue: 320, glyph: "🎬" },
  { when: "MON, JUN 22 6:00PM", title: "Monthly Community Meet-Up", hue: 200, glyph: "🤝" },
  { when: "MON, JUN 22 8:00PM", title: "Career Mondays: AI, Autom...", hue: 220, glyph: "💼" },
  { when: "WED, JUN 24 4:00PM", title: "PRIDE: Join Watch Party We...", hue: 8, glyph: "📺" },
  { when: "WED, JUN 24 10:00PM", title: "PRIDE: Join Watch Party We...", hue: 8, glyph: "📺" },
];

function ThumbUpIcon() {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
      <path d="M5 7v6H3a1 1 0 01-1-1V8a1 1 0 011-1h2zm1 0 2.2-4.7A1 1 0 019 2a1.4 1.4 0 011.4 1.7L9.9 6h3a1.4 1.4 0 011.4 1.7l-.9 4.3A1.6 1.6 0 0111.8 13H6V7z" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
      <path d="M8 1.5a4 4 0 00-4 4c0 2.8 4 8 4 8s4-5.2 4-8a4 4 0 00-4-4zm0 5.6a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2z" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.8 8h12.4M8 1.8c1.8 1.7 2.8 3.9 2.8 6.2S9.8 12.5 8 14.2C6.2 12.5 5.2 10.3 5.2 8S6.2 3.5 8 1.8z" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export default function CommunityContent() {
  const [tab, setTab] = useState("places");

  return (
    <div className="ccc__backdrop">
      <div className="ccc">
        <div className="ccc__main">
          <header className="ccc__header">
            <span className="ccc__avatar" aria-hidden="true">
              <span className="ccc__avatarlabel">Foundation</span>
            </span>
            <div className="ccc__headinfo">
              <h2 className="ccc__name">Decentraland Foundation</h2>
              <div className="ccc__subline">
                <GlobeIcon /> Public · 1.2k Members
              </div>
              <p className="ccc__desc">
                Your hub for official Decentraland updates and events.
              </p>
              <p className="ccc__desc ccc__desc--2">
                Keep up with All Hands, Art Week, Music Festival, Fashion Week, workshops, and more—all in one place.
              </p>
            </div>
            <div className="ccc__headactions">
              <button className="ccc__join">JOIN</button>
              <button className="ccc__more" aria-label="More options">⋮</button>
            </div>
          </header>

          <nav className="ccc__tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={"ccc__tab" + (tab === t.id ? " is-active" : "")}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="ccc__body">
            {tab === "places" && (
              PLACES.length ? (
                <div className="ccc__places">
                  {PLACES.map((p) => (
                    <article className="ccc__place" key={p.name} data-sb-linkto="Explorer/Pages/PlaceDetail">
                      <span className="ccc__thumb" style={{ "--hue": p.hue }}>
                        <span className="ccc__thumbglyph" aria-hidden="true">{p.glyph}</span>
                      </span>
                      <div className="ccc__placebody">
                        <div className="ccc__placename">{p.name}</div>
                        <div className="ccc__placemeta">
                          <span className="ccc__rating"><ThumbUpIcon /> {p.rating}%</span>
                          <span className="ccc__coords"><PinIcon /> {p.coords}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : <div className="ccc__empty">No Places linked to this Community yet.</div>
            )}

            {tab === "announcements" && <div className="ccc__empty">No Announcements here yet!</div>}
            {tab === "members" && <div className="ccc__empty">No members to show.</div>}
            {tab === "photos" && <div className="ccc__empty">No photos shared yet.</div>}
          </div>
        </div>

        <aside className="ccc__rail">
          <div className="ccc__railhead">
            <h3 className="ccc__railtitle">Upcoming Events</h3>
            <button className="ccc__close" aria-label="Close" data-sb-linkto="Explorer/Pages/Communities">×</button>
          </div>
          <div className="ccc__events">
            {EVENTS.map((e, i) => (
              <UpcomingEventCard key={i} event={e} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
