import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvhomelanding.css";

const METRICS = [
  {
    category: "Proposals",
    title: "32 active proposals",
    description: "8 ending in the next 48hs",
  },
  {
    category: "Participation",
    title: "1,204 votes this week",
    description: "4,876 votes last 30 days",
  },
  {
    category: "Treasury",
    title: "$28,412,930.55",
    description: "Consolidated in USD",
  },
];

const ENDING_SOON = [
  {
    id: 1,
    title: "Add a new Catalyst node operated by the DAO in the EU region",
    author: "0x7c…a4e1",
    hue: 210,
    type: "Catalyst Node",
    tone: "blue",
    votes: 184,
    comments: 26,
    time: "Ends in 2 hours",
    urgent: true,
    met: false,
    vp: "1,240,000",
  },
  {
    id: 2,
    title: "Grant Request: Decentraland Builders Hackathon Season 5",
    author: "buildersdao.dcl",
    hue: 268,
    type: "Grant Request",
    tone: "purple",
    votes: 311,
    comments: 47,
    time: "Ends in 18 hours",
    urgent: true,
    met: true,
    vp: "3,902,114",
  },
  {
    id: 3,
    title: "Should we lower the Grant proposal vote-power threshold to 1M VP?",
    author: "0x12…9f0c",
    hue: 30,
    type: "Poll",
    tone: "orange",
    votes: 642,
    comments: 88,
    time: "Ends in 1 day",
    met: true,
    vp: "5,118,440",
  },
  {
    id: 4,
    title: "Enact the Q2 Treasury rebalancing toward the Grants reserve",
    author: "governance.dcl",
    hue: 30,
    type: "Governance",
    tone: "orange",
    votes: 529,
    comments: 54,
    time: "Ends in 3 days",
    met: false,
    vp: "820,500",
  },
  {
    id: 5,
    title: "Add Genesis Plaza Fountain as a Point of Interest",
    author: "0xab…77d3",
    hue: 130,
    type: "Point of Interest",
    tone: "green",
    votes: 208,
    comments: 19,
    time: "Ends in 4 days",
    met: true,
    vp: "1,560,300",
  },
];

const GRANTS = [
  {
    id: 1,
    title: "Decentraland Game Jam — Tooling & Prizes",
    category: "Core Unit",
    hue: 268,
    size: "$240,000",
    pct: 64,
    months: 9,
    update: "Update #6 · Milestone 4 shipped",
  },
  {
    id: 2,
    title: "Open-source SDK7 component library for builders",
    category: "Platform",
    hue: 210,
    size: "$120,000",
    pct: 38,
    months: 12,
    update: "Update #3 · On track",
  },
  {
    id: 3,
    title: "Weekly community events & town-hall production",
    category: "Social Media",
    hue: 30,
    size: "$96,000",
    pct: 81,
    months: 6,
    update: "Update #9 · Ahead of schedule",
  },
  {
    id: 4,
    title: "Wearable & emote creator onboarding program",
    category: "Documentation",
    hue: 130,
    size: "$60,000",
    pct: 22,
    months: 8,
    update: "Update #2 · Kicked off",
  },
];

const DELEGATES = [
  { address: "0xc1b8…4d53", name: "metahero.dcl", hue: 268, lastVoted: "2d", timesVoted: 412, pickedBy: 1840, totalVP: "8,204,113" },
  { address: "0x3fB3…A13B", name: "morris.dcl", hue: 200, lastVoted: "5d", timesVoted: 388, pickedBy: 1502, totalVP: "6,910,540" },
  { address: "0x76fb…7cb0", name: "facilitator.dcl", hue: 130, lastVoted: "1d", timesVoted: 521, pickedBy: 2210, totalVP: "5,448,902" },
  { address: "0x9f3c…7a21", name: "0x9f3c…7a21", hue: 48, lastVoted: "3d", timesVoted: 264, pickedBy: 980, totalVP: "4,120,775" },
  { address: "0x55a1…1b2a", name: "builderdao.dcl", hue: 305, lastVoted: "6d", timesVoted: 197, pickedBy: 742, totalVP: "3,388,210" },
  { address: "0xab12…77d3", name: "0xab12…77d3", hue: 12, lastVoted: "8d", timesVoted: 143, pickedBy: 560, totalVP: "2,901,004" },
  { address: "0x12c9…9f0c", name: "polly.dcl", hue: 96, lastVoted: "12d", timesVoted: 121, pickedBy: 431, totalVP: "2,015,330" },
  { address: "0x7ce4…a4e1", name: "0x7ce4…a4e1", hue: 340, lastVoted: "4d", timesVoted: 98, pickedBy: 312, totalVP: "1,744,820" },
  { address: "0x3ec9…c901", name: "guardian.dcl", hue: 168, lastVoted: "9d", timesVoted: 77, pickedBy: 240, totalVP: "1,209,650" },
];

const TOP_VOTERS = [
  { rank: 1, name: "metahero.dcl", hue: 268, votes: 96 },
  { rank: 2, name: "morris.dcl", hue: 200, votes: 88 },
  { rank: 3, name: "0x76fb…7cb0", hue: 130, votes: 81 },
  { rank: 4, name: "polly.dcl", hue: 96, votes: 74 },
  { rank: 5, name: "guardian.dcl", hue: 168, votes: 69 },
  { rank: 6, name: "0x9f3c…7a21", hue: 48, votes: 61 },
];

const CHART_POINTS = [38, 44, 41, 52, 49, 63, 58, 71, 66, 78, 74, 88];
const CHART_MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const ACTIVITY = [
  { id: 1, kind: "vote", hue: 268, html: "<b>metahero.dcl</b> voted on <b>Add a new Catalyst node…</b>", date: "2 min ago" },
  { id: 2, kind: "comment", html: "New comment on <b>Grant Request: Builders Hackathon…</b>", date: "11 min ago" },
  { id: 3, kind: "proposal", hue: 200, html: "<b>buildersdao.dcl</b> published a new Proposal <b>Hackathon Season 5</b>", date: "34 min ago" },
  { id: 4, kind: "vote", hue: 130, html: "<b>facilitator.dcl</b> voted on <b>Q2 Treasury rebalancing</b>", date: "1 hr ago" },
  { id: 5, kind: "delegation", hue: 48, html: "<b>0x9f3c…7a21</b> delegated to <b>metahero.dcl</b>", date: "2 hr ago" },
  { id: 6, kind: "finished", html: "Voting on Proposal <b>Genesis Plaza Fountain</b> has ended with the outcome <b>Accepted</b>", date: "3 hr ago" },
  { id: 7, kind: "comment", html: "New comment on <b>Lower the Grant VP threshold to 1M</b>", date: "4 hr ago" },
  { id: 8, kind: "update", hue: 30, html: "<b>governance.dcl</b> published an Update on the Project <b>Game Jam Tooling</b>", date: "5 hr ago" },
  { id: 9, kind: "vesting", html: "A vesting contract for the Project <b>SDK7 component library</b> has been created. $120,000 will be vested in 12 months", date: "6 hr ago" },
  { id: 10, kind: "delegation", hue: 305, html: "<b>polly.dcl</b> removed delegation from <b>morris.dcl</b>", date: "8 hr ago" },
];

const Chevron = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const SortGlyph = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" className="gh__sort">
    <path d="M6 1l3 3H3zM6 11l3-3H3z" fill="currentColor" />
  </svg>
);
const CommentBubble = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </svg>
);

function MainBanner({ onClose }) {
  return (
    <div className="gh__banner">
      <div className="gh__bannerbg" aria-hidden="true" />
      <h2 className="gh__bannertitle">Get involved and shape Decentraland’s future.</h2>
      <p className="gh__bannerdesc">
        The DAO is a key component of the ecosystem and it is the consensus mechanism for defining
        the rules of the Decentraland’s virtual world. Participate in the DAO and make your voice heard.
      </p>
      <div className="gh__bannerbtns">
        <button type="button" className="gh__bannerbtn gh__bannerbtn--discord">Join our Discord</button>
        <button type="button" className="gh__bannerbtn gh__bannerbtn--docs">Read our docs</button>
      </div>
      <button type="button" className="gh__bannerclose" aria-label="Dismiss banner" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,.22)" />
          <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function MetricsCard({ category, title, description }) {
  return (
    <div className="gh__metric">
      <p className="gh__metriccat">{category}</p>
      <h2 className="gh__metrictitle">{title}</h2>
      <p className="gh__metricdesc">{description}</p>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <>
      <h2 className="gh__sectiontitle">{title}</h2>
      <p className="gh__sectiondesc">{description}</p>
    </>
  );
}

function ProposalPreviewCard({ p }) {
  return (
    <a className="gh__pcard" href={`/governance/proposals/${p.id}`}>
      <span className="gh__psection">
        <span className="gh__pavatar u-avatar" style={{ "--sz": "36px", "--hue": p.hue }} aria-hidden="true" />
        <span className="gh__ptext">
          <h3 className="gh__ptitle">{p.title}</h3>
          <span className="gh__pdetails">
            <span className="gh__pdetail">By <b>{p.author}</b></span>
            <span className="gh__pdetail">{p.votes} votes</span>
            <span className="gh__pdetail">{p.comments} comments</span>
            <span className={"gh__pdetail" + (p.urgent ? " is-urgent" : "")}>{p.time}</span>
          </span>
        </span>
      </span>
      <span className="gh__pvote">
        <span className="gh__ppillwrap">
          <span className={"gh__cpill gh__cpill--" + p.tone}>{p.type}</span>
        </span>
        <span className="gh__pvotingwrap">
          <span className="gh__pconsensus">{p.met ? "Threshold met" : "Threshold still not met"}</span>
          <span className="gh__pvpneeded">{p.vp} VP{p.met ? "" : " needed"}</span>
        </span>
        <span className="gh__pvotecta">
          <span className="gh__pvotetext">Vote</span>
          <span className="gh__pchev"><Chevron /></span>
        </span>
      </span>
    </a>
  );
}

function ProjectCard({ g }) {
  return (
    <a className="gh__gcard" href={`/governance/projects/${g.id}`}>
      <div className="gh__gtop">
        <div className="gh__ghead">
          <span className="gh__gavatar u-avatar" style={{ "--sz": "30px", "--hue": g.hue }} aria-hidden="true" />
          <span className="gh__gcat">{g.category}</span>
        </div>
        <h3 className="gh__gtitle">{g.title}</h3>
        <div className="gh__gfunding">
          <span className="gh__gsize">{g.size}</span>
          <span className="gh__gmonths">{g.months} months vesting</span>
        </div>
        <div className="gh__gbar" role="img" aria-label={`${g.pct}% vested`}>
          <span className="gh__gfill" style={{ width: g.pct + "%" }} />
        </div>
      </div>
      <div className="gh__gupdate">
        <span className="gh__gupdateicon"><CommentBubble /></span>
        <span className="gh__gupdatetext">{g.update}</span>
      </div>
    </a>
  );
}

function BoxTabs({ tabs, active, onSelect, right }) {
  return (
    <div className="gh__boxtabs">
      <div className="gh__boxtabsleft">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            type="button"
            className={"gh__boxtab" + (tb.id === active ? " is-active" : "")}
            onClick={() => onSelect(tb.id)}
          >
            {tb.label}
          </button>
        ))}
      </div>
      {right ? <div className="gh__boxtabsright">{right}</div> : null}
    </div>
  );
}

function LineChart() {
  const w = 560;
  const h = 220;
  const pad = 16;
  const max = Math.max(...CHART_POINTS);
  const min = Math.min(...CHART_POINTS);
  const stepX = (w - pad * 2) / (CHART_POINTS.length - 1);
  const pts = CHART_POINTS.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (h - pad * 2) * (1 - (v - min) / (max - min || 1));
    return [x, y];
  });
  const line = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
  return (
    <div className="gh__chart">
      <svg viewBox={`0 0 ${w} ${h + 22}`} preserveAspectRatio="none" className="gh__chartsvg" role="img" aria-label="Participating VP over time">
        <defs>
          <linearGradient id="ghChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ff2d55" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ghChartLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff2d55" />
            <stop offset="100%" stopColor="#c640cd" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#ghChartFill)" />
        <path d={line} fill="none" stroke="url(#ghChartLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#ff2d55" />
        ))}
        {CHART_MONTHS.map((m, i) => (
          <text key={m + i} x={pad + i * stepX} y={h + 14} textAnchor="middle" className="gh__chartlabel">{m}</text>
        ))}
      </svg>
    </div>
  );
}

function ActivityItem({ item }) {
  return (
    <div className="gh__tickeritem">
      {item.kind === "comment" || item.kind === "finished" || item.kind === "vesting" ? (
        <span className="gh__tickerglyph" aria-hidden="true"><CommentBubble /></span>
      ) : (
        <span className="gh__tickeravatar u-avatar" style={{ "--sz": "28px", "--hue": item.hue }} aria-hidden="true" />
      )}
      <div className="gh__tickerbody">
        <p className="gh__tickertext" dangerouslySetInnerHTML={{ __html: item.html }} />
        <span className="gh__tickerdate">{item.date}</span>
      </div>
    </div>
  );
}

const OPEN_TABS = [
  { id: "endingSoon", label: "Ending soon" },
  { id: "participatingVp", label: "Participating VP" },
];
const CHART_TABS = [
  { id: "vp", label: "Participating VP over time" },
  { id: "votes", label: "Votes per proposal" },
];

export default function GvHomeLanding({
  endingSoon = ENDING_SOON,
  grants = GRANTS,
  delegates = DELEGATES,
  topVoters = TOP_VOTERS,
  activity = ACTIVITY,
}) {
  const [chromeTab, setChromeTab] = useState("home");
  const [showBanner, setShowBanner] = useState(true);
  const [openTab, setOpenTab] = useState("endingSoon");
  const [chartTab, setChartTab] = useState("vp");
  const [sortKey, setSortKey] = useState("totalVP");

  const openList = useMemo(
    () => (openTab === "endingSoon" ? endingSoon : [...endingSoon].slice(0, 3)),
    [openTab, endingSoon]
  );

  return (
    <GovernanceChrome active={chromeTab} onTab={setChromeTab}>
      <div className="gh">
        <div className="gh__container">
          <div className="gh__content">
            {showBanner && <MainBanner onClose={() => setShowBanner(false)} />}

            <div className="gh__metrics">
              {METRICS.map((m) => (
                <MetricsCard key={m.category} {...m} />
              ))}
            </div>

            <section className="gh__section">
              <SectionHeader
                title="Open Proposals"
                description="Proposals are created by the community and work as the consensus mechanism used to outline policies and changes to the Decentraland ecosystem."
              />
              <div className="gh__boxtabscontainer">
                <BoxTabs tabs={OPEN_TABS} active={openTab} onSelect={setOpenTab} />
                {openList.length ? (
                  openList.map((p) => <ProposalPreviewCard key={p.id} p={p} />)
                ) : (
                  <div className="gh__boxempty">No active proposals</div>
                )}
              </div>
              <button type="button" className="gh__fullbtn">View all proposals</button>
            </section>

            {endingSoon.length > 0 && (
              <section className="gh__section">
                <SectionHeader
                  title="Priority Proposals Spotlight"
                  description="Your vote matters. This section highlights binding Governance and project-related proposals that need your attention now."
                />
                <div className="gh__spotlight">
                  {endingSoon.slice(0, 2).map((p) => (
                    <a key={p.id} className="gh__slim" href={`/governance/proposals/${p.id}`}>
                      <span className={"gh__cpill gh__cpill--" + p.tone}>{p.type}</span>
                      <span className="gh__slimtitle">{p.title}</span>
                      <span className="gh__slimchev"><Chevron /></span>
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="gh__section">
              <SectionHeader
                title="Active Community Grants"
                description="Grants are the mechanism that the DAO uses to fund community projects that add value to the Decentraland ecosystem with our Treasury."
              />
              <div className="gh__grants">
                {grants.map((g) => (
                  <ProjectCard key={g.id} g={g} />
                ))}
              </div>
              <button type="button" className="gh__fullbtn">View all Grants</button>
            </section>

            <section className="gh__section">
              <SectionHeader
                title="DAO Delegates"
                description="Voting Power (VP) delegation is crucial to maximize the circulating VP usage, by assigning your VP to recognized community members who can engage in the governance process on behalf of you."
              />
              <div className="gh__delwrap">
                <table className="gh__deltable">
                  <thead>
                    <tr>
                      <th className="gh__delname">Candidate Name</th>
                      {[
                        { k: "lastVoted", l: "Last Voted" },
                        { k: "timesVoted", l: "Voted On" },
                        { k: "pickedBy", l: "Picked By" },
                        { k: "totalVP", l: "Total VP" },
                      ].map((c) => (
                        <th
                          key={c.k}
                          className={"gh__delsort" + (sortKey === c.k ? " is-active" : "")}
                          onClick={() => setSortKey(c.k)}
                        >
                          <span>{c.l}<SortGlyph /></span>
                        </th>
                      ))}
                      <th className="gh__delarrow" />
                    </tr>
                  </thead>
                  <tbody>
                    {delegates.map((d) => (
                      <tr key={d.address} className="gh__delrow">
                        <td className="gh__delnamecell">
                          <span className="gh__delavatar u-avatar" style={{ "--sz": "28px", "--hue": d.hue }} aria-hidden="true" />
                          <span className="gh__delusername">{d.name}</span>
                        </td>
                        <td>{d.lastVoted}</td>
                        <td>{d.timesVoted}</td>
                        <td>{d.pickedBy.toLocaleString()}</td>
                        <td>{d.totalVP}</td>
                        <td className="gh__delarrow"><Chevron /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" className="gh__fullbtn">View all Delegates</button>
            </section>

            <section className="gh__section gh__section--engagement" id="engagement">
              <div className="gh__enghead">
                <h2 className="gh__engtitle">Community Engagement</h2>
                <p className="gh__engdesc">
                  See the participation signal from the community and understand the basic health stats from the DAO.
                </p>
              </div>
              <div className="gh__engdata">
                <div className="gh__chartcard">
                  <BoxTabs
                    tabs={CHART_TABS}
                    active={chartTab}
                    onSelect={setChartTab}
                    right={<span className="gh__chartdisplay">Display: median</span>}
                  />
                  <LineChart />
                </div>
                <div className="gh__voterscard">
                  <table className="gh__voterstable">
                    <thead>
                      <tr>
                        <th>Last 30-Days top voters</th>
                        <th className="gh__voterscount">Votes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topVoters.map((v) => (
                        <tr key={v.rank}>
                          <td>
                            <span className="gh__voteruser">
                              <span className="gh__voterrank">{v.rank}</span>
                              <span className="gh__voteravatar u-avatar" style={{ "--sz": "24px", "--hue": v.hue }} aria-hidden="true" />
                              <span className="gh__votername">{v.name}</span>
                            </span>
                          </td>
                          <td className="gh__voterscount">{v.votes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="gh__bottom">
              <div className="gh__bottominfo">
                <h2 className="gh__bottomtitle">
                  We have so much ahead of us. The future of the Metaverse is in your hands!
                </h2>
                <div className="gh__bottomstats">
                  <div className="gh__stat">
                    <div className="gh__statval">42.8M USD</div>
                    <div className="gh__statdesc">Funds distributed</div>
                  </div>
                  <div className="gh__stat">
                    <div className="gh__statval">1,204</div>
                    <div className="gh__statdesc">Grants funded</div>
                  </div>
                </div>
              </div>
              <div className="gh__bottomactions">
                {[
                  { title: "Join our Discord Channel", desc: "Engage with the community" },
                  { title: "Debate on the forum", desc: "Discuss proposals and more" },
                  { title: "Subscribe to our Newsletter", desc: "A weekly DAO roundup" },
                ].map((a) => (
                  <button type="button" className="gh__action" key={a.title}>
                    <span className="gh__actionicon" aria-hidden="true">
                      <CommentBubble />
                    </span>
                    <span className="gh__actioninfo">
                      <span className="gh__actiontitle">{a.title}</span>
                      <span className="gh__actiondesc">{a.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="gh__ticker" aria-label="Latest activity">
            <div className="gh__tickerhead">
              <span className="gh__tickergradient" aria-hidden="true" />
              <h2 className="gh__tickertitle">Latest activity</h2>
              <button type="button" className="gh__tickerfilter">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 5h18M6 12h12M10 19h4" />
                </svg>
                Filter
              </button>
            </div>
            <div className="gh__tickerlist">
              {activity.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </GovernanceChrome>
  );
}
