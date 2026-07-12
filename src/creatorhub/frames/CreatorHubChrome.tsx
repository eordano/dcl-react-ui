import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { asset } from "../../asset";
import { useChromeAuth } from "../../web/frames/chrome-auth";
import CreatorHubSyncChip from "../components/CreatorHubSyncChip";
import "./creatorhubchrome.css";

type NavItem = {
  id: string;
  group: string;
  label: string;
  href: string;
  icon: ReactNode;
  hint?: string;
  secondary?: boolean;
  external?: boolean;
};

export const CREATORHUB_NAV: NavItem[] = [
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
    href: "https://builder.decentraland.org/land",
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
    href: "https://builder.decentraland.org/names",
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

type NavGroup = { group: string; items: { item: NavItem; i: number }[] };

function buildNavGroups(nav: NavItem[]): NavGroup[] {
  return nav.reduce<NavGroup[]>((groups, item, i) => {
    const last = groups[groups.length - 1];
    if (last && last.group === item.group) last.items.push({ item, i });
    else groups.push({ group: item.group, items: [{ item, i }] });
    return groups;
  }, []);
}

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

function shortAddress(addr: string): string {
  return addr && addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

const avatarStyle: CSSProperties & { "--sz": string; "--hue": number } = {
  "--sz": "32px",
  "--hue": 212,
};

function AccountAvatar({ src }: { src?: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <span className="ch__avatar u-avatar" style={avatarStyle}>
      {src && !broken ? (
        <img
          className="u-avatar__img"
          src={src}
          alt=""
          width="32"
          height="32"
          loading="lazy"
          onError={() => setBroken(true)}
        />
      ) : null}
    </span>
  );
}

type CreatorHubChromeProps = {
  active?: string;
  committee?: boolean;
  onTab?: (id: string) => void;
  children?: ReactNode;
  signedIn?: boolean;
  account?: string;
  name?: string;
  avatarUrl?: string;
  onSettings?: () => void;
  onAccount?: () => void;
  onSignIn?: () => void;
  accountHref?: string;
  settingsHref?: string;
};

export default function CreatorHubChrome({
  active = "home",
  committee = false,
  onTab,
  children,
  signedIn,
  account,
  name,
  avatarUrl,
  onSettings,
  onAccount,
  onSignIn,
  accountHref = "/marketplace/account",
  settingsHref = "/creator-hub/settings",
}: CreatorHubChromeProps) {
  const auth = useChromeAuth();
  const nav = committee ? CREATORHUB_NAV : CREATORHUB_NAV.filter((item) => item.id !== "curate");
  const navGroups = buildNavGroups(nav);
  const isIn = signedIn ?? auth.signedIn;
  const acct = account ?? auth.account;
  const displayName = name ?? auth.name;
  const face = avatarUrl ?? auth.avatarUrl;
  const doSignIn = onSignIn ?? auth.onSignIn;
  const accountInner = (
    <>
      <AccountAvatar key={face || "hue"} src={face} />
      <span className="ch__accmeta">
        <span className="ch__accname">{displayName || "My Account"}</span>
        {acct ? <span className="ch__accaddr" title={acct}>{shortAddress(acct)}</span> : null}
      </span>
    </>
  );

  const accountLabel = `${displayName || "My Account"}${acct ? " " + shortAddress(acct) : ""}`;

  const newSceneOrigin =
    active === "scenes" || active === "templates" || active === "manage" ? active : "home";
  const newSceneHref = `/creator-hub/scene-editor?new=1&from=${newSceneOrigin}`;

  const showSettings = !!onSettings || !!settingsHref;
  const showAccount = isIn && (onAccount || accountHref);
  const showSignIn = !isIn && (doSignIn || accountHref);
  const showFoot = showSettings || showAccount || showSignIn;

  return (
    <div className="ch ui2" data-label="Creator Hub">
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

        <a className="ch__newbtn" href={newSceneHref} aria-label="New scene" title="New scene">
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <path d="M10 6.5v7M6.5 10h7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
          <span className="ch__navlabel">New scene</span>
        </a>

        <nav className="ch__nav" aria-label="Creator Hub sections">
          {navGroups.map((grp) => {
            const grpId = `ch-grp-${grp.group.toLowerCase()}`;
            return (
              <div className="ch__navgroup" role="group" aria-labelledby={grpId} key={grp.group}>
                <div className="ch__navcaption" id={grpId}>{grp.group}</div>
                {grp.items.map(({ item, i }) => {
                  const secondary = item.external || item.secondary;
                  const prev = nav[i - 1];
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
                      {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
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

        <CreatorHubSyncChip />

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
              doSignIn ? (
                <button type="button" className="ch__signin" aria-label="Sign in" onClick={() => doSignIn()}>
                  Sign in
                </button>
              ) : (
                <a className="ch__signin" href={accountHref} aria-label="Sign in">
                  Sign in
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
