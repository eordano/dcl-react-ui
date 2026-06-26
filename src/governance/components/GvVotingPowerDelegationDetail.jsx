import { useMemo, useState } from "react";
import "./gvvotingpowerdelegationdetail.css";

const COPY = {
  backLabel: "Go back to delegates list",
  delegateButton: "Delegate VP",
  about: "About",
  links: "Links",
  relevantSkills: "Relevant Skills",
  involvement: "Involvement with Decentraland",
  motivation: "Motivation to be a delegate",
  vision: "5-year vision for Decentraland",
  mostImportantIssue: "Most important issue in Decentraland",
  showMore: "Show more",
  showLess: "Show less",
  statsLoading: "Compiling profile...",
  ownVP: "Own voting power",
  delegatedVP: "Delegated voting power",
  totalVP: "Total voting power",
  mana: "MANA",
  land: "LAND",
  names: "NAMES",
  estate: "ESTATE",
  l1Wearables: "L1 WEARABLES",
  activeSince: "Active since",
  votedOn: "Voted on",
  match: "Match",
  initiativesTitle: "Initiatives voted on",
  voted: "Voted ",
  viewMore: "View more",
};

const DISTRIBUTION = [
  { key: "mana", label: "Mana", tone: "mana" },
  { key: "names", label: "Names", tone: "name" },
  { key: "l1Wearables", label: "L1 Wearables", tone: "l1" },
  { key: "land", label: "Land", tone: "land" },
  { key: "estate", label: "Estates", tone: "estate" },
  { key: "delegated", label: "Delegated", tone: "delegated" },
  { key: "rental", label: "LAND Rental", tone: "rental" },
];

const CANDIDATE = {
  address: "0x7c4f…a4e1",
  name: "metahero.dcl",
  hue: 268,
  bio:
    "DAO contributor and long-time community builder. I have been an active " +
    "voter since the Genesis launch and care deeply about keeping governance " +
    "accessible to everyone in Decentraland.",
  involvement:
    "Member of the Grants Support Squad and a frequent forum moderator. I " +
    "review grant updates and help new applicants navigate the proposal flow.",
  motivation:
    "I want delegated VP to be used transparently. Every vote I cast comes " +
    "with a written rationale posted to the forum so delegators can hold me " +
    "accountable.",
  vision:
    "A self-sustaining DAO where treasury spend is predictable, grant outcomes " +
    "are measured, and the platform's roadmap is set by its users.",
  most_important_issue:
    "Closing the loop on grant accountability — funding should track delivered " +
    "milestones, not promises.",
  links: [
    "https://forum.decentraland.org/u/metahero",
    "https://twitter.com/metahero_dcl",
    "https://github.com/metahero",
  ],
  relevant_skills: ["Governance", "Grants Review", "Community", "Solidity", "Treasury"],
};

const VP_DISTRIBUTION = {
  total: 184_200,
  own: 142_000,
  delegated: 42_200,
  mana: 96_400,
  names: 18_000,
  l1Wearables: 7_800,
  land: 38_000,
  estate: 16_000,
  rental: 8_000,
};

const VOTES = [
  { id: "v1", title: "Add a new Catalyst node operated by the DAO in the EU region", choice: "Yes", match: true },
  { id: "v2", title: "Grant Request: Decentraland Builders Hackathon Season 5", choice: "Yes", match: true },
  { id: "v3", title: "Should we lower the Grant proposal vote-power threshold to 1M VP?", choice: "No", match: false },
  { id: "v4", title: "Enact the Q2 Treasury rebalancing toward the Grants reserve", choice: "Abstain", match: undefined },
  { id: "v5", title: "Add Genesis Plaza Fountain as a Point of Interest", choice: "Yes", match: true },
  { id: "v6", title: "Ban the name “decentraland-official” from the registry", choice: "Yes", match: true },
];

const MATCH_PCT = 84;
const ACTIVE_SINCE = "March, 2021";

const nf = new Intl.NumberFormat("en-US");
function pct(value, total) {
  if (!total) return "0%";
  return Math.round((value / total) * 100) + "%";
}

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);
const CheckCircle = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--gvd-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-6" />
  </svg>
);
const CancelCircle = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--gvd-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6M9 9l6 6" />
  </svg>
);
const QuestionCircle = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--gvd-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3.5" />
    <path d="M12 17h.01" />
  </svg>
);
const Bolt = () => (
  <svg viewBox="0 0 24 24" width="0.78em" height="0.78em" aria-hidden="true" className="gvvotingpowerdelegationdetail__bolt">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
  </svg>
);

function VotingPower({ value, size = "medium" }) {
  return (
    <div className={"gvvotingpowerdelegationdetail__vp gvvotingpowerdelegationdetail__vp--" + size}>
      <span>{nf.format(value)}</span>
      <Bolt />
    </div>
  );
}

function Stat({ title, children }) {
  return (
    <div className="gvvotingpowerdelegationdetail__stat">
      <span className="gvvotingpowerdelegationdetail__statlabel">{title}</span>
      {children}
    </div>
  );
}

function CandidateDetails({ title, content, links, skills }) {
  if ((links && links.length === 0) || (skills && skills.length === 0)) return null;
  return (
    <div className="gvvotingpowerdelegationdetail__detail">
      <h4 className="gvvotingpowerdelegationdetail__detailtitle">{title}</h4>
      {content ? <p className="gvvotingpowerdelegationdetail__detailtext">{content}</p> : null}
      {links ? (
        <div className="gvvotingpowerdelegationdetail__links">
          {links.map((href, i) => (
            <a key={i} className="gvvotingpowerdelegationdetail__link" href={href}>
              <LinkIcon /> {href.replace(/^https?:\/\//i, "").replace(/^www\./i, "")}
            </a>
          ))}
        </div>
      ) : null}
      {skills ? (
        <div className="gvvotingpowerdelegationdetail__chips">
          {skills.map((s, i) => (
            <span key={i} className="gvvotingpowerdelegationdetail__chip">{s.toUpperCase()}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function VotedInitiative({ vote }) {
  const icon =
    vote.match === undefined ? <QuestionCircle /> : vote.match ? <CheckCircle /> : <CancelCircle />;
  return (
    <a className="gvvotingpowerdelegationdetail__vote" href="#" onClick={(e) => e.preventDefault()}>
      <div className="gvvotingpowerdelegationdetail__votetitlewrap">
        {icon}
        <h2 className="gvvotingpowerdelegationdetail__votetitle">{vote.title}</h2>
      </div>
      <div className="gvvotingpowerdelegationdetail__votechoice">
        {COPY.voted}
        <span className="gvvotingpowerdelegationdetail__votechoicehl">{vote.choice}</span>
      </div>
    </a>
  );
}

const VOTES_PER_PAGE = 4;

export default function GvVotingPowerDelegationDetail({
  candidate = CANDIDATE,
  vpDistribution = VP_DISTRIBUTION,
  votes = VOTES,
  matchPercentage = MATCH_PCT,
  activeSince = ACTIVE_SINCE,
  userVP = "12,480",
  loading = false,
  onBack,
  onClose,
}) {
  const [expanded, setExpanded] = useState(false);
  const [shown, setShown] = useState(VOTES_PER_PAGE);

  const visibleVotes = useMemo(() => votes.slice(0, shown), [votes, shown]);
  const hasShownAll = shown >= votes.length;

  const matchColor = `rgb(0, ${Math.round((200 * matchPercentage) / 100)}, 0)`;

  return (
    <div className="gvvotingpowerdelegationdetail__scrim" role="dialog" aria-modal="true" aria-label="Delegate detail">
      <div className="gvvotingpowerdelegationdetail__card gv">
        <button
          type="button"
          className="gvvotingpowerdelegationdetail__close"
          aria-label="Close"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        <header className="gvvotingpowerdelegationdetail__header">
          <div className="gvvotingpowerdelegationdetail__candidate">
            <button
              type="button"
              className="gvvotingpowerdelegationdetail__back"
              aria-label={COPY.backLabel}
              onClick={onBack}
            >
              <ChevronLeft />
            </button>
            <span className="u-avatar gvvotingpowerdelegationdetail__avatar" style={{ "--sz": "32px", "--hue": candidate.hue }} aria-hidden="true" />
            <span className="gvvotingpowerdelegationdetail__name">{candidate.name}</span>
          </div>
          <div className="gvvotingpowerdelegationdetail__delegate">
            <span className="gvvotingpowerdelegationdetail__delegatehint">Delegated {userVP} VP</span>
            <button type="button" className="gvvotingpowerdelegationdetail__delegatebtn">{COPY.delegateButton}</button>
          </div>
        </header>

        <div className={"gvvotingpowerdelegationdetail__info" + (expanded ? " is-expanded" : "")}>
          <div className="gvvotingpowerdelegationdetail__detailgrid">
            <div>
              <CandidateDetails title={COPY.about} content={candidate.bio} />
              <CandidateDetails title={COPY.involvement} content={candidate.involvement} />
              <CandidateDetails title={COPY.motivation} content={candidate.motivation} />
              <CandidateDetails title={COPY.vision} content={candidate.vision} />
              <CandidateDetails title={COPY.mostImportantIssue} content={candidate.most_important_issue} />
            </div>
            <div>
              <CandidateDetails title={COPY.links} links={candidate.links} />
              <CandidateDetails title={COPY.relevantSkills} skills={candidate.relevant_skills} />
            </div>
          </div>
          {!expanded ? <div className="gvvotingpowerdelegationdetail__fadeout" /> : null}
        </div>

        <div className="gvvotingpowerdelegationdetail__showmore">
          <div className="gvvotingpowerdelegationdetail__divider" />
          <button
            type="button"
            className="gvvotingpowerdelegationdetail__showmorebtn"
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? COPY.showLess : COPY.showMore}
          </button>
        </div>

        {loading ? (
          <div className="gvvotingpowerdelegationdetail__loading">
            <span className="gvvotingpowerdelegationdetail__spinner" aria-hidden="true" />
            <span className="gvvotingpowerdelegationdetail__loadingtext">{COPY.statsLoading}</span>
          </div>
        ) : (
          <>
            <div className="gvvotingpowerdelegationdetail__stats">
              <Stat title={COPY.ownVP}><VotingPower value={vpDistribution.own} size="large" /></Stat>
              <Stat title={COPY.delegatedVP}><VotingPower value={vpDistribution.delegated} size="large" /></Stat>
              <Stat title={COPY.totalVP}><VotingPower value={vpDistribution.total} size="large" /></Stat>

              <Stat title={COPY.mana}><VotingPower value={vpDistribution.mana} /></Stat>
              <Stat title={COPY.names}><VotingPower value={vpDistribution.names} /></Stat>
              <Stat title={COPY.l1Wearables}><VotingPower value={vpDistribution.l1Wearables} /></Stat>
              <Stat title={COPY.land}><VotingPower value={vpDistribution.land} /></Stat>
              <Stat title={COPY.estate}><VotingPower value={vpDistribution.estate} /></Stat>

              <div className="gvvotingpowerdelegationdetail__distribution">
                <div className="gvvotingpowerdelegationdetail__bar">
                  {DISTRIBUTION.map(({ key, tone }) =>
                    vpDistribution[key] > 0 ? (
                      <div
                        key={key}
                        className={"gvvotingpowerdelegationdetail__barseg gvvotingpowerdelegationdetail__barseg--" + tone}
                        style={{ width: pct(vpDistribution[key], vpDistribution.total) }}
                        title={`${nf.format(vpDistribution[key])} VP (${pct(vpDistribution[key], vpDistribution.total)})`}
                      />
                    ) : null
                  )}
                </div>
                <div className="gvvotingpowerdelegationdetail__barlabels">
                  {DISTRIBUTION.map(({ key, label, tone }) =>
                    vpDistribution[key] > 0 ? (
                      <span key={key} className="gvvotingpowerdelegationdetail__barlabel">
                        <span className={"gvvotingpowerdelegationdetail__bardot gvvotingpowerdelegationdetail__barseg--" + tone} aria-hidden="true" />
                        {label}
                      </span>
                    ) : null
                  )}
                </div>
              </div>

              <Stat title={COPY.activeSince}>
                <div className="gvvotingpowerdelegationdetail__statvalue">{activeSince}</div>
              </Stat>
              <Stat title={COPY.votedOn}>
                <div className="gvvotingpowerdelegationdetail__statvalue">{votes.length}</div>
              </Stat>
              {matchPercentage > 0 ? (
                <Stat title={COPY.match}>
                  <div className="gvvotingpowerdelegationdetail__statvalue" style={{ color: matchColor }}>
                    {matchPercentage}%
                  </div>
                </Stat>
              ) : null}
            </div>

            {visibleVotes.length > 0 ? (
              <div className="gvvotingpowerdelegationdetail__votes">
                <span className="gvvotingpowerdelegationdetail__voteslabel">{COPY.initiativesTitle}</span>
                <div className="gvvotingpowerdelegationdetail__voteslist">
                  {visibleVotes.map((v) => (
                    <VotedInitiative key={v.id} vote={v} />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}

        {!loading && !hasShownAll ? (
          <button
            type="button"
            className="gvvotingpowerdelegationdetail__viewmore"
            onClick={() => setShown((s) => s + VOTES_PER_PAGE)}
          >
            {COPY.viewMore}
          </button>
        ) : null}
      </div>
    </div>
  );
}
