import { useEffect, useRef, useState } from "react";
import { Avatar, hueFromSeed } from "../../atoms/primitives.jsx";
import { sendBridge, useBridgeState, FALLBACK_STATE } from "../../overlay/bridge.js";
import "./chat.css";

function formatClock(ms) {
  try {
    return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function Chat({ bare = false }) {
  const [draft, setDraft] = useState("");
  const logRef = useRef(null);

  const { chat, live } = useBridgeState();
  const lines = chat.filter((l) => !FALLBACK_STATE.chat.includes(l));

  const arrivalRef = useRef(new Map());
  function arrivalTime(line, i) {
    const key =
      line.timestamp != null
        ? `t${line.timestamp}`
        : `i${line.senderAddress ?? ""}|${line.message ?? ""}|${i}`;
    let ms = arrivalRef.current.get(key);
    if (ms == null) {
      ms = Date.now();
      arrivalRef.current.set(key, ms);
    }
    return ms;
  }

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines.length]);

  function submitChat(e) {
    e.preventDefault();
    const message = draft.trim();
    if (!message) return;
    sendBridge("SendChat", { channel: "Nearby", message });
    setDraft("");
  }

  return (
    <div className={bare ? "chat__bare" : "chat__stage"}>
      <div className="chat">
        <div className="chat__log" ref={logRef}>
          <div className="chat__day"><span className="chat__daypill">Today</span></div>

          {lines.length === 0 ? (
            <div className="chat__msg chat__msg--system" style={{ opacity: 0.55 }}>
              <div className="chat__line">
                <div className="chat__text">
                  {live
                    ? "No messages yet — say hello to Nearby."
                    : "Connecting to Nearby chat…"}
                </div>
              </div>
            </div>
          ) : (
            lines.map((m, i) => {
              const name =
                m.senderName ||
                (m.senderAddress
                  ? `${m.senderAddress.slice(0, 6)}…${m.senderAddress.slice(-4)}`
                  : "Guest");
              const seed = m.senderAddress || m.senderName || "";
              return (
                <div className="chat__msg" key={`${m.timestamp ?? ""}-${i}`}>
                  <Avatar hue={hueFromSeed(seed)} size={26} className="chat__avatar" />
                  <div className="chat__line">
                    <div className="chat__meta">
                      <span className="chat__user" data-sb-linkto="Explorer/Pages/ChatProfile">{name}</span>
                      <span className="chat__time">{formatClock(arrivalTime(m, i))}</span>
                    </div>
                    <div className="chat__text">{m.message}</div>
                  </div>
                </div>
              );
            })
          )}
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
