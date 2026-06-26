import SitesChrome from "../frames/SitesChrome.jsx";
import { asset } from "../../asset.js";
import "./siteshome.css";

const STORE_LINKS = [
  { id: "ios", label: "iOS", href: "https://decentraland.org/download" },
  { id: "android", label: "Android", href: "https://decentraland.org/download" },
];

const EVENTS = [
  { id: "e1", cat: "MUSIC", title: "Sunset Synthwave — Live DJ Set on the Pier", when: "Today · 8:00 PM", grad: "linear-gradient(135deg, #ff2d55 0%, #982de2 70%)", live: true },
  { id: "e2", cat: "COMMUNITY", title: "Metaverse Fashion Week — Opening Night", when: "Fri · 6:00 PM", grad: "linear-gradient(135deg, #ff4bed 0%, #6a1fb0 70%)" },
  { id: "e3", cat: "GAMES", title: "Genesis Plaza Trivia Night", when: "Sat · 7:00 PM", grad: "linear-gradient(135deg, #1f8a70 0%, #438fff 70%)" },
];

const VIBES = [
  { id: "v1", user: "AlanHowick", dur: "0:42", hue: 268, grad: "linear-gradient(135deg, #ff743a 0%, #982de2 60%, #1a0a2e 100%)" },
  { id: "v2", user: "Roustan", dur: "1:15", hue: 200, grad: "linear-gradient(135deg, #438fff 0%, #ff2d55 60%, #220040 100%)" },
];

const RITUALS = [
  { id: "career-mondays", title: "Career Mondays", grad: "linear-gradient(135deg, #438fff, #2f004d)" },
  { id: "takeover-tuesdays", title: "Takeover Tuesdays", grad: "linear-gradient(135deg, #ff2d55, #350447)" },
  { id: "watch-party-wednesdays", title: "Watch Party Wednesdays", grad: "linear-gradient(135deg, #b05cff, #220040)" },
  { id: "trivia-thursdays", title: "Trivia Thursdays", grad: "linear-gradient(135deg, #1f8a70, #06231c)" },
  { id: "play-with-friends-fridays", title: "Play with Friends Fridays", grad: "linear-gradient(135deg, #ff743a, #3a1500)" },
];

const VerifiedMark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M12 2 14.9 4.6 18.8 4.2 19.8 8 23 10.3 21.2 13.6 22.4 17.3 18.6 18.1 16.8 21.5 13 20.1 9.2 21.5 7.4 18.1 3.6 17.3 4.8 13.6 3 10.3 6.2 8 7.2 4.2 11.1 4.6 12 2Z" fill="var(--brand)" />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const DesktopMark = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <rect x="2.5" y="4" width="19" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M9 20h6M12 17v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const EpicMark = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <rect x="4" y="2.5" width="16" height="19" rx="3" fill="currentColor" />
    <path d="M9 7h6M9 12h5M9 17h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ArrowMark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const PlayMark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#fff" />
  </svg>
);

function DownloadCta({ downloads }) {
  return (
    <>
      <div className="sh__cta">
        <a className="sh__btn sh__btn--primary" href="https://decentraland.org/download">
          <DesktopMark />
          Download for desktop
        </a>
        <a className="sh__btn sh__btn--epic" href="https://store.epicgames.com/en-US/p/decentraland" target="_blank" rel="noopener noreferrer">
          <EpicMark />
          Download on Epic Games
        </a>
      </div>
      <div className="sh__meta">
        <span className="sh__downloads"><VerifiedMark />{downloads} downloads</span>
        <span className="sh__sep" aria-hidden="true" />
        <div className="sh__platforms">
          {STORE_LINKS.map((p) => (
            <a key={p.id} className="sh__platform" href={p.href} aria-label={`Get the app on ${p.label}`}>{p.label}</a>
          ))}
        </div>
      </div>
    </>
  );
}

export default function SitesHome({ downloads = "+400K", events }) {
  const eventCards = events && events.length > 0 ? events : EVENTS;
  return (
    <SitesChrome active="play" overlayNav>
      <div className="sh">
        <section className="sh__hero">
          <img className="sh__heroimg" src={asset("assets/home-hero.webp")} alt="" aria-hidden="true" />
          <div className="sh__heroinner">
            <span className="sh__kicker">Decentraland now on mobile</span>
            <h1 className="sh__title">Hang Out From Anywhere</h1>
            <p className="sh__sub">Close the Feed. Come Hang Out.</p>
            <DownloadCta downloads={downloads} />
          </div>
        </section>

        <section className="sh__sec sh__whatson">
          <div className="sh__sechead">
            <h2 className="sh__h2">Jump Into What's Happening</h2>
            <a className="sh__viewall" href="https://decentraland.org/whats-on">
              View All <ArrowMark />
            </a>
          </div>
          <div className="sh__eventgrid">
            {eventCards.map((ev) => (
              <article className="sh__event" key={ev.id}>
                <div
                  className="sh__eventimg"
                  style={
                    ev.image
                      ? {
                          backgroundImage: `url("${ev.image}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : { background: ev.grad }
                  }
                >
                  {ev.live ? <span className="sh__eventlive">● LIVE</span> : null}
                </div>
                <div className="sh__eventmeta">
                  <span className="sh__eventcat">{ev.cat ?? ev.category}</span>
                  <h3 className="sh__eventtitle">{ev.title}</h3>
                  <span className="sh__eventwhen">{ev.when}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sh__sec sh__vibe">
          <h2 className="sh__h2">Catch the Vibe</h2>
          <div className="sh__viberow">
            {VIBES.map((v) => (
              <article className="sh__vibecard" key={v.id}>
                <div className="sh__vibeimg" style={{ background: v.grad }}>
                  <span className="sh__vibeplay"><PlayMark /></span>
                  <span className="sh__vibedur">{v.dur}</span>
                </div>
                <div className="sh__vibefoot">
                  <span className="sh__vibeuser">
                    <span className="sh__vibeavatar u-avatar" style={{ "--sz": "28px", "--hue": v.hue }} />
                    {v.user}
                  </span>
                  <a className="sh__hangout" href="https://decentraland.org/download">HANG OUT NOW</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sh__sec sh__rituals">
          <h2 className="sh__h2">Your Weekly Rituals</h2>
          <div className="sh__ritualrow">
            {RITUALS.map((r) => (
              <a className="sh__ritual" key={r.id} href="https://decentraland.org/whats-on" style={{ background: r.grad }}>
                <span className="sh__ritualday">{r.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="sh__banner">
          <img className="sh__banimg" src={asset("assets/come-hang-out.webp")} alt="" aria-hidden="true" />
          <div className="sh__bancontent">
            <h2 className="sh__bantitle">Come Hang Out</h2>
            <DownloadCta downloads={downloads} />
          </div>
        </section>
      </div>
    </SitesChrome>
  );
}
