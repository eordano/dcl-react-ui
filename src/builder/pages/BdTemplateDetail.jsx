import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import { Close } from "../../atoms/icons.jsx";
import "./bdtemplatedetail.css";

const COPY = {
  back_to_scenes: "Back to scenes",
  creator: "Creator",
  description: "Description",
  select_template: "Select Template",
  download_scene: "Download Scene",
  scene_details: "Scene Details",
  built_for_world: "Built for World",
  personalize_it_yourself: "Personalize it yourself",
  clone_title: "Set a name and a description for your scene",
  clone_name_label: "Name",
  clone_name_max: "The name can be 32 characters at most",
  clone_desc_label: "Description",
  clone_desc_placeholder: "Some description...",
  next: "next",
};

const TEMPLATE = {
  id: "tpl-genesis-plaza",
  title: "Genesis Plaza",
  description:
    "A welcoming social hub scene with teleport portals, a central fountain, ambient music and seating — a polished starting point you can personalize into your own community space.",
  thumbnail:
    "linear-gradient(135deg, #438fff 0%, #350447 60%, #982de2 100%)",
  layout: { rows: 2, cols: 2 },
};

const BackCircleGlyph = () => (
  <svg viewBox="0 0 24 24" width="27" height="27" aria-hidden="true">
    <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M11 8l-4 4 4 4M7 12h9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DclLogo = () => (
  <span className="bdtpl__logo" aria-hidden="true">
    <svg viewBox="0 0 100 100" width="47" height="47">
      <defs>
        <linearGradient id="bdtpl-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff2d55" />
          <stop offset="100%" stopColor="#ffbc5b" />
        </linearGradient>
      </defs>
      <path d="M14 78 L62 30 A 28 28 0 0 1 86 78 Z" fill="url(#bdtpl-logo-grad)" />
      <path d="M2 90 L40 52 A 24 24 0 0 1 64 90 Z" fill="#ff2d55" opacity="0.92" />
    </svg>
  </span>
);

const WorldGlyph = () => (
  <svg className="bdtpl__lineicon" viewBox="0 0 24 25" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="12.5" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <ellipse cx="12" cy="12.5" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3.5 9.5h17M3.5 15.5h17" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ParcelsGlyph = () => (
  <svg className="bdtpl__lineicon" viewBox="0 0 12 12" width="18" height="18" aria-hidden="true">
    <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" />
    <rect x="6.5" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" />
    <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
    <rect x="1" y="6.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
  </svg>
);

const PersonalizeGlyph = () => (
  <svg className="bdtpl__lineicon" viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <path d="M9 2 L15 13 H3 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5 9 H13M6.6 6 H11.4M3.5 13 H14.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 14.5 H10 V16 H8 Z" fill="currentColor" />
  </svg>
);

const CodeGlyph = () => (
  <svg className="bdtpl__lineicon" viewBox="0 0 24 25" width="20" height="20" aria-hidden="true">
    <path
      d="M8 8l-4 4.5 4 4.5M16 8l4 4.5-4 4.5M13.5 6l-3 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function CloneTemplateModal({ template, loading = false, onClose }) {
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState("");

  return (
    <div className="bdtpl__backdrop" onClick={loading ? undefined : onClose}>
      <div
        className={"bdtpl__modal" + (loading ? " is-disabled" : "")}
        role="dialog"
        aria-modal="true"
        aria-label={COPY.clone_title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bdtpl__modalnav">
          <h2 className="bdtpl__modaltitle">{COPY.clone_title}</h2>
          <button
            type="button"
            className="bdtpl__modalclose"
            aria-label="Close"
            disabled={loading}
            onClick={onClose}
          >
            <Close size={18} />
          </button>
        </header>

        <div className="bdtpl__modalcontent">
          <label className="bdtpl__field">
            <span className="bdtpl__fieldlabel">{COPY.clone_name_label}</span>
            <input
              className="bdtpl__input"
              value={title}
              maxLength={32}
              placeholder="New scene"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="bdtpl__fieldmsg">{COPY.clone_name_max}</span>
          </label>

          <label className="bdtpl__field">
            <span className="bdtpl__fieldlabel">{COPY.clone_desc_label}</span>
            <textarea
              className="bdtpl__textarea"
              rows={5}
              value={description}
              placeholder={COPY.clone_desc_placeholder}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <footer className="bdtpl__modalactions">
          <button
            type="button"
            className={"bdtpl__btn bdtpl__btn--primary bdtpl__nextbtn" + (loading ? " is-loading" : "")}
            disabled={loading}
          >
            {loading ? <Spinner size={18} /> : COPY.next}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default function BdTemplateDetail({
  template = TEMPLATE,
  sdk6 = false,
  loading = false,
  cloneOpen = false,
  cloneLoading = false,
}) {
  const [tab, setTab] = useState("scenes");
  const [modal, setModal] = useState(cloneOpen);

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdtpl bdtpl--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdtpl">
        <div className="bdtpl__container">
          <section className="bdtpl__section bdtpl__section--large">
            <div className="bdtpl__titlecontainer">
              <button
                type="button"
                className="bdtpl__backbtn"
                aria-label={COPY.back_to_scenes}
              >
                <BackCircleGlyph />
              </button>
              <h1 className="bdtpl__name">{template.title}</h1>
            </div>
          </section>

          <section className="bdtpl__section">
            <div
              className="bdtpl__headerimage"
              style={{ backgroundImage: template.thumbnail }}
            />
          </section>

          <section className="bdtpl__section">
            <div className="bdtpl__content bdtpl__infocontainer">
              <div className="bdtpl__col bdtpl__creator">
                <h3 className="bdtpl__header">{COPY.creator}</h3>
                <p className="bdtpl__descriptioncontent bdtpl__creatorline">
                  <DclLogo />
                  <span>
                    Decentraland
                    <br />
                    Foundation
                  </span>
                </p>
              </div>

              <div className="bdtpl__col bdtpl__description">
                <h3 className="bdtpl__header">{COPY.description}</h3>
                <p className="bdtpl__descriptioncontent">{template.description}</p>
              </div>

              <div className="bdtpl__col bdtpl__actions">
                <button
                  type="button"
                  className="bdtpl__btn bdtpl__btn--primary bdtpl__selectbtn"
                  onClick={() => setModal(true)}
                >
                  {COPY.select_template}
                </button>
                <button
                  type="button"
                  className="bdtpl__btn bdtpl__btn--download bdtpl__downloadbtn"
                >
                  {COPY.download_scene}
                </button>
              </div>
            </div>

            <div className="bdtpl__content">
              <div className="bdtpl__col bdtpl__scenedetails">
                <h3 className="bdtpl__header">{COPY.scene_details}</h3>
                <p className="bdtpl__descriptioncontent bdtpl__world">
                  <WorldGlyph />
                  {COPY.built_for_world}
                </p>
                <p className="bdtpl__descriptioncontent bdtpl__sizescene">
                  <ParcelsGlyph />
                  {template.layout.rows} x {template.layout.cols} parcels
                </p>
                <p className="bdtpl__descriptioncontent bdtpl__personalize">
                  <PersonalizeGlyph />
                  {COPY.personalize_it_yourself}
                </p>
                <p className="bdtpl__descriptioncontent bdtpl__sdk">
                  <CodeGlyph />
                  {sdk6 ? "SDK 6" : "SDK 7"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {modal ? (
        <CloneTemplateModal
          template={template}
          loading={cloneLoading}
          onClose={() => setModal(false)}
        />
      ) : null}
    </BuilderChrome>
  );
}

export { TEMPLATE, COPY };
