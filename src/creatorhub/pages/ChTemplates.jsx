import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import { ChevronLeft, Close } from "../../atoms/icons.jsx";
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
          aria-pressed={value === d}
          onClick={handleClick(d)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ title, description, thumb, tags, dropdownOptions, onClick, isNewScene }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointerDown = (e) => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="chtpl__card">
      <button type="button" className="chtpl__open" aria-label={`Open ${title}`} onClick={onClick}>
        <div
          className={"chtpl__thumb" + (isNewScene ? " chtpl__thumb--newscene" : "")}
          style={thumb ? { backgroundImage: thumb } : undefined}
        />
        <div className="chtpl__info">
          <div className="chtpl__cardtitle">
            <span className="chtpl__cardtitletext u-truncate">{title}</span>
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
      </button>
      {dropdownOptions?.length ? (
        <div className="chtpl__menu" ref={menuWrapRef}>
          <button
            ref={menuBtnRef}
            type="button"
            className="chtpl__iconbtn"
            aria-label="options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
          >
            <ThreeDots />
          </button>
          {menuOpen && (
            <div className="chtpl__dropdown" role="menu">
              {dropdownOptions.map((opt) =>
                opt.href ? (
                  <a
                    key={opt.text}
                    role="menuitem"
                    className="chtpl__dropitem"
                    href={opt.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      opt.handler?.();
                    }}
                  >
                    {opt.text}
                  </a>
                ) : (
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
                ),
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function CreateProjectModal({ value, onClose, onCreate }) {
  const submit = () => onCreate?.({ template: value.template ?? null });
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
          <p className="chtpl__desc">
            You&apos;re starting a new project from <strong>{value.name}</strong>.
          </p>
          <p className="chtpl__desc">
            Continue to name your project and choose where to save it.
          </p>
        </div>
        <footer className="chtpl__modalactions">
          <button type="button" className="chtpl__btn chtpl__btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="chtpl__btn chtpl__btn--primary" onClick={submit}>
            Create
          </button>
        </footer>
      </div>
    </div>
  );
}

const TEMPLATES = [
  {
    id: "tower-defense",
    title: "Tower Defense",
    description: "A wave-based tower defense game: place turrets, fend off waves of enemies and learn scene systems, triggers and game state.",
    tags: ["Game", "Multiplayer"],
    difficulty_level: Difficulty.HARD,
    date_created: "2024-11-02",
    play_link: null,
    github_link: "https://github.com/decentraland-scenes/Tower-defense",
    grad: "linear-gradient(135deg, #00c2ff 0%, #052149 100%)",
  },
  {
    id: "memory-game",
    title: "Memory Game",
    description: "A classic flip-and-match memory game — a compact example of UI, click events and score tracking.",
    tags: ["Game"],
    difficulty_level: Difficulty.EASY,
    date_created: "2025-03-18",
    play_link: null,
    github_link: "https://github.com/decentraland-scenes/Memory-game",
    grad: "linear-gradient(135deg, #34ce77 0%, #0f2419 100%)",
  },
  {
    id: "castaway-2048",
    title: "Castaway 2048",
    description: "The 2048 sliding-tile puzzle rebuilt in-world — grid logic, input handling and a win/lose state machine.",
    tags: ["Game", "Puzzle"],
    difficulty_level: Difficulty.INTERMEDIATE,
    date_created: "2025-01-09",
    play_link: null,
    github_link: "https://github.com/decentraland-scenes/Castaway-2048",
    grad: "linear-gradient(135deg, #ff7439 0%, #3a1006 100%)",
  },
  {
    id: "nft-art-wall",
    title: "NFT Art Wall",
    description: "Display your NFT collection on an in-world gallery wall — drop in token IDs and publish.",
    tags: ["Showcase"],
    difficulty_level: Difficulty.EASY,
    date_created: "2024-08-22",
    play_link: null,
    github_link: "https://github.com/decentraland-scenes/nft-wall-example-scene",
    grad: "linear-gradient(135deg, #438fff 0%, #1f2937 100%)",
  },
  {
    id: "escape-room",
    title: "Escape Room",
    description: "A puzzle escape-room scene with locks, clues and sequential triggers to learn scene state and interactions.",
    tags: ["Game", "Puzzle"],
    difficulty_level: Difficulty.HARD,
    date_created: "2025-04-30",
    play_link: null,
    github_link: "https://github.com/decentraland-scenes/Escape-Room",
    grad: "linear-gradient(135deg, #b05cff 0%, #2a0c52 100%)",
  },
];

export const STARTER_TEMPLATES = TEMPLATES;

function sortTemplatesBy(templates, type) {
  if (type === SortBy.NEWEST) {
    return [...templates].sort((a, b) => +new Date(b.date_created) - +new Date(a.date_created));
  }
  return [...templates].sort((a, b) => a.title.localeCompare(b.title));
}

export default function ChTemplates({
  templates: allTemplates = TEMPLATES,
  sample = false,
  signedIn = false,
  account = "",
  name = "",
  onSignIn =(undefined),
  difficulty: initialDifficulty,
  sort,
  sortBy: initialSortBy = SortBy.DEFAULT,
  modalOpen: initialModalOpen = false,
  onBack =(undefined),
  onDifficultyChange =(undefined),
  onSortChange =(undefined),
  onSelectTemplate =(undefined),
  onCreate =(undefined),
  onPreview =(undefined),
  onViewCode =(undefined),
}) {
  const isControlled = typeof onDifficultyChange === "function";
  const [localDifficulty, setLocalDifficulty] = useState(initialDifficulty);
  const difficulty = isControlled ? initialDifficulty : localDifficulty;
  const changeDifficulty = useCallback(
    (next) => (isControlled ? onDifficultyChange(next) : setLocalDifficulty(next)),
    [isControlled, onDifficultyChange],
  );

  const sortControlled = typeof onSortChange === "function";
  const [localSort, setLocalSort] = useState(initialSortBy);
  const sortBy = sortControlled ? sort ?? initialSortBy : localSort;
  const changeSort = useCallback(
    (next) => (sortControlled ? onSortChange(next) : setLocalSort(next)),
    [sortControlled, onSortChange],
  );

  const [modal, setModal] = useState(
    initialModalOpen ? { template: null, name: "Tower Defense" } : null,
  );

  const templates = useMemo(
    () => (difficulty ? allTemplates.filter((t) => t.difficulty_level === difficulty) : allTemplates),
    [allTemplates, difficulty],
  );

  const sorted = useMemo(() => sortTemplatesBy(templates, sortBy), [templates, sortBy]);
  const count = templates.length + 1;

  const openCreate = useCallback(
    (template, name) => () => {
      onSelectTemplate?.(template);
      setModal({ template, name });
    },
    [onSelectTemplate],
  );

  return (
    <CreatorHubChrome active="templates" signedIn={signedIn} account={account} name={name} onSignIn={onSignIn}>
      <section className="chtpl">
        <div className="chtpl__container">
          <h1 className="chtpl__title">
            {onBack ? (
              <button type="button" className="chtpl__back" aria-label="Back" onClick={() => onBack()}>
                <i className="chtpl__backicon">
                  <ChevronLeft size={22} />
                </i>
              </button>
            ) : null}
            <span className="chtpl__titletext">Choose a Template</span>
          </h1>

          {sample ? (
            <p className="chtpl__sample" role="note">
              <strong>Sample templates.</strong> These are example starters; a
              live template catalog isn&apos;t connected yet.
            </p>
          ) : null}

          <div className="chtpl__filters">
            <div className="chtpl__filtersleft">
              <span className="chtpl__count">
                {count} {count === 1 ? "template" : "templates"}
              </span>
              <Filters value={difficulty} onClick={changeDifficulty} />
            </div>
            <div className="chtpl__filtersright">
              <p className="chtpl__sortlabel">Sort by:</p>
              <Dropdown options={[SortBy.DEFAULT, SortBy.NEWEST]} value={sortBy} onChange={changeSort} />
            </div>
          </div>

          <div className="chtpl__list">
            <ProjectCard
              title="Empty Scene"
              description="Start your own scene from scratch"
              isNewScene
              onClick={openCreate(null, "Empty Scene")}
            />
            {sorted.map((tpl) => (
              <ProjectCard
                key={tpl.id}
                title={tpl.title}
                description={tpl.description}
                thumb={tpl.grad}
                tags={tpl.tags}
                onClick={openCreate(tpl, tpl.title)}
                dropdownOptions={[
                  ...(tpl.play_link
                    ? [{ text: "Preview Template", href: tpl.play_link, handler: () => onPreview?.(tpl) }]
                    : []),
                  { text: "View Code", href: tpl.github_link, handler: () => onViewCode?.(tpl) },
                ]}
              />
            ))}
          </div>
        </div>

        {modal && (
          <CreateProjectModal
            value={modal}
            onClose={() => setModal(null)}
            onCreate={(values) => {
              onCreate?.(values);
              setModal(null);
            }}
          />
        )}
      </section>
    </CreatorHubChrome>
  );
}
