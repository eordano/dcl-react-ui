import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvsubmitpoll.css";

const COPY = {
  title: "Create a community poll",
  description_p1:
    "The purpose of the Poll is to introduce a governance issue to the community, gauge community sentiment, and determine if there is enough support to move forward with the drafting of an initial proposal. Polls can only pass to the Draft stage if they have accumulated a threshold of at least 500K VP",
  description_p2_pre: "This action requires at least 100 VP. ",
  title_label: "Title",
  title_detail: "The question you would like to ask the community.",
  title_placeholder: "Enter your question here",
  description_label: "Description",
  description_detail:
    "A brief description of your question. Feel free to explain your motivation for polling the community, elaborate on the optional responses, or link to any relevant resources that might help inform voters.",
  description_placeholder: "A brief description of your question.",
  choices_label: "Options",
  choices_add: "Add option",
  mandatory_option: "This option is mandatory, and can't be removed",
  invalid_options: "Invalid question/options",
  markdown_tooltip: "(markdown)",
  markdown_notice:
    "You can format your proposal using markdown! Toggle the preview switch to see how your post will be displayed.",
  preview_button: "Preview",
  edit_button: "Edit",
  co_author_label: "Co-authors",
  optional_tooltip: "(optional)",
  co_author_description:
    "If you co-authored this proposal with someone else, you can add their wallet addresses to acknowledge their work. After you publish the proposal, co-authors will be asked to confirm or reject the request. Only if they confirm, they will be listed publicly on the proposal page.",
  co_author_placeholder: "Add co-authors",
  button_submit: "Submit proposal",
  vp_not_met:
    "You don't meet the Voting Power requirement to submit this poll. You need at least 100 VP.",
};

const LIMITS = { title: 80, description: 7000, choice: 100 };

const counter = (current, limit) => `(${current} out of ${limit} characters)`;

const XGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);
const LockGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3.5" y="7" width="9" height="6.5" rx="1.4" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
  </svg>
);
const MdMark = ({ d, fill }) => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d={d} fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MD_TOOLBAR = [
  { k: "bold", d: "M5 3h4.2a2.4 2.4 0 0 1 0 4.8H5zM5 7.8h4.8a2.6 2.6 0 0 1 0 5.2H5z" },
  { k: "italic", d: "M7 3h5M4 13h5M10 3 6 13" },
  { k: "link", d: "M6.5 9.5 9.5 6.5M7 11l-1.5 1.5a2.5 2.5 0 0 1-3.5-3.5L3.5 7.5M9 5l1.5-1.5a2.5 2.5 0 0 1 3.5 3.5L12.5 8.5" },
  { k: "list", d: "M6 4.5h7M6 8h7M6 11.5h7M3 4.5h.01M3 8h.01M3 11.5h.01" },
  { k: "quote", d: "M4 5h3v4H4zM9 5h3v4H9zM4 9c0 2-1 2.5-2 3M9 9c0 2-1 2.5-2 3" },
  { k: "code", d: "M6 4 2.5 8 6 12M10 4l3.5 4-3.5 4" },
];

function CharCounter({ current, limit, error }) {
  return (
    <p className={"gvsubmitpoll__message" + (error ? " is-error" : "")}>
      {error ? error + " " : ""}
      {counter(current, limit)}
    </p>
  );
}

function MarkdownField({ value, onChange, placeholder, disabled }) {
  const [mode, setMode] = useState("edit");
  return (
    <div className={"gvsubmitpoll__md" + (disabled ? " is-disabled" : "")}>
      <div className="gvsubmitpoll__mdtoolbar" role="toolbar" aria-label="Markdown commands">
        <div className="gvsubmitpoll__mdcmds">
          {MD_TOOLBAR.map((c) => (
            <button key={c.k} type="button" className="gvsubmitpoll__mdcmd" aria-label={c.k} tabIndex={-1} disabled={disabled}>
              <MdMark d={c.d} fill={c.k === "bold"} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="gvsubmitpoll__mdtoggle"
          onClick={() => setMode((m) => (m === "edit" ? "preview" : "edit"))}
          disabled={disabled}
          tabIndex={-1}
        >
          {mode === "edit" ? COPY.preview_button : COPY.edit_button}
        </button>
      </div>
      {mode === "edit" ? (
        <textarea
          className="gvsubmitpoll__mdarea"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <div className="gvsubmitpoll__mdpreview">{value || placeholder}</div>
      )}
    </div>
  );
}

export default function GvSubmitPoll({
  account = "0x9f3c…7a21",
  vpMet = true,
  loggedIn = true,
}) {
  const [tab, setTab] = useState("proposals");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState({ 0: "", 1: "" });

  const disabled = !vpMet;

  const choiceKeys = useMemo(() => Object.keys(choices).sort((a, b) => Number(a) - Number(b)), [choices]);

  const addOption = () => setChoices((c) => ({ ...c, [Date.now()]: "" }));
  const editOption = (k, v) => setChoices((c) => ({ ...c, [k]: v }));
  const removeOption = (k) =>
    setChoices((c) => {
      const next = { ...c };
      delete next[k];
      if (Object.keys(next).length < 2) next[Date.now()] = "";
      return next;
    });

  if (!loggedIn) {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account={account}>
        <div className="gvsubmitpoll gvsubmitpoll--gate">
          <div className="gvsubmitpoll__login">
            <h1 className="gvsubmitpoll__h1">{COPY.title}</h1>
            <p className="gvsubmitpoll__loginsub">{COPY.description_p1}</p>
            <button type="button" className="gvsubmitpoll__connect">Connect your wallet</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab} account={account}>
      <div className="gvsubmitpoll">
        <form className="gvsubmitpoll__form" onSubmit={(e) => e.preventDefault()}>
          <section className="gvsubmitpoll__section">
            <h1 className="gvsubmitpoll__h1">{COPY.title}</h1>
          </section>
          <section className="gvsubmitpoll__section">
            <p className="gvsubmitpoll__intro">
              {COPY.description_p1}
            </p>
            <p className="gvsubmitpoll__intro">
              {COPY.description_p2_pre}
              <a className="gvsubmitpoll__link" href="https://account.decentraland.org/">Buy MANA</a>
              {" to get VP, or "}
              <a className="gvsubmitpoll__link" href="https://forum.decentraland.org/t/open-call-for-delegates-apply-now/5840/5">run for delegate</a>
              {"."}
            </p>
          </section>

          <section className="gvsubmitpoll__section">
            <label className="gvsubmitpoll__label" htmlFor="poll-title">{COPY.title_label}</label>
            <p className="gvsubmitpoll__sublabel">{COPY.title_detail}</p>
            <input
              id="poll-title"
              className="gvsubmitpoll__input"
              type="text"
              placeholder={COPY.title_placeholder}
              value={title}
              maxLength={LIMITS.title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
            <CharCounter current={title.length} limit={LIMITS.title} />
          </section>

          <section className="gvsubmitpoll__section">
            <label className="gvsubmitpoll__label">
              {COPY.description_label}
              <sup className="gvsubmitpoll__notice" title={COPY.markdown_notice}>{COPY.markdown_tooltip}</sup>
            </label>
            <p className="gvsubmitpoll__sublabel">{COPY.description_detail}</p>
            <MarkdownField
              value={description}
              onChange={setDescription}
              placeholder={COPY.description_placeholder}
              disabled={disabled}
            />
            <CharCounter current={description.length} limit={LIMITS.description} />
          </section>

          <section className="gvsubmitpoll__section">
            <label className="gvsubmitpoll__label">{COPY.choices_label}</label>
            <div className="gvsubmitpoll__options">
              {choiceKeys.map((k, i) => (
                <div key={k} className="gvsubmitpoll__option">
                  <input
                    className="gvsubmitpoll__optinput"
                    type="text"
                    placeholder={"choice " + (i + 1)}
                    value={choices[k]}
                    maxLength={LIMITS.choice}
                    onChange={(e) => editOption(k, e.target.value)}
                    disabled={disabled}
                  />
                  <button
                    type="button"
                    className="gvsubmitpoll__optaction"
                    aria-label="Remove option"
                    onClick={() => removeOption(k)}
                    disabled={disabled}
                  >
                    <XGlyph />
                  </button>
                </div>
              ))}
              <div className="gvsubmitpoll__option is-locked">
                <input className="gvsubmitpoll__optinput" type="text" readOnly value={COPY.invalid_options} />
                <span className="gvsubmitpoll__optaction is-locked" title={COPY.mandatory_option}>
                  <LockGlyph />
                </span>
              </div>
              <button type="button" className="gvsubmitpoll__addoption" onClick={addOption} disabled={disabled}>
                {COPY.choices_add}
              </button>
            </div>
          </section>

          <section className="gvsubmitpoll__section">
            <div className="gvsubmitpoll__labelrow">
              <label className="gvsubmitpoll__label">{COPY.co_author_label}</label>
              <sup className="gvsubmitpoll__optional">{COPY.optional_tooltip}</sup>
            </div>
            <p className="gvsubmitpoll__sublabel">{COPY.co_author_description}</p>
            <div className="gvsubmitpoll__coauthors">
              <input
                className="gvsubmitpoll__input"
                type="text"
                placeholder={COPY.co_author_placeholder}
                disabled={disabled}
              />
            </div>
          </section>

          <section className="gvsubmitpoll__section">
            <button type="submit" className="gvsubmitpoll__submit" disabled={disabled}>
              {COPY.button_submit}
            </button>
          </section>

          {!vpMet && (
            <section className="gvsubmitpoll__section">
              <p className="gvsubmitpoll__vpnotice">{COPY.vp_not_met}</p>
            </section>
          )}
        </form>
      </div>
    </GovernanceChrome>
  );
}
