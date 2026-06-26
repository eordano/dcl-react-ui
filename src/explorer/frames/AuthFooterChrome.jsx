import "./authfooterchrome.css";

export default function AuthFooterChrome({
  version = "editor-version - Editor",
  onExit,
  onMute,
  onHelp,
  muted = false,
}) {
  return (
    <div className="authfoot">
      <div className="authfoot__row">
        <button className="authfoot__exit" type="button" aria-label="Exit" onClick={onExit}>
          <span>Exit</span>
          <svg
            className="authfoot__exit-glyph"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
            <path d="M14 12h7" />
            <path d="M18 8l4 4-4 4" />
          </svg>
        </button>
        <button
          className="authfoot__iconbtn"
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          onClick={onMute}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            <path
              d="M16 9a3 3 0 0 1 0 6M18.5 7a6 6 0 0 1 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="authfoot__iconbtn" type="button" aria-label="Help" onClick={onHelp}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17h.01"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <span className="authfoot__version">{version}</span>
    </div>
  );
}
