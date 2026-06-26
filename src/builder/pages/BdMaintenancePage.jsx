import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdmaintenancepage.css";
import { Caret } from "../../atoms/icons.jsx";

//   • Notice text uses the body --text color; the footer links/copyright use the
//     links) over a secondary row (social icons + "© Decentraland" copyright).

// over a secondary-footer (social-links + copyright). Labels are the component's
const FOOTER_LINKS = [
  { label: "Home", href: "https://decentraland.org" },
  { label: "Privacy Policy", href: "https://decentraland.org/privacy" },
  { label: "Terms of Use", href: "https://decentraland.org/terms" },
  { label: "Content Policy", href: "https://decentraland.org/content" },
  { label: "Code of Ethics", href: "https://decentraland.org/ethics" },
];

const SOCIAL_LINKS = [
  { id: "discord", label: "Discord", href: "https://discordapp.com/invite/9EcuFgC" },
  { id: "reddit", label: "Reddit", href: "https://reddit.com/r/decentraland" },
  { id: "github", label: "GitHub", href: "https://github.com/decentraland" },
  { id: "twitter", label: "Twitter", href: "https://twitter.com/decentraland" },
];

function MaintenanceFooter() {
  return (
    <footer className="bdmaintenancepage__footer">
      <div className="bdmaintenancepage__mainFooter">
        <button type="button" className="bdmaintenancepage__lang">
          English
          <Caret size={11} strokeWidth={1.6} />
        </button>
        <div className="bdmaintenancepage__links">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="bdmaintenancepage__secondaryFooter">
        <div className="bdmaintenancepage__social">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.id} href={s.href} aria-label={s.label}>
              <span className={"bdmaintenancepage__socialIcon is-" + s.id} />
            </a>
          ))}
        </div>
        <div className="bdmaintenancepage__copyright">© Decentraland</div>
      </div>
    </footer>
  );
}

export default function BdMaintenancePage({
  notice = "We're currently under maintainance, we'll be back soon!",
}) {
  return (
    <BuilderChrome active="" account="">
      <div className="bdmaintenancepage">
        <div className="bdmaintenancepage__page">
          <div className="bdmaintenancepage__center" role="status" aria-live="polite">
            <p className="bdmaintenancepage__notice">
              <span className="bdmaintenancepage__sign" aria-hidden="true">🚧</span>
              {notice}
              <span className="bdmaintenancepage__sign" aria-hidden="true">🚧</span>
            </p>
          </div>
        </div>
        <MaintenanceFooter />
      </div>
    </BuilderChrome>
  );
}
