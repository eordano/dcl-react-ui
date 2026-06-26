import "./filterbox.css";

function Caret({ open }) {
  return (
    <svg
      className={"filterbox__caret" + (open ? " is-open" : "")}
      viewBox="0 0 16 16"
      width="13"
      height="13"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function FilterBox({
  title,
  open = false,
  onToggle,
  size = "caps",
  className = "",
  children,
}) {
  return (
    <div className={"filterbox filterbox--" + size + (className ? " " + className : "")}>
      <button type="button" className="filterbox__head" aria-expanded={open} onClick={onToggle}>
        <span className="filterbox__title">{title}</span>
        <Caret open={open} />
      </button>
      {open ? <div className="filterbox__body">{children}</div> : null}
    </div>
  );
}
