import { useState } from "react";
import "./toggle.css";

export default function Toggle({ checked, defaultChecked = false, onChange }) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  function toggle() {
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={"toggle" + (on ? " is-on" : "")}
      onClick={toggle}
    >
      <span className="toggle__knob" />
    </button>
  );
}
