import "../atoms/primitives.css";

const len = (v) => (typeof v === "number" ? v + "px" : v);

const LINE_WIDTHS = ["70%", "40%", "55%", "30%"];

export default function CardSkeleton({ thumb = 220, radius = "var(--r-card)", lines = 2, className = "", ...rest }) {
  const showThumb = thumb !== 0 && thumb != null;
  return (
    <span
      className={"u-skel" + (className ? " " + className : "")}
      style={{ width: "100%" }}
      aria-busy="true"
      aria-label="Loading"
      {...rest}
    >
      {showThumb ? (
        <span className="u-skel__line" style={{ height: len(thumb), borderRadius: radius }} />
      ) : null}
      {Array.from({ length: lines }).map((_, i) => (
        <span className="u-skel__line" key={i} style={{ width: LINE_WIDTHS[i % LINE_WIDTHS.length] }} />
      ))}
    </span>
  );
}
