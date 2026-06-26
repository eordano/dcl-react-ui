import Spinner from "../atoms/Spinner.jsx";
import "./redirectinterstitial.css";

function GemMark() {
  return (
    <svg className="rxi__gem" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="var(--brand)" />
      <path
        d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
        fill="#fff"
      />
    </svg>
  );
}

function RouteArrow() {
  return (
    <svg className="rxi__arrow" viewBox="0 0 24 16" aria-hidden="true">
      <path
        d="M2 8h18M15 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function RedirectInterstitial({
  title = "Redirecting…",
  text,
  fromPath,
  toPath,
  routeStyle = "mapping",
  chipTone = "brand",
  strikeFrom = false,
  showReplaceBadge = false,
  ctaLabel = "Continue",
  ctaHref = "/",
  ctaIcon,
  settled = false,
  spinnerSize = 34,
  surface = "dark",
  surfaceStyle,
  className = "",
}) {
  const showFrom = (routeStyle === "mapping" || routeStyle === "single") && fromPath;
  const showTo = routeStyle === "mapping" && toPath;

  return (
    <div
      className={"rxi rxi--" + surface + (className ? " " + className : "")}
      style={surfaceStyle}
    >
      {surface === "hero" ? <div className="rxi__bg" aria-hidden="true" /> : null}

      <div className="rxi__stage">
        <div className="rxi__inner" role="status" aria-live="polite">
          <GemMark />

          {!settled ? (
            <span className="rxi__spinner">
              <Spinner size={spinnerSize} />
            </span>
          ) : null}

          <h1 className="rxi__title">{title}</h1>
          {text ? <p className="rxi__text">{text}</p> : null}

          {routeStyle !== "none" && (showFrom || showTo) ? (
            <div
              className={"rxi__route" + (chipTone === "neutral" ? " rxi__route--neutral" : "")}
              aria-label="Redirect"
            >
              {showFrom ? (
                <code
                  className={"rxi__path rxi__path--from" + (strikeFrom ? " rxi__path--strike" : "")}
                  title={fromPath}
                >
                  {fromPath}
                </code>
              ) : null}
              {showFrom && showTo ? <RouteArrow /> : null}
              {showTo ? (
                <code className="rxi__path rxi__path--to" title={toPath}>
                  {toPath}
                </code>
              ) : null}
            </div>
          ) : null}

          {showReplaceBadge ? (
            <div className="rxi__replace" aria-hidden="true">
              <span className="rxi__dot" />
              <span className="rxi__replacet">
                redirected with&nbsp;<code className="rxi__flag">replace</code>
              </span>
            </div>
          ) : null}

          {ctaLabel ? (
            <a className="rxi__cta" href={ctaHref}>
              {ctaIcon ? (
                <span className="rxi__ctaicon" aria-hidden="true">
                  {ctaIcon}
                </span>
              ) : null}
              {ctaLabel}
              {!ctaIcon ? (
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path
                    d="M3 8h9M8.5 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              ) : null}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
