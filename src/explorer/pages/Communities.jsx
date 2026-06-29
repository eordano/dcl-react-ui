import { useMemo, useState } from "react";

import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { fmt, hueFromSeed } from "../../atoms/primitives.jsx";
import "./communities.css";

const isHttpUrl = (s) => typeof s === "string" && /^https?:\/\//i.test(s);

function bannerStyle(c) {
  const hue = hueFromSeed(c.id || c.name || "");
  if (isHttpUrl(c.thumbnailUrl)) {
    return {
      "--hue": hue,
      backgroundImage: `url("${c.thumbnailUrl}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { "--hue": hue };
}

function visLabel(c) {
  if (c.visibility === "unlisted") return "Unlisted";
  return c.privacy === "private" ? "Private" : "Public";
}

function Card({ c }) {
  const isPublic = c.privacy !== "private";
  const hasThumb = isHttpUrl(c.thumbnailUrl);
  const joined = Boolean(c.role) && c.role !== "none";
  return (
    <article className="cm__card" data-sb-linkto="Explorer/Pages/CommunityCard">
      <div className="cm__banner" style={bannerStyle(c)}>
        {c.isLive ? (
          <span
            aria-hidden="true"
            style={{
              position: "absolute", top: 10, left: 10, padding: "3px 8px",
              borderRadius: 999, background: "rgba(0,0,0,.55)", color: "#ff5a7a",
              fontSize: 11, fontWeight: 800, letterSpacing: ".04em",
            }}
          >
            ● LIVE
          </span>
        ) : null}
        {hasThumb ? null : (
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
          {joined ? (
            <button className="cm__joined" type="button">
              Joined
              <span className="cm__btncoin" aria-hidden="true">◆</span>
            </button>
          ) : (
            <button className="cm__join" type="button">
              {isPublic ? "Join" : "Request to join"}
              <span className="cm__btncoin" aria-hidden="true">◆</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

const BULLETS = [
  { icon: "♥", text: "Connect over shared interests" },
  { icon: "⚑", text: "Get notified about community events" },
  { icon: "✦", text: "Chat in a shared channel" },
];

function Sidebar() {
  return (
    <aside className="cm__side">
      <button className="cm__create" type="button" data-sb-linkto="Explorer/Components/CommunityCreate">+ Create a Community</button>

      <button className="cm__invites" type="button">
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

export default function Communities({
  communities = [],
  isLoading = false,
  isError = false,
  error = null,
}) {
  const [tab, setTab] = useState("communities");
  const [query, setQuery] = useState("");

  const all = communities ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.ownerName || "").toLowerCase().includes(q),
    );
  }, [all, query]);

  let body;
  if (isLoading) {
    body = (
      <div className="cm__grid" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
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
    body = (
      <div className="cm__seclabel">
        {query ? "No communities match your search." : "No communities found."}
      </div>
    );
  } else {
    body = (
      <div className="cm__grid">
        {filtered.map((c) => <Card key={c.id} c={c} />)}
      </div>
    );
  }

  return (
    <ExploreChrome active={tab} onTab={setTab}>
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
    </ExploreChrome>
  );
}
