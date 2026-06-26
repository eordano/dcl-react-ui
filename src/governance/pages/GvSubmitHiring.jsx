import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvsubmithiring.css";
import { ChevronLeft, Caret } from "../../atoms/icons.jsx";

const COPY = {
  add: {
    title: "Add Committee Member",
    description:
      "Being part of a Committee is great responsibility inside the DAO. Check with whom you are proposing that they agree to be postulated before creating this proposal.",
    address_title: "Wallet address",
    address_description:
      "Please copy the address of the proposed member. Check with them which address should you provide",
    reasons_title: "Reasons for adding",
    reasons_description:
      "Explain why you think this person should be added to the Committee. Have in mind the goal of the Committee and how this person aligns with it. Be as descriptive and objective as possible",
    evidence_title: "Evidence",
    evidence_description:
      "Be as objective and detailed as possible. List their qualifications and achievements. Provide only publicly available information",
  },
  remove: {
    title: "Remove Committee Member",
    description:
      "Use this type of Proposal wisely. Before going through this way, talk with the person first, present your case at the Town Halls, and use public communication channels to discuss it. Only after then, publish this proposal.",
    address_title: "Committee member",
    reasons_title: "Reasons for removing",
    reasons_description:
      "Explain why this person should be removed from the Committee. Be kind, descriptive, and objective as possible.",
    evidence_title: "Evidence",
    evidence_description:
      "Be as objective and detailed as possible. Provide only publicly available information.",
  },
};

const TARGET_TITLE = "Target Committee";
const TARGET_PLACEHOLDER = "Select a committee";
const TARGET_DESCRIPTION = "Only those with available positions are listed";
const ADDRESS_PLACEHOLDER = "Enter their address";
const MEMBER_PLACEHOLDER = "Select a member";
const COAUTHOR_LABEL = "Co-authors";
const COAUTHOR_OPTIONAL = " (optional)";
const COAUTHOR_DESCRIPTION =
  "If you co-authored this proposal with someone else, you can add their wallet addresses to acknowledge their work. After you publish the proposal, co-authors will be asked to confirm or reject the request. Only if they confirm, they will be listed publicly on the proposal page.";
const COAUTHOR_PLACEHOLDER = "Add Co-authors";
const BUTTON_SUBMIT = "Submit proposal";

const REASONS_MAX = 3000;
const EVIDENCE_MAX = 3000;
const SUBMISSION_THRESHOLD_HIRING = 2500;

const ALL_COMMITTEES = [
  "Security Advisory Board",
  "DAO Council",
  "Wearable Curation Committee",
];
const ADD_COMMITTEES = ["DAO Council", "Wearable Curation Committee"];

const COMMITTEE_MEMBERS = {
  "Security Advisory Board": [
    { address: "0x7c8e…a4e1", name: "fenrir.dcl", hue: 268 },
    { address: "0x12a4…9f0c", name: "0x12a4…9f0c", hue: 30 },
  ],
  "DAO Council": [
    { address: "0xab33…77d3", name: "governance.dcl", hue: 130 },
    { address: "0x55f1…1b2a", name: "0x55f1…1b2a", hue: 0 },
    { address: "0x3e90…c901", name: "elena.dcl", hue: 305 },
  ],
  "Wearable Curation Committee": [
    { address: "0x9f3c…7a21", name: "cryptoart.dcl", hue: 48 },
  ],
};

const SignInGlyph = () => (
  <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="6" width="20" height="13" rx="2.5" />
    <path d="M2 10h20M6 15h4" />
  </svg>
);

function MarkdownEditor({ name, value, onChange, max, error, disabled }) {
  const tools = ["B", "I", "S", "H", "“", "↗", "</>", "⊞", "↹"];
  return (
    <div className="gvsh__md">
      <div className="gvsh__mdbar">
        <div className="gvsh__mdtools">
          {tools.map((g, i) => (
            <button key={i} type="button" className="gvsh__mdtool" tabIndex={-1} aria-hidden="true">
              {g}
            </button>
          ))}
        </div>
        <div className="gvsh__mdtools gvsh__mdtools--right">
          <button type="button" className="gvsh__mdcmd" tabIndex={-1}>Preview</button>
          <button type="button" className="gvsh__mdtool" tabIndex={-1} aria-hidden="true">⤢</button>
        </div>
      </div>
      <textarea
        className={"gvsh__mdarea" + (error ? " is-error" : "")}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        rows={6}
      />
      <div className="gvsh__mdmsg">
        ({value.length} out of {max.toLocaleString()} characters)
      </div>
    </div>
  );
}

export default function GvSubmitHiring({
  request = "add",
  committees,
  isCommitteesLoading = false,
  account = "0x9f3c…7a21",
}) {
  const action = request === "remove" ? "remove" : "add";
  const copy = COPY[action];
  const list = committees ?? (action === "add" ? ADD_COMMITTEES : ALL_COMMITTEES);

  const [tab, setTab] = useState("proposals");
  const [committee, setCommittee] = useState(null);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [memberOpen, setMemberOpen] = useState(false);
  const [reasons, setReasons] = useState("");
  const [evidence, setEvidence] = useState("");

  const vpTotal = 1480;
  const submissionVpNotMet = vpTotal < SUBMISSION_THRESHOLD_HIRING;
  const formDisabled = submissionVpNotMet;

  const members = useMemo(
    () => (committee ? COMMITTEE_MEMBERS[committee] ?? [] : []),
    [committee]
  );

  return (
    <GovernanceChrome active={tab} onTab={setTab} account={account}>
      <div className="gvsh">
        <div className="gvsh__back">
          <button type="button" className="gvsh__backbtn" aria-label="Back">
            <ChevronLeft size={18} />
          </button>
        </div>

        <form className="gvsh__col" onSubmit={(e) => e.preventDefault()}>
          <section className="gvsh__section gvsh__section--title">
            <h1 className="gvsh__h1">{copy.title}</h1>
          </section>

          <section className="gvsh__section">
            <p className="gvsh__lead">{copy.description}</p>
          </section>

          <section className="gvsh__section">
            <label className="gvsh__label">{TARGET_TITLE}</label>
            <div className="gvsh__ddwrap">
              <button
                type="button"
                className={"gvsh__dropdown" + (committeeOpen ? " is-open" : "")}
                disabled={formDisabled || isCommitteesLoading}
                onClick={() => setCommitteeOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={committeeOpen}
              >
                <span className={"gvsh__ddtext" + (committee ? "" : " is-placeholder")}>
                  {committee ?? TARGET_PLACEHOLDER}
                </span>
                <span className="gvsh__ddicon"><Caret size={13} /></span>
              </button>
              {committeeOpen && (
                <ul className="gvsh__menu" role="listbox">
                  {list.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        className={"gvsh__option" + (c === committee ? " is-selected" : "")}
                        onClick={() => {
                          setCommittee(c);
                          if (action === "remove") setAddress("");
                          setCommitteeOpen(false);
                        }}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {action === "add" && (
              <span className="gvsh__adddetail">{TARGET_DESCRIPTION}</span>
            )}
          </section>

          <section className={"gvsh__section" + (action === "add" ? " gvsh__section--tight" : "")}>
            <label className="gvsh__label">{copy.address_title}</label>

            {action === "add" ? (
              <>
                <p className="gvsh__sublabel">{copy.address_description}</p>
                <input
                  className="gvsh__input"
                  type="text"
                  placeholder={ADDRESS_PLACEHOLDER}
                  value={address}
                  disabled={formDisabled}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </>
            ) : (
              <div className="gvsh__ddwrap">
                <button
                  type="button"
                  className={"gvsh__dropdown" + (memberOpen ? " is-open" : "")}
                  disabled={formDisabled || !committee}
                  onClick={() => setMemberOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={memberOpen}
                >
                  <span className={"gvsh__ddtext" + (address ? "" : " is-placeholder")}>
                    {address
                      ? members.find((m) => m.address === address)?.name ?? address
                      : MEMBER_PLACEHOLDER}
                  </span>
                  <span className="gvsh__ddicon"><Caret size={13} /></span>
                </button>
                {memberOpen && (
                  <ul className="gvsh__menu" role="listbox">
                    {members.length === 0 ? (
                      <li className="gvsh__menuempty">Select a committee first</li>
                    ) : (
                      members.map((m) => (
                        <li key={m.address}>
                          <button
                            type="button"
                            className={"gvsh__option gvsh__option--member" + (m.address === address ? " is-selected" : "")}
                            onClick={() => {
                              setAddress(m.address);
                              setMemberOpen(false);
                            }}
                          >
                            <span className="gvsh__memberavatar u-avatar" style={{ "--sz": "22px", "--hue": m.hue }} aria-hidden="true" />
                            {m.name}
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            )}
          </section>

          <section className="gvsh__section gvsh__section--tight">
            <label className="gvsh__label">{copy.reasons_title}</label>
            <p className="gvsh__sublabel">{copy.reasons_description}</p>
            <MarkdownEditor
              name="reasons"
              value={reasons}
              onChange={setReasons}
              max={REASONS_MAX}
              disabled={formDisabled}
            />
          </section>

          <section className="gvsh__section gvsh__section--tight">
            <label className="gvsh__label">{copy.evidence_title}</label>
            <p className="gvsh__sublabel">{copy.evidence_description}</p>
            <MarkdownEditor
              name="evidence"
              value={evidence}
              onChange={setEvidence}
              max={EVIDENCE_MAX}
              disabled={formDisabled}
            />
          </section>

          <section className="gvsh__section">
            <div className="gvsh__coauthorlabel">
              <label className="gvsh__label gvsh__label--inline">{COAUTHOR_LABEL}</label>
              <sup className="gvsh__optional">{COAUTHOR_OPTIONAL}</sup>
            </div>
            <p className="gvsh__sublabel">{COAUTHOR_DESCRIPTION}</p>
            <div className="gvsh__addresses">
              <span className="gvsh__addrplaceholder">{COAUTHOR_PLACEHOLDER}</span>
            </div>
          </section>

          <section className="gvsh__section">
            <button type="submit" className="gvsh__submit" disabled={formDisabled}>
              {BUTTON_SUBMIT}
            </button>
          </section>

          {submissionVpNotMet && (
            <section className="gvsh__section">
              <p className="gvsh__vpnotice">
                This action requires at least {SUBMISSION_THRESHOLD_HIRING.toLocaleString()} VP.
              </p>
            </section>
          )}
        </form>
      </div>
    </GovernanceChrome>
  );
}

export function GvSubmitHiringLoading({ request = "add" }) {
  return <GvSubmitHiring request={request} committees={[]} isCommitteesLoading />;
}

export function GvSubmitHiringLogIn({ request = "add" }) {
  const action = request === "remove" ? "remove" : "add";
  const copy = COPY[action];
  return (
    <GovernanceChrome active="proposals">
      <div className="gvsh">
        <div className="gvsh__back" />
        <div className="gvsh__col gvsh__login">
          <div className="gvsh__loginicon" aria-hidden="true"><SignInGlyph /></div>
          <h1 className="gvsh__h1">{copy.title}</h1>
          <p className="gvsh__lead gvsh__lead--center">{copy.description}</p>
          <p className="gvsh__loginhint">
            You need to sign in to submit a proposal.
          </p>
          <button type="button" className="gvsh__submit">Sign in</button>
        </div>
      </div>
    </GovernanceChrome>
  );
}

export function GvSubmitHiringNotFound() {
  return (
    <GovernanceChrome active="proposals">
      <div className="gvsh">
        <div className="gvsh__back" />
        <div className="gvsh__col gvsh__notfound">
          <p className="gvsh__nftitle">Not found</p>
          <p className="gvsh__nfdesc">You just hit a route that doesn't exist...</p>
        </div>
      </div>
    </GovernanceChrome>
  );
}
