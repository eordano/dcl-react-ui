import { useState } from "react";
import "./searchfield.css";

export default function SearchField({
  value, defaultValue = "", placeholder = "Search", onChange,
}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const v = isControlled ? value : internal;

  function set(e) {
    const next = e.target.value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  return (
    <label className="search">
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" className="search__icon">
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        className="search__input" type="text" aria-label={placeholder}
        placeholder={placeholder} value={v} onChange={set}
      />
    </label>
  );
}
