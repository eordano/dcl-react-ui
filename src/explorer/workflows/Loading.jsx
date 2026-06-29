import { useEvents } from "../../data/hooks/useEvents.js";
import { eventStart, formatEventTime, hueFor } from "../../data/catalyst/events.js";
import "./loading.css";

const TIP_BODY =
  "Movie nights, trivia, dance parties — there's usually something happening. " +
  "Drop in enough times and you'll start to recognize the regulars.";

function DclGem() {
  return (
    <svg className="loading__gem" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#ff2d55" />
      <path
        d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
        fill="#fff"
      />
    </svg>
  );
}

function hostOf(ev) {
  return ev?.user_name || ev?.scene_name || ev?.estate_name || "Decentraland";
}

function EventCard({ ev, front }) {
  const hue = hueFor(ev.id);
  const artStyle = ev.image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.55)), url("${ev.image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(135deg, hsl(${hue} 60% 42%), hsl(${(hue + 40) % 360} 65% 40%))`,
      };
  return (
    <div className={"loading__card " + (front ? "loading__card--front" : "loading__card--back")}>
      <div className="loading__card-art" style={artStyle} aria-hidden="true" />
      <div className="loading__card-info">
        <div className="loading__card-title">{ev.name || "Untitled event"}</div>
        <div className="loading__card-sub">By {hostOf(ev)}</div>
        <div className="loading__card-time">
          <span className="loading__clock" /> {formatEventTime(eventStart(ev))}
        </div>
      </div>
    </div>
  );
}

export default function Loading({ progress = 65 }) {
  const evq = useEvents({ list: "highlight", limit: 2 });
  const events = (evq.data?.data ?? []).slice(0, 2);
  const hasEvents = events.length > 0;

  return (
    <div className="loading">
      <header className="loading__header">
        <div className="loading__brand">
          <DclGem />
          <span>Decentraland</span>
        </div>
        <div className="loading__pct">LOADING {progress}%</div>
      </header>
      <div className="loading__bar">
        <div className="loading__bar-fill" style={{ width: progress + "%" }} />
      </div>

      {hasEvents ? (
        <div className="loading__cards" aria-hidden="true">
          {events.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} front={i === events.length - 1} />
          ))}
        </div>
      ) : null}

      <div className="loading__tip">
        {hasEvents ? <h1 className="loading__title">What's On</h1> : null}
        <p className="loading__body">{TIP_BODY}</p>
      </div>
    </div>
  );
}
