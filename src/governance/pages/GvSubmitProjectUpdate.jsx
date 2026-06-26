import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvsubmitprojectupdate.css";

function SectionBadge({ n, state }) {
  return (
    <span className={"gvsubmitprojectupdate__secicon is-" + state} aria-hidden="true">
      {state === "ok" ? (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            d="M5 12.5l4.2 4.2L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <span className="gvsubmitprojectupdate__secnum">{n}</span>
      )}
    </span>
  );
}

function FormSection({ n, title, isNew, state, children }) {
  return (
    <section className="gvsubmitprojectupdate__section">
      <div className="gvsubmitprojectupdate__sechead">
        <SectionBadge n={n} state={state} />
        <span className="gvsubmitprojectupdate__sectitle">
          {title}
          {isNew && <span className="gvsubmitprojectupdate__newbadge">New</span>}
        </span>
        <span className="gvsubmitprojectupdate__secrule" />
      </div>
      <div className="gvsubmitprojectupdate__seccontent">{children}</div>
    </section>
  );
}

function MarkdownField({ label, value, onChange, placeholder, limit, error }) {
  const count = value.length;
  return (
    <div className="gvsubmitprojectupdate__field">
      <label className="gvsubmitprojectupdate__label">{label}</label>
      <div
        className={
          "gvsubmitprojectupdate__editor" + (error ? " is-error" : "")
        }
      >
        <div className="gvsubmitprojectupdate__toolbar">
          <button type="button" className="gvsubmitprojectupdate__cmd" title="Bold">
            <b>B</b>
          </button>
          <button type="button" className="gvsubmitprojectupdate__cmd" title="Italic">
            <i>I</i>
          </button>
          <button type="button" className="gvsubmitprojectupdate__cmd" title="Strikethrough">
            <s>S</s>
          </button>
          <span className="gvsubmitprojectupdate__cmdsep" />
          <button type="button" className="gvsubmitprojectupdate__cmd" title="Link">
            <svg viewBox="0 0 24 24" width="13" height="13">
              <path
                d="M9 15l6-6M8 11l-2 2a3 3 0 004 4l2-2M16 13l2-2a3 3 0 00-4-4l-2 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button type="button" className="gvsubmitprojectupdate__cmd" title="Quote">
            &ldquo;
          </button>
          <button type="button" className="gvsubmitprojectupdate__cmd" title="List">
            <svg viewBox="0 0 24 24" width="13" height="13">
              <path
                d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="gvsubmitprojectupdate__toolbarspace" />
          <button type="button" className="gvsubmitprojectupdate__cmdtext">
            Preview
          </button>
        </div>
        <textarea
          className="gvsubmitprojectupdate__textarea"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      </div>
      <p
        className={
          "gvsubmitprojectupdate__counter" + (error ? " is-error" : "")
        }
      >
        {error ? error + " " : ""}({count} out of {limit} characters)
      </p>
    </div>
  );
}

function FundsCard({ upper, label, sublabel, value, token }) {
  return (
    <div className="gvsubmitprojectupdate__fcard">
      <div className={"gvsubmitprojectupdate__fcardlabel" + (upper ? " is-upper" : "")}>
        {label}
      </div>
      <div className="gvsubmitprojectupdate__fcardvalue">
        <span className="gvsubmitprojectupdate__fcardamount">{value}</span>
        <span className="gvsubmitprojectupdate__fcardtoken">{token}</span>
      </div>
      <div className="gvsubmitprojectupdate__fcardsub">{sublabel}</div>
    </div>
  );
}

const HEALTH = [
  { id: "onTrack", label: "On Track" },
  { id: "atRisk", label: "At Risk" },
  { id: "offTrack", label: "Off Track" },
];

const FIELDS = [
  {
    key: "introduction",
    label: "Introduction",
    limit: 500,
    placeholder:
      "Give a short introduction summarizing the period this update covers.",
  },
  {
    key: "highlights",
    label: "Highlights",
    limit: 3500,
    placeholder:
      "What have you shipped? Where have you made progress? What are you proud of?",
  },
  {
    key: "blockers",
    label: "Blockers",
    limit: 3500,
    placeholder:
      "What is being difficult? Why is the project delayed? When sharing a blocker, share the mitigation strategy you’re planning to remove that blocker.",
  },
  {
    key: "next_steps",
    label: "Next Steps",
    limit: 3500,
    placeholder:
      "What are your upcoming tasks? Where is your focus going to be next?",
  },
  {
    key: "additional_notes",
    label: "Additional notes and links",
    limit: 3500,
    placeholder:
      "Feel free to share any additional information or resources to showcase your project.",
  },
];

const CSV_HEADER = "category,description,token,amount,receiver,link";

export default function GvSubmitProjectUpdate({
  signedIn = true,
  initialValues,
}) {
  const [health, setHealth] = useState("onTrack");
  const [values, setValues] = useState(() => ({
    introduction: "",
    highlights: "",
    blockers: "",
    next_steps: "",
    additional_notes: "",
    ...(initialValues || {}),
  }));
  const [csv, setCsv] = useState(CSV_HEADER);

  const set = (key) => (v) => setValues((s) => ({ ...s, [key]: v }));

  const dirty = useMemo(
    () =>
      FIELDS.some((f) => values[f.key].length > 0) ||
      health !== "onTrack" ||
      csv !== CSV_HEADER,
    [values, health, csv]
  );

  const generalValid = useMemo(
    () =>
      FIELDS.slice(0, 4).every(
        (f) => values[f.key].length >= 1 && values[f.key].length <= f.limit
      ),
    [values]
  );
  const canSubmit = generalValid;

  if (!signedIn) {
    return (
      <GovernanceChrome active="projects" account="Connect">
        <div className="gvsubmitprojectupdate gvsubmitprojectupdate--gate">
          <div className="gvsubmitprojectupdate__signin">
            <h1 className="gvsubmitprojectupdate__signintitle">
              Publish New Grant Update
            </h1>
            <p className="gvsubmitprojectupdate__signindesc">
              You need to sign in to publish a project update.
            </p>
            <button type="button" className="gvsubmitprojectupdate__signinbtn">
              Sign in
            </button>
            <p className="gvsubmitprojectupdate__signinnote">
              By signing in you accept our Terms of use and Privacy policy.
            </p>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active="projects">
      <div className="gvsubmitprojectupdate">
        <header className="gvsubmitprojectupdate__head">
          <h1 className="gvsubmitprojectupdate__title">Publish New Grant Update</h1>
          <p className="gvsubmitprojectupdate__desc">
            Share your grant updates with the Decentraland Community. Use this
            space to talk about the progress but also to raise issues or blockers
            you might have with your project. Feel free to add any relevant
            information or links to demo what you’ve been up to.
          </p>
        </header>

        <FormSection
          n={1}
          title="General"
          state={generalValid ? "ok" : dirty ? "error" : "idle"}
        >
          <div className="gvsubmitprojectupdate__field">
            <label className="gvsubmitprojectupdate__label">Project Health</label>
            <div className="gvsubmitprojectupdate__health">
              {HEALTH.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className={
                    "gvsubmitprojectupdate__healthbtn" +
                    (health === h.id ? " is-selected is-" + h.id : "")
                  }
                  onClick={() => setHealth(h.id)}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {FIELDS.map((f) => (
            <MarkdownField
              key={f.key}
              label={f.label}
              value={values[f.key]}
              onChange={set(f.key)}
              placeholder={f.placeholder}
              limit={f.limit}
            />
          ))}
        </FormSection>

        <FormSection n={2} title="Financials" isNew state="idle">
          <div className="gvsubmitprojectupdate__fcards">
            <FundsCard
              upper
              label="Funds released since last update"
              value="42,500"
              token="USD"
              sublabel="3 tx. last one made 12 days ago"
            />
            <FundsCard
              upper
              label="Funds disclosed this update"
              value="0"
              token="USD"
              sublabel="42,500 USD left undisclosed"
            />
          </div>

          <div className="gvsubmitprojectupdate__field">
            <label className="gvsubmitprojectupdate__label">Reporting</label>
            <p className="gvsubmitprojectupdate__sublabel">
              Bring some light onto how this project is utilizing funds, CSV
              syntax. More about our formatting{" "}
              <a
                href="https://dcl-dao.notion.site/Instructions-for-uploading-your-Grant-s-Financial-Report-13c022162e204a5a9a37f18888ff3a69"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              .
            </p>
            <div className="gvsubmitprojectupdate__csv">
              <div className="gvsubmitprojectupdate__csvgutter">
                {csv.split("\n").map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <textarea
                className="gvsubmitprojectupdate__csvarea"
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                spellCheck={false}
                rows={4}
              />
            </div>
            <div className="gvsubmitprojectupdate__drop">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M12 16V4m0 0L8 8m4-4l4 4M5 17v2a1 1 0 001 1h12a1 1 0 001-1v-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                Drag &amp; drop your CSV here, or <strong>browse</strong>
              </span>
            </div>
          </div>
        </FormSection>

        <div className="gvsubmitprojectupdate__actions">
          <button
            type="button"
            className="gvsubmitprojectupdate__submit"
            disabled={!canSubmit}
          >
            Publish update
          </button>
          <button type="button" className="gvsubmitprojectupdate__preview">
            Preview update
          </button>
        </div>

        {dirty && (
          <div className="gvsubmitprojectupdate__guard" role="status">
            <span className="gvsubmitprojectupdate__guarddot" />
            Unsaved changes — you’ll be asked to confirm before leaving.
          </div>
        )}
      </div>
    </GovernanceChrome>
  );
}
