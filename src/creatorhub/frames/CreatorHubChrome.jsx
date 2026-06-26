import { asset } from "../../asset.js";
import "./creatorhubchrome.css";

export const CREATORHUB_NAV = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 9.2 10 3.5l7 5.7V17a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1V9.2Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "scenes",
    label: "Scenes",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M10 2.5 17.5 7 10 11.5 2.5 7 10 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M2.5 13 10 17.5 17.5 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "templates",
    label: "Templates",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <rect x="3" y="3" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="11" y="3" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="3" y="11" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="11" y="11" width="6" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    id: "manage",
    label: "Manage",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 5h14M3 10h14M3 15h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const GearIcon = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
    <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function CreatorHubChrome({
  active = "home",
  onTab,
  children,
  signedIn = false,
  account = "0x9f3c…7a21",
}) {
  return (
    <div className="ch ui2" role="region" aria-label="Creator Hub">
      <aside className="ch__rail">
        <div className="ch__brand">
          <img src={asset("assets/dcl-logo.png")} alt="" />
          <span className="ch__brandtext">
            <span className="ch__brandname">Creator Hub</span>
          </span>
        </div>

        <nav className="ch__nav" aria-label="Creator Hub sections">
          {CREATORHUB_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={"ch__navitem" + (item.id === active ? " is-active" : "")}
              aria-current={item.id === active ? "page" : undefined}
              onClick={() => onTab?.(item.id)}
            >
              <span className="ch__navicon">{item.icon}</span>
              <span className="ch__navlabel">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ch__foot">
          <button type="button" className="ch__settings" aria-label="Settings">
            <GearIcon />
          </button>
          {signedIn ? (
            <button type="button" className="ch__account">
              <span className="ch__avatar u-avatar" style={{ "--sz": "32px", "--hue": 212 }} />
              <span className="ch__accmeta">
                <span className="ch__accname">My Account</span>
                <span className="ch__accaddr u-truncate">{account}</span>
              </span>
            </button>
          ) : (
            <button type="button" className="ch__signin">Sign in</button>
          )}
        </div>
      </aside>

      <main className="ch__main">{children}</main>
    </div>
  );
}
