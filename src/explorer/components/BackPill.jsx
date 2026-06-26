import "./backpill.css";

export default function BackPill({ label = "BACK", onClick, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={"backpill" + (className ? " " + className : "")}
      aria-label={label}
      onClick={onClick}
      {...rest}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          d="M15 6l-6 6 6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
