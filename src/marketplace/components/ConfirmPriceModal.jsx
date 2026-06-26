import { useState } from "react";
import Modal from "../../components/Modal.jsx";
import Button from "../../atoms/Button.jsx";
import PriceField, { ManaMark } from "./PriceField.jsx";
import "./confirmpricemodal.css";

function normalize(n) {
  return parseFloat(String(n).replace(/,/g, "") || "0").toString();
}

export default function ConfirmPriceModal({
  price,
  children,
  body,
  warning,
  title = "Please confirm",
  reenterLabel = "Price",
  reenterPrompt = "Please re-enter the price to confirm:",
  error = "",
  loading = false,
  confirmLabel = "Proceed",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  width = 460,
}) {
  const [confirmed, setConfirmed] = useState("");
  const target = normalize(price);
  const isDisabled = loading || target !== confirmed;
  const close = loading ? undefined : onCancel;

  return (
    <Modal width={width} onClose={close} className="cpm__card">
      <div className="cpm">
        <div className="cpm__head">
          <h3 className="cpm__title">{title}</h3>
          <button type="button" className="cpm__close" aria-label="Close" onClick={close}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <div className="cpm__body">
          {children ?? body}
          {warning != null ? <p className="cpm__warn">{warning}</p> : null}
          <p className="cpm__prompt">{reenterPrompt}</p>
        </div>

        <label className="cpm__label" htmlFor="cpm-confirm">{reenterLabel}</label>
        <PriceField
          id="cpm-confirm"
          placeholder={target}
          value={confirmed}
          disabled={loading}
          onChange={(e) => setConfirmed(e.target.value)}
        />

        {error ? (
          <p className="cpm__err">
            <strong>Error</strong>
            {error}
          </p>
        ) : null}

        <div className="cpm__actions">
          <Button variant="secondary" className="cpm__cancel" disabled={loading} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" disabled={isDisabled} onClick={onConfirm}>
            {loading ? <span className="cpm__spin" aria-hidden="true" /> : null}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export { ManaMark };
