import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdtemplateslist.css";

const ACTIVE = "active";
const COMING_SOON = "coming_soon";

const TEMPLATES = [
  {
    id: "t1",
    title: "Empty Scene",
    description:
      "A blank canvas ready for you to start building from scratch with no preset assets.",
    layout: { rows: 1, cols: 1 },
    templateStatus: ACTIVE,
    hue: 212,
  },
  {
    id: "t2",
    title: "Art Gallery",
    description:
      "A minimal gallery space with framed picture spots — perfect for showcasing NFTs and artwork.",
    layout: { rows: 2, cols: 2 },
    templateStatus: ACTIVE,
    hue: 268,
  },
  {
    id: "t3",
    title: "Conference Hall",
    description:
      "A large auditorium with a stage, seating and screens, ideal for talks, panels and live events.",
    layout: { rows: 3, cols: 3 },
    templateStatus: ACTIVE,
    hue: 152,
  },
  {
    id: "t4",
    title: "Music Venue",
    description:
      "A nightclub-style venue with a DJ booth, dance floor and dynamic lighting for live streaming.",
    layout: { rows: 2, cols: 3 },
    templateStatus: ACTIVE,
    hue: 332,
  },
  {
    id: "t5",
    title: "Retail Store",
    description:
      "A storefront layout with product shelves and checkout areas to sell wearables and items.",
    layout: { rows: 2, cols: 2 },
    templateStatus: COMING_SOON,
    hue: 24,
  },
  {
    id: "t6",
    title: "Game Arena",
    description:
      "An interactive arena scaffold with obstacles and spawn points for building mini-games.",
    layout: { rows: 4, cols: 4 },
    templateStatus: COMING_SOON,
    hue: 192,
  },
];

const ParcelIcon = () => (
  <svg
    className="bdtemplateslist__metaicon"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path
      d="M8 1.5l6 3.25v6.5L8 14.5 2 11.25v-6.5L8 1.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M2 4.75L8 8l6-3.25M8 8v6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="27" height="27" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13 8l-4 4 4 4M9 12h7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function SceneCard({ template }) {
  const disabled = template.templateStatus !== ACTIVE;
  const parcels = template.layout.rows * template.layout.cols;
  return (
    <button
      type="button"
      className={"bdtemplateslist__card" + (disabled ? " is-disabled" : "")}
      disabled={disabled}
      aria-label={template.title}
    >
      <div className="bdtemplateslist__media">
        <div
          className="bdtemplateslist__thumb"
          style={{
            background: `linear-gradient(135deg, hsl(${template.hue} 58% 42%), hsl(${(template.hue + 45) % 360} 52% 26%))`,
          }}
        />
      </div>
      <div className="bdtemplateslist__cardinfo">
        <div className="bdtemplateslist__description">
          <div className="bdtemplateslist__descinfo">
            <span className="bdtemplateslist__title u-truncate">{template.title}</span>
            <span className="bdtemplateslist__subtitle">
              <ParcelIcon />
              {parcels} parcels
            </span>
          </div>
          {disabled ? (
            <span className="bdtemplateslist__badge">Coming soon</span>
          ) : null}
        </div>
        <span className="bdtemplateslist__info">{template.description}</span>
      </div>
    </button>
  );
}

export default function BdTemplatesList({ templates = TEMPLATES, loading = false }) {
  const [tab, setTab] = useState("scenes");

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdtemplateslist bdtemplateslist--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdtemplateslist ScenesPage">
        <div className="bdtemplateslist__container">
          <div className="bdtemplateslist__titlebar">
            <button
              type="button"
              className="bdtemplateslist__back"
              aria-label="Back to scenes"
            >
              <BackIcon />
            </button>
            <h2 className="bdtemplateslist__h2">Choose a template</h2>
          </div>

          <div className="bdtemplateslist__templates">
            {templates.map((template) => (
              <SceneCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}
