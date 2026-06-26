/**
 * ChatWindow — a STATIC visual concept for a windowed Nearby chat redesign.
 *
 * Presentational only: rounded titlebar + location/minimap card + message
 * bubbles over a daytime sky. The input is uncontrolled and there is NO
 * `sendBridge` wiring; nothing mounts this in `overlay/Overlay.jsx` (it is only
 * reachable as the standalone `chatwindow` route).
 *
 * The functional, overlay-wired chat is `Chat.jsx` — that is the canonical
 * implementation. Treat ChatWindow as a design exploration until adopted.
 */
import { Avatar } from "../../atoms/primitives.jsx";
import "./chatwindow.css";

const TOOLS = [
  { id: "notifications", label: "Notifications",
    svg: <g><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M9.5 20a2.5 2.5 0 0 0 5 0" /></g> },
  { id: "settings", label: "Settings",
    svg: <g><circle cx="12" cy="12" r="3.2" /><path d="M19.2 13.6a7.4 7.4 0 0 0 0-3.2l1.9-1.5-1.8-3.1-2.3.9a7.4 7.4 0 0 0-2.8-1.6L13.5 2h-3l-.4 2.5a7.4 7.4 0 0 0-2.8 1.6l-2.3-.9-1.8 3.1L4.8 10.4a7.4 7.4 0 0 0 0 3.2l-1.9 1.5 1.8 3.1 2.3-.9a7.4 7.4 0 0 0 2.8 1.6L10.5 22h3l.4-2.5a7.4 7.4 0 0 0 2.8-1.6l2.3.9 1.8-3.1z" /></g> },
  { id: "emote", label: "Emotes",
    svg: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" stroke="none" /> },
  { id: "backpack", label: "Backpack",
    svg: <g><path d="M6 9a6 6 0 0 1 12 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" /><path d="M9 9a3 3 0 0 1 6 0M9 14h6" /></g> },
  { id: "map", label: "Map",
    svg: <g><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></g> },
  { id: "friends", label: "Friends", badge: "+9",
    svg: <g><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3 2.7-4.5 6-4.5s6 1.5 6 4.5" /><path d="M16 6.5a2.5 2.5 0 0 1 0 5M18 19c0-2 1-3.2 3-3.2" /></g> },
  { id: "chat", label: "Chat", active: true,
    svg: <path d="M4 5h16v11H9l-4 4z" /> },
];

const MSGS = [
  { u: "MiguelAmargo", verified: true, t: "01:01 AM", m: "yes i love it", hue: 150 },
  { u: "MiguelAmargo", verified: true, t: "01:01 AM", m: "but hard to find good ones", hue: 150 },
  { u: "MiguelAmargo", verified: true, t: "01:01 AM", m: "im pretty peaky about pasteis de nata", hue: 150 },
  { u: "MiguelAmargo", verified: true, t: "01:01 AM", m: "i demand great pastel", hue: 150 },
  { u: "MiguelAmargo", verified: true, t: "01:01 AM", m: "not just avarage", hue: 150 },
  { u: "sebga", verified: true, t: "01:02 AM", hue: 310,
    m: "i have an uncle (married to my haunt ,  lol , nice explanation ) portuges,  but many portuges shop in france" },
];

function VerifiedBadge() {
  return (
    <svg className="cw__verified" viewBox="0 0 24 24" width="13" height="13" aria-label="Verified">
      <path
        fill="currentColor"
        d="M12 1l2.6 2.1 3.3-.4 1.3 3.1 3.1 1.3-.4 3.3L24 14l-2.1 2.6.4 3.3-3.1 1.3-1.3 3.1-3.3-.4L12 23l-2.6-2.1-3.3.4-1.3-3.1L1.7 16.6 2.1 13 0 11l2.1-2.6L1.7 5.1l3.1-1.3 1.3-3.1 3.3.4z"
      />
      <path fill="#fff" d="M10.6 14.6l-2.3-2.3-1.2 1.2 3.5 3.5 6-6-1.2-1.2z" />
    </svg>
  );
}

export default function ChatWindow({ bare = false }) {
  return (
    <div className={"cw__stage" + (bare ? " cw__stage--bare" : "")}>
      {!bare && (
      <nav className="cw__toolbar" aria-label="HUD shortcuts">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            className={"cw__tool" + (t.active ? " is-active" : "")}
            title={t.label}
            aria-label={t.label}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {t.svg}
            </svg>
            {t.badge && <span className="cw__toolbadge">{t.badge}</span>}
          </button>
        ))}
      </nav>
      )}

      <div className="cw__dock">
        {!bare && (
        <div className="cw__loc">
          <div className="cw__locbar">
            <span className="cw__locname">Genesis Plaza</span>
            <svg className="cw__locchevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M6 15l6-6 6 6" />
            </svg>
            <span className="cw__locspacer" />
            <svg className="cw__locheart" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 21s-7.5-4.6-9.7-9C.9 8.9 2.5 5.5 5.8 5.5c1.9 0 3.2 1 4.2 2.3 1-1.3 2.3-2.3 4.2-2.3 3.3 0 4.9 3.4 3.5 6.5C19.5 16.4 12 21 12 21z" />
            </svg>
          </div>
          <div className="cw__loccoords">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.3" />
            </svg>
            0, 0,-1
          </div>
          <div className="cw__minimap" aria-hidden="true">
            <span className="cw__minimapstar">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff" aria-hidden="true">
                <path d="M12 2l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 16.9 6.2 20.3l1.6-6.6L2.6 9.3l6.8-.5z" />
              </svg>
            </span>
            <span className="cw__minimaplabel">Genesis Plaza</span>
            <span className="cw__minimapself" />
          </div>
        </div>
        )}

        <div className="cw">
          <header className="cw__titlebar">
            <Avatar hue={335} size={22} className="cw__titleavatar" />
            <span className="cw__title">Nearby</span>
            <span className="cw__statusdot" aria-hidden="true" />
            <span className="cw__status" />
            <button className="cw__iconbtn" title="Members" aria-label="Members">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="9" cy="8" r="3" /><path d="M3 19c0-3 2.7-4.5 6-4.5s6 1.5 6 4.5" />
                <path d="M16 6.5a2.5 2.5 0 0 1 0 5M18 19c0-2 1-3.2 3-3.2" />
              </svg>
            </button>
            <button className="cw__iconbtn" title="More" aria-label="More options">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />
              </svg>
            </button>
          </header>

          <div className="cw__feed">
            {MSGS.map((x, i) => (
              <div className="cw__row" key={i}>
                <Avatar hue={x.hue} size={26} className="cw__msgavatar" />
                <div className="cw__msgcol">
                  <div className="cw__msgmeta">
                    <span className="cw__msguser">{x.u}</span>
                    {x.verified && <VerifiedBadge />}
                  </div>
                  <div className="cw__bubble">
                    <div className="cw__msgtext">{x.m}</div>
                    <div className="cw__msgtime">{x.t}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cw__inputrow">
            <div className="cw__input">
              <Avatar hue={210} size={26} className="cw__inputavatar" />
              <input className="cw__field" placeholder="Write a message" aria-label="Message" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
