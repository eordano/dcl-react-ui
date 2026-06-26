import { ChevronDown } from "../atoms/icons.jsx";
import "./accountchip.css";

export default function AccountChip({
  account = "0x9f3c…7a21",
  hue = 268,
  onClick,
  className = "",
}) {
  return (
    <button type="button" className={"u-chip" + (className ? " " + className : "")} onClick={onClick}>
      <span className="u-chip__avatar u-avatar" style={{ "--sz": "26px", "--hue": hue }} />
      <span className="u-chip__addr">{account}</span>
      <ChevronDown size={14} className="u-chip__caret" />
    </button>
  );
}
