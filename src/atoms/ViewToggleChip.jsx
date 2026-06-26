import "./viewtogglechip.css";

const GLYPHS = {
  grid: (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
};

export default function ViewToggleChip({
  view = "grid",
  active = false,
  onClick,
  className = "",
  ...rest
}) {
  return (
    <button
      type="button"
      className={
        "viewchip viewchip--" + view + (active ? " is-active" : "") +
        (className ? " " + className : "")
      }
      aria-label={view === "list" ? "List view" : "Grid view"}
      aria-pressed={active}
      onClick={onClick}
      {...rest}
    >
      {GLYPHS[view] || GLYPHS.grid}
    </button>
  );
}
