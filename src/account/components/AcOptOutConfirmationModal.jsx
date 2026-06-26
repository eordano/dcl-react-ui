import { useState } from "react";
import { Close } from "../../atoms/icons.jsx";
import "./acoptoutconfirmationmodal.css";

const COPY = {
  warning: "Leave Marketplace Credits?",
  description: "You'll stop earning weekly credits. You can rejoin at any time.",
  cancel: "Cancel",
  confirm: "Leave Program",
  errors: {
    generic: "Couldn't leave the program right now. Please try again.",
    already_claimed:
      "You can't leave this week because you've already claimed credits. Please try again next week.",
  },
};

const CLAIMED_CREDITS_PATTERN = "cannot unregister after claiming credits";
function getErrorMessage(error) {
  if (!error) return null;
  if (error.toLowerCase().includes(CLAIMED_CREDITS_PATTERN)) {
    return COPY.errors.already_claimed;
  }
  return COPY.errors.generic;
}

function WarningAmberRounded({ size = 48 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 5.99 19.53 19H4.47L12 5.99M12 2c-.36 0-.71.19-.9.52L1.21 18.51c-.39.67.09 1.49.86 1.49h19.86c.77 0 1.25-.82.86-1.49L12.9 2.52A1.04 1.04 0 0 0 12 2zm1 14h-2v2h2v-2zm0-7h-2v5h2V9z" />
    </svg>
  );
}

export default function AcOptOutConfirmationModal({
  error = null,
  isLoading = false,
  onClose = () => {},
  onOptOut = () => {},
}) {
  const [submitting, setSubmitting] = useState(isLoading);
  const loading = isLoading || submitting;

  const translatedError = getErrorMessage(error);

  const handleOptOut = () => {
    setSubmitting(true);
    onOptOut();
  };

  return (
    <div className="u-modal-overlay acooc" onClick={onClose}>
      <div
        className="acooc__card"
        role="dialog"
        aria-modal="true"
        aria-label={COPY.warning}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="acooc__close"
          aria-label="Close"
          onClick={onClose}
        >
          <Close size={20} />
        </button>

        <div className="acooc__content">
          <div className="acooc__iconwrap">
            <WarningAmberRounded size={48} />
          </div>

          <div className="acooc__warning">{COPY.warning}</div>
          <div className="acooc__description">{COPY.description}</div>

          {translatedError ? (
            <div className="acooc__error">{translatedError}</div>
          ) : null}

          <div className="acooc__buttons">
            <button
              type="button"
              className="acooc__btn acooc__btn--cancel"
              onClick={onClose}
              disabled={loading}
            >
              {COPY.cancel}
            </button>
            <button
              type="button"
              className="acooc__btn acooc__btn--confirm"
              onClick={handleOptOut}
              disabled={loading}
            >
              {loading ? "Loading..." : COPY.confirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
