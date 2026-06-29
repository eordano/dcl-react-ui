import { useMemo, useState } from "react";

import { Avatar, fmt, hueFromSeed } from "../../atoms/primitives.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import UpcomingEventCard from "../../web/components/UpcomingEventCard.jsx";
import { sendBridge } from "../../overlay/bridge.js";
import { qk, STALE } from "../../data/queryKeys.js";
import { loadCommunities } from "../../data/catalyst/communities.js";
import {
  useCommunities,
  useCommunity,
  useJoinCommunity,
  useLeaveCommunity,
} from "../../data/hooks/useCommunities.js";

import "../../explorer/pages/communities.css";
import "../../explorer/pages/communitymembers.css";

export function prefetch(queryClient) {
  try {
    queryClient.prefetchQuery({
      queryKey: qk.communities({}),
      queryFn: ({ signal }) => loadCommunities({}, { signal }),
      staleTime: STALE.communities,
    });
  } catch {
  }
}

const isHttpUrl = (s) => typeof s === "string" && /^https?:\/\//i.test(s);

function bannerStyle(c) {
  const hue = hueFromSeed(c.id || c.name || "");
  if (isHttpUrl(c.thumbnailUrl)) {
    return { "--hue": hue, backgroundImage: `url("${c.thumbnailUrl}")`, backgroundSize: "cover", backgroundPosition: "center" };
  }
  return { "--hue": hue };
}

function visLabel(c) {
  if (c.visibility === "unlisted") return "Unlisted";
  return c.privacy === "private" ? "Private" : "Public";
}

const BULLETS = [
  { icon: "♥", text: "Connect over shared interests" },
  { icon: "⚑", text: "Get notified about community events" },
  { icon: "✦", text: "Chat in a shared channel" },
];

function Sidebar() {
  return (
    <aside className="cm__side">
      <button className="cm__create" type="button" onClick={() => sendBridge("community.create", {})}>
        + Create a Community
      </button>

      <button className="cm__invites" type="button" onClick={() => sendBridge("community.invites", {})}>
        <span>Invites &amp; Requests</span>
      </button>

      <div className="cm__promo">
        <div className="cm__promotitle">
          <span className="cm__promospark" aria-hidden="true">✦</span>
          Discover Communities!
        </div>
        <div className="cm__promosub">Find your people. Join the fun.</div>

        <div className="cm__promoart" aria-hidden="true">
          <span className="cm__crew" style={{ "--hue": 280, left: "16%" }} />
          <span className="cm__crew" style={{ "--hue": 50, left: "42%" }} />
          <span className="cm__crew" style={{ "--hue": 0, left: "68%" }} />
          <span className="cm__fire" />
        </div>

        <ul className="cm__bullets">
          {BULLETS.map((b) => (
            <li className="cm__bullet" key={b.text}>
              <span className="cm__bicon" aria-hidden="true">{b.icon}</span>
              {b.text}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function joinErrorText(err) {
  const status = err?.status ?? 0;
  if (status === 401 || status === 403 || status === 501) {
    return "Joining isn’t available on this realm yet";
  }
  if (status === 0) return "Couldn’t reach the server — try again";
  return err?.message || "Couldn’t join — please try again";
}

const ERR_STYLE = {
  display: "block",
  marginTop: 6,
  fontSize: 11,
  lineHeight: 1.3,
  color: "#ff8aa0",
  fontWeight: 600,
};

function JoinButton({ id, privacy, joined, variant }) {
  const join = useJoinCommunity();
  const leave = useLeaveCommunity();
  const [override, setOverride] = useState(null);
  const isPublic = privacy !== "private";
  const pending = join.isPending || leave.isPending;

  const effectiveJoined =
    override === "joined" ? true : override === "left" ? false : Boolean(joined);
  const requested = override === "requested";
  const err = join.error || leave.error;

  const doJoin = (e) => {
    e?.stopPropagation?.();
    if (pending) return;
    setOverride(null);
    leave.reset();
    join.mutate(
      { id, privacy },
      { onSuccess: () => setOverride(isPublic ? "joined" : "requested") },
    );
  };
  const doLeave = (e) => {
    e?.stopPropagation?.();
    if (pending) return;
    setOverride(null);
    join.reset();
    leave.mutate({ id }, { onSuccess: () => setOverride("left") });
  };

  if (variant === "detail") {
    let label;
    if (effectiveJoined) label = leave.isPending ? "LEAVING…" : "LEAVE";
    else if (requested) label = "REQUESTED";
    else if (join.isPending) label = isPublic ? "JOINING…" : "REQUESTING…";
    else label = isPublic ? "JOIN" : "REQUEST TO JOIN";
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <button
          className="cmb__join"
          type="button"
          disabled={pending || requested}
          onClick={effectiveJoined ? doLeave : doJoin}
        >
          {label}
        </button>
        {err ? <span style={ERR_STYLE} role="alert">{joinErrorText(err)}</span> : null}
      </div>
    );
  }

  let cardEl;
  if (effectiveJoined) {
    cardEl = (
      <button className="cm__joined" type="button" disabled={pending} onClick={doLeave}>
        {leave.isPending ? "Leaving…" : "Joined"}
        <span className="cm__btncoin" aria-hidden="true">◆</span>
      </button>
    );
  } else if (requested) {
    cardEl = (
      <button className="cm__join" type="button" disabled>
        Requested
        <span className="cm__btncoin" aria-hidden="true">◆</span>
      </button>
    );
  } else {
    let label;
    if (join.isPending) label = isPublic ? "Joining…" : "Requesting…";
    else label = isPublic ? "Join" : "Request to join";
    cardEl = (
      <button className="cm__join" type="button" disabled={pending} onClick={doJoin}>
        {label}
        <span className="cm__btncoin" aria-hidden="true">◆</span>
      </button>
    );
  }
  return (
    <>
      {cardEl}
      {err ? <span style={ERR_STYLE} role="alert">{joinErrorText(err)}</span> : null}
    </>
  );
}

function CommunityCard({ c, onOpen }) {
  const isPublic = c.privacy !== "private";
  const joined = c.role && c.role !== "none";
  return (
    <article className="cm__card" onClick={() => onOpen(c.id)} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(c.id); } }}
      title={c.name}>
      <div className="cm__banner" style={bannerStyle(c)}>
        {c.isLive ? (
          <span style={{ position: "absolute", top: 10, left: 10, padding: "3px 8px", borderRadius: 999, background: "rgba(0,0,0,.55)", color: "#ff5a7a", fontSize: 11, fontWeight: 800, letterSpacing: ".04em" }}>● LIVE</span>
        ) : null}
        {isHttpUrl(c.thumbnailUrl) ? null : (
          <span className="cm__bannermark" aria-hidden="true">{c.name}</span>
        )}
      </div>
      <div className="cm__cardbody">
        <div className="cm__name u-truncate" title={c.name}>{c.name}</div>
        <div className="cm__meta">
          <span className="cm__vispill">
            <span className="cm__visicon" aria-hidden="true">{isPublic ? "🌐" : "🔒"}</span>
            <span className={"cm__vis" + (isPublic ? " is-public" : "")}>{visLabel(c)}</span>
          </span>
          <span className="cm__memberchip">
            <span className="cm__membicon" aria-hidden="true">👤</span>
            {fmt(c.membersCount)} Members
          </span>
        </div>
        <div className="cm__actions">
          <JoinButton id={c.id} privacy={c.privacy} joined={joined} variant="card" />
        </div>
      </div>
    </article>
  );
}

function CommunityList({ onOpen }) {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, error } = useCommunities();

  const all = data ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((c) => (c.name || "").toLowerCase().includes(q) || (c.ownerName || "").toLowerCase().includes(q));
  }, [all, query]);

  let body;
  if (isLoading) {
    body = (
      <div className="cm__grid" aria-busy="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <article className="cm__card" key={i}>
            <div className="cm__banner" style={{ "--hue": (i * 36) % 360, opacity: 0.5 }} />
            <div className="cm__cardbody"><div className="cm__name">Loading…</div></div>
          </article>
        ))}
      </div>
    );
  } else if (isError) {
    body = (
      <div className="cm__seclabel" role="alert">
        Couldn’t load communities{error?.message ? ` — ${error.message}` : ""}.
      </div>
    );
  } else if (filtered.length === 0) {
    body = <div className="cm__seclabel">{query ? "No communities match your search." : "No communities found."}</div>;
  } else {
    body = (
      <div className="cm__grid">
        {filtered.map((c) => <CommunityCard key={c.id} c={c} onOpen={onOpen} />)}
      </div>
    );
  }

  return (
    <div className="cm">
      <Sidebar />
      <section className="cm__main">
        <div className="cm__header">
          <h1 className="cm__title">Communities</h1>
          <div className="cm__searchwrap">
            <SearchField placeholder="Search" value={query} onChange={setQuery} />
          </div>
        </div>
        <div className="cm__section">
          <div className="cm__seclabel">
            Browse Communities {isLoading ? "" : `(${filtered.length})`}
          </div>
          {body}
        </div>
      </section>
    </div>
  );
}

const ROLE_CLASS = { owner: "is-owner", moderator: "is-mod" };
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

const DETAIL_TABS = [
  { id: "announcements", label: "Announcements" },
  { id: "members", label: "Members" },
  { id: "places", label: "Places" },
  { id: "photos", label: "Photos" },
];

function GlobeIcon() {
  return (
    <svg className="cmb__globe" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function CommunityDetail({ id, onClose }) {
  const [tab, setTab] = useState("members");
  const [memberQuery, setMemberQuery] = useState("");
  const { data, isLoading, isError, error } = useCommunity(id);

  const community = data?.community ?? null;
  const members = data?.members ?? [];
  const events = data?.events ?? [];

  const filteredMembers = useMemo(() => {
    const q = memberQuery.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => (m.name || "").toLowerCase().includes(q) || (m.memberAddress || "").toLowerCase().includes(q));
  }, [members, memberQuery]);

  const hue = hueFromSeed(id);
  const joined = community && community.role && community.role !== "none";
  const thumbStyle = community && isHttpUrl(community.thumbnailUrl)
    ? { backgroundImage: `url("${community.thumbnailUrl}")`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: `linear-gradient(135deg, hsl(${hue} 70% 60%), hsl(${(hue + 40) % 360} 60% 38%))` };

  return (
    <div className="cmb__backdrop" onClick={onClose}>
      <div className="cmb" onClick={(e) => e.stopPropagation()}>
        <button className="cmb__close" aria-label="Close" type="button" onClick={onClose}>×</button>

        <div className="cmb__main">
          <header className="cmb__header">
            <span className="cmb__thumb" style={thumbStyle} />
            <div className="cmb__headinfo">
              <h2 className="cmb__cname u-truncate">{community?.name || (isLoading ? "Loading…" : "Community")}</h2>
              <div className="cmb__meta">
                <GlobeIcon />
                {community ? `${visLabel(community)} · ${fmt(community.membersCount)} Members` : "—"}
              </div>
              <p className="cmb__about">
                {community?.description
                  || (isError ? `Couldn’t load this community${error?.message ? ` — ${error.message}` : ""}.` : "")}
              </p>
            </div>
            {community ? (
              <JoinButton id={id} privacy={community.privacy} joined={joined} variant="detail" />
            ) : null}
          </header>

          <nav className="cmb__tabs" role="tablist">
            {DETAIL_TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={t.id === tab}
                className={"cmb__tab" + (t.id === tab ? " is-active" : "")}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="cmb__body">
            {tab !== "members" ? (
              <div className="cmb__empty">{DETAIL_TABS.find((t) => t.id === tab)?.label}</div>
            ) : isLoading ? (
              <div className="cmb__empty" aria-busy="true">Loading members…</div>
            ) : filteredMembers.length === 0 ? (
              <div className="cmb__empty">{memberQuery ? "No members match your search." : "No members to show."}</div>
            ) : (
              <ul className="cmb__grid">
                {filteredMembers.map((m) => {
                  const role = (m.role || "member").toLowerCase();
                  return (
                    <li className="cmb__row" key={m.memberAddress || m.name}>
                      <Avatar
                        size={44}
                        name={m.name}
                        seed={m.memberAddress || m.name}
                        src={isHttpUrl(m.profilePictureUrl) ? m.profilePictureUrl : undefined}
                      />
                      <div className="cmb__info">
                        <div className="cmb__name u-truncate">{m.name || `${(m.memberAddress || "").slice(0, 6)}…${(m.memberAddress || "").slice(-4)}`}</div>
                        {role !== "member" && (
                          <span className={"cmb__role " + (ROLE_CLASS[role] || "")}>{cap(role)}</span>
                        )}
                      </div>
                      <button className="cmb__add" type="button"
                        onClick={() => sendBridge("friends.request", { address: m.memberAddress })}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 20a8 8 0 0 1 16 0z" />
                        </svg>
                        ADD FRIEND
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {tab === "members" && (
          <form className="cmb__search" onSubmit={(e) => e.preventDefault()}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="Search member or name"
              aria-label="Search members"
              value={memberQuery}
              onChange={(e) => setMemberQuery(e.target.value)}
            />
            <button className="cmb__searchgo" type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          )}
        </div>

        <aside className="cmb__events">
          <h3 className="cmb__eventstitle">Upcoming Events</h3>
          <div className="cmb__eventlist">
            {events.length === 0 ? (
              <div className="cmb__empty" style={{ height: 120 }}>No upcoming events.</div>
            ) : (
              events.map((e) => (
                <UpcomingEventCard
                  key={e.id}
                  event={{ title: e.name, when: e.timeLabel, image: isHttpUrl(e.image) ? e.image : undefined, hue: hueFromSeed(e.id) }}
                />
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CommunitiesPanel() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <CommunityList onOpen={setSelectedId} />
      {selectedId ? (
        <CommunityDetail id={selectedId} onClose={() => setSelectedId(null)} />
      ) : null}
    </>
  );
}
