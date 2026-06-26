import { useState } from "react";
import { Close } from "../../atoms/icons.jsx";
import "./acreceivemanamodal.css";

function Field({ value, placeholder, action, onAction, message }) {
  return (
    <div className="acrm__field">
      <div className="acrm__inputwrap">
        <input
          className="acrm__input"
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly
        />
        {action ? (
          <button type="button" className="acrm__action" onClick={onAction}>
            {action}
          </button>
        ) : null}
      </div>
      {message ? <div className="acrm__message-line">{message}</div> : null}
    </div>
  );
}

export default function AcReceiveMANAModal({
  address = "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
  onClose = () => {},
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000);
  };

  return (
    <div className="u-modal-overlay acrm" onClick={onClose}>
      <div
        className="acrm__card"
        role="dialog"
        aria-modal="true"
        aria-label="Receive Tokens"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="acrm__close"
          aria-label="Close"
          onClick={onClose}
        >
          <Close size={14} />
        </button>

        <header className="acrm__header">
          <div className="acrm__title">Receive Tokens</div>
        </header>

        <div className="acrm__content">
          <div className="acrm__message">
            If you want to receive tokens in this wallet you can do it by sharing
            your address
          </div>

          <Field
            value={`${address.slice(0, 6)}...${address.slice(-4)}`}
            placeholder="0x0000...0000"
            action="Copy"
            onAction={copyToClipboard}
            message={isCopied ? "Copied!" : ""}
          />
        </div>
      </div>
    </div>
  );
}
