import "./emptystate.css";

const CTA_VARIANT = {
  solid: "es__cta",
  outline: "es__cta es__cta--outline",
  ghost: "es__cta es__cta--ghost",
};

function Action({ label, onClick, href, variant = "solid", icon, ...rest }) {
  const cls = CTA_VARIANT[variant] || CTA_VARIANT.solid;
  const inner = (
    <>
      {icon ? <span className="es__ctaicon" aria-hidden="true">{icon}</span> : null}
      {label}
    </>
  );
  if (href != null) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}

const len = (v) => (typeof v === "number" ? v + "px" : v);

const VARIANT_CLASS = {
  inline: " es--inline",
  screen: " es--screen",
};

export default function EmptyState({
  icon,
  iconWash = false,
  title,
  titleAs: TitleTag = "h2",
  subtitle,
  actions,
  variant,
  tone,
  actionsGap,
  className = "",
  style,
  ...rest
}) {
  const cls =
    "es" +
    (VARIANT_CLASS[variant] || "") +
    (tone === "error" ? " es--error" : "") +
    (className ? " " + className : "");

  const gap = actionsGap != null ? actionsGap : tone === "error" ? 40 : undefined;
  const mergedStyle =
    gap != null ? { ...style, "--es-actions-gap": len(gap) } : style;

  const isActionList = Array.isArray(actions);

  return (
    <div className={cls} style={mergedStyle} {...rest}>
      {icon != null ? (
        <div
          className={"es__icon" + (iconWash ? " es__icon--wash" : "")}
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}

      {title != null ? <TitleTag className="es__title">{title}</TitleTag> : null}
      {subtitle != null ? <p className="es__sub">{subtitle}</p> : null}

      {isActionList ? (
        actions.length ? (
          <div className="es__actions">
            {actions.map((a, i) => (
              <Action key={i} {...a} />
            ))}
          </div>
        ) : null
      ) : actions != null ? (
        <div className="es__actions">{actions}</div>
      ) : null}
    </div>
  );
}
