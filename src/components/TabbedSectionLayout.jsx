import VerticalTabRail from "./VerticalTabRail.jsx";
import "./tabbedsectionlayout.css";

export default function TabbedSectionLayout({
  icon,
  title,
  titleAs = "h6",
  iconWrap = false,
  onClose,
  closeIcon,
  tabs = [],
  active,
  activeTab,
  onTabChange,
  tabAlign = "center",
  width = "default",
  radius = "lg",
  tint = false,
  firstChildPad = false,
  loading = false,
  loader,
  actions,
  open = true,
  className = "",
  paperLabel,
  children,
}) {
  if (!open) return null;
  const showTabs = tabs && tabs.length > 0;
  const activeKey = active !== undefined ? active : activeTab;
  const keyOf = (t) => t.id ?? t.value;
  const activeEntry = showTabs
    ? tabs.find((t) => keyOf(t) === activeKey)
    : undefined;
  const body = activeEntry && activeEntry.panel !== undefined ? activeEntry.panel : children;

  const Title = titleAs === "span" ? "span" : "h6";

  const rootClass =
    "tsl" +
    (tint ? " tsl--tint" : "") +
    (firstChildPad ? " tsl--firstpad" : "") +
    (className ? " " + className : "");

  return (
    <div className={rootClass} role="presentation">
      <div
        className={
          "tsl__paper tsl__paper--" + width + " tsl__paper--r" + radius
        }
        role="dialog"
        aria-modal="true"
        aria-label={paperLabel || title}
      >
        <header className="tsl__header">
          <div className="tsl__headtitle">
            {icon ? (
              iconWrap ? (
                <span className="tsl__headicon">{icon}</span>
              ) : (
                icon
              )
            ) : null}
            <Title className="tsl__titletext">{title}</Title>
          </div>
          {onClose ? (
            <button type="button" className="tsl__close" aria-label="close" onClick={onClose}>
              {closeIcon || (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </button>
          ) : null}
        </header>

        <div className="tsl__layoutrow">
          {showTabs ? (
            <VerticalTabRail
              tabs={tabs}
              active={activeKey}
              onChange={onTabChange}
              align={tabAlign}
              ariaLabel={title}
            />
          ) : null}

          <div className="tsl__content">
            {loading ? (
              <div className="tsl__loaderwrap">{loader}</div>
            ) : (
              <>
                {body}
                {actions ? <div className="tsl__actions">{actions}</div> : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
