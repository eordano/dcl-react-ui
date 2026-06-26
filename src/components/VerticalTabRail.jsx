import "./verticaltabrail.css";

export default function VerticalTabRail({
  tabs,
  active,
  onChange,
  className = "",
  align = "center",
  ariaLabel,
}) {
  const keyOf = (t) => t.id ?? t.value;
  return (
    <nav
      className={"vtr" + (align === "top" ? " vtr--top" : "") + (className ? " " + className : "")}
      role="tablist"
      aria-orientation="vertical"
      aria-label={ariaLabel}
    >
      {tabs.map((t) => {
        const id = keyOf(t);
        const selected = id === active;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={"vtr__tab" + (selected ? " is-selected" : "")}
            onClick={() => onChange && onChange(id)}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
