import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdscenedetail.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const STATUS_BADGE = {
  published: { label: "Published", color: "#34CE76" },
  unsynced: { label: "Unsynced", color: "#FFBC5B" },
  draft: { label: "Draft", color: "#FFBC5B" },
};

const STAT_LABELS = {
  users: "Weekly Users",
  sessions: "Weekly Sessions",
  medianSessionTime: "Med. Session Time",
  maxConcurrentUsers: "Peak Users",
};
const STATS_NOTICE = "*Metrics are refreshed weekly every Monday";

const PROJECT = {
  id: "proj-7c1a",
  title: "Neon Arcade",
  description:
    "A retro-futurist arcade hall built for community game nights — playable cabinets, a leaderboard wall, and a hidden VIP lounge upstairs.",
  thumbnail: null,
  status: "published",
};

const SCENE = { sdk6: false };

const DEPLOYMENTS = [
  {
    id: "dep-1",
    base: "-45,12",
    world: null,
    status: "published",
    stats: { users: 1284, sessions: 3120, medianSessionTime: "4m 12s", maxConcurrentUsers: 38 },
  },
];

const WORLD_DEPLOYMENTS = [
  {
    id: "dep-w1",
    base: "world",
    world: "neon-arcade.dcl.eth",
    status: "published",
    stats: { users: 642, sessions: 1490, medianSessionTime: "6m 03s", maxConcurrentUsers: 17 },
  },
];

const PencilGlyph = () => (
  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
    <path
      d="M3 14.5V17h2.5l8-8L11 6.5l-8 8zM15.2 7.3l1.1-1.1a1 1 0 000-1.4l-1.1-1.1a1 1 0 00-1.4 0l-1.1 1.1L15.2 7.3z"
      fill="currentColor"
    />
  </svg>
);
const DownloadGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M8 1v8m0 0L5 6m3 3l3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 11.5v2A1.5 1.5 0 004 15h8a1.5 1.5 0 001.5-1.5v-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const EditGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 11.5V14h2.5l7-7L9 4.5l-7 7zM12.6 5.9l.9-.9a.9.9 0 000-1.3l-1.2-1.2a.9.9 0 00-1.3 0l-.9.9L12.6 5.9z" fill="currentColor" />
  </svg>
);
const DotsGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="3" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="13" cy="8" r="1.4" fill="currentColor" />
  </svg>
);
const CopyGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="5" y="5" width="8" height="9" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3 11V3a1.4 1.4 0 011.4-1.4H10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const ExternalGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M6 3H3.5A1.5 1.5 0 002 4.5v8A1.5 1.5 0 003.5 14h8a1.5 1.5 0 001.5-1.5V10" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M9 2h5v5M14 2l-6 6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const WarnGlyph = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" className="bdscenedetail__sdkwarn">
    <path d="M8 1.5l6.5 12H1.5L8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M8 6v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.8" fill="currentColor" />
  </svg>
);
const SceneIllustration = () => (
  <svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true" className="bdscenedetail__emptyart">
    <rect x="9" y="30" width="68" height="42" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M9 52l18-14 14 11 12-9 24 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="58" cy="44" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M43 12v10M37 16l6-4 6 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function SDKTag({ scene }) {
  if (!scene) {
    return (
      <span className="bdscenedetail__sdktag bdscenedetail__sdktag--loading">
        <Spinner size={16} />
      </span>
    );
  }
  if (scene.sdk6) {
    return (
      <span className="bdscenedetail__sdktag" title="This scene uses SDK 6, which is no longer supported.">
        <WarnGlyph />
        SDK 6
      </span>
    );
  }
  return <span className="bdscenedetail__sdktag">SDK 7</span>;
}

function Stat({ label, children, wide }) {
  return (
    <div className={"bdscenedetail__stat" + (wide ? " is-wide" : "")}>
      <div className="bdscenedetail__statlabel">{label}</div>
      <div className="bdscenedetail__statvalue">{children}</div>
    </div>
  );
}

function DeploymentDetail({ deployment }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const s = deployment.stats;
  const isWorld = !!deployment.world;
  const locationText = isWorld ? deployment.world : deployment.base;
  const statusText = deployment.status === "unsynced" ? STATUS_BADGE.unsynced.label : STATUS_BADGE.published.label;
  return (
    <div className="bdscenedetail__deployment">
      <div className="bdscenedetail__thumbnail">
        <SceneIllustration />
      </div>
      <Stat label="Status">
        <span className={"bdscenedetail__statusdot " + (deployment.status === "unsynced" ? "is-needs-sync" : "is-online")} />
        {statusText}
      </Stat>
      <Stat label="Location" wide>
        {isWorld ? (
          <span className="bdscenedetail__worldurl">
            <span className="u-truncate">{locationText}</span>
            <button type="button" className="bdscenedetail__iconlink" aria-label="Copy urn">
              <CopyGlyph />
            </button>
            <a className="bdscenedetail__iconlink" href={`https://decentraland.org/world/${deployment.world}`} target="_blank" rel="noopener noreferrer" aria-label="Open world">
              <ExternalGlyph />
            </a>
          </span>
        ) : (
          locationText
        )}
      </Stat>
      <Stat label={STAT_LABELS.users}>{s.users.toLocaleString()}</Stat>
      <Stat label={STAT_LABELS.sessions}>{s.sessions.toLocaleString()}</Stat>
      <Stat label={STAT_LABELS.medianSessionTime}>{s.medianSessionTime}</Stat>
      <Stat label={STAT_LABELS.maxConcurrentUsers}>{s.maxConcurrentUsers.toLocaleString()}</Stat>
      <div className="bdscenedetail__deploymentmenu">
        <button
          type="button"
          className="bdscenedetail__iconbtn"
          aria-label="Deployment options"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <DotsGlyph />
        </button>
        {menuOpen ? (
          <ul className="bdscenedetail__dropdown is-right" role="menu">
            <li role="menuitem">Unpublish</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default function BdSceneDetail({
  project = PROJECT,
  scene = SCENE,
  deployments = DEPLOYMENTS,
  loading = false,
  notFound = false,
}) {
  const [tab, setTab] = useState("scenes");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdscenedetail bdscenedetail--center">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  if (notFound || !project) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdscenedetail bdscenedetail--center">
          <div className="bdscenedetail__notfound">
            <SceneIllustration />
            <h2 className="bdscenedetail__notfoundtitle">Not found</h2>
            <p className="bdscenedetail__notfoundtext">The page you are looking for doesn't exist.</p>
          </div>
        </div>
      </BuilderChrome>
    );
  }

  const badge = STATUS_BADGE[project.status] || STATUS_BADGE.draft;

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdscenedetail">
        <div className="bdscenedetail__container">
          <div className="bdscenedetail__headersection">
            <button type="button" className="bdscenedetail__back" aria-label="Back">
              <ChevronLeft size={18} />
            </button>

            <div className="bdscenedetail__headerrow">
              <h1 className="bdscenedetail__name">
                <span className="u-truncate">{project.title}</span>
                <button type="button" className="bdscenedetail__editpencil" aria-label="Rename scene">
                  <PencilGlyph />
                </button>
              </h1>

              <div className="bdscenedetail__actions">
                <button type="button" className="bdscenedetail__btn bdscenedetail__btn--download">
                  <DownloadGlyph />
                  Download Scene
                </button>
                <button type="button" className="bdscenedetail__btn bdscenedetail__btn--primary" disabled={!scene}>
                  <EditGlyph />
                  Edit Scene
                </button>
                <div className="bdscenedetail__ctxwrap">
                  <button
                    type="button"
                    className="bdscenedetail__btn bdscenedetail__btn--basic"
                    aria-label="Scene options"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                  >
                    <DotsGlyph />
                  </button>
                  {menuOpen ? (
                    <ul className="bdscenedetail__dropdown is-right" role="menu">
                      <li role="menuitem">Duplicate</li>
                      <li
                        role="menuitem"
                        onClick={() => {
                          setMenuOpen(false);
                          setIsDeleting(true);
                        }}
                      >
                        Delete
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="bdscenedetail__statusrow">
              <span className="bdscenedetail__statusbadge" style={{ backgroundColor: badge.color }}>
                {badge.label}
              </span>
              <SDKTag scene={scene} />
            </div>
          </div>

          <div className="bdscenedetail__section">
            <div
              className="bdscenedetail__headerimage"
              style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})` } : undefined}
            />
          </div>

          <div className={"bdscenedetail__section" + (project.description ? "" : " bdscenedetail__section--last")}>
            <h3 className="bdscenedetail__subheader">Published In</h3>
            {deployments.length === 0 ? (
              <div className="bdscenedetail__empty">
                <SceneIllustration />
                <span>This scene has not been published yet.</span>
              </div>
            ) : (
              <>
                <div className="bdscenedetail__deployments">
                  {deployments.map((d) => (
                    <DeploymentDetail key={d.id} deployment={d} />
                  ))}
                </div>
                <div className="bdscenedetail__notice">{STATS_NOTICE}</div>
              </>
            )}
          </div>

          {project.description ? (
            <div className="bdscenedetail__section bdscenedetail__section--last">
              <h3 className="bdscenedetail__subheader">Description</h3>
              <p className="bdscenedetail__description">{project.description}</p>
            </div>
          ) : null}
        </div>

        {isDeleting ? (
          <div className="bdscenedetail__scrim" role="presentation">
            <div className="bdscenedetail__confirm" role="dialog" aria-modal="true" aria-label="Delete scene">
              <h2 className="bdscenedetail__confirmtitle">Delete "{project.title}"</h2>
              <p className="bdscenedetail__confirmtext">
                Are you sure you want to delete your Scene "{project.title}"? This operation is not reversible
              </p>
              <div className="bdscenedetail__confirmactions">
                <button
                  type="button"
                  className="bdscenedetail__btn bdscenedetail__btn--secondary"
                  onClick={() => setIsDeleting(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bdscenedetail__btn bdscenedetail__btn--primary"
                  onClick={() => setIsDeleting(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </BuilderChrome>
  );
}

export { PROJECT, SCENE, DEPLOYMENTS, WORLD_DEPLOYMENTS };
