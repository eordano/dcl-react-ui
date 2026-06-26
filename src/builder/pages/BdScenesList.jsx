import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdsceneslist.css";

const PROJECTS = [
  { id: "p1", title: "Neon Plaza", parcels: 4, items: 128, sdk: 7, hue: 268 },
  { id: "p2", title: "Sakura Garden", parcels: 2, items: 64, sdk: 7, hue: 332 },
  { id: "p3", title: "Cyber Arena", parcels: 9, items: 412, sdk: 6, hue: 206 },
  { id: "p4", title: "Pixel Museum", parcels: 1, items: 37, sdk: 7, hue: 154 },
  { id: "p5", title: "Skybound Tower", parcels: 6, items: 201, sdk: 7, hue: 24 },
  { id: "p6", title: "Retro Arcade", parcels: 3, items: 96, sdk: 6, hue: 48 },
  { id: "p7", title: "Frost Cabin", parcels: 1, items: 22, sdk: 7, hue: 192 },
  { id: "p8", title: "Vaporwave Mall", parcels: 12, items: 540, sdk: 7, hue: 300 },
];

const POOL = [
  { id: "pool1", title: "Genesis Plaza Remix", parcels: 5, items: 180, hue: 280 },
  { id: "pool2", title: "Wonderzone Casino", parcels: 8, items: 320, hue: 18 },
  { id: "pool3", title: "Dragon City", parcels: 16, items: 610, hue: 130 },
  { id: "pool4", title: "Aetheria Hub", parcels: 4, items: 142, hue: 220 },
  { id: "pool5", title: "Vegas City", parcels: 20, items: 880, hue: 350 },
];

const SORTS = ["Newest", "Name", "Size"];

const ParcelIcon = () => (
  <svg className="bdsceneslist__metaicon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 1.5l6 3.25v6.5L8 14.5 2 11.25v-6.5L8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M2 4.75L8 8l6-3.25M8 8v6.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const ObjectIcon = () => (
  <svg className="bdsceneslist__metaicon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2.5 6.5h11M6.5 6.5v7" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const UploadGlyph = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
    <path d="M10 13V4m0 0L6.5 7.5M10 4l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 13v2.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const CreateGlyph = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
    <path d="M10 4v12M4 10h12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

function ProjectCard({ project, pool = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={"bdsceneslist__card" + (pool ? " is-pool" : "")}>
      <div
        className="bdsceneslist__thumb"
        style={{ background: `linear-gradient(135deg, hsl(${project.hue} 60% 42%), hsl(${(project.hue + 40) % 360} 55% 26%))` }}
      >
        {!pool ? (
          <div className="bdsceneslist__cardtop">
            <span className={"bdsceneslist__sdk" + (project.sdk === 6 ? " is-warn" : "")}>
              {project.sdk === 6 ? (
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                  <path d="M8 2l6.5 11.5H1.5L8 2z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M8 6.5v3.2M8 11.4v.1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ) : null}
              {project.sdk === 6 ? "SDK 6" : "SDK 7"}
            </span>
            <button
              type="button"
              className="bdsceneslist__opts"
              aria-label="Scene options"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <circle cx="3" cy="8" r="1.4" fill="currentColor" />
                <circle cx="8" cy="8" r="1.4" fill="currentColor" />
                <circle cx="13" cy="8" r="1.4" fill="currentColor" />
              </svg>
            </button>
            {menuOpen ? (
              <ul className="bdsceneslist__menu" role="menu">
                <li role="menuitem">Duplicate</li>
                <li role="menuitem">Download</li>
                <li role="menuitem" className="is-danger">Delete</li>
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="bdsceneslist__data">
        <div className="bdsceneslist__title u-truncate">{project.title}</div>
        <div className="bdsceneslist__meta">
          <ParcelIcon /> {project.parcels} {project.parcels === 1 ? "parcel" : "parcels"}
          <span className="bdsceneslist__metagap" />
          <ObjectIcon /> {project.items} {project.items === 1 ? "item" : "items"}
        </div>
      </div>
    </div>
  );
}

function SceneCard({ title, description, hue }) {
  return (
    <button type="button" className="bdsceneslist__scenecard" aria-label={title}>
      <div
        className="bdsceneslist__scenemedia"
        style={{ background: `linear-gradient(135deg, hsl(${hue} 58% 40%), hsl(${(hue + 45) % 360} 52% 24%))` }}
      />
      <div className="bdsceneslist__sceneinfo">
        <span className="bdsceneslist__scenetitle">{title}</span>
        <span className="bdsceneslist__scenedesc">{description}</span>
      </div>
    </button>
  );
}

function SceneCreationSelector() {
  return (
    <div className="bdsceneslist__selector">
      <SceneCard
        title="Start from scratch"
        description="Start building your scenes from the ground up with the online builder in a simple and intuitive way."
        hue={262}
      />
      <SceneCard
        title="Use predefined templates"
        description="Choose one of these polished templates and release an amazing scene with just a few clicks!"
        hue={206}
      />
    </div>
  );
}

export default function BdScenesList({ projects = PROJECTS, pool = POOL, loading = false }) {
  const [tab, setTab] = useState("scenes");
  const [sort, setSort] = useState(SORTS[0]);
  const [page, setPage] = useState(1);

  const count = projects.length;
  const totalPages = Math.max(1, Math.ceil(count / 8));
  const hasPagination = totalPages > 1;
  const isEmpty = count === 0;

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdsceneslist bdsceneslist--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdsceneslist">
        <div className="bdsceneslist__container">
          <div className="bdsceneslist__head">
            <h1 className="bdsceneslist__h1">My Scenes</h1>
            <div className="bdsceneslist__actions">
              <button type="button" className="bdsceneslist__btn is-inverted">
                <UploadGlyph /> Upload Scene
              </button>
              <button type="button" className="bdsceneslist__btn is-primary">
                <CreateGlyph /> Create Scene
              </button>
            </div>
          </div>

          {!isEmpty ? (
            <div className="bdsceneslist__subrow">
              <span className="bdsceneslist__count">
                {count} {count === 1 ? "result" : "results"}
              </span>
              {count > 1 ? (
                <Dropdown options={SORTS} value={sort} onChange={setSort} />
              ) : null}
            </div>
          ) : null}

          {isEmpty ? (
            <div className="bdsceneslist__empty">
              <h3 className="bdsceneslist__emptytitle">Create your first scene</h3>
              <span className="bdsceneslist__emptydesc">
                Unleash your creativity. Start building scenes for your LANDs and Worlds and
                share with the community.{" "}
                <a
                  href="https://docs.decentraland.org/creator/scenes-sdk7/getting-started/sdk-101"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more about creating Scenes.
                </a>
              </span>
              <SceneCreationSelector />
            </div>
          ) : (
            <div className={"bdsceneslist__cards" + (hasPagination ? " has-pagination" : "")}>
              <div className="bdsceneslist__grid">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>

              {hasPagination ? (
                <nav className="bdsceneslist__pagination" aria-label="Pagination">
                  <button
                    type="button"
                    className="bdsceneslist__pageitem is-edge is-prev"
                    aria-label="Previous page"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={"bdsceneslist__pageitem" + (n === page ? " is-active" : "")}
                      aria-current={n === page ? "page" : undefined}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="bdsceneslist__pageitem is-edge is-next"
                    aria-label="Next page"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    ›
                  </button>
                </nav>
              ) : null}
            </div>
          )}

          {pool && pool.length > 0 ? (
            <div className="bdsceneslist__poolblock">
              <div className="bdsceneslist__poolhead">
                <h2 className="bdsceneslist__poolsub">From The Scene Pool</h2>
                <a className="bdsceneslist__viewmore" href="#pool">
                  View More
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <div className="bdsceneslist__poolstrip">
                {pool.map((p) => (
                  <ProjectCard key={p.id} project={p} pool />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </BuilderChrome>
  );
}
