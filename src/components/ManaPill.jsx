import ManaMark from "../atoms/ManaMark.jsx";
import "./manapill.css";

export default function ManaPill({ value = "2,480.55", className = "" }) {
  return (
    <span className={"u-manapill" + (className ? " " + className : "")} title="MANA balance">
      <ManaMark size={14} className="u-manapill__mark" />
      {value}
    </span>
  );
}
