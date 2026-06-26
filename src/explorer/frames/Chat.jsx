/**
 * Chat — the CANONICAL, live in-world Nearby chat island.
 *
 * Functional: controlled input that submits through `sendBridge("SendChat", …)`,
 * and the chat that `overlay/Overlay.jsx` actually mounts in the HUD. The log
 * auto-scrolls to the newest message on mount (see `logRef` below).
 *
 * Not to be confused with `ChatWindow.jsx`, which is a STATIC visual redesign
 * concept and is not wired into the overlay. Prefer this component for real use.
 */
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../../atoms/primitives.jsx";
import { sendBridge } from "../../overlay/bridge.js";
import "./chat.css";

function Ico({ d, children, viewBox = "0 0 24 24" }) {
  return (
    <svg className="chrail__icon" viewBox={viewBox} aria-hidden="true" focusable="false">
      {d ? <path d={d} /> : children}
    </svg>
  );
}

const ICONS = {
  bell: <Ico d="M12 2a6 6 0 0 0-6 6c0 3.6-1 5.4-1.8 6.3-.5.6-.1 1.7.8 1.7h14c.9 0 1.3-1.1.8-1.7C19 13.4 18 11.6 18 8a6 6 0 0 0-6-6Zm0 20a2.6 2.6 0 0 0 2.6-2.4H9.4A2.6 2.6 0 0 0 12 22Z" />,
  places: <Ico d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />,
  people: <Ico d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 1.5C5.5 12.5 2 14 2 16.5V19h8v-2.5c0-1 .5-2 1.4-2.7a7 7 0 0 0-2.9-.8Zm7 0c-.6 0-1.2.1-1.8.2 1 .8 1.8 1.8 1.8 3.3V19h6v-2.5c0-2.5-3.5-4-6-4Z" />,
  backpack: <Ico d="M9 4.2A3 3 0 0 1 15 4.2V5h1.2a2.6 2.6 0 0 1 2.6 2.6V17a2.6 2.6 0 0 1-2.6 2.6H7.8A2.6 2.6 0 0 1 5.2 17V7.6A2.6 2.6 0 0 1 7.8 5H9v-.8Zm2 .8h2a1.5 1.5 0 0 0-2 0Zm-2.4 4.4v3.2h6.8V9.4H8.6Zm0 4.6V17h6.8v-3H8.6Z" />,
  marketplace: <Ico d="M7 7V6a5 5 0 0 1 10 0v1h2.2l.8 12.5a2 2 0 0 1-2 2.1H6a2 2 0 0 1-2-2.1L4.8 7H7Zm2 0h6V6a3 3 0 0 0-6 0v1Z" />,
  gallery: <Ico d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v9.6l3.8-3.8 2.6 2.6 3.4-3.4L19 16.8V6H5Zm3.5 1.8a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z" />,
  settings: <Ico d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1.5-2-3.4-2.4 1a7.6 7.6 0 0 0-1.7-1l-.4-2.6H10l-.4 2.6c-.6.3-1.2.6-1.7 1l-2.4-1-2 3.4L3.6 11a7.8 7.8 0 0 0 0 2l-2 1.5 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.5ZM12 15.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4Z" />,
  help: <Ico d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.1 14.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm1.7-5.1c-.7.6-1 1-1 1.7v.4h-1.8v-.5c0-1.1.5-1.9 1.4-2.6.7-.5 1-.9 1-1.5 0-.7-.5-1.2-1.4-1.2-.8 0-1.4.5-1.6 1.3l-1.7-.4c.3-1.5 1.5-2.5 3.3-2.5 2 0 3.3 1.1 3.3 2.8 0 1-.5 1.7-1.5 2.5Z" />,
  voice: (
    <Ico>
      <path d="M9.4 6.5a4.6 4.6 0 1 0 .2 8.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.2 8.6a3 3 0 0 1 0 5.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.8 7a5 5 0 0 1 0 8.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </Ico>
  ),
  wearables: <Ico d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  skybox: (
    <Ico>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8a4 4 0 0 0 0 8Z" fill="currentColor" stroke="none" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </Ico>
  ),
  camera: <Ico d="M9 4 7.5 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5L15 4H9Zm3 5a4.2 4.2 0 1 1 0 8.4A4.2 4.2 0 0 1 12 9Zm0 2a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 12 11Z" />,
  emote: <Ico d="M13.5 4.2a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0ZM10 7l-3.5 2 .8 1.7L9.5 9.4 9 12l-3 5.5 1.6 1L11 13l1.7 2.8L11 21h2l2-5-2-3.5.6-3 2.2 1.5 1-1.6L13.5 7H10Z" />,
  friends: <Ico d="M9 11.5a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm0 1.4c-3 0-5.5 1.6-5.5 3.8V19H11v-2.3c0-1.4.7-2.6 1.8-3.4a9 9 0 0 0-3.8-.4Zm8.1-3.9c1 .9 2.5 2.3 2.5 3.6 0 1.1-1 2-2.5 3.4-1.5-1.4-2.5-2.3-2.5-3.4 0-1.3 1.5-2.7 2.5-3.6Z" />,
  chat: <Ico d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 3.5V16H6a2 2 0 0 1-2-2V5Z" />,
};

const NEARBY = [
  { hue: 280, name: "MiguelAnargo", time: "01:01 AM", text: "yes I love it", to: "Explorer/Pages/ChatProfile" },
  { hue: 280, name: "MiguelAnargo", time: "01:01 AM", text: "but hard to find good ones", to: "Explorer/Pages/ChatProfile" },
  { hue: 200, name: "MiguelAnargo", time: "01:02 AM", text: "im pretty peaky about pastéis de nata", to: "Explorer/Pages/ChatProfile" },
  { hue: 200, name: "MiguelAnargo", time: "01:02 AM", text: "I demand great pastel", to: "Explorer/Pages/ChatProfile" },
  { hue: 340, name: "MiguelAnargo", time: "01:03 AM", text: "not just average", to: "Explorer/Pages/ChatProfile" },
  {
    hue: 25, name: "Loftie", time: "01:04 AM",
    text: "I have an uncle (married to my aunt... lol... nice explanation) portugais, but many portugais ship in france",
    to: "Explorer/Pages/ChatProfile",
  },
];

export default function Chat({ bare = false }) {
  const [draft, setDraft] = useState("");
  const logRef = useRef(null);

  // Always reveal the newest message: pin the log to the bottom on mount and
  // whenever the message list grows. Works in both the full HUD and the `bare`
  // story since the .chat__log element is rendered in either mode.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, []);

  function submitChat(e) {
    e.preventDefault();
    const message = draft.trim();
    if (!message) return;
    sendBridge("SendChat", { channel: "Nearby", message });
    setDraft("");
  }

  return (
    <div className={bare ? "chat__bare" : "chat__stage"}>
      {!bare && (<>
      <nav className="chrail" aria-hidden="true">
        <span className="chrail__profile"><Avatar hue={320} size={34} /></span>
        <span className="chrail__btn">{ICONS.bell}</span>

        <span className="chrail__group">
          <span className="chrail__btn">{ICONS.places}</span>
          <span className="chrail__btn">{ICONS.people}</span>
          <span className="chrail__btn">{ICONS.backpack}</span>
          <span className="chrail__btn">{ICONS.marketplace}</span>
          <span className="chrail__btn">{ICONS.gallery}</span>
          <span className="chrail__btn">{ICONS.settings}</span>
          <span className="chrail__btn">{ICONS.help}</span>
        </span>

        <span className="chrail__spacer" />

        <span className="chrail__group">
          <span className="chrail__btn chrail__btn--tile">{ICONS.voice}<span className="chrail__dot" /></span>
          <span className="chrail__btn">{ICONS.wearables}</span>
          <span className="chrail__btn">{ICONS.skybox}</span>
          <span className="chrail__btn">{ICONS.camera}</span>
          <span className="chrail__btn">{ICONS.emote}</span>
          <span className="chrail__btn">{ICONS.friends}<span className="chrail__badge">+9</span></span>
          <span className="chrail__btn is-active">{ICONS.chat}</span>
        </span>
      </nav>

      <div className="chmap" aria-hidden="true">
        <div className="chmap__head">
          <span className="chmap__name">interactive-text</span>
          <span className="chmap__fav">
            <svg viewBox="0 0 24 24" width="13" height="13"><path d="M12 21s-7.5-4.7-9.6-9.2C1 8.3 2.6 5 5.9 5c2 0 3.3 1.3 4.1 2.6C10.8 6.3 12.1 5 14.1 5c3.3 0 4.9 3.3 3.5 6.8C19.5 16.3 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
          </span>
          <span className="chmap__kebab">
            <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="5" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="12" cy="19" r="1.7" /></svg>
          </span>
        </div>
        <div className="chmap__coords">
          <svg viewBox="0 0 24 24" width="11" height="11"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" /></svg>
          <span>140, 140</span>
        </div>
        <div className="chmap__map">
          <span className="chmap__arrow">
            <svg viewBox="0 0 24 24" width="13" height="13"><path d="M12 3 19 20l-7-4-7 4 7-17Z" fill="#d24a8a" /></svg>
          </span>
          <span className="chmap__compass chmap__compass--n">N</span>
          <span className="chmap__compass chmap__compass--s">S</span>
          <span className="chmap__compass chmap__compass--e">E</span>
          <span className="chmap__compass chmap__compass--w">W</span>
        </div>
      </div>
      </>)}

      <div className="chat">
        <div className="chat__log" ref={logRef}>
          <div className="chat__day"><span className="chat__daypill">Today</span></div>

          <div className="chat__msg chat__msg--system">
            <Avatar hue={300} size={26} className="chat__avatar" />
            <div className="chat__line">
              <div className="chat__meta">
                <span className="chat__user chat__user--system">DCL System</span>
                <span className="chat__verified" aria-label="Verified">
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <circle cx="12" cy="12" r="11" fill="#c93ad6" />
                    <path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="chat__time">01:00 AM</span>
              </div>
              <div className="chat__text">Type /help for available commands.</div>
            </div>
          </div>

          {NEARBY.map((m, i) => (
            <div className="chat__msg" key={i}>
              <Avatar hue={m.hue} size={26} className="chat__avatar" />
              <div className="chat__line">
                <div className="chat__meta">
                  <span className="chat__user" data-sb-linkto={m.to}>{m.name}</span>
                  <span className="chat__verified" aria-label="Verified">
                    <svg viewBox="0 0 24 24" width="12" height="12">
                      <circle cx="12" cy="12" r="11" fill="#c93ad6" />
                      <path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="chat__time">{m.time}</span>
                </div>
                <div className="chat__text">{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <form className="chat__input" onSubmit={submitChat}>
          <input
            className="chat__field"
            placeholder="Press Enter to chat"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Send a message to Nearby chat"
          />
          <span className="chat__rec" aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}
