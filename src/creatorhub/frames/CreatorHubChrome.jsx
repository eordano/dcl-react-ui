import { asset } from "../../asset.js";
import "./creatorhubchrome.css";

export const CREATORHUB_NAV = [
  {
    id: "home",
    group: "Create",
    label: "Home",
    href: "/create",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 9.2 10 3.5l7 5.7V17a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1V9.2Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "scenes",
    group: "Create",
    label: "Scenes",
    href: "/create/scenes",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M10 2.5 17.5 7 10 11.5 2.5 7 10 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M2.5 13 10 17.5 17.5 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "templates",
    group: "Create",
    label: "Templates",
    href: "/create/templates",
    hint: "Preview",
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
    id: "ai-generate",
    group: "Create",
    label: "Generate with AI",
    href: "/creator-hub/ai-generate",
    hint: "Preview",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M10 2.5c.6 4 3.5 6.9 7.5 7.5-4 .6-6.9 3.5-7.5 7.5-.6-4-3.5-6.9-7.5-7.5 4-.6 6.9-3.5 7.5-7.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "collections",
    group: "Create",
    label: "Collections",
    href: "/create/wearables",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 3h6l8 8-6 6-8-8V3Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <circle cx="6.4" cy="6.4" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "curate",
    group: "Manage",
    label: "Curate",
    href: "/create/curate",
    secondary: true,
    hint: "Committee",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M10 2.5 16 4.7v4.3c0 3.4-2.4 6.5-6 8-3.6-1.5-6-4.6-6-8V4.7L10 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="m7.3 9.8 1.9 1.9 3.5-3.6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "manage",
    group: "Manage",
    label: "Worlds",
    href: "/creator-hub/manage",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 5h14M3 10h14M3 15h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "land",
    group: "Manage",
    label: "Land",
    href: "/builder/land",
    external: true,
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="1.3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7.7 3v14M12.3 3v14M3 7.7h14M3 12.3h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    id: "names",
    group: "Manage",
    label: "Names",
    href: "/builder/names",
    external: true,
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M10.3 3H16a1 1 0 0 1 1 1v5.7a1 1 0 0 1-.3.7l-6 6a1 1 0 0 1-1.4 0L3.6 11.7a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 .7-.3Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <circle cx="13.3" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "metrics",
    group: "Manage",
    label: "Metrics",
    href: "/creator-hub/metrics",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M3 16.5h14" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M6 16.5V12M10 16.5V8.5M14 16.5V5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "learn",
    group: "Learn",
    label: "Learn",
    href: "/create/learn",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <path d="M10 5.6C8.5 4.4 6.2 4.1 3.5 4.6v10c2.7-.5 5-.2 6.5 1 1.5-1.2 3.8-1.5 6.5-1v-10c-2.7-.5-5-.2-6.5 1Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M10 5.6v10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const CREATORHUB_NAV_GROUPS = CREATORHUB_NAV.reduce((groups, item, i) => {
  const last = groups[groups.length - 1];
  if (last && last.group === item.group) last.items.push({ item, i });
  else groups.push({ group: item.group, items: [{ item, i }] });
  return groups;
}, []);

const ExternalGlyph = () => (
  <svg className="ch__navext" viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
    <path d="M8 4.5H5.2a1 1 0 0 0-1 1V15a1 1 0 0 0 1 1h9.6a1 1 0 0 0 1-1v-2.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 4.5H15.5V8.5M15.5 4.5 9.5 10.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
    <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function shortAddress(addr) {
  return addr && addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

export default function CreatorHubChrome({
  active = "home",
  onTab =(undefined),
  children,
  signedIn = false,
  account = "",
  name = "",
  onSettings =(undefined),
  onAccount =(undefined),
  onSignIn =(undefined),
  accountHref = "/marketplace/account",
  settingsHref = "/creator-hub/settings",
}) {
  const accountInner = (
    <>
      <span className="ch__avatar u-avatar" style={{ "--sz": "32px", "--hue": 212 }} />
      <span className="ch__accmeta">
        <span className="ch__accname">{name || "My Account"}</span>
        {account ? <span className="ch__accaddr" title={account}>{shortAddress(account)}</span> : null}
      </span>
    </>
  );

  const accountLabel = `${name || "My Account"}${account ? " " + shortAddress(account) : ""}`;

  const showSettings = !!onSettings || !!settingsHref;
  const showAccount = signedIn && (onAccount || accountHref);
  const showSignIn = !signedIn && (onSignIn || accountHref);
  const showFoot = showSettings || showAccount || showSignIn;

  return (
    <div className="ch ui2" role="region" aria-label="Creator Hub">
      <a className="ch__skip" href="#ch-main">Skip to content</a>
      <aside className="ch__rail">
        <a className="ch__back" href="/" aria-label="Back to Decentraland" title="Decentraland">
          <svg className="ch__backchev" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="ch__backlabel">Decentraland</span>
        </a>

        <a className="ch__brand" href="/create" aria-label="Creator Hub home" title="Creator Hub">
          <img src={asset("assets/dcl-logo.png")} alt="" />
          <span className="ch__brandtext">
            <span className="ch__brandname">Creator Hub</span>
          </span>
        </a>

        <a className="ch__newbtn" href="/creator-hub/create-project" aria-label="New project (Preview)" title="New project (Preview)">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <path d="M10 6.5v7M6.5 10h7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
          <span className="ch__navlabel">New project</span>
          <span className="ch__newbadge">Preview</span>
        </a>

        <nav className="ch__nav" aria-label="Creator Hub sections">
          {CREATORHUB_NAV_GROUPS.map((grp) => {
            const grpId = `ch-grp-${grp.group.toLowerCase()}`;
            return (
              <div className="ch__navgroup" role="group" aria-labelledby={grpId} key={grp.group}>
                <div className="ch__navcaption" id={grpId}>{grp.group}</div>
                {grp.items.map(({ item, i }) => {
                  const secondary = item.external || item.secondary;
                  const prev = CREATORHUB_NAV[i - 1];
                  const startsRun = secondary && !(prev && (prev.external || prev.secondary));
                  const railLabel = item.external
                    ? `${item.label} (opens in classic Builder)`
                    : item.hint
                      ? `${item.label} (${item.hint})`
                      : item.label;
                  return (
                    <a
                      key={item.id}
                      className={
                        "ch__navitem" +
                        (item.id === active ? " is-active" : "") +
                        (secondary ? " is-secondary" : "") +
                        (startsRun ? " is-sep" : "")
                      }
                      href={item.href}
                      aria-label={railLabel}
                      title={railLabel}
                      aria-current={item.id === active ? "page" : undefined}
                      onClick={() => onTab?.(item.id)}
                    >
                      <span className="ch__navicon">{item.icon}</span>
                      <span className="ch__navlabel">
                        {item.label}
                        {item.external ? <ExternalGlyph /> : null}
                      </span>
                      {item.hint ? <span className="ch__navhint">{item.hint}</span> : null}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {showFoot ? (
          <div className="ch__foot">
            {showSettings ? (
              onSettings ? (
                <button
                  type="button"
                  className="ch__settings"
                  aria-label="Settings"
                  onClick={() => onSettings()}
                >
                  <GearIcon />
                </button>
              ) : (
                <a className="ch__settings" href={settingsHref} aria-label="Settings">
                  <GearIcon />
                </a>
              )
            ) : null}
            {showAccount ? (
              onAccount ? (
                <button type="button" className="ch__account" aria-label={accountLabel} onClick={() => onAccount()}>
                  {accountInner}
                </button>
              ) : (
                <a className="ch__account" href={accountHref} aria-label={accountLabel}>
                  {accountInner}
                </a>
              )
            ) : null}
            {showSignIn ? (
              onSignIn ? (
                <button type="button" className="ch__signin" aria-label="Connect wallet" onClick={() => onSignIn()}>
                  Connect wallet
                </button>
              ) : (
                <a className="ch__signin" href={accountHref} aria-label="Connect wallet">
                  Connect wallet
                </a>
              )
            ) : null}
          </div>
        ) : null}
      </aside>

      <main id="ch-main" className="ch__main">{children}</main>
    </div>
  );
}
