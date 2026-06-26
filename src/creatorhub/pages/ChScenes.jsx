import { useMemo, useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import ContextMenu from "../../components/ContextMenu.jsx";
import { ChevronDownAlt } from "../../atoms/icons.jsx";
import "./chscenes.css";

const ImportIcon = () => (
  <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
    <path d="M10 1v9M6.5 7l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12.5v1.2A1.3 1.3 0 0 0 4.3 15h11.4a1.3 1.3 0 0 0 1.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);
const TemplateIcon = () => (
  <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
    <rect x="2.5" y="2" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="11.5" y="2" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="2.5" y="9" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="11.5" y="9" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
const ParcelIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M1.5 6h13M1.5 10.5h13M6 1.5v13M10.5 1.5v13" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);
const KebabIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="5" r="1.7" fill="currentColor" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    <circle cx="12" cy="19" r="1.7" fill="currentColor" />
  </svg>
);

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name" },
  { value: "size", label: "Size" },
];

function SortSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];
  return (
    <div className={"chscenes__sort" + (open ? " is-open" : "")}>
      <button
        type="button"
        className="chscenes__sortbtn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current.label}</span>
        <ChevronDownAlt />
      </button>
      {open ? (
        <ul className="chscenes__sortmenu" role="listbox">
          {SORT_OPTIONS.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={"chscenes__sortopt" + (o.value === value ? " is-active" : "")}
              onClick={() => {
                onChange?.(o.value);
                setOpen(false);
              }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function CardMenu({ hasDeployments }) {
  const [open, setOpen] = useState(false);
  const items = [
    { kind: "button", label: "Duplicate" },
    { kind: "button", label: "Open Folder Location" },
    { kind: "button", label: "View Deployments", disabled: !hasDeployments },
    { kind: "separator" },
    { kind: "button", label: "Delete from My Scenes", danger: true },
  ];
  return (
    <div className={"chscenes__cardmenu" + (open ? " is-open" : "")}>
      <button
        type="button"
        className="chscenes__kebab"
        aria-label="Project actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <KebabIcon />
      </button>
      {open ? (
        <div className="chscenes__menuanchor" onClick={(e) => e.stopPropagation()}>
          <ContextMenu items={items} />
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }) {
  const parcels = project.layout.cols * project.layout.rows;
  return (
    <div className="chscenes__card" role="button" tabIndex={0}>
      <div
        className="chscenes__thumb"
        style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})` } : { background: project.grad }}
      />
      {project.published ? (
        <span className="chscenes__badge">Published</span>
      ) : null}
      <div className="chscenes__cardinfo">
        <div className="chscenes__cardtitle">
          <span className="u-truncate">{project.title}</span>
          <CardMenu hasDeployments={project.hasDeployments} />
        </div>
        <div className="chscenes__cardcontent">
          <ParcelIcon />
          {parcels} {parcels === 1 ? "parcel" : "parcels"}
        </div>
      </div>
    </div>
  );
}

function NewSceneTile() {
  return (
    <div className="chscenes__newscene" role="button" tabIndex={0} aria-label="Create a new scene">
      <span className="chscenes__newplus" aria-hidden="true">+</span>
      <span className="chscenes__newlabel">Create Scene</span>
    </div>
  );
}

function NoScenes() {
  return (
    <div className="chscenes__nocontainer">
      <div className="chscenes__nocard">
        <div className="chscenes__notext">
          <h3 className="chscenes__notitle">Create your first scene</h3>
          <span className="chscenes__nodesc">
            Unleash your creativity. Start building scenes for your LANDs and Worlds
            and share with the community.{" "}
            <a
              href="https://docs.decentraland.org/creator/scenes-sdk7/getting-started/sdk-101"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about creating Scenes.
            </a>
          </span>
        </div>
        <div className="chscenes__nobutton" role="button" tabIndex={0} aria-label="Create your first scene">
          <span className="chscenes__newplus" aria-hidden="true">+</span>
          <span className="chscenes__newlabel">Create Scene</span>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    id: "p1",
    path: "/home/me/scenes/neon-night-market",
    title: "Neon Night Market",
    layout: { cols: 2, rows: 2 },
    grad: "linear-gradient(135deg, #ff2d55 0%, #350447 100%)",
    published: true,
    hasDeployments: true,
  },
  {
    id: "p2",
    path: "/home/me/scenes/sky-gallery",
    title: "Sky Gallery",
    layout: { cols: 4, rows: 4 },
    grad: "linear-gradient(135deg, #438fff 0%, #1f0a3a 100%)",
    published: false,
    hasDeployments: true,
  },
  {
    id: "p3",
    path: "/home/me/scenes/forest-puzzle-quest",
    title: "Forest Puzzle Quest",
    layout: { cols: 1, rows: 1 },
    grad: "linear-gradient(135deg, #34ce77 0%, #103a25 100%)",
    published: false,
    hasDeployments: false,
  },
  {
    id: "p4",
    path: "/home/me/scenes/retro-arcade-hall",
    title: "Retro Arcade Hall",
    layout: { cols: 3, rows: 2 },
    grad: "linear-gradient(135deg, #ffc95b 0%, #5a2c00 100%)",
    published: false,
    hasDeployments: false,
  },
  {
    id: "p5",
    path: "/home/me/scenes/midnight-lounge",
    title: "Midnight Lounge",
    layout: { cols: 2, rows: 1 },
    grad: "linear-gradient(135deg, #982de2 0%, #1a0438 100%)",
    published: false,
    hasDeployments: false,
  },
];

export default function ChScenes({ state = "default", projects: provided }) {
  const [sortBy, setSortBy] = useState("newest");
  const isEmpty = state === "empty";
  const isLoading = state === "loading";

  const projects = useMemo(
    () => (isEmpty ? [] : provided && provided.length > 0 ? provided : PROJECTS),
    [isEmpty, provided],
  );

  return (
    <CreatorHubChrome active="scenes">
      <main className="chscenes">
        <div className="chscenes__container">
          {isLoading ? (
            <div className="chscenes__loader">
              <Spinner size={70} />
            </div>
          ) : (
            <div className="chscenes__list-wrap">
              <div className="chscenes__menu">
                <div className="chscenes__header">
                  <h3 className="chscenes__heading">My Scenes</h3>
                  <div className="chscenes__actions">
                    <button type="button" className="chscenes__actionbtn chscenes__actionbtn--secondary">
                      <ImportIcon />
                      Import Scene
                    </button>
                    <button type="button" className="chscenes__actionbtn chscenes__actionbtn--primary">
                      <TemplateIcon />
                      Templates
                    </button>
                  </div>
                </div>

                {projects.length > 0 ? (
                  <div className="chscenes__filters">
                    <div className="chscenes__results">
                      {projects.length} {projects.length === 1 ? "scene" : "scenes"}
                    </div>
                    <div className="chscenes__sortwrap">
                      <p>Sort by</p>
                      <SortSelect value={sortBy} onChange={setSortBy} />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="chscenes__cards">
                {projects.length > 0 ? (
                  <>
                    <NewSceneTile />
                    {projects.map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </>
                ) : (
                  <NoScenes />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </CreatorHubChrome>
  );
}
