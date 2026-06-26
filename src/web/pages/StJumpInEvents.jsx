import SitesChrome from "../frames/SitesChrome.jsx";
import "./stjumpinevents.css";

const LiveEventIcon = ({ color = "#ffffff" }) => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
    <circle cx="7.79575" cy="5.99967" r="1.90317" fill={color} />
    <path
      d="M10.4466 3.19928C11.1889 3.90207 11.6519 4.89681 11.6519 5.99969C11.6519 7.10257 11.1889 8.09731 10.4466 8.8001M5.14549 3.19928C4.40322 3.90207 3.94019 4.89681 3.94019 5.99969C3.94019 7.10257 4.40322 8.09731 5.14549 8.8001"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.3984 1C13.7468 2.24189 14.5916 4.02229 14.5916 6C14.5916 7.97771 13.7468 9.75811 12.3984 11M3.19325 1C1.84481 2.24189 1 4.02229 1 6C1 7.97771 1.84481 9.75811 3.19325 11"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarAddIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 25 25" fill="none" aria-hidden="true">
    <path d="M8.286 1.865v3.976M16.237 1.865v3.976" stroke="currentColor" strokeWidth="1.036" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3.425" y="4.142" width="17.889" height="17.889" rx="3.667" stroke="currentColor" strokeWidth="2.073" />
    <path d="M3.316 8.872h17.89" stroke="currentColor" strokeWidth="1.036" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.546 15.035h-2.665v2.665h-.888v-2.665H9.328v-.888h2.665v-2.665h.888v2.665h2.665v.888Z" fill="currentColor" />
  </svg>
);

const BellIcon = ({ size = 18, active = false }) => (
  <svg width={size} height={size} viewBox="0 0 25 25" fill="none" aria-hidden="true">
    <path
      d="M5.4167 9.44547C5.44685 7.63928 6.21335 5.91687 7.55087 4.64979C8.88839 3.38271 10.6897 2.6725 12.5663 2.67236C14.4429 2.67223 16.2444 3.38217 17.5821 4.64907C18.9198 5.91596 19.6866 7.63825 19.717 9.44444L19.7173 12.2663L21.4284 15.9735C21.4888 16.1045 21.5143 16.2479 21.5025 16.3907C21.4907 16.5335 21.4421 16.6712 21.361 16.7914C21.2799 16.9115 21.169 17.0103 21.0382 17.0787C20.9074 17.1471 20.7609 17.183 20.6121 17.1831L15.3891 17.1835L15.3919 17.1891L9.73956 17.1894L9.74313 17.1835L4.52097 17.1824C4.37215 17.1824 4.2257 17.1465 4.0949 17.0782C3.96411 17.0099 3.85311 16.9112 3.77197 16.7911C3.69084 16.671 3.64213 16.5333 3.63028 16.3905C3.61843 16.2477 3.6438 16.1043 3.7041 15.9733L5.41606 12.2689L5.41581 9.44696L5.4167 9.44547ZM7.20443 9.44545L7.20361 12.4516C7.20351 12.5717 7.17727 12.6905 7.1266 12.8002L5.89689 15.4632L19.2368 15.4629L18.006 12.7997C17.9557 12.69 17.9298 12.5713 17.93 12.4514L17.9284 9.44595C17.9026 8.09324 17.3262 6.80431 16.3233 5.85649C15.3203 4.90867 13.971 4.37771 12.5655 4.37784C11.16 4.37797 9.81067 4.90918 8.80791 5.85719C7.80515 6.80519 7.22904 8.09422 7.20354 9.44694L7.20443 9.44545Z"
      fill={active ? "var(--brand)" : "currentColor"}
    />
    <path
      d="M9.48535 18.7616C9.59625 19.475 9.96951 20.1265 10.5372 20.5974C11.1049 21.0683 11.8294 21.3274 12.5788 21.3275C13.3282 21.3277 14.0528 21.0689 14.6207 20.5982C15.1886 20.1276 15.5622 19.4763 15.6734 18.7629L9.48535 18.7616Z"
      fill={active ? "var(--brand)" : "currentColor"}
    />
  </svg>
);

const ShareIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z" />
  </svg>
);

const ClockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
  </svg>
);

const PublicIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93ZM17.9 17.39c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z" />
  </svg>
);

const PlaceIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

const JumpInArrow = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellBadge = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--brand)" aria-hidden="true">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2Zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16Z" />
  </svg>
);

const HomeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const INVALID_COPY = {
  title: "Oops!",
  message:
    "Looks like that link was invalid. If you still want to explore, jump into Decentraland's virtual world or browse community events.",
  messageMobile:
    "Looks like that link was invalid. If you still want to explore, browse the community's events then jump in-world from your computer.",
  jumpInButton: "Jump into Decentraland",
  exploreEvents: "EXPLORE EVENTS",
  goHome: "Go to Homepage",
};

const EVENTS_URL = "https://decentraland.org/events/";
const HOME_URL = "https://decentraland.org";

function InvalidView({ mobile }) {
  return (
    <div className={"siv" + (mobile ? " siv--mobile" : "")}>
      <div className="siv__bg" aria-hidden="true" />

      <div className="siv__container">
        <div className="siv__content">
          <div className="siv__box">
            <h3 className="siv__title">{INVALID_COPY.title}</h3>
            <p className="siv__message">{mobile ? INVALID_COPY.messageMobile : INVALID_COPY.message}</p>

            {!mobile && (
              <button type="button" className="siv__jumpin">
                {INVALID_COPY.jumpInButton}
                <JumpInArrow />
              </button>
            )}

            <a className="siv__explore" href={EVENTS_URL}>
              {INVALID_COPY.exploreEvents}
            </a>
          </div>
        </div>
      </div>

      {mobile && (
        <div className="siv__mobilebar">
          <a className="siv__gohome" href={HOME_URL}>
            <HomeIcon />
            {INVALID_COPY.goHome}
          </a>
        </div>
      )}
    </div>
  );
}

const SAMPLE_EVENT = {
  id: "8f3c2a10-1d4e-4b9a-9f01-7c6d2e0a55bb",
  type: "event",
  title: "Sunset Synthwave: Live DJ Set on the Pier",
  user_name: "neon.dcl",
  user: "0x3a9b7c4d2e8f0a1b6c5d4e3f2a1b0c9d8e7f6a5b",
  user_avatar: "",
  coordinates: [72, -10],
  image: "",
  description:
    "Catch the last light of the day with a two-hour live synthwave set right on the pier. Expect lasers, a dancefloor that wraps the boardwalk, and surprise guest performers dropping in throughout the night. Bring a friend, grab a spot by the rail, and let the bass roll over the water. Wearable drops for the first 100 attendees.",
  start_at: "Fri, Jun 27 · 8:00 PM",
  finish_at: "Fri, Jun 27 · 10:00 PM",
  start_at_iso: "2026-06-27T20:00:00.000Z",
  finish_at_iso: "2026-06-27T22:00:00.000Z",
  total_attendees: 248,
  attending: false,
  live: false,
  user_count: 37,
  position: "72,-10",
  realm: "soundstage.dcl.eth",
};

const SAMPLE_CREATOR = {
  user_name: "neon.dcl",
  user: "0x3a9b7c4d2e8f0a1b6c5d4e3f2a1b0c9d8e7f6a5b",
  avatar: "",
};

const DEFAULT_DESCRIPTION =
  "You're about to jump into Decentraland! Explore a virtual world built by its community and make new friends from anywhere.";

function hueFor(addr) {
  let h = 0;
  for (let i = 0; i < (addr || "").length; i++) h = (h * 31 + addr.charCodeAt(i)) % 360;
  return h;
}

function EventCard({ data, creator, state, isReminded }) {
  const loading = state === "loading";
  const ended = state === "ended";
  const live = state === "live";
  const deleted = state === "deleted";

  if (loading) {
    return (
      <div className="u-jumpin-card sje__card">
        <div className="sje__image">
          <div className="sje__loading">
            <span className="sje__spinner" aria-label="Loading event" />
          </div>
        </div>
        <div className="sje__content">
          <div className="sje__skel sje__skel--title" />
          <div className="sje__skel sje__skel--line" />
          <div className="sje__skel sje__skel--line" />
          <div className="sje__skel sje__skel--line sje__skel--short" />
          <div className="sje__skel sje__skel--block" />
        </div>
      </div>
    );
  }

  const creatorAddr = creator?.user || data.user;
  const displayName = creator?.user_name || data.user_name;
  const realm = data.realm;

  return (
    <div className="u-jumpin-card sje__card">
      <div className="sje__image">
        <div className="sje__cover" aria-hidden="true" />
        {live ? (
          <span className="sje__badge sje__badge--live">
            <LiveEventIcon color="#ffffff" />
            LIVE +{data.user_count || 0}
          </span>
        ) : (
          <span className="sje__badge sje__badge--upcoming">
            <BellBadge />+{data.total_attendees ?? 0}
          </span>
        )}
      </div>

      <div className="sje__content">
        <div className="sje__body">
          <h2 className="sje__title">{data.title}</h2>

          <div className="sje__creator">
            <span
              className="sje__avatar u-avatar"
              style={{ "--sz": "32px", "--hue": hueFor(creatorAddr) }}
              aria-hidden="true"
            />
            <span className="sje__by">By </span>
            <button type="button" className="sje__creatorlink" aria-label={`View ${displayName}'s profile`}>
              {displayName}
            </button>
          </div>

          <div className="sje__meta">
            {data.start_at && (
              <span className={"sje__chip sje__chip--date" + (ended ? " is-ended" : "")}>
                <ClockIcon />
                {ended ? "EVENT HAS ENDED" : data.start_at}
              </span>
            )}
            <span className="sje__chip sje__chip--loc" aria-label={realm ? `World: ${realm}` : undefined}>
              {realm ? <PublicIcon /> : <PlaceIcon />}
              {realm ?? `${data.coordinates[0]}, ${data.coordinates[1]}`}
            </span>
          </div>

          <div className="sje__desc">
            <div className="sje__desctext">{data.description || DEFAULT_DESCRIPTION}</div>
          </div>
        </div>

        {deleted ? (
          <div className="sje__actions">
            <p className="sje__deleted">
              This hangout is no longer available. Browse{" "}
              <a className="sje__deletedlink" href="/whats-on">
                All Hangouts
              </a>{" "}
              to discover more.
            </p>
          </div>
        ) : live ? (
          <button type="button" className="sje__jumpin">
            Jump In
            <JumpInArrow />
          </button>
        ) : ended ? (
          <div className="sje__actions">
            <a className="sje__explore" href="https://decentraland.org/events">
              EXPLORE EVENTS
            </a>
          </div>
        ) : (
          <div className="sje__actions">
            <button type="button" className="sje__calendar">
              <CalendarAddIcon size={16} />
              ADD TO CALENDAR
            </button>
            <button type="button" className={"sje__remind" + (isReminded ? " is-active" : "")}>
              <BellIcon size={18} active={isReminded} />
              <span className="sje__remindlabel">REMIND ME</span>
            </button>
            <button type="button" className="sje__share" aria-label="Share">
              <ShareIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StJumpInEvents({
  data = SAMPLE_EVENT,
  creator = SAMPLE_CREATOR,
  state = "upcoming",
  isReminded = false,
  invalidVariant = "desktop",
}) {
  if (state === "invalid") {
    return (
      <SitesChrome active="legal" overlayNav>
        <InvalidView mobile={invalidVariant === "mobile"} />
      </SitesChrome>
    );
  }

  // "reminded" is upcoming with the bell pre-toggled.
  const cardState = state === "reminded" ? "upcoming" : state;
  const reminded = isReminded || state === "reminded";

  return (
    <SitesChrome active="legal" overlayNav>
      <div className="sje">
        <div className="sje__bg" aria-hidden="true" />
        <div className="sje__stage">
          <EventCard data={data} creator={creator} state={cardState} isReminded={reminded} />
        </div>
      </div>
    </SitesChrome>
  );
}
