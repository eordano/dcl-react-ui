import "./errorpopup.css";

function ErrorBadge() {
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#ff2d4b" />
      <rect x="18.4" y="9" width="3.2" height="14" rx="1.6" fill="#fff" />
      <circle cx="20" cy="29.5" r="2" fill="#fff" />
    </svg>
  );
}

export default function ErrorPopup() {
  return (
    <div className="er" role="alertdialog" aria-modal="true">
      <div className="er__icon"><ErrorBadge /></div>
      <h2 className="er__title">Error</h2>
      <p className="er__desc">Something went wrong while loading this scene.{"\n"}Please try again.</p>
      <div className="er__actions">
        <button className="er__primary">OK</button>
      </div>
    </div>
  );
}
