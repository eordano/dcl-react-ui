import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./governanceproposals.css";

const CAT_META = {
  poi: { label: "Point of Interest", tone: "green" },
  catalyst: { label: "Catalyst Node", tone: "blue" },
  ban_name: { label: "Name Ban", tone: "fuchsia" },
  grant: { label: "Grant Request", tone: "purple" },
  linked_wearables: { label: "Linked Wearables Registry", tone: "yellow" },
  hiring: { label: "Hiring", tone: "green" },
  council_decision_veto: { label: "Council Decision Veto", tone: "red" },
  poll: { label: "Poll", tone: "orange" },
  draft: { label: "Draft", tone: "orange" },
  governance: { label: "Governance", tone: "orange" },
  pitch: { label: "Pitch", tone: "red" },
  tender: { label: "Tender", tone: "red" },
  bid: { label: "Bid", tone: "red" },
};

const CATEGORIES = [
  { id: "all", label: "All proposals", count: 1284, tone: "neutral" },
  { id: "poi", label: "Point of Interest", count: 63, tone: "green" },
  { id: "catalyst", label: "Catalyst Node", count: 18, tone: "blue" },
  { id: "ban_name", label: "Name Ban", count: 22, tone: "fuchsia" },
  { id: "linked_wearables", label: "Linked Wearables Registry", count: 37, tone: "yellow" },
  { id: "hiring", label: "Hiring", count: 6, tone: "green" },
  { id: "council_decision_veto", label: "Council Decision Veto", count: 4, tone: "red" },
  { id: "governance", label: "Governance Process", count: 488, tone: "orange", members: ["poll", "draft", "governance"] },
  { id: "grant", label: "Grant Request", count: 412, tone: "purple" },
  { id: "bidding", label: "Bidding and Tendering", count: 70, tone: "red", members: ["pitch", "tender", "bid"] },
];

const STATUSES = [
  { id: "all", label: "All outcomes", tone: "neutral" },
  { id: "active", label: "Active", tone: "neutral" },
  { id: "passed", label: "Passed", tone: "green" },
  { id: "enacted", label: "Enacted", tone: "green" },
  { id: "rejected", label: "Rejected", tone: "red" },
  { id: "out_of_budget", label: "Out of Budget", tone: "yellow" },
  { id: "finished", label: "Finished", tone: "neutral" },
];

const TIMEFRAMES = [
  { id: "all", label: "All time" },
  { id: "week", label: "Last week" },
  { id: "month", label: "Last month" },
  { id: "3months", label: "Last 90 days" },
];

const SORTS = [
  { id: "DESC", label: "Latest" },
  { id: "ASC", label: "Oldest" },
];

const PROPOSALS = [
  {
    id: 1,
    title: "Add a new Catalyst node operated by the DAO in the EU region",
    category: "catalyst",
    status: "active",
    author: "0x7c…a4e1",
    hue: 210,
    forPct: 72,
    againstPct: 28,
    passing: true,
    votes: 184,
    comments: 26,
    time: "Ends in 2 days",
    urgent: true,
  },
  {
    id: 2,
    title: "Grant Request: Decentraland Builders Hackathon Season 5",
    category: "grant",
    status: "active",
    author: "buildersdao.dcl",
    hue: 268,
    forPct: 58,
    againstPct: 42,
    passing: true,
    votes: 311,
    comments: 47,
    time: "Ends in 18 hours",
    urgent: true,
  },
  {
    id: 3,
    title: "Should we lower the Grant proposal vote-power threshold to 1M VP?",
    category: "poll",
    status: "passed",
    author: "0x12…9f0c",
    hue: 30,
    forPct: 81,
    againstPct: 19,
    passing: true,
    votes: 642,
    comments: 88,
    time: "Ended 3 days ago",
  },
  {
    id: 4,
    title: "Enact the Q2 Treasury rebalancing toward the Grants reserve",
    category: "governance",
    status: "enacted",
    author: "governance.dcl",
    hue: 30,
    forPct: 67,
    againstPct: 33,
    passing: true,
    votes: 529,
    comments: 54,
    time: "Enacted 1 week ago",
  },
  {
    id: 5,
    title: "Add Genesis Plaza Fountain as a Point of Interest",
    category: "poi",
    status: "rejected",
    author: "0xab…77d3",
    hue: 130,
    forPct: 34,
    againstPct: 66,
    passing: false,
    votes: 208,
    comments: 19,
    time: "Ended 5 days ago",
  },
  {
    id: 6,
    title: "Tender: Build the next-gen World content moderation pipeline",
    category: "tender",
    status: "active",
    author: "0x55…1b2a",
    hue: 0,
    forPct: 49,
    againstPct: 51,
    passing: false,
    votes: 97,
    comments: 12,
    time: "Ends in 6 days",
  },
  {
    id: 7,
    title: "Linked Wearables Registry: approve CryptoArt Studios collection",
    category: "linked_wearables",
    status: "out_of_budget",
    author: "cryptoart.dcl",
    hue: 48,
    forPct: 71,
    againstPct: 29,
    passing: false,
    votes: 143,
    comments: 8,
    time: "Finished 2 days ago",
  },
  {
    id: 8,
    title: "Ban the name “decentraland-official” from the registry",
    category: "ban_name",
    status: "passed",
    author: "0x3e…c901",
    hue: 305,
    forPct: 93,
    againstPct: 7,
    passing: true,
    votes: 388,
    comments: 31,
    time: "Ended 6 days ago",
  },
];

const VoteGlyph = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const CommentGlyph = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </svg>
);

function ProposalCard({ p }) {
  const cat = CAT_META[p.category];
  const status = STATUSES.find((s) => s.id === p.status);
  return (
    <article className="gp__card">
      <div className="gp__cardtop">
        <span className="gp__avatar u-avatar" style={{ "--sz": "36px", "--hue": p.hue }} aria-hidden="true" />
        <div className="gp__cardmain">
          <div className="gp__badges">
            {cat ? (
              <span className={"gp__pill gp__pill--" + cat.tone}>{cat.label}</span>
            ) : null}
            {status ? (
              <span className={"gp__status gp__status--" + status.tone}>{status.label}</span>
            ) : null}
          </div>
          <h3 className="gp__title">{p.title}</h3>
          <div className="gp__meta">
            <span className="gp__metaitem">by <b>{p.author}</b></span>
            {p.votes != null ? (
              <span className="gp__metaitem"><VoteGlyph /> {p.votes.toLocaleString()} votes</span>
            ) : null}
            {p.comments ? (
              <span className="gp__metaitem"><CommentGlyph /> {p.comments} comments</span>
            ) : null}
            <span className={"gp__metaitem" + (p.urgent ? " is-urgent" : "")}>{p.time}</span>
          </div>
        </div>
      </div>

      {p.forPct != null ? (
        <div className="gp__vote">
          <div className="gp__votebar" role="img" aria-label={`${p.forPct}% in favor, ${p.againstPct}% against`}>
            <span
              className={"gp__votefill" + (p.passing ? " is-pass" : " is-fail")}
              style={{ width: p.forPct + "%" }}
            />
          </div>
          <div className="gp__votelegend">
            <span className="gp__for">{p.forPct}% Yes</span>
            <span className="gp__against">{p.againstPct}% No</span>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export default function GovernanceProposals({
  proposals = PROPOSALS,
  totalCount,
  categoryCounts,
  pager = null,
}) {
  const [tab, setTab] = useState("proposals");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [timeframe, setTimeframe] = useState("all");
  const [sort, setSort] = useState("DESC");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const sel = CATEGORIES.find((c) => c.id === category);
    let out = proposals.filter((p) => {
      if (category !== "all") {
        const ok = sel?.members ? sel.members.includes(p.category) : p.category === category;
        if (!ok) return false;
      }
      if (status !== "all" && p.status !== status) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "ASC") out = [...out].reverse();
    return out;
  }, [proposals, category, status, query, sort]);

  const count = list.length;
  const localFilterActive =
    category !== "all" || status !== "all" || query.trim() !== "";
  const displayCount =
    totalCount != null && !localFilterActive ? totalCount : count;

  return (
    <GovernanceChrome active={tab} onTab={setTab}>
      <div className="gp">
        <aside className="gp__filters" aria-label="Filters">
          <section className="gp__fsection">
            <h2 className="gp__ftitle">Category</h2>
            <ul className="gp__catlist">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={"gp__catopt" + (c.id === category ? " is-active" : "")}
                    aria-pressed={c.id === category}
                    onClick={() => setCategory(c.id)}
                  >
                    <span className={"gp__catdot gp__catdot--" + c.tone} aria-hidden="true" />
                    <span className="gp__catlabel">{c.label}</span>
                    <span className="gp__catcount">{(categoryCounts?.[c.id] ?? c.count).toLocaleString()}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="gp__fsection">
            <h2 className="gp__ftitle">Status</h2>
            <div className="gp__chips">
              {STATUSES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={"gp__chip" + (s.id === status ? " is-active" : "")}
                  aria-pressed={s.id === status}
                  onClick={() => setStatus(s.id)}
                >
                  <span className={"gp__chipdot gp__chipdot--" + s.tone} aria-hidden="true" />
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          <section className="gp__fsection">
            <h2 className="gp__ftitle">Time range</h2>
            <div className="gp__radios">
              {TIMEFRAMES.map((t) => (
                <label key={t.id} className="gp__radio">
                  <input
                    type="radio"
                    name="gp-timeframe"
                    checked={timeframe === t.id}
                    onChange={() => setTimeframe(t.id)}
                  />
                  <span className="gp__radiomark" aria-hidden="true" />
                  {t.label}
                </label>
              ))}
            </div>
          </section>

          <section className="gp__fsection">
            <h2 className="gp__ftitle">Sort by</h2>
            <div className="gp__radios">
              {SORTS.map((s) => (
                <label key={s.id} className="gp__radio">
                  <input
                    type="radio"
                    name="gp-sort"
                    checked={sort === s.id}
                    onChange={() => setSort(s.id)}
                  />
                  <span className="gp__radiomark" aria-hidden="true" />
                  {s.label}
                </label>
              ))}
            </div>
          </section>
        </aside>

        <main className="gp__main">
          <header className="gp__header">
            <div className="gp__heading">
              <h1 className="gp__h1">Proposals</h1>
              <p className="gp__sub">Browse, discuss and vote on the future of Decentraland.</p>
            </div>
            <button type="button" className="gp__submit">Submit a proposal</button>
          </header>

          <div className="gp__toolbar">
            <label className="gp__search">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" className="gp__searchicon">
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                className="gp__searchinput"
                type="text"
                placeholder="Search proposals"
                aria-label="Search proposals"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="gp__count">
              {displayCount.toLocaleString()}{" "}
              {displayCount === 1 ? "proposal" : "proposals"}
            </div>
          </div>

          {count ? (
            <div className="gp__list">
              {list.map((p) => (
                <ProposalCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="gp__empty">
              <div className="gp__emptyicon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M9 13h6M9 17h6" />
                </svg>
              </div>
              <p className="gp__emptytitle">No proposals found</p>
              <p className="gp__emptysub">Try a different category, status, or search term.</p>
              <button type="button" className="gp__submit gp__submit--ghost">Submit a proposal</button>
            </div>
          )}

          {pager}
        </main>
      </div>
    </GovernanceChrome>
  );
}
