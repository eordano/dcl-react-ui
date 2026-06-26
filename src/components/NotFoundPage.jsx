import Spinner from "../atoms/Spinner.jsx";
import "./notfoundpage.css";

export default function NotFoundPage({
  code = "404",
  codeVariant = "text",
  title = "Page not found",
  subtitle = "Sorry, we couldn't find the page you were looking for.",
  ctaLabel,
  ctaHref,
  onCta,
  secondaryLabel,
  secondaryHref,
  onSecondary,
  ctaIcon,
  secondaryIcon,
  surface = "dark",
  surfaceStyle,
  loading = false,
  spinnerSize = 58,
  className = "",
}) {
  const rootClass =
    "notfound notfound--" + surface + (className ? " " + className : "");

  if (loading) {
    return (
      <div
        className={rootClass + " notfound--loading"}
        style={surfaceStyle}
        role="status"
        aria-live="polite"
      >
        <div className="notfound__loader">
          <Spinner size={spinnerSize} />
          <span className="notfound__sr">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className={rootClass} style={surfaceStyle}>
      <div className="notfound__center">
        {codeVariant === "glyph" && code ? (
          <div className="notfound__glyph" aria-hidden="true">
            <svg viewBox="0 0 240 96" width="240" height="96">
              <text x="120" y="78" textAnchor="middle" className="notfound__glyphtext">
                {code}
              </text>
            </svg>
          </div>
        ) : codeVariant !== "none" && code ? (
          <p className="notfound__code">{code}</p>
        ) : null}

        <h1 className="notfound__title">{title}</h1>
        {subtitle ? <p className="notfound__subtitle">{subtitle}</p> : null}

        {(ctaLabel || secondaryLabel) && (
          <div className="notfound__actions">
            {ctaLabel ? (
              <CtaButton
                label={ctaLabel}
                href={ctaHref}
                onClick={onCta}
                icon={ctaIcon}
                kind="primary"
              />
            ) : null}
            {secondaryLabel ? (
              <CtaButton
                label={secondaryLabel}
                href={secondaryHref}
                onClick={onSecondary}
                icon={secondaryIcon}
                kind="secondary"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function CtaButton({ label, href, onClick, icon, kind }) {
  const cls = "notfound__cta notfound__cta--" + kind;
  const inner = (
    <>
      {icon ? <span className="notfound__ctaicon" aria-hidden="true">{icon}</span> : null}
      {label}
    </>
  );
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        className={cls}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
