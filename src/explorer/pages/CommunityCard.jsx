import { useState } from "react";
import { Avatar, fmt } from "../../atoms/primitives.jsx";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import UpcomingEventCard from "../../web/components/UpcomingEventCard.jsx";
import "./communitycard.css";

const COMMUNITY = {
  name: "Crystal Pavilion",
  members: 25_000_000,
  vis: "Public",
  membership: "none",
  hue: 270,
  about:
    "Your hub for official Decentraland updates and events.\n" +
    "Keep up with All Hands, Art Week, Music Festival, Fashion Week, workshops, and more — all in one place.",
};

const SECTIONS = ["Announcements", "Members", "Places", "Photos"];

const ANNOUNCEMENTS = [
  {
    author: "crystal.dao", hue: 270, age: "Apr 16", likes: 10,
    text: "It was TIME for an update. See you all in the new Plaza. Enjoy!",
  },
  {
    author: "crystal.dao", hue: 270, age: "Apr 7", likes: 4,
    text: "EPIC Launch Party happening now in the theatre!",
  },
  {
    author: "moderator.eth", hue: 95, age: "Mar 31", likes: 1,
    text: "Hey everyone! Happy Epic and Mobile Launch Day!!!\n" +
      "Please help us spread the word and get ready to celebrate together on April 2nd! It will be EPIC.",
  },
  {
    author: "crystal.dao", hue: 270, age: "Mar 24", likes: 6,
    text: "Happy 8th birthday Decentraland!\n" +
      "The birthday party will kick off in the theatre in 15 minutes.\n" +
      "See you there with your dance Emotes ready!",
  },
];

const MEMBERS = [
  { name: "barkeep", tag: "#t67q", hue: 320, role: "Owner" },
  { name: "pixelwitch", tag: "#0c2d", hue: 200, role: "Moderator" },
  { name: "Nyx", tag: "#a91f", hue: 280 },
  { name: "neon", tag: "#1f80", hue: 45 },
  { name: "glasscutter", tag: "#9a2c", hue: 150 },
];

const PLACES = [
  { name: "Crystal Pavilion", coords: "-24, 18", hue: 270 },
  { name: "Sound Dome", coords: "-22, 20", hue: 300 },
];

const PHOTOS = [
  { hue: 285 }, { hue: 200 }, { hue: 330 }, { hue: 150 }, { hue: 45 }, { hue: 260 },
];

const EVENTS = [
  { title: "Celebrate Pride in Decentral...", when: "Started 9 hour ago", badge: "LIVE", live: true, hue: 320 },
  { title: "PRIDE Edition Watch scar...", when: "Started 1 hour ago", badge: "LIVE", live: true, hue: 285 },
  { title: "Monthly Community Meet-Up", when: "MON, JUN 23 @ 5:00PM", hue: 210 },
  { title: "Career Mondays: AI, Auton...", when: "MON, JUN 23 @ 6:00PM", hue: 230 },
  { title: "PRIDE: Join Watch Party Wa...", when: "MON, JUN 23 @ 4:00PM", hue: 0 },
  { title: "PRIDE: Join Watch Party Wa...", when: "TUE, JUN 24 @ 5:00PM", hue: 15 },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M8 14S1.5 9.5 1.5 5.5A3.3 3.3 0 018 3.5a3.3 3.3 0 016.5 2C14.5 9.5 8 14 8 14z" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="cc__globe" viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="8" cy="8" rx="3" ry="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.7 8h12.6M2.6 5h10.8M2.6 11h10.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function JoinButton({ vis, membership }) {
  if (membership === "joined") return <button className="cc__leave">Leave</button>;
  if (membership === "requested") return <button className="cc__join is-ghost">CANCEL REQUEST</button>;
  return <button className="cc__join">{vis === "Public" ? "JOIN" : "REQUEST TO JOIN"}</button>;
}

export default function CommunityCard() {
  const c = COMMUNITY;
  const [section, setSection] = useState("Announcements");

  return (
    <ExploreChrome active="communities">
      <div className="cc__backdrop">
      <div className="cc">
        <button className="cc__close" aria-label="Close" data-sb-linkto="Explorer/Pages/Communities">×</button>

        <div className="cc__banner" style={{ "--hue": c.hue }} />

        <header className="cc__header">
          <span className="cc__thumb" style={{ "--hue": c.hue }} />
          <div className="cc__headinfo">
            <div className="cc__headtop">
              <h2 className="cc__name">{c.name}</h2>
              <JoinButton vis={c.vis} membership={c.membership} />
            </div>
            <div className="cc__meta">
              <GlobeIcon />
              <span className={"cc__vis" + (c.vis === "Public" ? " is-public" : "")}>{c.vis}</span>
              <span className="cc__dot">·</span>
              <span className="cc__members"><b>{fmt(c.members)}</b> Members</span>
            </div>
            <p className="cc__about">{c.about}</p>
          </div>
        </header>

        <nav className="cc__tabs" role="tablist">
          {SECTIONS.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={s === section}
              className={"cc__tab" + (s === section ? " is-active" : "")}
              onClick={() => setSection(s)}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="cc__body">
          <section className="cc__content">
            {section === "Announcements" && (
              ANNOUNCEMENTS.length === 0 ? (
                <div className="cc__empty">No Announcements here yet!</div>
              ) : (
                <div className="cc__anns">
                  {ANNOUNCEMENTS.map((a, i) => (
                    <article className="cc__ann" key={i}>
                      <div className="cc__annhead">
                        <Avatar hue={a.hue} size={34} />
                        <span className="cc__annauthor">{a.author}</span>
                        <span className="cc__anndot">·</span>
                        <span className="cc__annage">{a.age}</span>
                      </div>
                      <p className="cc__anntext">{a.text}</p>
                      <button className="cc__annlike"><HeartIcon /> {a.likes}</button>
                    </article>
                  ))}
                </div>
              )
            )}

            {section === "Members" && (
              <div className="cc__members-list">
                {MEMBERS.map((m) => (
                  <div className="cc__member" key={m.name} data-sb-linkto="Explorer/Pages/Passport">
                    <Avatar hue={m.hue} size={34} />
                    <span className="cc__membername">
                      {m.name}<span className="cc__membertag">{m.tag}</span>
                    </span>
                    {m.role && <span className="cc__memberrole">{m.role}</span>}
                  </div>
                ))}
              </div>
            )}

            {section === "Places" && (
              PLACES.length === 0 ? (
                <div className="cc__empty">No Places linked to this Community yet.</div>
              ) : (
                <div className="cc__places">
                  {PLACES.map((p) => (
                    <article className="cc__place" key={p.name} data-sb-linkto="Explorer/Pages/PlaceDetail">
                      <div className="cc__placethumb" style={{ "--hue": p.hue }} />
                      <div className="cc__placebody">
                        <div className="cc__placename">{p.name}</div>
                        <div className="cc__placecoords">{p.coords}</div>
                      </div>
                      <button className="cc__placejump">jump in</button>
                    </article>
                  ))}
                </div>
              )
            )}

            {section === "Photos" && (
              PHOTOS.length === 0 ? (
                <div className="cc__empty">No Photos here yet!</div>
              ) : (
                <div className="cc__photos">
                  {PHOTOS.map((p, i) => (
                    <div className="cc__photo" key={i} style={{ "--hue": p.hue }} />
                  ))}
                </div>
              )
            )}
          </section>

          <aside className="cc__aside">
            <button className="cc__asideclose" aria-label="Close events">×</button>
            <h3 className="cc__asidetitle">Upcoming Events</h3>
            <div className="cc__events">
              {EVENTS.map((e, i) => (
                <UpcomingEventCard key={i} event={e} />
              ))}
            </div>
          </aside>
        </div>
      </div>
      </div>
    </ExploreChrome>
  );
}
