import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { Avatar, Badge } from "../../atoms/primitives";
import { requestFriendAction, FRIEND_ACTIONS } from "../../data/hooks/friendActions";
import "./friends.css";

type SectionId = "friends" | "requests" | "blocked";

type Friend = { name: string; tag: string; online: boolean; where: string; hue: number; address?: string };
type Request = { name: string; tag: string; date: string; hue: number; id?: string; address?: string };
type BlockedUser = { name: string; tag: string; date: string; hue: number; address?: string };

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "friends", label: "Friends" },
  { id: "requests", label: "Requests" },
  { id: "blocked", label: "Blocked" },
];

type GroupHeaderProps = {
  label: string;
  count: number;
  collapsed?: boolean;
  onToggle?: () => void;
};

function GroupHeader({ label, count, collapsed, onToggle }: GroupHeaderProps) {
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

type FriendsProps = {
  initialSection?: SectionId;
  floating?: boolean;
  friends?: Friend[];
  received?: Request[];
  sent?: Request[];
  blocked?: BlockedUser[];
  onClose?: () => void;
};

export default function Friends({
  initialSection = "friends",
  floating = false,
  friends = [],
  received = [],
  sent = [],
  blocked = [],
  onClose,
}: FriendsProps = {}) {
  const [section, setSection] = useState<SectionId>(
    SECTIONS.some((s) => s.id === initialSection) ? initialSection : "friends",
  );
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const d = e.key === "ArrowRight" ? 1 : -1;
    const next = (i + d + SECTIONS.length) % SECTIONS.length;
    const nextSection = SECTIONS[next];
    if (!nextSection) return;
    setSection(nextSection.id);
    tabRefs.current[next]?.focus();
  };
  const [acted, setActed] = useState<Set<string>>(() => new Set());
  const act = (action: string, address?: string) => {
    if (!address) return;
    requestFriendAction(action, address);
    setActed((s) => new Set(s).add(address));
  };
  const remove = (name: string, address?: string) => {
    if (!address) return;
    if (typeof window !== "undefined" && !window.confirm(`Remove ${name} from friends?`)) return;
    act(FRIEND_ACTIONS.DELETE, address);
  };
  const online = friends.filter((f) => f.online && !acted.has(f.address ?? ""));
  const offline = friends.filter((f) => !f.online && !acted.has(f.address ?? ""));
  const recvList = received.filter((r) => !acted.has(r.address ?? ""));
  const sentList = sent.filter((r) => !acted.has(r.address ?? ""));
  const blockedList = blocked.filter((b) => !acted.has(b.address ?? ""));
  const reqCount = recvList.length + sentList.length;

  const toggle = (key: string) =>
    setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  return (
    <div className={"fr" + (floating ? " fr--floating" : "")}>
      <header className="fr__tabs">
        <div role="tablist" aria-label="Friends sections" style={{ display: "contents" }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === section}
              tabIndex={s.id === section ? 0 : -1}
              ref={(el) => { tabRefs.current[i] = el; }}
              className={"fr__tab" + (s.id === section ? " is-active" : "")}
              onClick={() => setSection(s.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {s.label}
              {s.id === "requests" && reqCount > 0 && <Badge>{reqCount}</Badge>}
            </button>
          ))}
        </div>
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
                    <button className="fr__act" title="Remove friend" aria-label="Remove friend" onClick={() => remove(f.name, f.address)}>⋯</button>
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
                    <button className="fr__act" title="Remove friend" aria-label="Remove friend" onClick={() => remove(f.name, f.address)}>⋯</button>
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
              count={recvList.length}
              collapsed={collapsed.received}
              onToggle={() => toggle("received")}
            />
            {collapsed.received ? null : recvList.length === 0 ? (
              <div className="fr__empty">No requests</div>
            ) : (
              recvList.map((r) => (
                <div className="fr__row" key={r.id || r.address || r.name}>
                  <Avatar hue={r.hue} size={30} />
                  <div className="fr__info">
                    <div className="fr__name u-truncate">{r.name}<span className="fr__tag">{r.tag}</span></div>
                    <div className="fr__status u-truncate">Wants to be your friend · {r.date}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__accept" title="Accept" aria-label="Accept" onClick={() => act(FRIEND_ACTIONS.ACCEPT, r.address)}>✓</button>
                    <button className="fr__reject" title="Reject" aria-label="Reject" onClick={() => act(FRIEND_ACTIONS.REJECT, r.address)}>×</button>
                  </div>
                </div>
              ))
            )}

            <GroupHeader
              label="Sent"
              count={sentList.length}
              collapsed={collapsed.sent}
              onToggle={() => toggle("sent")}
            />
            {collapsed.sent ? null : sentList.length === 0 ? (
              <div className="fr__empty">No requests</div>
            ) : (
              sentList.map((r) => (
                <div className="fr__row" key={r.id || r.address || r.name}>
                  <Avatar hue={r.hue} size={30} />
                  <div className="fr__info">
                    <div className="fr__name u-truncate">{r.name}<span className="fr__tag">{r.tag}</span></div>
                    <div className="fr__status u-truncate">Request sent · {r.date}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__cancel" onClick={() => act(FRIEND_ACTIONS.CANCEL, r.address)}>Cancel</button>
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
              count={blockedList.length}
              collapsed={collapsed.blocked}
              onToggle={() => toggle("blocked")}
            />
            {collapsed.blocked ? null : blockedList.length === 0 ? (
              <div className="fr__empty">No blocked users</div>
            ) : (
              blockedList.map((b) => (
                <div className="fr__row" key={b.address || b.name}>
                  <Avatar hue={b.hue} size={30} className="fr__av--off" />
                  <div className="fr__info">
                    <div className="fr__name u-truncate">{b.name}<span className="fr__tag">{b.tag}</span></div>
                    <div className="fr__status u-truncate">Blocked · {b.date}</div>
                  </div>
                  <div className="fr__actions">
                    <button className="fr__unblock" onClick={() => act(FRIEND_ACTIONS.UNBLOCK, b.address)}>Unblock</button>
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
