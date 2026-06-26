import { asset } from "../../asset.js";
import "./forumchrome.css";

export const FORUM_TABS = [
  { id: "categories", label: "Categories" },
  { id: "latest", label: "Latest" },
  { id: "new", label: "New", auth: true },
  { id: "unread", label: "Unread", auth: true },
  { id: "top", label: "Top" },
];

const SearchGlyph = ({ size = 16 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
    <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Caret = ({ size = 11 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const FilterGlyph = ({ size = 14 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const MenuGlyph = ({ size = 16 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const PersonGlyph = ({ size = 13 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" className="fc__loginicon">
    <circle cx="8" cy="5" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function ForumChrome({
  active = "latest",
  onTab,
  children,
  signedIn = false,
  hideNav = false,
}) {
  return (
    <div className="fc ui2" role="region" aria-label="Decentraland Forum">
      <header className="fc__top">
        <a className="fc__brand" href="https://forum.decentraland.org" aria-label="Decentraland Forum home">
          <img src={asset("assets/dcl-logo.png")} alt="" />
          <span className="fc__brandname">Decentraland</span>
        </a>

        <div className="fc__topright">
          {!signedIn && (
            <>
              <button type="button" className="fc__signup">Sign Up</button>
              <button type="button" className="fc__login">
                <PersonGlyph />
                Log In
              </button>
            </>
          )}
          <button type="button" className="fc__iconbtn" aria-label="Search">
            <SearchGlyph />
          </button>
          <button type="button" className="fc__iconbtn" aria-label="Menu">
            <MenuGlyph />
          </button>
          {signedIn && (
            <button type="button" className="fc__account" aria-label="Your account">
              <span className="fc__avatar u-avatar" style={{ "--sz": "30px", "--hue": 268 }} />
            </button>
          )}
        </div>
      </header>

      {!hideNav && (
      <nav className="fc__nav" aria-label="Forum navigation">
        <button type="button" className="fc__catdrop" aria-label="All categories">
          <span className="fc__catdropbar" aria-hidden="true" />
          categories
          <Caret />
        </button>
        <button type="button" className="fc__catdrop fc__tagsdrop" aria-label="All tags">
          tags
          <Caret />
        </button>

        <div className="fc__tabs">
          {FORUM_TABS.filter((tab) => !tab.auth || signedIn).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={"fc__tab" + (tab.id === active ? " is-active" : "")}
              aria-current={tab.id === active ? "page" : undefined}
              onClick={() => onTab?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fc__navright">
          <button type="button" className="fc__filter" aria-label="Filter topics">
            <FilterGlyph />
            <span className="fc__filterlabel">Filter</span>
          </button>
          {signedIn ? (
            <button type="button" className="fc__newtopic">+ New Topic</button>
          ) : null}
        </div>
      </nav>
      )}

      <div className="fc__body">{children}</div>
    </div>
  );
}
