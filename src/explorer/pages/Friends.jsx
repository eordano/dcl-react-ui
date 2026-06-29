import { useState } from "react";
import { Avatar, Badge } from "../../atoms/primitives.jsx";
import "./friends.css";

const SECTIONS = [
  { id: "friends", label: "Friends" },
  { id: "requests", label: "Requests" },
  { id: "blocked", label: "Blocked" },
];

const FRIENDS = [
  { name: "Nyx", tag: "#a91f", online: true, where: "Genesis Plaza", hue: 280 },
  { name: "pixelwitch", tag: "#0c2d", online: true, where: "Soul Magic", hue: 320 },
  { name: "vortex.eth", tag: "#7e10", online: true, where: "Vegas City", hue: 200 },
  { name: "Maple", tag: "#33ab", online: false, where: "Offline", hue: 95 },
  { name: "korbin", tag: "#5d41", online: false, where: "Offline", hue: 30 },
  { name: "Lulu", tag: "#b2e9", online: false, where: "Offline", hue: 340 },
];

const RECEIVED = [
  { name: "ghostrunner", tag: "#4f21", date: "JUN 24", hue: 150 },
  { name: "Astra", tag: "#9c70", date: "JUN 22", hue: 260 },
];
const SENT = [
  { name: "deckard", tag: "#1188", date: "JUN 20", hue: 210 },
];
const BLOCKED = [
  { name: "spambot42", tag: "#0000", date: "JAN 12", hue: 0 },
];

function GroupHeader({ label, count, collapsed, onToggle }) {
  return (
    <button
      type="button"
      className={"fr__group" + (collapsed ? " is-collapsed" : "")}
      aria-expanded={!collapsed}
      onClick={onToggle}
    >
      <span className="fr__caret" aria-hidden="true">▾</span>
      {label} ({count})
    </button>
  );
}

export default function Friends({ initialSection = "friends", friends = FRIENDS, received = RECEIVED, sent = SENT, blocked = BLOCKED, onClose } = {}) {
  const [section, setSection] = useState(
    SECTIONS.some((s) => s.id === initialSection) ? initialSection : "friends",
  );
  const [collapsed, setCollapsed] = useState({});
  const online = friends.filter((f) => f.online);
  const offline = friends.filter((f) => !f.online);
  const reqCount = received.length + sent.length;

  const toggle = (key) =>
    setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  return (
    <div className="fr">
      <header className="fr__tabs" role="tablist">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === section}
            className={"fr__tab" + (s.id === section ? " is-active" : "")}
            onClick={() => setSection(s.id)}
          >
            {s.label}
            {s.id === "requests" && reqCount > 0 && <Badge>{reqCount}</Badge>}
          </button>
        ))}
        <button className="fr__close" aria-label="Close" onClick={onClose}>×</button>
      </header>

      <div className="fr__body">
        {section === "friends" && (
          <>
            <GroupHeader
              label="Online"
              count={online.length}
              collapsed={collapsed.online}
              onToggle={() => toggle("online")}
            />
            {collapsed.online ? null : online.length === 0 ? (
              <div className="fr__empty">No friends</div>
            ) : (
              online.map((f) => (
                <div className="fr__row" key={f.address || f.name}>
                  <Avatar hue={f.hue} status="online" size={30} />
                  <div className="fr__info" data-sb-linkto="Explorer/Pages/Passport">
                    <div className="fr__name u-truncate">{f.name}<span className="fr__tag">{f.tag}</span></div>
                    <div className="fr__status fr__status--on u-truncate">{f.where}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__act" title="Message" aria-label="Message" data-sb-linkto="Explorer/Frames/Chat">✉</button>
                    <button className="fr__act" title="Jump to" aria-label="Jump to">➜</button>
                    <button className="fr__act" title="More" aria-label="More">⋯</button>
                  </div>
                </div>
              ))
            )}

            <GroupHeader
              label="Offline"
              count={offline.length}
              collapsed={collapsed.offline}
              onToggle={() => toggle("offline")}
            />
            {collapsed.offline ? null : offline.length === 0 ? (
              <div className="fr__empty">No friends</div>
            ) : (
              offline.map((f) => (
                <div className="fr__row" key={f.address || f.name}>
                  <Avatar hue={f.hue} status="offline" size={30} className="fr__av--off" />
                  <div className="fr__info" data-sb-linkto="Explorer/Pages/Passport">
                    <div className="fr__name u-truncate">{f.name}<span className="fr__tag">{f.tag}</span></div>
                    <div className="fr__status u-truncate">Offline</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__act" title="Message" aria-label="Message" data-sb-linkto="Explorer/Frames/Chat">✉</button>
                    <button className="fr__act" title="More" aria-label="More">⋯</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {section === "requests" && (
          <>
            <GroupHeader
              label="Received"
              count={received.length}
              collapsed={collapsed.received}
              onToggle={() => toggle("received")}
            />
            {collapsed.received ? null : received.length === 0 ? (
              <div className="fr__empty">No requests</div>
            ) : (
              received.map((r) => (
                <div className="fr__row" key={r.id || r.address || r.name}>
                  <Avatar hue={r.hue} size={30} />
                  <div className="fr__info">
                    <div className="fr__name u-truncate">{r.name}<span className="fr__tag">{r.tag}</span></div>
                    <div className="fr__status u-truncate">Wants to be your friend · {r.date}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__accept" title="Accept" aria-label="Accept">✓</button>
                    <button className="fr__reject" title="Reject" aria-label="Reject">×</button>
                  </div>
                </div>
              ))
            )}

            <GroupHeader
              label="Sent"
              count={sent.length}
              collapsed={collapsed.sent}
              onToggle={() => toggle("sent")}
            />
            {collapsed.sent ? null : sent.length === 0 ? (
              <div className="fr__empty">No requests</div>
            ) : (
              sent.map((r) => (
                <div className="fr__row" key={r.id || r.address || r.name}>
                  <Avatar hue={r.hue} size={30} />
                  <div className="fr__info">
                    <div className="fr__name u-truncate">{r.name}<span className="fr__tag">{r.tag}</span></div>
                    <div className="fr__status u-truncate">Request sent · {r.date}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__cancel">Cancel</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {section === "blocked" && (
          <>
            <GroupHeader
              label="Blocked"
              count={blocked.length}
              collapsed={collapsed.blocked}
              onToggle={() => toggle("blocked")}
            />
            {collapsed.blocked ? null : blocked.length === 0 ? (
              <div className="fr__empty">No blocked users</div>
            ) : (
              blocked.map((b) => (
                <div className="fr__row" key={b.address || b.name}>
                  <Avatar hue={b.hue} size={30} className="fr__av--off" />
                  <div className="fr__info">
                    <div className="fr__name u-truncate">{b.name}<span className="fr__tag">{b.tag}</span></div>
                    <div className="fr__status u-truncate">Blocked · {b.date}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__unblock">Unblock</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
