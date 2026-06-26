import { useEffect, useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import "./acimportwithdrawalmodal.css";

const COPY = {
  title: "Import Withdrawal",
  descriptionBefore:
    "Withdrawals are a 2-step process. You initialize a withdrawal with a Polygon transaction that burns your Polygon MANA, and after some minutes you are able to unlock your MANA tokens on Ethereum. We store the information from the first transaction on your device, and it's necessary to finish your withdrawal. If for some reason this information is lost (ie. you erase your browser's storage) or if you are finishing your withdrawal from a new device, you can use this screen to recover your withdrawal information by entering the hash of the withdrawal initialization transaction (in Polygon). You can see all your latest transaction on ",
  polygonscan: "Polygonscan",
  txLabel: "Tx Hash",
  importLabel: "Import",
  errors: {
    invalidHash: "Invalid Hash",
    duplicate: "This Withdrawal already exists on your list",
  },
};

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16">
    <path
      fill="currentColor"
      d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
    />
  </svg>
);

export default function AcImportWithdrawalModal({
  open = true,
  address = "0x9f3c8a2b1d4e5f6071829304a5b6c7d8e9f0a1b2",
  withdrawals = [
    {
      initializeHash:
        "0xa1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f901",
    },
  ],
  error,
  isLoading = false,
  onClose = () => {},
  onImport = () => {},
  onClearError = () => {},
}) {
  const [tx, setTx] = useState("");
  const [txError, setTxError] = useState(undefined);

  useEffect(() => {
    onClearError();
  }, [onClearError]);

  const polygonscanHref = `https://polygonscan.com/address/${address}#tokentxns`;

  const handleTxChange = (e) => {
    setTx(e.target.value.trim());
  };

  const validate = () => {
    if (!/^[0-9a-fA-Fx]{66}$/.test(tx)) {
      return COPY.errors.invalidHash;
    }
    if (withdrawals.some((w) => w.initializeHash === tx)) {
      return COPY.errors.duplicate;
    }
    return undefined;
  };

  const handleImport = () => {
    const validationError = validate();
    if (validationError) {
      setTxError(validationError);
      return;
    }
    setTxError(undefined);
    onImport(tx);
  };

  if (!open) return null;

  const message = !isLoading ? txError || error : undefined;
  const hasError = !isLoading && (!!txError || !!error);

  return (
    <AccountChrome>
      <div className="u-modal-overlay acimportwithdrawalmodal" role="presentation" onClick={onClose}>
        <div
          className="acimportwithdrawalmodal__card"
          role="dialog"
          aria-modal="true"
          aria-label={COPY.title}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="acimportwithdrawalmodal__close"
            aria-label="close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>

          <div className="acimportwithdrawalmodal__header">
            <div className="acimportwithdrawalmodal__title">{COPY.title} </div>
          </div>

          <div className="acimportwithdrawalmodal__content">
            <p className="acimportwithdrawalmodal__description">
              {COPY.descriptionBefore}
              <a
                href={polygonscanHref}
                target="_blank"
                rel="noreferrer"
                className="acimportwithdrawalmodal__link"
              >
                {COPY.polygonscan}
              </a>
            </p>

            <div
              className={
                "acimportwithdrawalmodal__field" +
                (hasError ? " acimportwithdrawalmodal__field--error" : "")
              }
            >
              <label className="acimportwithdrawalmodal__label">{COPY.txLabel}</label>
              <input
                className="acimportwithdrawalmodal__input"
                type="text"
                placeholder="0x0000...0000"
                value={tx}
                onChange={handleTxChange}
              />
              {message && (
                <div className="acimportwithdrawalmodal__message">{message}</div>
              )}
            </div>

            <button
              type="button"
              className="acimportwithdrawalmodal__button"
              onClick={handleImport}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="acimportwithdrawalmodal__spinner" aria-label="loading" />
              ) : (
                COPY.importLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
