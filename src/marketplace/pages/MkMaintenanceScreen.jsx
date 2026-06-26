import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import "./mkmaintenancescreen.css";

const HEADING = "We'll be right back";
const NOTICE = "We're currently under maintenance, we'll be back soon!";
const LEAD = "While we're back-end busy, jump into the world.";
const PLAY_URL = "https://play.decentraland.org";

const FOOTER_LINKS = [
  { label: "Home", href: "https://decentraland.org" },
  { label: "Privacy Policy", href: "https://decentraland.org/privacy" },
  { label: "Terms of Use", href: "https://decentraland.org/terms" },
  { label: "Content Policy", href: "https://decentraland.org/content" },
  { label: "Code of Ethics", href: "https://decentraland.org/ethics" },
  { label: "Feature Request", href: "https://decentraland.canny.io" },
];

const SOCIAL = [
  { id: "discord", href: "https://dcl.gg/discord" },
  { id: "reddit", href: "https://reddit.com/r/decentraland" },
  { id: "github", href: "https://github.com/decentraland" },
  { id: "twitter", href: "https://twitter.com/decentraland" },
];

function GearEmblem() {
  return (
    <div className="mkmaintenancescreen__emblem" aria-hidden="true">
      <span className="mkmaintenancescreen__glow" />
      <span className="mkmaintenancescreen__ring" />
      <span className="mkmaintenancescreen__badge">
        <svg
          className="mkmaintenancescreen__gear"
          viewBox="0 0 24 24"
          width="44"
          height="44"
        >
          <path
            fill="currentColor"
            d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.61.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.61.22l2.39-.96c.49.38 1.03.7 1.62.94l.36 2.54c.04.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.09.48 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2Z"
          />
        </svg>
      </span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M8 5.14v13.72c0 .8.88 1.29 1.55.86l10.74-6.86a1.02 1.02 0 0 0 0-1.72L9.55 4.28A1.02 1.02 0 0 0 8 5.14Z" />
    </svg>
  );
}

function MaintenanceFooter() {
  return (
    <footer className="mkmaintenancescreen__footer">
      <div className="mkmaintenancescreen__footermain">
        <button type="button" className="mkmaintenancescreen__lang">
          English
          <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
            <path
              d="M4 10l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <nav className="mkmaintenancescreen__links">
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mkmaintenancescreen__footersecondary">
        <div className="mkmaintenancescreen__social">
          {SOCIAL.map((s) => (
            <a
              key={s.id}
              href={s.href}
              aria-label={s.id}
              className={"mkmaintenancescreen__socialicon is-" + s.id}
            />
          ))}
        </div>
        <div className="mkmaintenancescreen__copyright">© 2026 Decentraland</div>
      </div>
    </footer>
  );
}

export default function MkMaintenanceScreen({
  heading = HEADING,
  notice = NOTICE,
  lead = LEAD,
  playUrl = PLAY_URL,
}) {
  return (
    <MarketplaceChrome active={null}>
      <div className="mkmaintenancescreen">
        <div className="mkmaintenancescreen__page">
          <div
            className="mkmaintenancescreen__center"
            role="status"
            aria-live="polite"
          >
            <GearEmblem />
            <span className="mkmaintenancescreen__eyebrow">
              <span className="mkmaintenancescreen__cone" aria-hidden="true">
                🚧
              </span>
              Marketplace maintenance
            </span>
            <h1 className="mkmaintenancescreen__title">{heading}</h1>
            <p className="mkmaintenancescreen__notice">{notice}</p>
            {lead ? <p className="mkmaintenancescreen__lead">{lead}</p> : null}
            <div className="mkmaintenancescreen__actions">
              <a
                className="mkmaintenancescreen__cta"
                href={playUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayIcon />
                Play Decentraland
              </a>
              <button
                type="button"
                className="mkmaintenancescreen__retry"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
        <MaintenanceFooter />
      </div>
    </MarketplaceChrome>
  );
}
