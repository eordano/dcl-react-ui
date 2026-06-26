import { useEffect, useRef, useState } from "react";
import "./dropdown.css";

export default function Dropdown({ options = [], value, defaultValue, onChange }) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]);
  const isControlled = value !== undefined;
  const cur = isControlled ? value : internal;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const id = useRef("dd" + Math.random().toString(36).slice(2, 8)).current;

  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) setActive(Math.max(0, options.indexOf(cur)));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function pick(opt) {
    if (!isControlled) setInternal(opt);
    onChange && onChange(opt);
    setOpen(false);
    btnRef.current && btnRef.current.focus();
  }

  function onKey(e) {
    if (e.key === "Escape") { if (open) { e.preventDefault(); setOpen(false); } return; }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) setOpen(true);
      else if (active >= 0) pick(options[active]);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      if (e.key === "Home") setActive(0);
      else if (e.key === "End") setActive(options.length - 1);
      else if (e.key === "ArrowDown") setActive((a) => Math.min(options.length - 1, a + 1));
      else setActive((a) => Math.max(0, a - 1));
    }
  }

  return (
    <div className={"dropdown" + (open ? " is-open" : "")} ref={ref} onKeyDown={onKey}>
      <button
        type="button" className="dropdown__btn" ref={btnRef}
        aria-haspopup="listbox" aria-expanded={open}
        aria-activedescendant={open && active >= 0 ? id + "-" + active : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dropdown__cur">{cur}</span>
        <svg viewBox="0 0 12 8" width="11" height="8" aria-hidden="true" className="dropdown__caret">
          <path d="M1 1.5L6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((opt, i) => (
            <li
              key={opt} id={id + "-" + i} role="option" aria-selected={opt === cur}
              className={"dropdown__opt" + (opt === cur ? " is-active" : "")}
              onClick={() => pick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
