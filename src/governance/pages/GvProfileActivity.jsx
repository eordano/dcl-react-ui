import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvprofileactivity.css";
import { Caret } from "../../atoms/icons.jsx";

function fmtNum(n) {
  return n.toLocaleString("en-US");
}

const VP = { total: 1284500, own: 412300, delegated: 872200 };

const VP_SEGMENTS = [
  { id: "mana", label: "MANA", value: 180400, tone: "purple" },
  { id: "name", label: "NAMEs", value: 96000, tone: "blue" },
  { id: "land", label: "LAND", value: 84500, tone: "green" },
  { id: "wearable", label: "L1 Wearables", value: 31400, tone: "orange" },
  { id: "delegated", label: "Delegated", value: 872200, tone: "fuchsia" },
];

const VOTING_STATS = {
  participationTotal: 218,
  participationPercentage: "87%",
  personalMatchPercentage: 74,
  outcomeMatchPercentage: 81,
};

const BADGES = [
  { id: 1, label: "Voter Streak", hue: 268 },
  { id: 2, label: "Open for Voting", hue: 30 },
  { id: 3, label: "Land Architect", hue: 130 },
  { id: 4, label: "Walkabout", hue: 210 },
  { id: 5, label: "DAO Veteran", hue: 305 },
];

const PROJECTS = [
  {
    id: "p1",
    title: "Decentraland Builders Hackathon Season 5",
    role: "author",
    amount: 45000,
    token: "USD",
    passed: "3 months ago",
    funded: 0.62,
  },
  {
    id: "p2",
    title: "Community Translation & Localization Program",
    role: "coauthor",
    amount: 18000,
    token: "USD",
    passed: "6 months ago",
    funded: 1,
  },
];

const MY_PROPOSALS = [
  {
    id: "a1",
    title: "Add a new Catalyst node operated by the DAO in the EU region",
    status: "active",
    category: "catalyst",
    votes: 184,
    date: "Ends in 2 days",
  },
  {
    id: "a2",
    title: "Grant Request: World content moderation tooling",
    status: "passed",
    category: "grant",
    votes: 311,
    date: "Ended 3 weeks ago",
  },
  {
    id: "a3",
    title: "Should we lower the Grant vote-power threshold to 1M VP?",
    status: "enacted",
    category: "poll",
    votes: 642,
    date: "Enacted 2 months ago",
  },
];

const WATCHLIST = [
  {
    id: "w1",
    title: "Tender: Build the next-gen avatar customization pipeline",
    status: "active",
    category: "tender",
    votes: 97,
    date: "Ends in 6 days",
  },
  {
    id: "w2",
    title: "Enact the Q2 Treasury rebalancing toward the Grants reserve",
    status: "finished",
    category: "governance",
    votes: 529,
    date: "Ended 1 week ago",
  },
];

const COAUTHORING = [
  {
    id: "c1",
    title: "Linked Wearables Registry: approve CryptoArt Studios collection",
    status: "active",
    category: "linked_wearables",
    votes: 143,
    date: "Ends in 4 days",
    pending: true,
  },
];

const DELEGATORS = [
  { address: "metabuilder.dcl", vp: 84200, hue: 268 },
  { address: "0x7c…a4e1", vp: 51800, hue: 30 },
  { address: "0x12…9f0c", vp: 39400, hue: 130 },
];

const VOTED = [
  {
    id: "v1",
    title: "Add Genesis Plaza Fountain as a Point of Interest",
    status: "rejected",
    category: "poi",
    choice: "Yes",
    date: "Ended 5 days ago",
    stance: "differs",
  },
  {
    id: "v2",
    title: "Ban the name “decentraland-official” from the registry",
    status: "passed",
    category: "ban_name",
    choice: "Yes",
    date: "Ended 6 days ago",
    stance: "shared",
  },
  {
    id: "v3",
    title: "Approve the 2026 DAO Operating Budget",
    status: "active",
    category: "governance",
    choice: "No",
    date: "Ends in 1 day",
    stance: "pending",
  },
];

const CATEGORY_LABELS = {
  catalyst: { label: "Catalyst Node", tone: "blue" },
  grant: { label: "Grant Request", tone: "purple" },
  poll: { label: "Poll", tone: "orange" },
  tender: { label: "Tender", tone: "red" },
  governance: { label: "Governance", tone: "orange" },
  linked_wearables: { label: "Linked Wearables", tone: "yellow" },
  poi: { label: "Point of Interest", tone: "green" },
  ban_name: { label: "Name Ban", tone: "fuchsia" },
};
const STATUS_LABELS = {
  active: { label: "Active", tone: "neutral" },
  passed: { label: "Passed", tone: "green" },
  enacted: { label: "Enacted", tone: "green" },
  rejected: { label: "Rejected", tone: "red" },
  finished: { label: "Finished", tone: "neutral" },
  out_of_budget: { label: "Out of Budget", tone: "yellow" },
};

const HelperIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" className="gpa__helper">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 11.5v.01M6.4 6.1a1.6 1.6 0 1 1 2.4 1.4c-.5.3-.8.6-.8 1.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const ValidatedCheck = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="gpa__validated">
    <path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5l-8-3Z" fill="var(--brand)" />
    <path d="M8.5 12l2.3 2.3L15.5 9.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="gpa__chev">
    <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 8.5l3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const StanceIcon = ({ stance }) => {
  if (stance === "shared")
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 8.2l2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (stance === "differs")
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.5V8l2.4 1.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

function ActionBox({ title, info, action, className = "", children }) {
  return (
    <div className={"gpa__box " + className}>
      <div className="gpa__boxhead">
        <div className="gpa__boxtitle">
          <span>{title}</span>
          {info && (
            <span className="gpa__helperbtn" title={info}>
              <HelperIcon />
            </span>
          )}
        </div>
        {action && <div className="gpa__boxaction">{action}</div>}
      </div>
      <div className="gpa__divider" />
      <div className="gpa__boxbody">{children}</div>
    </div>
  );
}

function VpStatBox({ title, value, info }) {
  return (
    <div className="gpa__statbox">
      <div className="gpa__stathead">
        <span className="gpa__stattitle">{title}</span>
        {info && (
          <span className="gpa__helperbtn" title={info}>
            <HelperIcon />
          </span>
        )}
      </div>
      <div className="gpa__vpvalue">
        <span className="gpa__vpmark">
          <BoltIcon />
        </span>
        {fmtNum(value)}
      </div>
    </div>
  );
}

function VotingStatBox({ title, main, sub, info }) {
  return (
    <div className="gpa__statbox">
      <div className="gpa__stathead">
        <span className="gpa__stattitle">{title}</span>
        {info && (
          <span className="gpa__helperbtn" title={info}>
            <HelperIcon />
          </span>
        )}
      </div>
      <div className="gpa__votingdata">
        <span className="gpa__votingmain">{main}</span>
        <span className="gpa__votingsub">{sub}</span>
      </div>
    </div>
  );
}

function ProposalRow({ p, kind }) {
  const cat = CATEGORY_LABELS[p.category];
  const status = STATUS_LABELS[p.status];
  return (
    <a className="gpa__prow" href="#proposal" onClick={(e) => e.preventDefault()}>
      <div className="gpa__prowmain">
        <h4 className="gpa__prowtitle">{p.title}</h4>
        <div className="gpa__prowstatus">
          {status && <span className={"gpa__status gpa__status--" + status.tone}>{status.label}</span>}
          {cat && <span className={"gpa__pill gpa__pill--" + cat.tone}>{cat.label}</span>}
          {p.pending && <span className="gpa__pill gpa__pill--red">Pending request</span>}
          {kind === "voted" && (
            <span className="gpa__prowdetail">They voted &ldquo;{p.choice}&rdquo;</span>
          )}
          {kind === "created" && <span className="gpa__prowdetail">{p.votes} votes</span>}
          <span className="gpa__prowdetail">{p.date}</span>
        </div>
      </div>
      <div className="gpa__prowend">
        {kind === "voted" && (
          <span className={"gpa__stance gpa__stance--" + p.stance}>
            <StanceIcon stance={p.stance} />
            {p.stance === "shared" ? "Stance shared" : p.stance === "differs" ? "Stance differs" : "Voting in progress"}
          </span>
        )}
        {kind === "created" && p.status === "active" && <span className="gpa__votetext">Vote</span>}
        <Chevron />
      </div>
    </a>
  );
}

function FullWidthButton({ children }) {
  return (
    <button type="button" className="gpa__fullbtn">
      {children}
    </button>
  );
}

function DelegatorCard({ d }) {
  return (
    <a className="gpa__delcard" href="#delegator" onClick={(e) => e.preventDefault()}>
      <div className="gpa__delsection">
        <span className="gpa__delavatar u-avatar" style={{ "--sz": "40px", "--hue": d.hue }} aria-hidden="true" />
        <div className="gpa__deldetails">
          <span className="gpa__deltitle">{d.address}</span>
          <span className="gpa__delvp">Delegated {fmtNum(d.vp)} VP</span>
        </div>
      </div>
      <Chevron />
    </a>
  );
}

function ProjectItem({ p }) {
  return (
    <a className="gpa__project" href="#project" onClick={(e) => e.preventDefault()}>
      <div className="gpa__projmain">
        <h4 className="gpa__projtitle">{p.title}</h4>
        <p className="gpa__projdesc">
          Passed {p.passed} with a budget of{" "}
          <b>
            {fmtNum(p.amount)} {p.token}
          </b>
        </p>
      </div>
      <div className="gpa__projfund">
        <div className="gpa__fundbar" role="img" aria-label={`${Math.round(p.funded * 100)}% funded`}>
          <span className="gpa__fundfill" style={{ width: Math.round(p.funded * 100) + "%" }} />
        </div>
        <span className="gpa__fundpct">{Math.round(p.funded * 100)}%</span>
      </div>
      <Chevron />
    </a>
  );
}

export default function GvProfileActivity({
  username = "MetaVoter",
  address = "0x9f3c…7a21",
  bio = "DAO contributor since 2021. Building tooling for the Decentraland community and voting on every grant round. Reach me in the #governance forum.",
  isOwnProfile = true,
}) {
  const [tab, setTab] = useState("profile");
  const [activity, setActivity] = useState("myProposals");

  const activityList = useMemo(() => {
    if (activity === "watchlist") return WATCHLIST;
    if (activity === "coauthoring") return COAUTHORING;
    return MY_PROPOSALS;
  }, [activity]);

  const segTotal = VP_SEGMENTS.reduce((s, x) => s + x.value, 0);
  const hasPendingCoauthor = COAUTHORING.some((c) => c.pending);

  return (
    <GovernanceChrome active={tab} onTab={setTab} vp={fmtNum(VP.total)} account={address}>
      <div className="gpa">
        <section className="gpa__userstats">
          <div>
            <div className="gpa__usernamerow">
              <div className="gpa__usernamebox">
                <span className="gpa__username">{username}</span>
                <ValidatedCheck />
                {isOwnProfile && (
                  <button type="button" className="gpa__settings" title="Profile settings" aria-label="Profile settings">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.81 1.17V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15H4.5a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 11 4.6V4.5a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 18 6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 11h.1a2 2 0 1 1 0 4h-.1Z" />
                    </svg>
                  </button>
                )}
              </div>
              {isOwnProfile && (
                <button type="button" className="gpa__getvp">
                  <BoltIcon />
                  Get More VP
                  <Caret size={12} />
                </button>
              )}
            </div>

            <div className="gpa__badges" aria-label="Badges">
              {BADGES.map((b) => (
                <span key={b.id} className="gpa__badge u-avatar" style={{ "--sz": "44px", "--hue": b.hue }} title={b.label} aria-label={b.label} />
              ))}
              <span className="gpa__badgemore">+12 More</span>
            </div>
          </div>

          <div className="gpa__userinfo">
            <div className="gpa__userinfomain">
              {bio && (
                <div className="gpa__bio">
                  <span className="gpa__biolabel">Bio</span>
                  <p className="gpa__biotext">{bio}</p>
                </div>
              )}

              <div className="gpa__statrow">
                <VpStatBox title="Consolidated Voting Power" value={VP.total} info="Results from the sum of own Voting Power and delegated Voting Power" />
                <VpStatBox title="Own Voting Power" value={VP.own} info="Voting Power that results from holding/owning MANA, L1 Wearables, Names, LAND and/or ESTATE" />
                <VpStatBox title="Delegated Voting Power" value={VP.delegated} info="Voting Power that results from the delegation of VP by other users onto this account" />
              </div>

              <ActionBox title="Voting Power Distribution" className="gpa__vpdistbox">
                <div className="gpa__vpdist">
                  <div className="gpa__vpdistbar" aria-hidden="true">
                    {VP_SEGMENTS.map((s) => (
                      <span
                        key={s.id}
                        className={"gpa__vpseg gpa__seg--" + s.tone}
                        style={{ width: (s.value / segTotal) * 100 + "%" }}
                      />
                    ))}
                  </div>
                  <ul className="gpa__vplegend">
                    {VP_SEGMENTS.map((s) => (
                      <li key={s.id} className="gpa__vplegitem">
                        <span className={"gpa__legdot gpa__seg--" + s.tone} aria-hidden="true" />
                        <span className="gpa__leglabel">{s.label}</span>
                        <span className="gpa__legval">{fmtNum(s.value)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ActionBox>

              <div className="gpa__statrow">
                <VotingStatBox
                  title="30-Day Participation"
                  main={`Voted on ${VOTING_STATS.participationTotal} proposals`}
                  sub={`${VOTING_STATS.participationPercentage} participation rate`}
                />
                <VotingStatBox
                  title="Personal Match"
                  info="Personal match shows the alignment you have with this profile in terms of voting decisions."
                  main={`You're ${VOTING_STATS.personalMatchPercentage}% aligned`}
                  sub="Conversations to be had"
                />
                <VotingStatBox
                  title="Outcome Match"
                  info='When a vote coincides with the outcome, it&apos;s considered to be a "match".'
                  main={`${VOTING_STATS.outcomeMatchPercentage}% match`}
                  sub="Aligned with the community"
                />
              </div>
            </div>

            <div className="gpa__avatar" aria-hidden="true">
              <div className="gpa__avatarrender u-avatar" style={{ "--sz": "100%", "--hue": 268 }} />
            </div>
          </div>
        </section>

        <ActionBox
          title="Projects"
          info="Projects that this account has authored or co-authored and have been approved and funded by the Decentraland DAO."
        >
          <div className="gpa__projects">
            {PROJECTS.map((p) => (
              <ProjectItem key={p.id} p={p} />
            ))}
          </div>
        </ActionBox>

        <div className="gpa__tabbox">
          <div className="gpa__boxtabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activity === "myProposals"}
              className={"gpa__tab" + (activity === "myProposals" ? " is-active" : "")}
              onClick={() => setActivity("myProposals")}
            >
              My proposals
            </button>
            {isOwnProfile && (
              <button
                type="button"
                role="tab"
                aria-selected={activity === "watchlist"}
                className={"gpa__tab" + (activity === "watchlist" ? " is-active" : "")}
                onClick={() => setActivity("watchlist")}
              >
                Watchlist
              </button>
            )}
            <button
              type="button"
              role="tab"
              aria-selected={activity === "coauthoring"}
              className={"gpa__tab" + (activity === "coauthoring" ? " is-active" : "")}
              onClick={() => setActivity("coauthoring")}
            >
              Co-authoring
              {hasPendingCoauthor && <span className="gpa__dot" aria-label="Pending requests" />}
            </button>
          </div>
          <div className="gpa__tabcontent">
            {activityList.length > 0 ? (
              <>
                <div className="gpa__prows">
                  {activityList.map((p) => (
                    <ProposalRow key={p.id} p={p} kind="created" />
                  ))}
                </div>
                <FullWidthButton>View more proposals</FullWidthButton>
              </>
            ) : (
              <div className="gpa__empty gpa__empty--tab">
                <span className="gpa__emptymelon" aria-hidden="true">🍉</span>
                <p className="gpa__emptytext">
                  {activity === "watchlist"
                    ? "You haven't subscribed to any proposal yet"
                    : activity === "coauthoring"
                    ? "You haven't co-authored any proposal yet"
                    : "You haven't submitted any proposal yet"}
                </p>
              </div>
            )}
          </div>
        </div>

        <ActionBox
          title="Delegated VP to"
          info="This is the DAO member this user delegated their VP to."
          action={
            isOwnProfile && (
              <button type="button" className="gpa__basicbtn">
                Change Delegation
              </button>
            )
          }
        >
          <div className="gpa__delgrid">
            <DelegatorCard d={{ address: "delegate.dcl", vp: VP.own, hue: 130 }} />
          </div>
        </ActionBox>

        <ActionBox
          title="VP Delegators"
          info="These are all the DAO members that delegated their VP to this user."
        >
          <div className="gpa__delgrid">
            {DELEGATORS.map((d) => (
              <DelegatorCard key={d.address} d={d} />
            ))}
          </div>
        </ActionBox>

        <ActionBox title="Proposals voted on">
          <div className="gpa__prows">
            {VOTED.map((p) => (
              <ProposalRow key={p.id} p={p} kind="voted" />
            ))}
          </div>
          <FullWidthButton>View more proposals</FullWidthButton>
        </ActionBox>
      </div>
    </GovernanceChrome>
  );
}
