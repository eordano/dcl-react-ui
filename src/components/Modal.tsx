import type { AriaRole, CSSProperties, ReactNode } from "react";
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import "./modal.css";

type ModalProps = {
  children?: ReactNode;
  onClose?: () => void;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  role?: AriaRole;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showClose?: boolean;
};

export default function Modal({
  children,
  onClose,
  width = 420,
  className = "",
  style,
  ariaLabel,
  ariaLabelledBy,
  role = "dialog",
  closeOnBackdrop = true,
  closeOnEsc = true,
  showClose = true,
}: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const autoLabelId = useId();

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || ariaLabel || ariaLabelledBy) return;
    const heading = card.querySelector<HTMLElement>("h1, h2, h3, h4, h5, h6");
    if (!heading) return;
    if (!heading.id) heading.id = autoLabelId;
    card.setAttribute("aria-labelledby", heading.id);
    return () => {
      card.removeAttribute("aria-labelledby");
      if (heading.id === autoLabelId) heading.removeAttribute("id");
    };
  }, [ariaLabel, ariaLabelledBy, autoLabelId, children]);

  useEffect(() => {
    const prev = document.activeElement;
    cardRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { if (closeOnEsc) onClose?.(); return; }
      if (e.key !== "Tab" || !cardRef.current) return;
      const f = cardRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) { e.preventDefault(); cardRef.current.focus(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [onClose, closeOnEsc]);

  return (
    <div
      className="modal__backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={"modal__card" + (className ? " " + className : "")}
        style={{ width, ...style }}
        role={role} aria-modal="true" aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} tabIndex={-1} ref={cardRef}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && showClose ? (
          <button
            type="button"
            className="modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        ) : null}
        {children}
      </div>
    </div>
  );
}
