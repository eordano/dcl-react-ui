import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chmodalwarning.css";

const COPY = {
  title: "Warning",
  message:
    "This scene includes code elements that may only become visible once the scene is running",
  dontShowAgain: "Don't show this warning again",
  cancel: "Cancel",
  continue: "Continue",
};

function Checkbox({ checked, onClick }) {
  return (
    <span
      className={
        "chmodalwarning__checkbox" + (checked ? " is-checked" : "")
      }
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
    >
      {checked ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M5 12.5l4.2 4.2L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

export default function ChModalWarning({
  open = true,
  dontShowAgain = false,
  loading = false,
  onClose = () => {},
}) {
  const [checked, setChecked] = useState(dontShowAgain);
  const [isLoading, setIsLoading] = useState(loading);

  if (!open) {
    return <CreatorHubChrome active="scenes" />;
  }

  const handleContinue = () => {
    if (isLoading) return;
    setIsLoading(true);
    onClose(true);
  };

  return (
    <CreatorHubChrome active="scenes">
      <div className="chmodalwarning__backdrop">
        <div
          className="chmodalwarning__paper"
          role="dialog"
          aria-modal="true"
          aria-label={COPY.title}
        >
          <div className="chmodalwarning__box">
            <h5 className="chmodalwarning__title">{COPY.title}</h5>

            <p className="chmodalwarning__message">{COPY.message}</p>

            <div className="chmodalwarning__checkbox-container">
              <label
                className="chmodalwarning__form-label"
                onClick={() => setChecked((v) => !v)}
              >
                <Checkbox checked={checked} />
                <span className="chmodalwarning__form-label-text">
                  {COPY.dontShowAgain}
                </span>
              </label>
            </div>

            <div className="chmodalwarning__button-container">
              <button
                type="button"
                className="chmodalwarning__action-button chmodalwarning__action-button--outlined"
                onClick={() => onClose()}
              >
                {COPY.cancel}
              </button>
              <button
                type="button"
                className="chmodalwarning__action-button chmodalwarning__action-button--contained"
                onClick={handleContinue}
                disabled={isLoading}
              >
                {COPY.continue}
              </button>
            </div>
          </div>
        </div>
      </div>
    </CreatorHubChrome>
  );
}
