import { useEffect } from "react";
import DclLogomark from "../../atoms/DclLogomark.jsx";
import "./guard-modal.css";

export default function GuardModal({ icon, title, body, actions, width = 540, onClose }) {
  useEffect(() => {
    if (!onClose) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="guard__backdrop" role="dialog" aria-modal="true">
      <div className="guard__card" style={{ width }}>
        {icon && <div className="guard__icon">{icon}</div>}
        <h2 className="guard__title">{title}</h2>
        {body && <p className="guard__body">{body}</p>}
        <div className="guard__actions">{actions}</div>
      </div>
    </div>
  );
}

export function DclMark({ size = 64 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #ff2d55, #ffb03a)",
        color: "#fff",
      }}
    >
      <DclLogomark size={Math.round(size * 0.54)} />
    </span>
  );
}
