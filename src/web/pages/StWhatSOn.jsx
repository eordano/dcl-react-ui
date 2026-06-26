import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import { asset } from "../../asset.js";
import "./stwhatson.css";

const poster = (hue, image) => {
  const gradient = `linear-gradient(150deg, hsl(${hue} 70% 52%) 0%, hsl(${(hue + 40) % 360} 60% 28%) 100%)`;
  return {
    "--hue": hue,
    // Real event poster over the hue gradient (gradient = load/error/no-image fallback).
    backgroundImage: image ? `url("${image}"), ${gradient}` : gradient,
    ...(image ? { backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : null),
  };
};

const LIVE_NOW = [
  { id: "ln1", title: "Vegas City Casino Night", users: 312, isEvent: true, creator: "VegasCityDAO", hue: 268 },
  { id: "ln2", title: "Genesis Plaza Welcome Hub", users: 526, isEvent: false, creator: "Decentraland", hue: 200 },
];

const UPCOMING = [
  { id: "up1", name: "Metaverse Fashion Week Runway", creator: "MVFW", time: "Today 18:00", hue: 320 },
  { id: "up2", name: "DAO Town Hall — Q2 Treasury", creator: "governance.dcl", time: "Tomorrow 16:00", hue: 30 },
  { id: "up3", name: "Music Festival: Synthwave Stage", creator: "soundscape.dcl", time: "Starts in 3 hours", hue: 264 },
  { id: "up4", name: "Builder Workshop: Smart Items 101", creator: "0x7c…a4e1", time: "Fri 14:00", hue: 130 },
  { id: "up5", name: "Wearable Drop: CryptoArt Studios", creator: "cryptoart.dcl", time: "Sat 20:00", hue: 48 },
  { id: "up6", name: "Casino Poker Championship", creator: "VegasCityDAO", time: "Sun 21:00", hue: 0 },
  { id: "up7", name: "Art Gallery Opening Night", creator: "0xab…77d3", time: "Mon 19:00", hue: 210 },
  { id: "up8", name: "Trivia & Hangout — Open Mic", creator: "hangouts.dcl", time: "Tue 17:30", hue: 96 },
];

const DAY_LABELS = ["Today", "Tomorrow", "Wed", "Thu", "Fri"];
const ALL_DAYS = [
  [
    { id: "a1", name: "Casino Night", creator: "VegasCityDAO", time: "18:00", live: true, x: 72, y: 12, users: 312, hue: 268 },
    { id: "a2", name: "Synthwave DJ Set", creator: "soundscape.dcl", time: "21:00", live: false, hue: 264 },
    { id: "a3", name: "Open Mic Trivia", creator: "hangouts.dcl", time: "22:30", live: false, hue: 96 },
  ],
  [
    { id: "b1", name: "DAO Town Hall", creator: "governance.dcl", time: "16:00", live: false, hue: 30 },
    { id: "b2", name: "Fashion Runway", creator: "MVFW", time: "18:00", live: false, hue: 320 },
  ],
  [
    { id: "c1", name: "Smart Items 101", creator: "0x7c…a4e1", time: "14:00", live: false, hue: 130 },
  ],
  [
    { id: "d1", name: "Gallery Opening", creator: "0xab…77d3", time: "19:00", live: false, hue: 210 },
    { id: "d2", name: "Poker Championship", creator: "VegasCityDAO", time: "21:00", live: false, hue: 0 },
  ],
  [],
];

const SensorsIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M7.76 16.24a6 6 0 0 1 0-8.49l1.42 1.42a4 4 0 0 0 0 5.65l-1.42 1.42Zm8.48 0-1.42-1.42a4 4 0 0 0 0-5.65l1.42-1.42a6 6 0 0 1 0 8.49ZM5.64 18.36a9 9 0 0 1 0-12.73l1.41 1.42a7 7 0 0 0 0 9.9l-1.41 1.41Zm12.72 0-1.41-1.41a7 7 0 0 0 0-9.9l1.41-1.42a9 9 0 0 1 0 12.73ZM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
  </svg>
);
const JumpInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M14 3v2h3.59l-9.3 9.29 1.42 1.42L19 6.41V10h2V3h-7ZM5 5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6H5V5Z" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59Z" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z" />
  </svg>
);
const CalendarPlus = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h7v-2H5V9h14v2h2V6a2 2 0 0 0-2-2Zm-1 14h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2Z" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z" />
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2Z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
  </svg>
);
const AddIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
  </svg>
);

function LiveNowCard({ card }) {
  return (
    <article className="wo-ln__card">
      <button type="button" className="wo-ln__area">
        <div className="wo-ln__badges">
          {card.isEvent && <span className="wo-ln__live">LIVE</span>}
          <span className="wo-ln__users">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-2.67 0-8 1.34-8 4v3h10v-3c0-.99.49-1.85 1.27-2.55A14.6 14.6 0 0 0 8 13Zm8 0c-.32 0-.69.02-1.08.06A4.27 4.27 0 0 1 16 16v3h8v-3c0-2.66-5.33-4-8-4Z" />
            </svg>
            {card.users}
          </span>
        </div>
        <div className="wo-ln__media" role="img" aria-label={card.title} style={poster(card.hue, card.image)} />
        <div className="wo-ln__body">
          <div className="wo-ln__info">
            <h3 className="wo-ln__title u-truncate">{card.title}</h3>
            <div className="wo-ln__creatorrow">
              <span className="wo-ln__avatar u-avatar" style={{ "--sz": "32px", "--hue": card.hue }} aria-hidden="true" />
              <span className="wo-ln__creator u-truncate">
                by <strong>{card.creator}</strong>
              </span>
            </div>
          </div>
          <div className="wo-ln__jumpwrap">
            <span className="wo-ln__jump">
              <span>JUMP IN</span>
              <JumpInIcon />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

function LiveNow({ cards }) {
  if (!cards.length) return null;
  return (
    <section className="wo-ln">
      <header className="wo-ln__header">
        <span className="wo-ln__sensors" aria-hidden="true">
          <SensorsIcon />
        </span>
        <h2 className="wo-ln__heading">Live Now</h2>
      </header>
      <div className="wo-ln__grid">
        {cards.map((c) => (
          <LiveNowCard key={c.id} card={c} />
        ))}
      </div>
    </section>
  );
}

function UpcomingCard({ event }) {
  return (
    <div className="wo-sm" role="button" tabIndex={0}>
      <div className="wo-sm__thumbwrap" style={poster(event.hue, event.image)} role="img" aria-label={event.name} />
      <div className="wo-sm__text">
        <div className="wo-sm__top">
          <h3 className="wo-sm__title">{event.name}</h3>
          <div className="wo-sm__creatorrow">
            <span className="wo-sm__avatar u-avatar" style={{ "--sz": "19px", "--hue": event.hue }} aria-hidden="true" />
            <span className="wo-sm__creator u-truncate">
              by <span className="wo-sm__creatorhi">{event.creator}</span>
            </span>
          </div>
        </div>
        <div className="wo-sm__pill" data-role="time-pill">
          <ClockIcon />
          <span className="wo-sm__time">{event.time}</span>
        </div>
        <div className="wo-sm__actions" data-role="hover-actions">
          <button type="button" className="wo-sm__textbtn">
            <CalendarPlus />
            <span>Add to calendar</span>
          </button>
          <button type="button" className="wo-sm__iconbtn" aria-label="Copy link">
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function Upcoming({ events }) {
  if (!events.length) return null;
  return (
    <section className="wo-up">
      <h2 className="wo-up__title">Upcoming</h2>
      <div className="wo-up__grid">
        {events.map((e) => (
          <UpcomingCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}

function FutureCard({ event }) {
  return (
    <div className="wo-fc" role="button" tabIndex={0}>
      <div className="wo-fc__imgwrap" style={poster(event.hue, event.image)} role="img" aria-label={event.name} />
      <div className="wo-fc__content">
        <h4 className="wo-fc__title u-truncate">{event.name}</h4>
        <div className="wo-fc__creatorrow" data-role="creator-row">
          <span className="wo-fc__avatar u-avatar" style={{ "--sz": "19px", "--hue": event.hue }} aria-hidden="true" />
          <span className="wo-fc__creator u-truncate">
            by <span className="wo-fc__creatorhi">{event.creator}</span>
          </span>
        </div>
        <div className="wo-fc__pill" data-role="time-pill">
          <ClockIcon />
          <span className="wo-fc__time">{event.time}</span>
        </div>
        <div className="wo-fc__actions" data-role="hover-actions">
          <button type="button" className="wo-fc__textbtn">
            <BellIcon />
            <span>Remind me</span>
          </button>
          <button type="button" className="wo-fc__iconbtn" aria-label="Copy link">
            <CopyIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function LiveCard({ event }) {
  return (
    <div className="wo-lc" role="button" tabIndex={0}>
      <div className="wo-lc__media" style={poster(event.hue, event.image)} role="img" aria-label={event.name}>
        <div className="wo-lc__badges">
          <span className="wo-lc__live">LIVE</span>
          <span className="wo-lc__users">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-2.67 0-8 1.34-8 4v3h10v-3c0-.99.49-1.85 1.27-2.55A14.6 14.6 0 0 0 8 13Zm8 0c-.32 0-.69.02-1.08.06A4.27 4.27 0 0 1 16 16v3h8v-3c0-2.66-5.33-4-8-4Z" />
            </svg>
            {event.users}
          </span>
        </div>
      </div>
      <div className="wo-lc__content">
        <h4 className="wo-lc__title u-truncate">{event.name}</h4>
      </div>
    </div>
  );
}

function DayColumn({ events }) {
  return (
    <div className="wo-col" role="list">
      <div className="wo-col__scroll">
        {events.map((e) =>
          e.live ? (
            <div className="wo-col__slot" role="listitem" key={e.id}>
              <LiveCard event={e} />
            </div>
          ) : (
            <div className="wo-col__slot" role="listitem" key={e.id}>
              <FutureCard event={e} />
            </div>
          )
        )}
        <span className="wo-col__filler" aria-hidden="true" />
      </div>
    </div>
  );
}

function HostBanner() {
  const CHECKS = [
    "Choose a vibe people can drop into.",
    "Add the hangout details.",
    "Publish it and send the invites.",
  ];
  return (
    <section className="wo-host" aria-label="Host a Hangout">
      <img className="wo-host__avatar" src={asset("assets/whatson-host-avatar.webp")} alt="" aria-hidden="true" />
      <div className="wo-host__content">
        <h3 className="wo-host__title">Host a Hangout</h3>
        <p className="wo-host__subtitle">Bring people together, your way.</p>
        <div className="wo-host__checks">
          {CHECKS.map((c) => (
            <div className="wo-host__check" key={c}>
              <span className="wo-host__box" aria-hidden="true">
                <CheckIcon />
              </span>
              <span className="wo-host__checktext">{c}</span>
            </div>
          ))}
        </div>
        <div className="wo-host__buttons">
          <button type="button" className="wo-host__btn wo-host__btn--primary">
            <AddIcon />
            Create a Hangout
          </button>
          <button type="button" className="wo-host__btn wo-host__btn--secondary">
            Learn More
          </button>
        </div>
      </div>
      <div className="wo-host__scene" aria-hidden="true">
        <img className="wo-host__sceneimg" src={asset("assets/whatson-host-scene.webp")} alt="" />
      </div>
    </section>
  );
}

function AllExperiences({ days, dayLabels }) {
  const [start, setStart] = useState(0);
  const visibleCount = days.length;
  const labelFor = (i) => dayLabels[i] || `+${i}d`;
  return (
    <section className="wo-all" aria-label="All Hangouts">
      <h2 className="wo-all__title">All Hangouts</h2>
      <nav className="wo-all__nav" aria-label="All Hangouts dates">
        <button
          type="button"
          className="wo-all__navbtn wo-all__navbtn--left"
          aria-label="Navigate to previous dates"
          disabled={start === 0}
          onClick={() => setStart((s) => Math.max(0, s - 1))}
        >
          <ChevronLeft />
        </button>
        {days.map((_, i) => (
          <span key={i} className={"wo-all__date" + (i === 0 && start === 0 ? " is-today" : "")}>
            {labelFor(i)}
          </span>
        ))}
        <button
          type="button"
          className="wo-all__navbtn wo-all__navbtn--right"
          aria-label="Navigate to next dates"
          onClick={() => setStart((s) => s + 1)}
        >
          <ChevronRight />
        </button>
      </nav>
      <div className="wo-all__cols" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
        {days.map((events, i) => (
          <DayColumn key={i} events={events} />
        ))}
      </div>
      <HostBanner />
    </section>
  );
}

export default function StWhatSOn({
  liveNow = LIVE_NOW,
  upcoming = UPCOMING,
  allDays = ALL_DAYS,
  dayLabels = DAY_LABELS,
  loading = false,
  filterBar = null,
}) {
  const deferred = useMemo(() => loading, [loading]);

  return (
    <SitesChrome active="play" overlayNav>
      <div className="wo">
        <img className="wo__bg" src={asset("assets/whatson-top.webp")} alt="" aria-hidden="true" />
        <div className="wo__top" aria-hidden="true" />
        <div className="wo__content">
          {filterBar}
          <LiveNow cards={liveNow} />
          {!deferred && (
            <>
              <Upcoming events={upcoming} />
              <AllExperiences days={allDays} dayLabels={dayLabels} />
            </>
          )}
        </div>
      </div>
    </SitesChrome>
  );
}
