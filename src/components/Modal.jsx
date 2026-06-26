import { useEffect, useRef } from "react";
import "./modal.css";

export default function Modal({
  children,
  onClose,
  width = 420,
  className = "",
  style,
  ariaLabel,
  role = "dialog",
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    cardRef.current && cardRef.current.focus();
    function onKey(e) {
      if (e.key === "Escape") { onClose && onClose(); return; }
      if (e.key !== "Tab" || !cardRef.current) return;
      const f = cardRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) { e.preventDefault(); cardRef.current.focus(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev && prev.focus && prev.focus();
    };
  }, [onClose]);

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div
        className={"modal__card" + (className ? " " + className : "")}
        style={{ width, ...style }}
        role={role} aria-modal="true" aria-label={ariaLabel} tabIndex={-1} ref={cardRef}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
