import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvproposaldetail.css";

const PROPOSAL = {
  id: "0x9f3c-7a21",
  type: "grant",
  toneClass: "purple",
  catLabel: "Grant Request",
  catTone: "purple",
  status: "active",
  statusLabel: "Active",
  statusTone: "neutral",
  title: "Grant Request: Decentraland Builders Hackathon Season 5",
  author: "buildersdao.dcl",
  authorHue: 268,
  published: "May 28, 2026 14:10",
  start: "Jun 02, 2026 00:00",
  finish: "Jun 16, 2026 00:00",
  snapshot: "#4b91c2f",
  threshold: "2,000,000",
  thresholdReached: false,
  yourVp: "12,480",
  budget: { size: "$45,000", beneficiary: "0x55…1b2a", tier: "Tier 3" },
};

const CHOICES = [
  { id: "yes", label: "Yes", pct: 64, vp: "1,420,300", tone: "yes", voted: true },
  { id: "no", label: "No", pct: 36, vp: "798,140", tone: "no", voted: false },
];

const SURVEY = [
  { id: "love", label: "Love it", emoji: "😍", count: 142, pct: 58, dir: "up" },
  { id: "neutral", label: "Neutral", emoji: "😐", count: 47, pct: 19, dir: "neutral" },
  { id: "concerned", label: "Concerned", emoji: "😟", count: 56, pct: 23, dir: "down" },
];

const RATIONALE = [
  {
    id: 1,
    name: "metaverse-mike.dcl",
    hue: 200,
    choice: "Yes",
    tone: "yes",
    vp: "210,400 VP",
    text: "Builders programs consistently bring new creators into Decentraland. The proposed milestones and beneficiary track record justify the budget.",
  },
  {
    id: 2,
    name: "0xab…77d3",
    hue: 12,
    choice: "No",
    tone: "no",
    vp: "88,900 VP",
    text: "I support hackathons in principle but $45k feels high for a single season without committed retention metrics. Would vote Yes on a scoped-down Tier 2.",
  },
];

const COMMENTS = [
  {
    id: 1,
    name: "buildersdao.dcl",
    hue: 268,
    time: "2 days ago",
    text: "Thanks for the early feedback. We've added a retention-tracking milestone to the grant scope and will publish a public dashboard.",
  },
  {
    id: 2,
    name: "metaverse-mike.dcl",
    hue: 200,
    time: "1 day ago",
    text: "Great addition. Looking forward to seeing the dashboard — happy to help promote the hackathon across the creator channels.",
  },
];

const OpenIcon = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3H3v10h10v-3" />
    <path d="M9 3h4v4M13 3 7 9" />
  </svg>
);
const VpBolt = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
  </svg>
);
const DiscourseIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </svg>
);

function Pill({ kind, tone, children }) {
  const style =
    tone && tone !== "neutral"
      ? { "--tone-t": `var(--tone-${tone}-t)`, "--tone-bg": `var(--tone-${tone}-bg)` }
      : undefined;
  return (
    <span className={`gd__pill gd__pill--${kind}`} style={style}>
      {children}
    </span>
  );
}

function ProposalHero({ proposal }) {
  const active = proposal.status === "active";
  return (
    <section className={"gd__hero" + (active ? "" : " gd__hero--finished")} aria-label="Proposal header">
      <div
        className={
          "gd__herobanner " +
          (active ? `gd__herobanner--${proposal.toneClass}` : "gd__herobanner--finished")
        }
        aria-hidden="true"
      />
      <div className="gd__herotext">
        <h1 className="gd__herotitle">{proposal.title}</h1>
        <div className="gd__herolabels">
          {active ? (
            <Pill kind="white">{proposal.statusLabel}</Pill>
          ) : (
            <Pill kind="status" tone={proposal.statusTone}>
              <span className="gd__pilldot" />
              {proposal.statusLabel}
            </Pill>
          )}
          {active ? (
            <Pill kind="ghost">{proposal.catLabel}</Pill>
          ) : (
            <Pill kind="cat" tone={proposal.catTone}>
              {proposal.catLabel}
            </Pill>
          )}
        </div>
      </div>
    </section>
  );
}

function DetailsCard({ proposal }) {
  return (
    <div className="gd__detailcard">
      <h2 className="gd__seclabel">Proposal Details</h2>
      <div className="gd__row">
        <span className="gd__rowkey">Author</span>
        <span className="gd__author">
          <span className="gd__av u-avatar" style={{ "--sz": "20px", "--hue": proposal.authorHue }} aria-hidden="true" />
          {proposal.author}
        </span>
      </div>
      <div className="gd__row">
        <span className="gd__rowkey">Published</span>
        <span className="gd__rowval">{proposal.published}</span>
      </div>
      <div className="gd__row">
        <span className="gd__rowkey">Voting begins</span>
        <span className="gd__rowval">{proposal.start}</span>
      </div>
      <div className="gd__row">
        <span className="gd__rowkey">Voting ends</span>
        <span className="gd__rowval">{proposal.finish}</span>
      </div>
      <div className="gd__row">
        <span className="gd__rowkey">Snapshot</span>
        <a className="gd__snaplink" href="https://snapshot.org/#/dao-council.dcl.eth" target="_blank" rel="noopener noreferrer">
          {proposal.snapshot}
          <OpenIcon />
        </a>
      </div>
    </div>
  );
}

const VP_YES = [0, 200000, 480000, 760000, 1010000, 1230000, 1360000, 1420300];
const VP_NO = [0, 110000, 260000, 410000, 540000, 650000, 740000, 798140];
const VP_TICKS = ["Jun 2", "Jun 9", "Jun 16"];
function VpChart({ threshold = "2,000,000" }) {
  const thr = Number(String(threshold).replace(/[^0-9]/g, "")) || 2000000;
  const w = 560, h = 232, padL = 50, padR = 12, padT = 14, padB = 24;
  const ymax = thr * 1.12;
  const n = VP_YES.length;
  const X = (i) => padL + ((w - padL - padR) * i) / (n - 1);
  const Y = (v) => padT + (h - padT - padB) * (1 - v / ymax);
  const line = (a) => a.map((v, i) => (i ? "L" : "M") + X(i).toFixed(1) + "," + Y(v).toFixed(1)).join(" ");
  const area = (a) => line(a) + ` L${X(n - 1).toFixed(1)},${Y(0).toFixed(1)} L${X(0).toFixed(1)},${Y(0).toFixed(1)} Z`;
  const ty = Y(thr);
  return (
    <div className="gd__block">
      <h2 className="gd__blocktitle">Voting Power</h2>
      <svg viewBox={`0 0 ${w} ${h}`} className="gd__vpsvg" role="img" aria-label="Voting power over time">
        {[0, thr / 2, thr].map((v) => (
          <g key={v}>
            <line x1={padL} y1={Y(v)} x2={w - padR} y2={Y(v)} className="gd__vpgrid" />
            <text x={padL - 8} y={Y(v) + 4} textAnchor="end" className="gd__vptick">{v ? v / 1e6 + "M" : "0"}</text>
          </g>
        ))}
        <path d={area(VP_NO)} className="gd__vparea gd__vparea--no" />
        <path d={area(VP_YES)} className="gd__vparea gd__vparea--yes" />
        <path d={line(VP_NO)} className="gd__vpline gd__vpline--no" />
        <path d={line(VP_YES)} className="gd__vpline gd__vpline--yes" />
        <line x1={padL} y1={ty} x2={w - padR} y2={ty} className="gd__vpthr" />
        <text x={w - padR} y={ty - 6} textAnchor="end" className="gd__vpthrlabel">Required to pass</text>
        {VP_TICKS.map((t, i) => (
          <text key={t} x={padL + ((w - padL - padR) * i) / (VP_TICKS.length - 1)} y={h - 6}
            textAnchor={i === 0 ? "start" : i === VP_TICKS.length - 1 ? "end" : "middle"} className="gd__vptick">{t}</text>
        ))}
      </svg>
      <div className="gd__vplegend">
        <span className="gd__vpleg"><i className="gd__vpdot gd__vpdot--yes" />Yes</span>
        <span className="gd__vpleg"><i className="gd__vpdot gd__vpdot--no" />No</span>
      </div>
    </div>
  );
}

function VoteBox({ proposal, active, voted, onVote, selected, onSelect }) {
  return (
    <aside className="gd__sidebar" aria-label="Voting">
      <div className="gd__votebox">
        <div className="gd__threshold">
          <p className="gd__thsub">Acceptance Threshold</p>
          <div className="gd__thtitle">{proposal.threshold} VP</div>
          <div className="gd__thdots">
            <span className="gd__thdot is-active" />
            <span className="gd__thdot" />
          </div>
        </div>

        <div className="gd__vprow">
          <span className="gd__rowkey">Your Voting Power</span>
          <b>
            <VpBolt /> {proposal.yourVp} VP
          </b>
        </div>

        <div className="gd__choices" role="radiogroup" aria-label="Vote choices">
          {CHOICES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={selected === c.id}
              className={
                "gd__choice" +
                (voted && c.voted ? " is-voted" : "") +
                (selected === c.id ? " is-selected" : "")
              }
              disabled={!active}
              onClick={() => onSelect(c.id)}
            >
              <span className={`gd__choicefill gd__choicefill--${c.tone}`} style={{ width: c.pct + "%" }} aria-hidden="true" />
              <span className="gd__choicetxt">{c.label}</span>
              <span className="gd__choicepct">{c.pct}%</span>
            </button>
          ))}
        </div>

        {active ? (
          <button type="button" className="gd__votecta" onClick={onVote} disabled={!selected}>
            Cast Vote
          </button>
        ) : (
          <div className="gd__voteclosed">Voting closed</div>
        )}

        <div className="gd__votingstate">
          <span className={active ? "is-open" : ""}>{active ? "Open for votes" : "Voting finished"}</span>
          <span>2,218,440 total votes</span>
        </div>
      </div>

      <button type="button" className="gd__subscribe">Subscribe to updates</button>
    </aside>
  );
}

export default function GvProposalDetail({ proposal = PROPOSAL, state = "ready" }) {
  const [tab, setTab] = useState("proposals");
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(true);
  const active = proposal.status === "active";

  if (state === "loading") {
    return (
      <GovernanceChrome active={tab} onTab={setTab}>
        <div className="gd">
          <div className="gd__loading" role="status" aria-live="polite">
            <span className="gd__spinner" aria-hidden="true" />
            Loading proposal…
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  if (state === "error") {
    return (
      <GovernanceChrome active={tab} onTab={setTab}>
        <div className="gd">
          <div className="gd__notfound" role="alert">
            <div className="gd__notfoundtitle">Proposal not found</div>
            <p className="gd__notfoundsub">
              We couldn't find this proposal. It may have been deleted, or the link is incorrect.
            </p>
            <button type="button" className="gd__discoursebtn" onClick={() => setTab("proposals")}>
              Back to proposals
            </button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab} vp={proposal.yourVp} account="0x9f3c…7a21">
      <div className="gd">
        <nav className="gd__crumbs" aria-label="Breadcrumb">
          <button type="button" className="gd__crumb" onClick={() => setTab("proposals")}>
            Proposals
          </button>
          <span className="gd__crumbsep">/</span>
          <span className="gd__crumbcur">{proposal.catLabel}</span>
        </nav>

        <ProposalHero proposal={proposal} />

        <div className="gd__cols">
          <div className="gd__left">
            <DetailsCard proposal={proposal} />
          </div>

          <div className="gd__center">
            {proposal.type === "grant" && (
              <div className="gd__block">
                <div className="gd__budget">
                  <div className="gd__budgetcell">
                    <p className="gd__budgetlabel">Grant size</p>
                    <div className="gd__budgetval">{proposal.budget.size}</div>
                  </div>
                  <div className="gd__budgetcell">
                    <p className="gd__budgetlabel">Tier</p>
                    <div className="gd__budgetval">{proposal.budget.tier}</div>
                  </div>
                  <div className="gd__budgetcell">
                    <p className="gd__budgetlabel">Beneficiary</p>
                    <div className="gd__budgetval">{proposal.budget.beneficiary}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="gd__block gd__md">
              {proposal.description ? (
                <>
                  <h2>Description</h2>
                  <p style={{ whiteSpace: "pre-wrap" }}>{proposal.description}</p>
                </>
              ) : (
                <>
                  <h2>Abstract</h2>
                  <p>
                    We're requesting a grant to run the fifth season of the Decentraland Builders
                    Hackathon — a six-week program that onboards new creators to the SDK and ships
                    playable scenes to Genesis City.
                  </p>
                  <h2>Motivation</h2>
                  <p>
                    Prior seasons produced 40+ published scenes and brought ~120 first-time builders into
                    the ecosystem. This season focuses on retention: every participant is paired with a
                    mentor and committed to a public post-mortem.
                  </p>
                  <h2>Specification</h2>
                  <ul>
                    <li>6 weeks of programming with weekly office hours and a Discord support channel.</li>
                    <li>Prize pool distributed across three tiers plus a community-choice award.</li>
                    <li>A public retention dashboard tracking 30/60/90-day creator activity.</li>
                  </ul>
                  <p>
                    Full milestones and the budget breakdown are linked in the{" "}
                    <a href="https://forum.decentraland.org/" target="_blank" rel="noopener noreferrer">forum thread</a>.
                  </p>
                </>
              )}
            </div>

            <VpChart threshold={proposal.threshold} />

            <div className="gd__block">
              <h2 className="gd__blocktitle">Sentiment Survey</h2>
              <div className="gd__survey">
                {SURVEY.map((s) => (
                  <div className="gd__surveyrow" key={s.id}>
                    <div className="gd__surveyhead">
                      <span className="gd__surveyq">
                        <span aria-hidden="true">{s.emoji}</span>
                        {s.label}
                      </span>
                      <span className="gd__surveycount">
                        {s.count} · {s.pct}%
                      </span>
                    </div>
                    <div className="gd__surveytrack">
                      <span className={`gd__surveyfill gd__surveyfill--${s.dir}`} style={{ width: s.pct + "%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gd__block">
              <h2 className="gd__blocktitle">Voting Rationale</h2>
              <div className="gd__rationale">
                {RATIONALE.map((r) => (
                  <div className="gd__rat" key={r.id}>
                    <span className="gd__av u-avatar" style={{ "--sz": "32px", "--hue": r.hue }} aria-hidden="true" />
                    <div className="gd__ratbody">
                      <div className="gd__rathead">
                        <span className="gd__ratname">{r.name}</span>
                        <span className={`gd__ratchoice gd__ratchoice--${r.tone}`}>{r.choice}</span>
                        <span className="gd__ratvp">{r.vp}</span>
                      </div>
                      <p className="gd__rattext">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gd__block">
              <div className="gd__commentsbar">
                <h2 className="gd__blocktitle" style={{ margin: 0 }}>
                  {COMMENTS.length} Comments
                </h2>
                <button type="button" className="gd__discoursebtn">
                  <DiscourseIcon />
                  Comment on this Proposal
                </button>
              </div>
              {COMMENTS.map((c) => (
                <div className="gd__comment" key={c.id}>
                  <span className="gd__av u-avatar" style={{ "--sz": "36px", "--hue": c.hue }} aria-hidden="true" />
                  <div className="gd__cbody">
                    <div className="gd__chead">
                      <span className="gd__cname">{c.name}</span>
                      <span className="gd__ctime">{c.time}</span>
                    </div>
                    <p className="gd__ctext">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gd__right">
            <VoteBox
              proposal={proposal}
              active={active}
              voted={voted}
              selected={selected}
              onSelect={setSelected}
              onVote={() => setVoted(true)}
            />
          </div>
        </div>
      </div>
    </GovernanceChrome>
  );
}
