import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import SectionIcon from "../../explorer/atoms/SectionIcon.jsx";
import "./gveditprojectupdate.css";

const HEALTHS = [
  { id: "onTrack", label: "On Track" },
  { id: "atRisk", label: "At Risk" },
  { id: "offTrack", label: "Off Track" },
];

const GENERAL_FIELDS = [
  {
    id: "introduction",
    label: "Introduction",
    max: 750,
    required: true,
    minHeight: 77,
  },
  {
    id: "highlights",
    label: "Highlights",
    max: 750,
    required: true,
    minHeight: 150,
  },
  {
    id: "blockers",
    label: "Blockers",
    max: 750,
    required: true,
    minHeight: 150,
  },
  {
    id: "next_steps",
    label: "Next Steps",
    max: 750,
    required: true,
    minHeight: 150,
  },
  {
    id: "additional_notes",
    label: "Additional notes and links",
    max: 750,
    required: false,
    minHeight: 150,
  },
];

const PREFILLED = {
  health: "onTrack",
  introduction:
    "This second-quarter update covers the milestones we shipped for the in-world events SDK, the blockers we hit on the comms relay, and where the team is heading next.",
  highlights:
    "- Shipped the events SDK v2 with on-chain RSVP\n- Migrated 12 community scenes to the new event hooks\n- Cut average scene load time by 31%",
  blockers:
    "The comms relay rollout is delayed two weeks while we wait on the Catalyst infra upgrade. Mitigation: we are running a temporary relay on our own node so testing is not blocked.",
  next_steps:
    "Finish the relay migration, open the SDK v2 docs to the community, and begin the accessibility audit ahead of the public beta.",
  additional_notes:
    "Demo recording and the full changelog are linked in the project README.",
  financial_records: [
    {
      category: "Engineering",
      description: "Backend contractor — June",
      token: "USDC",
      amount: 6500,
      receiver: "0x7c…a4e1",
      link: "https://etherscan.io/tx/0xabc",
    },
    {
      category: "Design",
      description: "UI/UX retainer",
      token: "USDC",
      amount: 3200,
      receiver: "0x12…9f0c",
      link: "https://etherscan.io/tx/0xdef",
    },
    {
      category: "Infrastructure",
      description: "Relay node hosting",
      token: "USDC",
      amount: 1450,
      receiver: "0xab…77d3",
      link: "https://etherscan.io/tx/0x123",
    },
  ],
};

const CSV_HEADER = ["category", "description", "token", "amount", "receiver", "link"];

const CURRENCY = (n) =>
  "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });

function ProjectRequestSection({ n, title, isNew, validated, children }) {
  return (
    <section className="gpu__section">
      <div className="gpu__sectionhead">
        <SectionIcon n={n} validated={validated} className="gpu__sicon" />
        <div className="gpu__sectiontitle">
          {title}
          {isNew && <span className="gpu__newbadge">New</span>}
        </div>
        <div className="gpu__sectionrule" />
      </div>
      <div className="gpu__sectionbody">{children}</div>
    </section>
  );
}

const IncomeArrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L1.70711 0.292893ZM13 14C13.5523 14 14 13.5523 14 13L14 4C14 3.44771 13.5523 3 13 3C12.4477 3 12 3.44771 12 4L12 12L4 12C3.44771 12 3 12.4477 3 13C3 13.5523 3.44771 14 4 14L13 14ZM0.292893 1.70711L12.2929 13.7071L13.7071 12.2929L1.70711 0.292893L0.292893 1.70711Z"
      fill="white"
    />
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.25562 15.0001C9.87319 16.7482 11.5402 18.0007 13.4998 18.0007C15.9851 18.0007 17.9998 15.986 17.9998 13.5007C17.9998 11.5415 16.7476 9.87463 14.9999 9.25684V11.5007C15.6071 11.9568 15.9998 12.6829 15.9998 13.5007C15.9998 14.8814 14.8805 16.0007 13.4998 16.0007C12.6816 16.0007 11.9552 15.6077 11.4991 15.0001H9.25562Z"
      fill="white"
    />
  </svg>
);
const OutcomeArrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M4.03703 12.2929C3.64651 12.6834 3.64651 13.3166 4.03703 13.7071C4.42756 14.0976 5.06072 14.0976 5.45125 13.7071L4.03703 12.2929ZM17.7441 1C17.7441 0.447716 17.2964 4.87118e-07 16.7441 2.34237e-07L7.74414 1.03503e-06C7.19186 6.97852e-07 6.74414 0.447716 6.74414 1C6.74414 1.55229 7.19186 2 7.74414 2L15.7441 2L15.7441 10C15.7441 10.5523 16.1919 11 16.7441 11C17.2964 11 17.7441 10.5523 17.7441 10L17.7441 1ZM5.45125 13.7071L17.4512 1.70711L16.037 0.292894L4.03703 12.2929L5.45125 13.7071Z"
      fill="white"
    />
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.27669 9.06776C5.02438 9.02386 4.76486 9.00098 4.5 9.00098C2.01472 9.00098 -8.80661e-08 11.0157 -1.96701e-07 13.501C-3.05336e-07 15.9863 2.01472 18.001 4.5 18.001C6.98528 18.001 9 15.9863 9 13.501C9 13.1153 8.95148 12.741 8.86022 12.3837L6.82679 14.4172C6.4613 15.3446 5.5573 16.001 4.5 16.001C3.11929 16.001 2 14.8817 2 13.501C2 12.6828 2.39304 11.9564 3.00061 11.5003L3.00061 11.4997L5.27669 9.06776Z"
      fill="white"
    />
  </svg>
);

function FinancialCard({ type, title, value, subtitle }) {
  return (
    <div className="gpu__fcard">
      <span className="gpu__fcardtitle">{title}</span>
      <div className="gpu__fcardvalue">
        {type === "income" ? <IncomeArrow /> : <OutcomeArrow />}
        <span className="gpu__fcardnum">{value}</span>
      </div>
      {subtitle && <span className="gpu__fcardsub">{subtitle}</span>}
    </div>
  );
}

function EditUpdateModal({ open, loading, onClose, onAccept }) {
  if (!open) return null;
  return (
    <div className="gpu__scrim" onClick={onClose}>
      <div
        className="gpu__modal"
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="gpu__modalclose" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="gpu__modaltitle">Are you sure you want to edit this update?</h2>
        <p className="gpu__modaldesc">
          Saving this update will update any previously published content with this new edit.
        </p>
        <div className="gpu__modalactions">
          <button type="button" className="gpu__btn gpu__btn--basic" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={"gpu__btn gpu__btn--primary" + (loading ? " is-loading" : "")}
            disabled={loading}
            onClick={onAccept}
          >
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GvEditProjectUpdate({ update = PREFILLED }) {
  const [tab, setTab] = useState("projects");
  const [health, setHealth] = useState(update.health);
  const [fields, setFields] = useState(() => ({
    introduction: update.introduction || "",
    highlights: update.highlights || "",
    blockers: update.blockers || "",
    next_steps: update.next_steps || "",
    additional_notes: update.additional_notes || "",
  }));
  const [csv, setCsv] = useState(() => {
    const recs = update.financial_records || [];
    const lines = [CSV_HEADER.join(",")];
    for (const r of recs) {
      lines.push(CSV_HEADER.map((k) => r[k] ?? "").join(","));
    }
    return lines.join("\n");
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const setField = (id, value) => setFields((f) => ({ ...f, [id]: value }));

  const disclosed = useMemo(
    () => (update.financial_records || []).reduce((s, r) => s + (Number(r.amount) || 0), 0),
    [update.financial_records]
  );

  const onSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setModalOpen(false);
    }, 900);
  };

  return (
    <GovernanceChrome active={tab} onTab={setTab}>
      <div className="gpu">
        <div className="gpu__inner">
          <header className="gpu__header">
            <h1 className="gpu__h1">Publish New Grant Update</h1>
            <p className="gpu__sub">
              Share your grant updates with the Decentraland Community. Use this
              space to talk about the progress but also to raise issues or
              blockers you might have with your project. Feel free to add any
              relevant information or links to demo what you’ve been up to.
            </p>
          </header>

          <ProjectRequestSection n={1} title="General" validated>
            <div className="gpu__field">
              <label className="gpu__label">Project Health</label>
              <div className="gpu__healthrow">
                {HEALTHS.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={
                      "gpu__health" + (health === h.id ? " gpu__health--" + h.id : "")
                    }
                    onClick={() => setHealth(h.id)}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {GENERAL_FIELDS.map((f) => {
              const value = fields[f.id];
              return (
                <div className="gpu__field" key={f.id}>
                  <label className="gpu__label">{f.label}</label>
                  <div className="gpu__editor">
                    <div className="gpu__editortoolbar">
                      <span className="gpu__tbicon" title="Bold">B</span>
                      <span className="gpu__tbicon gpu__tbicon--italic" title="Italic">I</span>
                      <span className="gpu__tbicon" title="Link">🔗</span>
                      <span className="gpu__tbicon" title="List">≣</span>
                      <span className="gpu__tbspacer" />
                      <span className="gpu__tbtext">Preview</span>
                    </div>
                    <textarea
                      className="gpu__textarea"
                      value={value}
                      onChange={(e) => setField(f.id, e.target.value)}
                      style={{ minHeight: f.minHeight }}
                    />
                  </div>
                  <div className="gpu__message">
                    ({(value || "").length} out of {f.max} characters)
                  </div>
                </div>
              );
            })}
          </ProjectRequestSection>

          <ProjectRequestSection n={2} title="Financials" isNew validated>
            <div className="gpu__field">
              <div className="gpu__fcards">
                <FinancialCard
                  type="income"
                  title="Funds released since last update"
                  value={CURRENCY(11150)}
                  subtitle="3 tx. last one made Jun 12, 2026"
                />
                <FinancialCard
                  type="outcome"
                  title="Funds disclosed this update"
                  value={CURRENCY(disclosed)}
                  subtitle={CURRENCY(0) + " left undisclosed"}
                />
              </div>
            </div>

            <div className="gpu__field">
              <label className="gpu__label">Reporting</label>
              <p className="gpu__reportsub">
                Bring some light onto how this project is utilizing funds, CSV
                syntax. More about our formatting{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  here
                </a>
                .
              </p>
              <div className="gpu__csv">
                <div className="gpu__csvgutter" aria-hidden="true">
                  {csv.split("\n").map((_, i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
                <textarea
                  className="gpu__csvinput"
                  value={csv}
                  onChange={(e) => setCsv(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="gpu__dropzone">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span>
                  Drag and drop a CSV file or{" "}
                  <span className="gpu__droplink">choose a file</span>.
                </span>
              </div>
            </div>

            <div className="gpu__field">
              <label className="gpu__label">Summary</label>
              <div className="gpu__summary">
                <div className="gpu__summaryhead">
                  <span>Category</span>
                  <span>Description</span>
                  <span>Token</span>
                  <span className="gpu__num">Amount</span>
                </div>
                {(update.financial_records || []).map((r, i) => (
                  <div className="gpu__summaryrow" key={i}>
                    <span className="gpu__cat">{r.category}</span>
                    <span className="gpu__desc">{r.description}</span>
                    <span className="gpu__token">{r.token}</span>
                    <span className="gpu__num">{CURRENCY(r.amount)}</span>
                  </div>
                ))}
                <div className="gpu__summarytotal">
                  <span>Total disclosed</span>
                  <span className="gpu__num">{CURRENCY(disclosed)}</span>
                </div>
              </div>
            </div>
          </ProjectRequestSection>

          <div className="gpu__actions">
            <button
              type="button"
              className="gpu__btn gpu__btn--primary"
              onClick={() => setModalOpen(true)}
            >
              Publish update
            </button>
            <button type="button" className="gpu__btn gpu__btn--basic">
              Preview update
            </button>
          </div>
        </div>
      </div>

      <EditUpdateModal
        open={modalOpen}
        loading={saving}
        onClose={() => setModalOpen(false)}
        onAccept={onSave}
      />
    </GovernanceChrome>
  );
}
