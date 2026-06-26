import "./modaltitle.css";

export default function ModalTitle({
  title,
  subtitle,
  icon,
  onClose,
  onBack,
  closeLabel = "Close",
  backLabel = "Back",
  closeSize = 14,
  centered = false,
  as: Wrapper = "header",
  titleAs: TitleTag = "div",
  className = "",
  titleClassName = "",
  closeClassName = "",
  backClassName = "",
}) {
  return (
    <Wrapper
      className={
        "modal-title" +
        (centered ? " modal-title--centered" : "") +
        (className ? " " + className : "")
      }
    >
      {onBack ? (
        <button
          type="button"
          className={"modal-title__back" + (backClassName ? " " + backClassName : "")}
          aria-label={backLabel}
          onClick={onBack}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      ) : null}
      <div className="modal-title__text">
        <TitleTag className={"modal-title__title" + (titleClassName ? " " + titleClassName : "")}>
          {icon ? <span className="modal-title__icon" aria-hidden="true">{icon}</span> : null}
          {title}
        </TitleTag>
        {subtitle ? <div className="modal-title__subtitle">{subtitle}</div> : null}
      </div>
      {onClose ? (
        <button
          type="button"
          className={"modal-title__close" + (closeClassName ? " " + closeClassName : "")}
          aria-label={closeLabel}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" width={closeSize} height={closeSize} aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </Wrapper>
  );
}
