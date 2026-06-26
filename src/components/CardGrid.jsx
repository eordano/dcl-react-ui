import "./cardgrid.css";

const len = (v) => (typeof v === "number" ? v + "px" : v);

const COL_KEYS = { base: "--cg-cols", lg: "--cg-cols-lg", md: "--cg-cols-md" };

export default function CardGrid({
  min = "240px",
  gap = "16px",
  cols,
  minHeight,
  className = "",
  style,
  children,
  ...rest
}) {
  const fixed = cols != null;
  const vars = { "--cg-gap": len(gap) };

  if (!fixed) {
    vars["--cg-min"] = len(min);
  } else if (typeof cols === "object") {
    for (const k in COL_KEYS) {
      if (cols[k] != null) vars[COL_KEYS[k]] = String(cols[k]);
    }
  } else {
    vars["--cg-cols"] = String(cols);
  }
  if (minHeight != null) vars["--cg-minh"] = len(minHeight);

  const cls =
    "cardgrid" +
    (fixed ? " cardgrid--fixed" : "") +
    (minHeight != null ? " cardgrid--reserve" : "") +
    (className ? " " + className : "");

  return (
    <div className={cls} style={{ ...style, ...vars }} {...rest}>
      {children}
    </div>
  );
}
