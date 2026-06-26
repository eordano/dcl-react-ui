import { useState } from "react";
import "./acdeleteaccountconfirmationmodal.css";

const CONFIRMATION_WORD = "DELETE";

const COPY = {
  title: "Are you sure you want to delete your account?",
  description:
    "This action is irreversible. All your data will be permanently deleted. To confirm, please type DELETE in the field below and confirm.",
  input_label: "Type DELETE",
  confirmation_placeholder: "DELETE",
  deleting: "Deleting...",
  delete: "Delete Account",
  cancel: "Cancel",
  generic_error: "Failed to delete your account. Please try again later.",
};

const WarningRoundedIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden="true">
    <path d="M2.73 20.29c-.77 0-1.25-.83-.87-1.5l9.27-15.99c.39-.67 1.35-.67 1.74 0l9.27 15.99c.38.67-.1 1.5-.87 1.5H2.73zM12 9c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1s1-.45 1-1v-3c0-.55-.45-1-1-1zm0 7.3a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
  </svg>
);

function ModalCard({
  address = "0x9f3c4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4",
  initialText = "",
  forceLoading = false,
  forceError = false,
  onClose = () => {},
}) {
  const [confirmationText, setConfirmationText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(forceLoading);
  const [error, setError] = useState(forceError ? COPY.generic_error : null);

  const isConfirmed = confirmationText === CONFIRMATION_WORD;
  const canDismiss = !isLoading;

  function handleDelete() {
    if (!address || !isConfirmed || isLoading) return;
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      if (Math.random() < 0.5) {
        setError(COPY.generic_error);
        setIsLoading(false);
      }
    }, 1100);
  }

  return (
    <div className="acdacm__card" role="dialog" aria-modal="true" aria-label={COPY.title}>
      <button
        type="button"
        className="acdacm__close"
        onClick={onClose}
        disabled={!canDismiss}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      <div className="acdacm__content">
        <div className="acdacm__icon-wrap">
          <div className="acdacm__icon-circle">
            <span className="acdacm__icon">
              <WarningRoundedIcon />
            </span>
          </div>
        </div>

        <h2 className="acdacm__title">{COPY.title}</h2>
        <p className="acdacm__desc">{COPY.description}</p>

        {error && <div className="acdacm__error">{error}</div>}

        <label className="acdacm__field">
          <span className="acdacm__field-label">{COPY.input_label}</span>
          <input
            type="text"
            className="acdacm__input"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder={COPY.confirmation_placeholder}
            disabled={isLoading}
            autoComplete="off"
          />
        </label>

        <div className="acdacm__buttons">
          <button
            type="button"
            className="acdacm__btn acdacm__btn--cancel"
            onClick={onClose}
            disabled={!canDismiss}
          >
            {COPY.cancel}
          </button>
          <button
            type="button"
            className="acdacm__btn acdacm__btn--delete"
            onClick={handleDelete}
            disabled={!isConfirmed || isLoading}
          >
            {isLoading ? COPY.deleting : COPY.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcDeleteAccountConfirmationModal({
  state = "default",
  address = "0x9f3c4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4",
  onClose = () => {},
}) {
  const cardProps = {
    address,
    onClose,
    initialText: state === "typed" || state === "loading" || state === "error" ? "DELETE" : "",
    forceLoading: state === "loading",
    forceError: state === "error",
  };

  return (
    <div className="acdacm">
      <div className="acdacm__backdrop">
        <ModalCard key={state} {...cardProps} />
      </div>
    </div>
  );
}
