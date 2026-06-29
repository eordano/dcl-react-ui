import { useEffect, useMemo, useRef, useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import ChScenesEmptyState from "./ChScenesEmptyState.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import ContextMenu from "../../components/ContextMenu.jsx";
import Dropdown from "../../components/Dropdown.jsx";
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
const SORT_LABELS = SORT_OPTIONS.map((o) => o.label);

function CardMenu({ project, onDuplicateScene, onOpenFolder, onViewDeployments, onDeleteScene }) {
  const [open, setOpen] = useState(false);
  const kebabRef = useRef(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const wrap = kebabRef.current?.closest(".chscenes__cardmenu");
      if (wrap && !wrap.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);
  useEffect(() => {
    if (wasOpen.current && !open) kebabRef.current?.focus();
    wasOpen.current = open;
  }, [open]);
  const run = (fn) => {
    setOpen(false);
    fn?.(project.id);
  };
  const items = [];
  if (onDuplicateScene) {
    items.push({ kind: "button", label: "Duplicate", onClick: () => run(onDuplicateScene) });
  }
  if (onOpenFolder) {
    items.push({ kind: "button", label: "Open Folder Location", onClick: () => run(onOpenFolder) });
  }
  if (onViewDeployments) {
    items.push({ kind: "button", label: "View Deployments", disabled: !project.hasDeployments, onClick: () => run(onViewDeployments) });
  }
  if (onDeleteScene) {
    if (items.length > 0) items.push({ kind: "separator" });
    items.push({ kind: "button", label: "Delete from My Scenes", danger: true, onClick: () => run(onDeleteScene) });
  }
  if (items.length === 0) return null;
  return (
    <div className={"chscenes__cardmenu" + (open ? " is-open" : "")}>
      <button
        ref={kebabRef}
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
          <ContextMenu items={items} onClose={() => setOpen(false)} autoFocus />
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, onSelectScene, onDuplicateScene, onOpenFolder, onViewDeployments, onDeleteScene }) {
  const parcels = project.layout.cols * project.layout.rows;
  const open = () => onSelectScene?.(project.id);
  return (
    <div className="chscenes__card">
      <button type="button" className="chscenes__open" aria-label={`Open ${project.title}`} onClick={open}>
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
          </div>
          <div className="chscenes__cardcontent">
            <ParcelIcon />
            {parcels} {parcels === 1 ? "parcel" : "parcels"}
          </div>
        </div>
      </button>
      <CardMenu
        project={project}
        onDuplicateScene={onDuplicateScene}
        onOpenFolder={onOpenFolder}
        onViewDeployments={onViewDeployments}
        onDeleteScene={onDeleteScene}
      />
    </div>
  );
}

function NewSceneTile({ onCreateScene }) {
  return (
    <button
      type="button"
      className="chscenes__newscene"
      aria-label="Create a new scene"
      onClick={() => onCreateScene?.()}
    >
      <span className="chscenes__newplus" aria-hidden="true">+</span>
      <span className="chscenes__newlabel">Create Scene</span>
    </button>
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

export default function ChScenes({
  state = "default",
  projects: provided,
  demo = false,
  signedIn = false,
  account = "",
  name = "",
  onSignIn =(undefined),
  onSelectScene =(undefined),
  onCreateScene =(undefined),
  onTemplates =(undefined),
  onImport =(undefined),
  onDuplicateScene =(undefined),
  onOpenFolder =(undefined),
  onViewDeployments =(undefined),
  onDeleteScene =(undefined),
}) {
  const [sortBy, setSortBy] = useState("newest");
  const isEmpty = state === "empty";
  const isLoading = state === "loading";

  const projects = useMemo(() => {
    if (isEmpty) return [];
    const list = provided && provided.length > 0 ? provided : demo ? PROJECTS : [];
    const sorted = list.slice();
    if (sortBy === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "size") {
      sorted.sort((a, b) => b.layout.cols * b.layout.rows - a.layout.cols * a.layout.rows);
    }
    return sorted;
  }, [isEmpty, provided, demo, sortBy]);

  if (!isLoading && projects.length === 0) {
    return (
      <ChScenesEmptyState
        signedIn={signedIn}
        account={account}
        name={name}
        onSignIn={onSignIn}
        onCreateScene={onCreateScene}
        onImport={onImport}
        onTemplates={onTemplates}
      />
    );
  }

  return (
    <CreatorHubChrome active="scenes" signedIn={signedIn} account={account} name={name} onSignIn={onSignIn}>
      <section className="chscenes">
        <div className="chscenes__container">
          {isLoading ? (
            <div className="chscenes__loader">
              <Spinner size={70} />
            </div>
          ) : (
            <div className="chscenes__list-wrap">
              <div className="chscenes__menu">
                <div className="chscenes__header">
                  <h1 className="chscenes__heading">My Scenes</h1>
                  <div className="chscenes__actions">
                    <button
                      type="button"
                      className="chscenes__actionbtn chscenes__actionbtn--secondary"
                      onClick={() => onImport?.()}
                    >
                      <ImportIcon />
                      Import Scene
                    </button>
                    <button
                      type="button"
                      className="chscenes__actionbtn chscenes__actionbtn--primary"
                      onClick={() => onTemplates?.()}
                    >
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
                      <Dropdown
                        options={SORT_LABELS}
                        value={(SORT_OPTIONS.find((o) => o.value === sortBy) ?? SORT_OPTIONS[0]).label}
                        onChange={(label) => {
                          const opt = SORT_OPTIONS.find((o) => o.label === label);
                          if (opt) setSortBy(opt.value);
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="chscenes__cards">
                <NewSceneTile onCreateScene={onCreateScene} />
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onSelectScene={onSelectScene}
                    onDuplicateScene={onDuplicateScene}
                    onOpenFolder={onOpenFolder}
                    onViewDeployments={onViewDeployments}
                    onDeleteScene={onDeleteScene}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </CreatorHubChrome>
  );
}
