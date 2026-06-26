import { useRef, useState } from "react";
import "./tabs.css";

export default function Tabs({ tabs, active, onChange, variant = "pill" }) {
  const [internal, setInternal] = useState(active ?? tabs[0]?.id);
  const cur = active ?? internal;
  const refs = useRef([]);
  function pick(id) { if (active === undefined) setInternal(id); onChange && onChange(id); }
  function onKey(e, i) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const d = e.key === "ArrowRight" ? 1 : -1;
    const next = (i + d + tabs.length) % tabs.length;
    pick(tabs[next].id);
    refs.current[next] && refs.current[next].focus();
  }
  return (
    <div className={"tabs" + (variant === "underline" ? " tabs--underline" : "")} role="tablist">
      {tabs.map((t, i) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === cur}
          tabIndex={t.id === cur ? 0 : -1}
          ref={(el) => (refs.current[i] = el)}
          className={"tabs__tab" + (t.id === cur ? " is-active" : "")}
          onClick={() => pick(t.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
