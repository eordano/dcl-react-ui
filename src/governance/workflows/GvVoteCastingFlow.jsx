import { useState } from "react";
import "./gvvotecastingflow.css";

const COPY = {
  survey_title: "Please explain the reasoning behind your vote",
  selected_choice: 'You’re about to vote "{choice}" with ',
  rationale: "Rationale",
  rationale_placeholder: 'I’m voting "{choice}" because…',
  cast_vote: "Cast Vote",
  retry: "Retry in {timer}...",
  voting_failed: "Failed to cast vote",
  character_counter: "({current} out of {limit} characters)",
  too_short: "Rationale is too short",
  too_large: "Rationale is too large",
  topics_title: "Topics",
  reactions_title: "Reaction",
  add_reaction: "Add",
  snapshot_not_available: "Voting not available",
  snapshot_description:
    "It looks like we're having issues casting your vote from the Governance dApp.",
  snapshot_suggestion:
    "You can try voting directly on Snapshot - the system we use for decision-making.",
  snapshot_button: "Vote on Snapshot",
  registered_title: "Vote Registered",
  registered_description:
    "Thank you for voting! Want to add this proposal to your Watchlist to follow the results?",
  registered_accept: "Add to Watchlist",
  registered_reject: "No thanks",
};

const REASON_MIN = 10;
const REASON_MAX = 140;

const SURVEY_TOPICS = [
  { id: "idea", label: "Idea" },
  { id: "team", label: "Team" },
  { id: "budget", label: "Budget" },
  { id: "roadmap", label: "Roadmap Proposal" },
  { id: "impact", label: "Impact" },
];
const REACTIONS = [
  { id: "love", emoji: "🥰", label: "Love this!" },
  { id: "like", emoji: "😊", label: "Like!" },
  { id: "neutral", emoji: "😐", label: "Neutral" },
  { id: "concerned", emoji: "🤨", label: "Concerned" },
];

const tmpl = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
    <path
      d="M3 3l10 10M13 3 3 13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const VotingDisabled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="126"
    height="98"
    fill="none"
    viewBox="0 0 126 98"
    className="gvvc__snapicon"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 57H10C4.47715 57 0 61.4772 0 67V88C0 93.5228 4.47715 98 10 98H116C121.523 98 126 93.5228 126 88V67C126 61.4772 121.523 57 116 57H112V84H14V57Z"
      fill="#37333D"
    />
    <path
      d="M21 10C21 4.47715 25.4772 0 31 0H95C100.523 0 105 4.47715 105 10V77H21V10Z"
      fill="#B9B7BE"
    />
    <line x1="49" y1="53.2218" x2="76.2218" y2="26" stroke="white" strokeWidth="11" strokeLinecap="round" />
    <line x1="48.7782" y1="26" x2="76" y2="53.2218" stroke="white" strokeWidth="11" strokeLinecap="round" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h7v7" />
    <path d="M13 3 6.5 9.5" />
    <path d="M11 9.5V13H3V5h3.5" />
  </svg>
);

function SurveyRow({ topic, reaction, onPick, onClear }) {
  const [open, setOpen] = useState(false);
  const picked = REACTIONS.find((r) => r.id === reaction);

  return (
    <div
      className="gvvc__surveyrow"
      onClick={() => {
        if (!open && !picked) setOpen(true);
      }}
    >
      <span className="gvvc__surveytopic">{topic.label}</span>

      {!open && !picked && (
        <div className="gvvc__addreaction">
          <span className="gvvc__addglyph" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M8.5 14c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8" />
              <path d="M9 9.5h.01M15 9.5h.01" />
            </svg>
          </span>
          <span className="gvvc__addlabel">{COPY.add_reaction}</span>
        </div>
      )}

      {open && (
        <div className="gvvc__reactions" onClick={(e) => e.stopPropagation()}>
          {REACTIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              className="gvvc__reaction"
              title={r.label}
              aria-label={r.label}
              onClick={() => {
                onPick(topic.id, r.id);
                setOpen(false);
              }}
            >
              {r.emoji}
            </button>
          ))}
          <button
            type="button"
            className="gvvc__reactionx"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {picked && (
        <button
          type="button"
          className="gvvc__pickedreaction"
          aria-label={picked.label}
          title={picked.label}
          onClick={() => onClear(topic.id)}
        >
          {picked.emoji}
        </button>
      )}
    </div>
  );
}

function SurveyStep({
  choice,
  totalVp,
  shouldGiveReason,
  voteWithSurvey,
  reasonTimer,
  showError,
  retryTimer,
  casting,
  onCast,
  onClose,
}) {
  const [reason, setReason] = useState("");
  const [survey, setSurvey] = useState({});

  const tooShort = reason.length > 0 && reason.length < REASON_MIN;
  const tooLong = reason.length > REASON_MAX;
  const reasonError = tooShort ? COPY.too_short : tooLong ? COPY.too_large : null;
  const castDisabled =
    (shouldGiveReason && (!!reasonError || reasonTimer > 0)) || showError;
  const timerDisplay = shouldGiveReason && reasonTimer > 0 ? ` (${reasonTimer})` : "";

  return (
    <div className="gvvc__content">
      <button type="button" className="gvvc__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>

      <div className="gvvc__title">
        <h2 className="gvvc__heading">{COPY.survey_title}</h2>
        <p className="gvvc__choiceline">
          {tmpl(COPY.selected_choice, { choice })}
          <span className="gvvc__votevp">{totalVp} VP</span>
        </p>
      </div>

      <div className="gvvc__body">
        {shouldGiveReason && (
          <div className="gvvc__reasonarea">
            <span className="gvvc__subhead">{COPY.rationale}</span>
            <div className={"gvvc__textarea" + (reasonError ? " has-error" : "")}>
              <textarea
                className="gvvc__textareafield"
                rows={3}
                value={reason}
                disabled={casting}
                placeholder={tmpl(COPY.rationale_placeholder, { choice })}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="gvvc__textmeta">
              <span className={"gvvc__error" + (reasonError ? "" : " is-hidden")}>
                {reasonError || " "}
              </span>
              <span className="gvvc__counter">
                {tmpl(COPY.character_counter, { current: reason.length, limit: REASON_MAX })}
              </span>
            </div>
          </div>
        )}

        {voteWithSurvey && (
          <div className="gvvc__survey">
            <div className="gvvc__surveyheader">
              <span>{COPY.topics_title}</span>
              <span>{COPY.reactions_title}</span>
            </div>
            {SURVEY_TOPICS.map((topic) => (
              <SurveyRow
                key={topic.id}
                topic={topic}
                reaction={survey[topic.id]}
                onPick={(id, r) => setSurvey((p) => ({ ...p, [id]: r }))}
                onClear={(id) =>
                  setSurvey((p) => {
                    const next = { ...p };
                    delete next[id];
                    return next;
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="gvvc__actions">
        <button
          type="button"
          className={"gvvc__cast" + (casting ? " is-loading" : "")}
          disabled={castDisabled || casting}
          onClick={onCast}
        >
          {casting && <span className="gvvc__btnspinner" aria-hidden="true" />}
          {showError
            ? tmpl(COPY.retry, { timer: retryTimer })
            : COPY.cast_vote + timerDisplay}
        </button>
      </div>

      <div className={"gvvc__errornotice" + (showError ? "" : " is-hidden")}>
        {COPY.voting_failed}
      </div>
    </div>
  );
}

function SnapshotStep({ onClose }) {
  return (
    <div className="gvvc__content gvvc__content--snapshot">
      <button type="button" className="gvvc__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="gvvc__snapcontent">
        <VotingDisabled />
        <span className="gvvc__snapheader">{COPY.snapshot_not_available}</span>
        <div className="gvvc__snapdesc">{COPY.snapshot_description}</div>
        <p className="gvvc__snapsuggestion">{COPY.snapshot_suggestion}</p>
      </div>
      <div className="gvvc__snapactions">
        <a
          className="gvvc__snapbutton"
          href="https://snapshot.org/#/dao-council.dcl.eth"
          target="_blank"
          rel="noopener noreferrer"
        >
          {COPY.snapshot_button}
          <ExternalIcon />
        </a>
      </div>
    </div>
  );
}

function RegisteredStep({ loading, onAccept, onReject, onClose }) {
  return (
    <div className="gvvc__content gvvc__content--confirm">
      <button type="button" className="gvvc__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
      <div className="gvvc__confirmtext">
        <h2 className="gvvc__confirmtitle">{COPY.registered_title}</h2>
        <p className="gvvc__confirmdesc">{COPY.registered_description}</p>
      </div>
      <div className="gvvc__confirmactions">
        <button
          type="button"
          className={"gvvc__cast" + (loading ? " is-loading" : "")}
          disabled={loading}
          onClick={onAccept}
        >
          {loading && <span className="gvvc__btnspinner" aria-hidden="true" />}
          {COPY.registered_accept}
        </button>
        <button
          type="button"
          className="gvvc__basic"
          disabled={loading}
          onClick={onReject}
        >
          {COPY.registered_reject}
        </button>
      </div>
    </div>
  );
}

export default function GvVoteCastingFlow({
  state = "survey",
  choice = "Yes",
  totalVp = "12,480",
  onClose = () => {},
}) {
  const [active, setActive] = useState(state);
  const [casting, setCasting] = useState(false);
  const [showError, setShowError] = useState(false);

  const shouldGiveReason = active === "reason";
  const voteWithSurvey = active === "survey" || active === "reason";

  function simulateCast() {
    setCasting(true);
    setTimeout(() => {
      setCasting(false);
      if (Math.random() < 0.5) {
        setShowError(false);
        setActive("registered");
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 2500);
      }
    }, 1000);
  }

  let card;
  if (active === "snapshot") {
    card = <SnapshotStep onClose={onClose} />;
  } else if (active === "registered") {
    card = (
      <RegisteredStep
        loading={false}
        onAccept={onClose}
        onReject={onClose}
        onClose={onClose}
      />
    );
  } else {
    card = (
      <SurveyStep
        choice={choice}
        totalVp={totalVp}
        shouldGiveReason={shouldGiveReason}
        voteWithSurvey={voteWithSurvey}
        reasonTimer={0}
        showError={showError}
        retryTimer={6}
        casting={casting}
        onCast={simulateCast}
        onClose={onClose}
      />
    );
  }

  const tiny = active === "snapshot" || active === "registered";

  return (
    <div className="gvvc">
      <div className="gvvc__backdrop" aria-hidden="true" />

      <div className="gvvc__scrim">
        <div
          className={"gvvc__modal" + (tiny ? " gvvc__modal--tiny" : "")}
          role="dialog"
          aria-modal="true"
          aria-label={
            active === "snapshot"
              ? COPY.snapshot_not_available
              : active === "registered"
              ? COPY.registered_title
              : COPY.survey_title
          }
        >
          <div key={active} className="gvvc__modalinner">
            {card}
          </div>
        </div>
      </div>
    </div>
  );
}
