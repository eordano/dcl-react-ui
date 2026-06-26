import Button from "../../atoms/Button.jsx";
import "./duplicateidentity.css";

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l9.5 16.5H2.5L12 3z" /><path d="M12 10v5M12 18.5h.01" />
    </svg>
  );
}

export default function DuplicateIdentityPopup() {
  return (
    <div className="di__scrim">
      <div className="di__behind" aria-hidden="true">
        <div className="di__behind-top">
          <span className="di__behind-logo" />
          <span className="di__behind-tabs">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="di__behind-tab" />
            ))}
          </span>
          <span className="di__behind-avatar" />
        </div>
        <div className="di__behind-side">
          <span className="di__behind-side-title" />
          <span className="di__behind-side-line" />
          <span className="di__behind-side-line short" />
          <span className="di__behind-illus" />
        </div>
        <div className="di__behind-main">
          <div className="di__behind-header">
            <span className="di__behind-h1" />
            <span className="di__behind-create" />
            <span className="di__behind-search" />
          </div>
          <div className="di__behind-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="di__behind-tile">
                <span className="di__behind-tile-name" />
                <span className="di__behind-tile-join" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="di__dim" aria-hidden="true" />
      <div className="di" role="alertdialog" aria-modal="true">
        <div className="di__icon"><WarningIcon /></div>
        <h2 className="di__title">Session Ended</h2>
        <p className="di__desc">Your Session was ended because your account logged from another location.</p>
        <div className="di__actions">
          <Button variant="secondary" className="di__exit">EXIT APPLICATION</Button>
        </div>
      </div>
    </div>
  );
}
