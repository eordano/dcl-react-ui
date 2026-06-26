import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvsubmittender.css";
import { Caret } from "../../atoms/icons.jsx";

const SUBMISSION_THRESHOLD_TENDER = "1000";

const LIMITS = {
  project_name: 80,
  summary: 3500,
  problem_statement: 3500,
  technical_specification: 3500,
  use_cases: 3500,
  deliverables: 3500,
};

const LINKED_PITCH = {
  id: "0x9d2f-pitch-7a21",
  label: "Pitch: A unified content-moderation pipeline for Worlds",
};

const INITIAL = {
  linked_proposal_id: LINKED_PITCH.id,
  project_name: "",
  summary: "",
  problem_statement: "",
  technical_specification: "",
  use_cases: "",
  deliverables: "",
  target_release_quarter: "",
  coAuthors: [],
};

const TEXT_SECTIONS = [
  {
    name: "summary",
    label: "Summary",
    sublabel:
      "Provide a high-level overview of the idea behind this tender and its connection to the original Pitch proposal.",
    markdown: true,
  },
  {
    name: "problem_statement",
    label: "Problem statement",
    sublabel:
      "Describe the specific problem that this solution aims to solve for the Decentraland community.",
    markdown: true,
  },
  {
    name: "technical_specification",
    label: "Technical specification",
    sublabel:
      "Outline how the execution team could implement this solution. Please note that this is not binding, and execution teams may propose a new technical pathway in their bid proposals.",
    markdown: true,
  },
  {
    name: "use_cases",
    label: "Use cases",
    sublabel:
      "Explain how the target audience will benefit from this project, how they will use it, and the value they will derive from it.",
    markdown: true,
    tall: true,
  },
  {
    name: "deliverables",
    label: "Deliverables",
    sublabel:
      "Detail all the artifacts that the execution teams should deliver as part of this Tender. For example, working software, documentation, marketing plans, social media strategies, etc.",
    markdown: true,
    tall: true,
  },
];

function getQuarters() {
  const now = new Date();
  const currentQuarter = Math.floor(now.getUTCMonth() / 3) + 1;
  const currentYear = now.getUTCFullYear();
  const quarters = [];
  for (let i = 0; i < 5; i++) {
    const quarter = currentQuarter + i;
    const year = currentYear + Math.floor(quarter / 5);
    quarters.push(`${year} Q${quarter % 4 === 0 ? 4 : quarter % 4}`);
  }
  return quarters;
}

const CaretGlyph = () => (
  <Caret size={14} strokeWidth={1.6} />
);
const CloseGlyph = ({ size = 14 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const HourglassGlyph = () => (
  <svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 6h20M14 42h20" />
    <path d="M16 6c0 8 6 12 8 16 2-4 8-8 8-16M16 42c0-8 6-12 8-16 2 4 8 8 8 16" />
  </svg>
);
const LockGlyph = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

function FieldLabel({ children, markdown, optional }) {
  return (
    <div className="gvst__label">
      <span>{children}</span>
      {markdown ? (
        <sup className="gvst__notice" title="You can format your proposal using markdown! Toggle the preview switch to see how your post will be displayed.">
          (markdown)
        </sup>
      ) : null}
      {optional ? <sup className="gvst__optional">(optional)</sup> : null}
    </div>
  );
}

function FieldMessage({ error, current, limit }) {
  return (
    <div className="gvst__message">
      {error ? <span className="gvst__error">{error}</span> : null}
      {typeof limit === "number" ? (
        <span>({current} out of {limit} characters)</span>
      ) : null}
    </div>
  );
}

function MarkdownField({ value, onChange, tall, disabled, error, name }) {
  const [preview, setPreview] = useState(false);
  return (
    <div className="gvst__mdfield">
      <div className="gvst__mdbar" aria-hidden="true">
        <button type="button" className="gvst__mdbtn" title="Bold">B</button>
        <button type="button" className="gvst__mdbtn" title="Italic"><i>I</i></button>
        <button type="button" className="gvst__mdbtn" title="Link">↗</button>
        <button type="button" className="gvst__mdbtn" title="List">•</button>
        <span className="gvst__mdspacer" />
        <label className="gvst__mdtoggle">
          <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} disabled={disabled} />
          <span className="gvst__mdswitch" />
          Preview
        </label>
      </div>
      <textarea
        className={"gvst__textarea" + (tall ? " is-tall" : "")}
        name={name}
        value={value}
        disabled={disabled}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function GvSubmitTender({
  account = "0x9f3c…7a21",
  votingPower = 12480,
  authState = "ready",
  initialPublished = false,
}) {
  const [tab, setTab] = useState("proposals");
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(initialPublished);
  const [error] = useState("");

  const quarters = useMemo(() => getQuarters(), []);
  const submissionVpNotMet = votingPower < Number(SUBMISSION_THRESHOLD_TENDER);
  const formDisabled = submissionVpNotMet;

  const set = (name, val) => setForm((f) => ({ ...f, [name]: val }));
  const addCoAuthor = () =>
    setForm((f) =>
      f.coAuthors.length >= 5
        ? f
        : { ...f, coAuthors: [...f.coAuthors, { addr: "0x" + Math.random().toString(16).slice(2, 6) + "…" + Math.random().toString(16).slice(2, 6), hue: Math.floor(Math.random() * 360) }] }
    );
  const removeCoAuthor = (i) => setForm((f) => ({ ...f, coAuthors: f.coAuthors.filter((_, idx) => idx !== i) }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (formDisabled) return;
    setSubmitted(true);
  };

  if (authState === "loading") {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account={account}>
        <div className="gvst">
          <div className="gvst__loading">
            <span className="gvst__spinner" aria-hidden="true" />
            Loading…
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  if (authState === "guest") {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account="Sign in">
        <div className="gvst">
          <div className="gvst__login">
            <div className="gvst__loginicon" aria-hidden="true"><LockGlyph /></div>
            <h1 className="gvst__logintitle">Tender proposal</h1>
            <p className="gvst__logindesc">
              Tender proposals are the second step in the Bidding &amp; Tendering process. Sign in
              with your wallet to submit a Tender. This action requires at least {SUBMISSION_THRESHOLD_TENDER} VP.
            </p>
            <button type="button" className="gvst__loginbtn">Sign in</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab} account={account} vp={votingPower.toLocaleString()}>
      <div className="gvst">
        <header className="gvst__header">
          <h1 className="gvst__title">Tender proposal</h1>
        </header>
        <div className="gvst__intro">
          <p>
            Tender proposals are the second step in the Bidding &amp; Tendering process. The aim of
            this stage is to refine the problems outlined in the Pitch proposal, providing a clearer
            vision of what the execution teams should propose in their Bid proposals.
          </p>
          <p>
            This action requires at least {SUBMISSION_THRESHOLD_TENDER} VP.{" "}
            <a href="https://account.decentraland.org/">Buy MANA</a> to get VP, or{" "}
            <a href="https://forum.decentraland.org/t/open-call-for-delegates-apply-now/5840/5">run for delegate</a>.
          </p>
        </div>

        <form className="gvst__form" onSubmit={onSubmit}>
          <div className="gvst__section is-disabled">
            <FieldLabel>Linked Pitch Proposal</FieldLabel>
            <div className="gvst__selectwrap">
              <select className="gvst__select" value={LINKED_PITCH.id} disabled aria-readonly="true">
                <option value={LINKED_PITCH.id}>{LINKED_PITCH.label}</option>
              </select>
              <span className="gvst__selectcaret"><CaretGlyph /></span>
            </div>
          </div>

          <div className={"gvst__section" + (formDisabled ? " is-disabled" : "")}>
            <FieldLabel>Project name</FieldLabel>
            <input
              className="gvst__input"
              type="text"
              value={form.project_name}
              disabled={formDisabled}
              maxLength={LIMITS.project_name}
              onChange={(e) => set("project_name", e.target.value)}
            />
            <FieldMessage current={form.project_name.length} limit={LIMITS.project_name} />
          </div>

          {TEXT_SECTIONS.map((s) => (
            <div key={s.name} className={"gvst__section" + (formDisabled ? " is-disabled" : "")}>
              <FieldLabel markdown={s.markdown}>{s.label}</FieldLabel>
              <p className="gvst__sublabel">{s.sublabel}</p>
              <MarkdownField
                name={s.name}
                value={form[s.name]}
                tall={s.tall}
                disabled={formDisabled}
                onChange={(v) => set(s.name, v)}
              />
              <FieldMessage current={form[s.name].length} limit={LIMITS[s.name]} />
            </div>
          ))}

          <div className={"gvst__section" + (formDisabled ? " is-disabled" : "")}>
            <FieldLabel>Target release quarter</FieldLabel>
            <p className="gvst__sublabel">
              State the anticipated release date for the community. Please note that this is not
              binding, and execution teams may propose a new date in their bid proposals.
            </p>
            <div className="gvst__selectwrap">
              <select
                className="gvst__select"
                value={form.target_release_quarter}
                disabled={formDisabled}
                onChange={(e) => set("target_release_quarter", e.target.value)}
              >
                <option value="" disabled>Select a target release quarter</option>
                {quarters.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              <span className="gvst__selectcaret"><CaretGlyph /></span>
            </div>
          </div>

          <div className={"gvst__section" + (formDisabled ? " is-disabled" : "")}>
            <FieldLabel optional>Co-authors</FieldLabel>
            <p className="gvst__sublabel">
              If you co-authored this proposal with someone else, you can add their wallet addresses
              to acknowledge their work. After you publish the proposal, co-authors will be asked to
              confirm or reject the request. Only if they confirm, they will be listed publicly on
              the proposal page.
            </p>
            <div className="gvst__coauthors">
              {form.coAuthors.map((c, i) => (
                <span className="gvst__coauthor" key={i}>
                  <span className="u-avatar" style={{ "--sz": "22px", "--hue": c.hue }} aria-hidden="true" />
                  {c.addr}
                  <button type="button" className="gvst__coremove" aria-label="Remove co-author" onClick={() => removeCoAuthor(i)}>
                    <CloseGlyph size={12} />
                  </button>
                </span>
              ))}
              {form.coAuthors.length < 5 && !formDisabled ? (
                <button type="button" className="gvst__coadd" onClick={addCoAuthor}>+ Add co-author</button>
              ) : null}
            </div>
          </div>

          <div className="gvst__submitrow">
            <button type="submit" className="gvst__submit" disabled={formDisabled}>
              Submit proposal
            </button>
          </div>

          {submissionVpNotMet ? (
            <div className="gvst__section">
              <p className="gvst__vpnotice">This action requires at least {SUBMISSION_THRESHOLD_TENDER} VP.</p>
            </div>
          ) : null}

          {error ? (
            <div className="gvst__section">
              <div className="gvst__errorbox" role="alert">
                <span className="gvst__errorlabel">There was an error.</span>
                <span className="gvst__errortext">{error}</span>
              </div>
            </div>
          ) : null}
        </form>
      </div>

      {submitted ? (
        <div className="gvst__backdrop" role="dialog" aria-modal="true" aria-label="Proposal published">
          <div className="gvst__modal">
            <button type="button" className="gvst__modalclose" aria-label="Close" onClick={() => setSubmitted(false)}>
              <CloseGlyph size={16} />
            </button>
            <span className="gvst__modalicon" aria-hidden="true"><HourglassGlyph /></span>
            <h2 className="gvst__modaltitle">Proposal published</h2>
            <p className="gvst__modaldesc">
              Your proposal is now published. When the Tender submission period ends, it will be open
              for voting.
            </p>
            <p className="gvst__modalvoting">Voting begins: Jul 18, 2026 14:00</p>
            <button type="button" className="gvst__modalbtn">Add to calendar</button>
            <p className="gvst__modalhelper">
              Set a reminder in your Calendar for when the voting period begins.
            </p>
          </div>
        </div>
      ) : null}
    </GovernanceChrome>
  );
}
