import { useCallback, useMemo, useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import { ChevronLeft, ChevronDownAlt, Close } from "../../atoms/icons.jsx";
import "./chtemplates.css";

const Difficulty = { EASY: "Easy", INTERMEDIATE: "Intermediate", HARD: "Hard" };
const SortBy = { DEFAULT: "Default", NEWEST: "Newest" };

const ThreeDots = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="5" r="1.7" fill="currentColor" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    <circle cx="12" cy="19" r="1.7" fill="currentColor" />
  </svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2.5h7A1.5 1.5 0 0 1 19 9v8.5A1.5 1.5 0 0 1 17.5 19h-13A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);

function Filters({ value, onClick }) {
  const handleClick = (d) => () => onClick(d === value ? undefined : d);
  const chips = [
    [Difficulty.EASY, "Easy"],
    [Difficulty.INTERMEDIATE, "Medium"],
    [Difficulty.HARD, "Hard"],
  ];
  return (
    <div className="chtpl__filterby">
      <span className="chtpl__filterlabel">Filter by</span>
      {chips.map(([d, label]) => (
        <button
          key={d}
          type="button"
          className={"chtpl__chip chtpl__chip--clickable" + (value === d ? " is-filled" : "")}
          onClick={handleClick(d)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Sort({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = [
    [SortBy.DEFAULT, "Default"],
    [SortBy.NEWEST, "Newest"],
  ];
  return (
    <>
      <p className="chtpl__sortlabel">Sort by:</p>
      <div className="chtpl__select">
        <button
          type="button"
          className={"chtpl__selecttrigger" + (open ? " is-open" : "")}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="chtpl__selectval">{value}</span>
          <ChevronDownAlt />
        </button>
        {open && (
          <div className="chtpl__selectmenu" role="listbox">
            {options.map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="option"
                aria-selected={v === value}
                className={"chtpl__sortitem" + (v === value ? " is-selected" : "")}
                onClick={() => {
                  onChange(v);
                  setOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ProjectCard({ title, description, thumb, tags, dropdownOptions, onClick, isNewScene }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="chtpl__card" onClick={onClick}>
      <div
        className={"chtpl__thumb" + (isNewScene ? " chtpl__thumb--newscene" : "")}
        style={thumb ? { backgroundImage: thumb } : undefined}
      />
      <div className="chtpl__info">
        <div className="chtpl__cardtitle">
          <span className="chtpl__cardtitletext u-truncate">{title}</span>
          {dropdownOptions?.length ? (
            <div className="chtpl__menu">
              <button
                type="button"
                className="chtpl__iconbtn"
                aria-label="options"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((o) => !o);
                }}
              >
                <ThreeDots />
              </button>
              {menuOpen && (
                <div className="chtpl__dropdown" role="menu">
                  {dropdownOptions.map((opt) => (
                    <button
                      key={opt.text}
                      type="button"
                      role="menuitem"
                      className="chtpl__dropitem"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        opt.handler?.();
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
        {description ? <p className="chtpl__desc">{description}</p> : null}
        {tags?.length ? (
          <div className="chtpl__tags">
            {tags.map((tag) => (
              <span key={tag} className="chtpl__chip chtpl__chip--tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CreateProjectModal({ value, onClose }) {
  return (
    <div className="chtpl__backdrop" onClick={onClose}>
      <div className="chtpl__modal" role="dialog" aria-modal="true" aria-label="Create Project" onClick={(e) => e.stopPropagation()}>
        <header className="chtpl__modalhead">
          <h2 className="chtpl__modaltitle">Create Project</h2>
          <button type="button" className="chtpl__iconbtn chtpl__modalclose" aria-label="close" onClick={onClose}>
            <Close size={20} />
          </button>
        </header>
        <div className="chtpl__modalbody">
          <label className="chtpl__field">
            <span className="chtpl__fieldlabel">Project Name</span>
            <input className="chtpl__input" defaultValue={value.name} />
          </label>
          <label className="chtpl__field">
            <span className="chtpl__fieldlabel">Project Path</span>
            <div className="chtpl__inputwrap">
              <input className="chtpl__input" defaultValue={value.path} />
              <button type="button" className="chtpl__iconbtn" aria-label="choose folder">
                <FolderIcon />
              </button>
            </div>
          </label>
        </div>
        <footer className="chtpl__modalactions">
          <button type="button" className="chtpl__btn chtpl__btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="chtpl__btn chtpl__btn--primary">
            Create
          </button>
        </footer>
      </div>
    </div>
  );
}

const TEMPLATES = [
  {
    id: 1,
    title: "Casino Royale",
    description: "A full-featured casino scene with slot machines, a roulette table and ambient lighting to get you started fast.",
    tags: ["Game", "Multiplayer"],
    difficulty_level: Difficulty.HARD,
    date_created: "2024-11-02",
    play_link: "https://play.decentraland.org",
    github_link: "https://github.com/decentraland/sdk7-template-casino",
    grad: "linear-gradient(135deg, #ff2d55 0%, #350447 100%)",
  },
  {
    id: 2,
    title: "Art Gallery",
    description: "A clean exhibition space with framed picture frames and NFT pedestals — drop in your collection and publish.",
    tags: ["Showcase"],
    difficulty_level: Difficulty.EASY,
    date_created: "2025-03-18",
    play_link: "https://play.decentraland.org",
    github_link: "https://github.com/decentraland/sdk7-template-gallery",
    grad: "linear-gradient(135deg, #438fff 0%, #1f2937 100%)",
  },
  {
    id: 3,
    title: "Interactive Quiz",
    description: "Trivia smart-item template with score tracking, a leaderboard UI and reward emotes for the winners.",
    tags: ["Game", "Education"],
    difficulty_level: Difficulty.INTERMEDIATE,
    date_created: "2025-01-09",
    play_link: null,
    github_link: "https://github.com/decentraland/sdk7-template-quiz",
    grad: "linear-gradient(135deg, #34ce77 0%, #0f2419 100%)",
  },
  {
    id: 4,
    title: "Conference Stage",
    description: "An auditorium with a video screen, seating and a speaker stage — ideal for live events and meetups.",
    tags: ["Events", "Video"],
    difficulty_level: Difficulty.INTERMEDIATE,
    date_created: "2024-08-22",
    play_link: "https://play.decentraland.org",
    github_link: "https://github.com/decentraland/sdk7-template-conference",
    grad: "linear-gradient(135deg, #b05cff 0%, #2a0c52 100%)",
  },
  {
    id: 5,
    title: "Obstacle Course",
    description: "A parkour challenge with moving platforms, checkpoints and a finish-line trigger to learn tweens & triggers.",
    tags: ["Game"],
    difficulty_level: Difficulty.HARD,
    date_created: "2025-04-30",
    play_link: "https://play.decentraland.org",
    github_link: "https://github.com/decentraland/sdk7-template-parkour",
    grad: "linear-gradient(135deg, #ff7439 0%, #3a1006 100%)",
  },
];

function sortTemplatesBy(templates, type) {
  if (type === SortBy.NEWEST) {
    return [...templates].sort((a, b) => +new Date(b.date_created) - +new Date(a.date_created));
  }
  return [...templates].sort((a, b) => a.title.localeCompare(b.title));
}

export default function ChTemplates({
  templates: allTemplates = TEMPLATES,
  difficulty: initialDifficulty,
  sortBy: initialSortBy = SortBy.DEFAULT,
  modalOpen: initialModalOpen = false,
}) {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [modal, setModal] = useState(
    initialModalOpen ? { name: "Casino Royale", path: "~/Documents/Decentraland/" } : null,
  );

  const templates = useMemo(
    () => (difficulty ? allTemplates.filter((t) => t.difficulty_level === difficulty) : allTemplates),
    [allTemplates, difficulty],
  );

  const sorted = useMemo(() => sortTemplatesBy(templates, sortBy), [templates, sortBy]);
  const count = templates.length + 1;

  const openCreate = useCallback(
    (name) => () => setModal({ name, path: "~/Documents/Decentraland/" }),
    [],
  );

  return (
    <CreatorHubChrome active="templates">
      <main className="chtpl">
        <div className="chtpl__container">
          <h1 className="chtpl__title">
            <button type="button" className="chtpl__back" aria-label="Back">
              <i className="chtpl__backicon">
                <ChevronLeft size={22} />
              </i>
            </button>
            <span className="chtpl__titletext">Choose a Template</span>
          </h1>

          <div className="chtpl__filters">
            <div className="chtpl__filtersleft">
              <span className="chtpl__count">
                {count} {count === 1 ? "template" : "templates"}
              </span>
              <Filters value={difficulty} onClick={setDifficulty} />
            </div>
            <div className="chtpl__filtersright">
              <Sort value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <div className="chtpl__list">
            <ProjectCard
              title="Empty Scene"
              description="Start your own scene from scratch"
              isNewScene
              onClick={openCreate("Empty Scene")}
            />
            {sorted.map((tpl) => (
              <ProjectCard
                key={tpl.id}
                title={tpl.title}
                description={tpl.description}
                thumb={tpl.grad}
                tags={tpl.tags}
                onClick={openCreate(tpl.title)}
                dropdownOptions={[
                  ...(tpl.play_link ? [{ text: "Preview Template", handler: () => {} }] : []),
                  { text: "View Code", handler: () => {} },
                ]}
              />
            ))}
          </div>
        </div>

        {modal && <CreateProjectModal value={modal} onClose={() => setModal(null)} />}
      </main>
    </CreatorHubChrome>
  );
}
