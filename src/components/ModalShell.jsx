import { useEffect, useRef } from "react";
import Modal from "./Modal.jsx";
import ModalTitle from "./ModalTitle.jsx";
import ModalActions from "./ModalActions.jsx";
import "./modalshell.css";

const SIZES = {
  sm: 420,
  tiny: 420,
  md: 540,
  small: 540,
  lg: 720,
  large: 720,
  xl: 900,
};

export default function ModalShell({
  children,
  onClose,
  width,
  size = "sm",
  scrim = true,
  dismissOnScrim = true,
  className = "",
  style,
  ariaLabel,
  role = "dialog",
  bodyless = false,
  bodyClassName = "",
  header,
  title,
  subtitle,
  icon,
  onBack,
  closeButton = true,
  centeredTitle = false,
  headerAs,
  titleAs,
  titleClassName,
  headerClassName,
  closeClassName,
  closeSize,
  backClassName,
  actions,
  actionsEqual = false,
  actionsDirection = "row",
  actionsAlign = "stretch",
  actionsLead,
  actionsClassName,
}) {
  const resolvedWidth = width != null ? width : SIZES[size] || SIZES.sm;
  const cardClassName = "modal-shell" + (className ? " " + className : "");

  const hasAutoHeader =
    title != null || subtitle != null || icon != null || onBack != null;
  const headerNode =
    header != null ? (
      header
    ) : hasAutoHeader ? (
      <ModalTitle
        title={title}
        subtitle={subtitle}
        icon={icon}
        onBack={onBack}
        onClose={closeButton ? onClose : undefined}
        centered={centeredTitle}
        as={headerAs}
        titleAs={titleAs}
        className={headerClassName}
        titleClassName={titleClassName}
        closeClassName={closeClassName}
        backClassName={backClassName}
        closeSize={closeSize}
      />
    ) : null;

  const footerNode =
    actions != null ? (
      <ModalActions
        equal={actionsEqual}
        direction={actionsDirection}
        align={actionsAlign}
        lead={actionsLead}
        className={actionsClassName}
      >
        {actions}
      </ModalActions>
    ) : null;

  const body = bodyless ? (
    children
  ) : (
    <div className={"modal-shell__body" + (bodyClassName ? " " + bodyClassName : "")}>
      {children}
    </div>
  );

  const inner = (
    <>
      {headerNode}
      {body}
      {footerNode}
    </>
  );

  if (!scrim) {
    return (
      <ScrimlessCard
        onClose={onClose}
        width={resolvedWidth}
        className={cardClassName}
        style={style}
        ariaLabel={ariaLabel}
        role={role}
      >
        {inner}
      </ScrimlessCard>
    );
  }

  const scrimClose = dismissOnScrim ? onClose : undefined;

  return (
    <Modal
      onClose={scrimClose}
      width={resolvedWidth}
      className={cardClassName}
      style={style}
      ariaLabel={ariaLabel}
      role={role}
    >
      {inner}
    </Modal>
  );
}

function ScrimlessCard({ children, onClose, width, className, style, ariaLabel, role }) {
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
    <div
      className={"modal__card" + (className ? " " + className : "")}
      style={{ width, ...style }}
      role={role} aria-modal="true" aria-label={ariaLabel} tabIndex={-1} ref={cardRef}
    >
      {children}
    </div>
  );
}
