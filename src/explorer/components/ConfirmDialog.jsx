import { useEffect, useRef } from "react";
import "./confirmdialog.css";

export default function ConfirmDialog({
  title, body, confirmLabel = "Yes", cancelLabel = "No", danger = false,
  variant = "default",
  gradient = "teal",
  avatar,
  confirmTone,
  onConfirm, onCancel,
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    cardRef.current && cardRef.current.focus();
    const onKey = (e) => { if (e.key === "Escape") onCancel && onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const isGradient = variant === "gradient";
  const cardCls =
    "cfd" +
    (isGradient ? " cfd--gradient cfd--grad-" + gradient : "") +
    (isGradient && avatar ? " cfd--has-top" : "");

  const tone = confirmTone || (danger ? "danger" : "");

  return (
    <div className="cfd__scrim" onClick={onCancel}>
      <div className={cardCls} role="alertdialog" aria-modal="true" tabIndex={-1} ref={cardRef} onClick={(e) => e.stopPropagation()}>
        {isGradient && avatar && (
          typeof avatar === "string"
            ? <img className="cfd__avatar" src={avatar} alt="" aria-hidden="true" />
            : <div className="cfd__top" aria-hidden="true">{avatar}</div>
        )}
        {title && <h2 className="cfd__title">{title}</h2>}
        {body && <p className="cfd__body">{body}</p>}
        <div className="cfd__actions">
          <button className="cfd__cancel" onClick={onCancel}>{cancelLabel}</button>
          <button className={"cfd__confirm" + (tone ? " is-" + tone : "")} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
