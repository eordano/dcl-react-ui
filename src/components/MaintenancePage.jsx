import CardGrid from "./CardGrid.jsx";
import "./maintenancepage.css";

const DEFAULT_AREAS = [
  {
    key: "marketplace",
    icon: "🛍️",
    title: "Marketplace",
    desc: "Shop wearables, emotes & unique names.",
    href: "https://decentraland.org/marketplace",
    tint: "var(--brand)",
  },
  {
    key: "places",
    icon: "🗺️",
    title: "Places",
    desc: "Explore live worlds and scenes to visit.",
    href: "https://decentraland.org/places",
    tint: "var(--accent)",
  },
  {
    key: "builder",
    icon: "🏗️",
    title: "Builder",
    desc: "Build scenes and manage your LAND.",
    href: "https://decentraland.org/builder",
    tint: "var(--gold)",
  },
  {
    key: "create",
    icon: "🎨",
    title: "Creator Hub",
    desc: "Make your own wearables, emotes & scenes.",
    href: "https://decentraland.org/create",
    tint: "var(--purple)",
  },
  {
    key: "governance",
    icon: "🏛️",
    title: "Governance",
    desc: "Vote on proposals and shape the DAO.",
    href: "https://decentraland.org/governance",
    tint: "var(--success)",
  },
  {
    key: "blog",
    icon: "📰",
    title: "Blog",
    desc: "Catch up on the latest news & updates.",
    href: "https://decentraland.org/blog",
    tint: "var(--online)",
  },
];

function Arrow() {
  return (
    <svg
      className="maintenance__cardarrow"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        d="M6 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AreaCard({ icon, title, desc, href, tint }) {
  return (
    <a
      className="maintenance__card"
      style={tint ? { "--mt": tint } : undefined}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="maintenance__cardicon" aria-hidden="true">
        {icon}
      </span>
      <span className="maintenance__cardbody">
        <span className="maintenance__cardtitle">
          {title}
          <Arrow />
        </span>
        <span className="maintenance__carddesc">{desc}</span>
      </span>
    </a>
  );
}

export default function MaintenancePage({
  title = "We'll be right back",
  description = "Decentraland is currently under maintenance. We're polishing things up and will be back online shortly.",
  sign = false,
  surface,
  footer,
  areas = DEFAULT_AREAS,
  areasTitle = "While you wait, explore Decentraland",
  showAreas = true,
  className = "",
}) {
  const Sign = () => (
    <span className="maintenance__sign" aria-hidden="true">
      🚧
    </span>
  );

  const hasAreas = showAreas && areas && areas.length > 0;

  return (
    <div
      className={
        "maintenance" +
        (surface ? " maintenance--" + surface : "") +
        (hasAreas ? " maintenance--areas" : "") +
        (footer ? " maintenance--withfooter" : "") +
        (className ? " " + className : "")
      }
    >
      <div className="maintenance__body">
        <div className="maintenance__page">
          <div className="maintenance__center" role="status" aria-live="polite">
            <span className="maintenance__badge">
              <Sign />
              Maintenance
            </span>
            <p
              className={
                "maintenance__title" + (sign ? " maintenance__title--sign" : "")
              }
            >
              {sign ? <Sign /> : null}
              {title}
              {sign ? <Sign /> : null}
            </p>
            {description ? (
              <p className="maintenance__text">{description}</p>
            ) : null}
          </div>
        </div>

        {hasAreas ? (
          <nav className="maintenance__areas" aria-label="Explore Decentraland">
            {areasTitle ? (
              <p className="maintenance__areastitle">{areasTitle}</p>
            ) : null}
            <CardGrid className="maintenance__grid" min="248px" gap="14px">
              {areas.map((a) => (
                <AreaCard key={a.key || a.title} {...a} />
              ))}
            </CardGrid>
          </nav>
        ) : null}
      </div>

      {footer ? footer : null}
    </div>
  );
}
