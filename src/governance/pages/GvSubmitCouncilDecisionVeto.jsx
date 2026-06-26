import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvsubmitcouncildecisionveto.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const REASONS_MIN = 20;
const REASONS_MAX = 3500;
const SUGGESTIONS_MIN = 20;
const SUGGESTIONS_MAX = 3500;
const SUBMISSION_THRESHOLD = 2500;
const MAX_COAUTHORS = 5;

const ErrorNotice = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
  </svg>
);

const MdCmd = ({ d, label }) => (
  <button type="button" className="gvcdv__mdbtn" title={label} aria-label={label} tabIndex={-1}>
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  </button>
);

const MD_COMMANDS = [
  { label: "Bold", d: <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" /> },
  { label: "Italic", d: <><path d="M14 5h-4M14 19h-4M14 5l-4 14" /></> },
  { label: "Strikethrough", d: <><path d="M4 12h16M8 6h8M8 18h6" /></> },
  { label: "Title", d: <><path d="M6 6v12M14 6v12M6 12h8" /><path d="M18 9v9M16.5 9.5 19 8" /></> },
  { label: "Link", d: <><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></> },
  { label: "Quote", d: <><path d="M7 7H5a2 2 0 0 0-2 2v3h4V8M16 7h-2a2 2 0 0 0-2 2v3h4V8" /></> },
  { label: "Code", d: <><path d="m9 8-5 4 5 4M15 8l5 4-5 4" /></> },
  { label: "Image", d: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="m21 16-5-5-9 9" /></> },
  { label: "List", d: <><path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" /></> },
  { label: "Ordered list", d: <><path d="M10 6h10M10 12h10M10 18h10M4 6h1v4M4 14h2v1l-2 2v1h2" /></> },
];

function MarkdownField({ id, value, onChange, placeholder, max, disabled, error, minHint }) {
  const len = (value || "").length;
  const tooShort = !!value && len < minHint;
  const counter = `(${len} out of ${max} characters)`;
  return (
    <div className={"gvcdv__md" + (error || tooShort ? " is-error" : "") + (disabled ? " is-disabled" : "")}>
      <div className="gvcdv__mdtoolbar">
        <div className="gvcdv__mdgroup">
          {MD_COMMANDS.map((c) => (
            <MdCmd key={c.label} d={c.d} label={c.label} />
          ))}
        </div>
        <div className="gvcdv__mdgroupright">
          <span className="gvcdv__mdcount">{counter}</span>
          <button type="button" className="gvcdv__mdtext" tabIndex={-1}>Preview</button>
          <button type="button" className="gvcdv__mdbtn" title="Fullscreen" aria-label="Fullscreen" tabIndex={-1}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        </div>
      </div>
      <textarea
        id={id}
        className="gvcdv__mdarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        spellCheck={false}
      />
    </div>
  );
}

function CoAuthors({ value = [], disabled }) {
  return (
    <div className="gvcdv__section">
      <div className="gvcdv__labelrow">
        <label className="gvcdv__label">Co-authors</label>
        <sup className="gvcdv__optional">(optional)</sup>
      </div>
      <p className="gvcdv__sublabel">
        If you co-authored this proposal with someone else, you can add their wallet addresses to
        acknowledge their work. After you publish the proposal, co-authors will be asked to confirm or
        reject the request. Only if they confirm, they will be listed publicly on the proposal page.
      </p>
      <div className={"gvcdv__addrselect" + (disabled ? " is-disabled" : "")}>
        <div className="gvcdv__chips">
          {value.map((a) => (
            <span key={a} className="gvcdv__chip">
              <span className="gvcdv__chipavatar u-avatar" style={{ "--sz": "18px", "--hue": 268 }} aria-hidden="true" />
              {a}
              <button type="button" className="gvcdv__chipx" aria-label={`Remove ${a}`} tabIndex={-1}>×</button>
            </span>
          ))}
          <input
            className="gvcdv__addrinput"
            type="text"
            placeholder={value.length ? "" : "Enter a wallet address"}
            disabled={disabled}
            aria-label="Enter a wallet address"
          />
        </div>
      </div>
      <p className="gvcdv__addrmsg">{value.length}/{MAX_COAUTHORS} Co-authors added</p>
    </div>
  );
}

export default function GvSubmitCouncilDecisionVeto({
  loggedIn = true,
  votingPower = 4200,
  initialDecisionUrl = "",
  initialReasons = "",
  initialSuggestions = "",
  coAuthors = [],
  serverError = "",
}) {
  const [tab, setTab] = useState("");
  const [decisionUrl, setDecisionUrl] = useState(initialDecisionUrl);
  const [reasons, setReasons] = useState(initialReasons);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const vpNotMet = votingPower < SUBMISSION_THRESHOLD;
  const disabled = vpNotMet;

  const reasonsCounter = useMemo(
    () => `(${reasons.length} out of ${REASONS_MAX} characters)`,
    [reasons]
  );

  if (!loggedIn) {
    return (
      <GovernanceChrome active="" onTab={setTab} account="Sign in">
        <div className="gvcdv gvcdv--login">
          <div className="gvcdv__signin">
            <h2 className="gvcdv__signintitle">Council Decision Veto</h2>
            <p className="gvcdv__signinsub">
              Allows the community to challenge and veto recent decisions made by the DAO Council
              through a governance vote.
            </p>
            <p className="gvcdv__signinhint">Sign in with your wallet to submit this proposal.</p>
            <button type="button" className="gvcdv__signinbtn">Sign in</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab} vp={votingPower.toLocaleString()}>
      <div className="gvcdv">
        <div className="gvcdv__back">
          <button type="button" className="gvcdv__backbtn" aria-label="Back">
            <ChevronLeft size={16} />
          </button>
        </div>

        <form className="gvcdv__form" onSubmit={(e) => e.preventDefault()}>
          <div className="gvcdv__section">
            <h1 className="gvcdv__h1">Council Decision Veto</h1>
          </div>

          <div className="gvcdv__section">
            <p className="gvcdv__lead">
              Allows the community to challenge and veto recent decisions made by the DAO Council
              through a governance vote.
            </p>
          </div>

          <div className="gvcdv__section">
            <label className="gvcdv__label" htmlFor="gvcdv-url">DAO Council Decision (URL)</label>
            <p className="gvcdv__sublabel">
              This field requires the URL of the DAO Council decision from the Council Snapshot
              Space. It validates two conditions: 1. The URL must belong to the Council Snapshot
              Space. 2. The proposal must have been closed no more than 14 days before this veto
              proposal is created.
            </p>
            <input
              id="gvcdv-url"
              className="gvcdv__field"
              type="text"
              value={decisionUrl}
              onChange={(e) => setDecisionUrl(e.target.value)}
              placeholder="URL of the Council decision you want to veto (must be from the Council Snapshot Space)."
              disabled={disabled}
            />
          </div>

          <div className="gvcdv__section">
            <label className="gvcdv__label" htmlFor="gvcdv-reasons">Reasons to Veto</label>
            <p className="gvcdv__sublabel">
              Explain why you believe this decision should be vetoed. Consider including potential
              issues, inconsistencies, or negative impacts.
            </p>
            <MarkdownField
              id="gvcdv-reasons"
              value={reasons}
              onChange={setReasons}
              placeholder=""
              max={REASONS_MAX}
              minHint={REASONS_MIN}
              disabled={disabled}
            />
            <p className="gvcdv__mdmessage">{reasonsCounter}</p>
          </div>

          <div className="gvcdv__section">
            <div className="gvcdv__labelrow">
              <label className="gvcdv__label" htmlFor="gvcdv-suggestions">Suggestions to the Council</label>
              <sup className="gvcdv__optional">(optional)</sup>
            </div>
            <p className="gvcdv__sublabel">
              Share your suggestions or alternative recommendations for the Council regarding this
              decision.
            </p>
            <MarkdownField
              id="gvcdv-suggestions"
              value={suggestions}
              onChange={setSuggestions}
              placeholder=""
              max={SUGGESTIONS_MAX}
              minHint={SUGGESTIONS_MIN}
              disabled={disabled}
            />
            <p className="gvcdv__mdmessage">
              ({suggestions.length} out of {SUGGESTIONS_MAX} characters)
            </p>
          </div>

          <CoAuthors value={coAuthors} disabled={disabled} />

          <div className="gvcdv__section">
            <button type="submit" className="gvcdv__submit" disabled={disabled}>
              Submit proposal
            </button>
          </div>

          {vpNotMet && (
            <div className="gvcdv__section">
              <p className="gvcdv__vpwarn">
                This action requires at least {SUBMISSION_THRESHOLD.toLocaleString()} VP.
              </p>
            </div>
          )}

          {serverError && (
            <div className="gvcdv__section">
              <div className="gvcdv__error">
                <div className="gvcdv__errorhead">
                  <span className="gvcdv__errornotice">
                    <ErrorNotice />
                    <span className="gvcdv__errorlabel">
                      There was an error while trying to create the proposal, please try again later.
                    </span>
                  </span>
                  <button type="button" className="gvcdv__errorshow">Show</button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </GovernanceChrome>
  );
}
