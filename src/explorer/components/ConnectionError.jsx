import GuardModal from "./GuardModal.jsx";
import "./connectionerror.css";

function NoSignalMark() {
  return (
    <span className="ce-mark">
      <svg viewBox="0 0 64 64" width="54" height="54" aria-hidden="true">
        <defs>
          <linearGradient id="ce-gem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff2d55" />
            <stop offset="1" stopColor="#ffb03a" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#ce-gem)" strokeWidth="6.5" strokeLinecap="round">
          <path d="M10 29 A31 31 0 0 0 54 29" />
          <path d="M17 36 A21 21 0 0 0 47 36" />
          <path d="M24 43 A11 11 0 0 0 40 43" />
        </g>
        <circle cx="32" cy="50" r="4" fill="url(#ce-gem)" />
        <line x1="14" y1="14" x2="52" y2="52" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        <line x1="14" y1="14" x2="52" y2="52" stroke="#1a1430" strokeWidth="4.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function ConnectionError() {
  return (
    <GuardModal
      width={460}
      icon={<NoSignalMark />}
      title="Connection Error"
      body="We were unable to connect to Decentraland. Please verify your connection and retry."
      actions={
        <div className="guard__actions--row">
          <button className="guard__btn guard__btn--dark">Exit Application</button>
          <button className="guard__btn guard__btn--primary">Continue</button>
        </div>
      }
    />
  );
}
