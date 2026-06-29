import { useState } from "react";
import { asset } from "../../asset.js";
import { ChevronDown } from "../../atoms/icons.jsx";
import "./dcltopbar.css";

const LINK_DEFS = {
  explore: { id: "explore", label: "Explore", href: "/discover" },
  whatson: { id: "whatson", label: "What's On", href: "/discover" },
  shop: { id: "shop", label: "Shop", href: "/marketplace" },
  create: { id: "create", label: "Create", href: "/create" },
  learn: { id: "learn", label: "Learn", href: "/blog" },
  vote: { id: "vote", label: "Vote", href: "/governance" },
  events: { id: "events", label: "Events", href: "/discover" },
};

const BellMark = ({ size = 19 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

const BurgerMark = ({ open, size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
  </svg>
);

export const DCL_LINKS_BY_VARIANT = {
  default: ["explore", "shop", "create", "learn"].map((id) => LINK_DEFS[id]),
  dao: ["shop", "create", "learn", "vote", "events"].map((id) => LINK_DEFS[id]),
  sites: ["whatson", "shop", "create", "learn"].map((id) => LINK_DEFS[id]),
};

export const DCL_LINKS = DCL_LINKS_BY_VARIANT.default;

export default function DclTopBar({
  variant = "default",
  active = "shop",
  signedIn = false,
  mana = "2,480.55",
  account = "0x9f3c…7a21",
  transparent = false,
  onSignIn =(undefined),
  signInHref = "/marketplace/account",
}) {
  const links = DCL_LINKS_BY_VARIANT[variant] ?? DCL_LINKS_BY_VARIANT.default;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={"dtb" + (transparent ? " dtb--transparent" : "")} role="banner" aria-label="Decentraland">
      <a className="dtb__brand" href="/" aria-label="Decentraland">
        <img src={asset("assets/dcl-logo.png")} alt="" />
      </a>

      <button
        type="button"
        className="dtb__burger"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <BurgerMark open={menuOpen} />
      </button>

      <nav className="dtb__links" aria-label="Decentraland sections">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={"dtb__link" + (link.id === active ? " is-active" : "")}
            aria-current={link.id === active ? "page" : undefined}
          >
            {link.label}
            {link.caret && <ChevronDown size={13} className="dtb__linkcaret" />}
          </a>
        ))}
      </nav>

      <div className="dtb__right">
        {variant === "dao" && (
          <button type="button" className="dtb__download">DOWNLOAD</button>
        )}
        {signedIn ? (
          <>
            <button type="button" className="dtb__bell" aria-label="Notifications">
              <BellMark />
            </button>
            <button type="button" className="dtb__usermenu" aria-label="Account menu">
              <span className="dtb__avatar u-avatar" style={{ "--sz": "40px", "--hue": 268 }} />
            </button>
          </>
        ) : onSignIn ? (
          <button type="button" className="dtb__signin" onClick={() => onSignIn()}>SIGN IN</button>
        ) : (
          <a className="dtb__signin" href={signInHref} style={{ textDecoration: "none" }}>SIGN IN</a>
        )}
      </div>

      <nav className={"dtb__menu" + (menuOpen ? " is-open" : "")} aria-label="Decentraland sections">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={"dtb__menulink" + (link.id === active ? " is-active" : "")}
            aria-current={link.id === active ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
            {link.caret && <ChevronDown size={16} className="dtb__menucaret" />}
          </a>
        ))}
      </nav>
    </header>
  );
}
