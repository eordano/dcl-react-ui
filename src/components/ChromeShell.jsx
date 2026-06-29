import DappFooter from "./DappFooter.jsx";
import "./chromeshell.css";

export default function ChromeShell({
  className = "",
  ariaLabel,
  topbar,
  subnav = true,
  brand = null,
  tabs = [],
  active,
  onTab,
  tabsLabel,
  right = null,
  children,
  footer,
}) {
  return (
    <div className={"cs ui2" + (className ? " " + className : "")} role="region" aria-label={ariaLabel}>
      <a className="cs__skip" href="#cs-main">Skip to content</a>
      {topbar}

      {subnav ? (
        <header className="cs__nav">
          {brand ? <div className="cs__brand">{brand}</div> : null}

          <nav className="cs__tabs" aria-label={tabsLabel}>
            {tabs.map((tab) =>
              tab.href ? (
                <a
                  key={tab.id}
                  href={tab.href}
                  className={"cs__tab" + (tab.id === active ? " is-active" : "")}
                  aria-current={tab.id === active ? "page" : undefined}
                  onClick={() => onTab?.(tab.id)}
                >
                  {tab.icon ? <span className="cs__tabicon" aria-hidden="true">{tab.icon}</span> : null}
                  {tab.label}
                </a>
              ) : (
                <button
                  key={tab.id}
                  type="button"
                  className={"cs__tab" + (tab.id === active ? " is-active" : "")}
                  aria-current={tab.id === active ? "page" : undefined}
                  onClick={() => onTab?.(tab.id)}
                >
                  {tab.icon ? <span className="cs__tabicon" aria-hidden="true">{tab.icon}</span> : null}
                  {tab.label}
                </button>
              )
            )}
          </nav>

          {right ? <div className="cs__right">{right}</div> : null}
        </header>
      ) : null}

      <div className="cs__body" id="cs-main" tabIndex={-1}>
        {children}
        {footer === false ? null : footer ?? <DappFooter />}
      </div>
    </div>
  );
}
