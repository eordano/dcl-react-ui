import "./spinner.css";

export default function Spinner({ size = 28, color }) {
  const style = { "--sz": size + "px" };
  if (color) style["--spinner-arc"] = color;
  return (
    <span className="spinner" style={style} role="status" aria-label="Loading">
      <svg viewBox="0 0 50 50" width={size} height={size}>
        <circle className="spinner__track" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        <circle className="spinner__arc" cx="25" cy="25" r="20" fill="none" strokeWidth="5"
          strokeLinecap="round" strokeDasharray="90 160" />
      </svg>
    </span>
  );
}
