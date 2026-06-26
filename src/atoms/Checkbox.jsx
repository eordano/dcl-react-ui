import { useState } from "react";
import "./checkbox.css";

export default function Checkbox({ checked, defaultChecked = false, onChange, children }) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  function toggle() {
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  }

  return (
    <label className="checkbox">
      <input
        type="checkbox" className="checkbox__input"
        checked={on} onChange={toggle}
      />
      <span className={"checkbox__box" + (on ? " is-checked" : "")}>
        {on && (
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="#ff743a" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="checkbox__label">{children}</span>
    </label>
  );
}
