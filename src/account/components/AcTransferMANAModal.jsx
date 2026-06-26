import { useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import "./actransfermanamodal.css";

const DEFAULT_BALANCES = { eth: 1204.3, matic: 1276.25 };

const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function CloseButton({ onClick }) {
  return (
    <button type="button" className="actmm__close" aria-label="Close" onClick={onClick}>
      <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
        <path
          d="M1 1l12 12M13 1L1 13"
          stroke="#16141a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default function AcTransferMANAModal({
  network = "ethereum",
  loading = false,
  initialAmount = 0,
  initialTo = "",
  forceError = null,
  manaPrice = 0.39,
  balances = DEFAULT_BALANCES,
  onClose,
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [to, setTo] = useState(initialTo);
  const [toError, setToError] = useState(
    forceError === "invalid_address"
      ? "Invalid Address"
      : forceError === "invalid_char"
        ? "Invalid character for an Address"
        : "",
  );

  const isMatic = network === "matic";
  const balance = isMatic ? balances.matic : balances.eth;

  const handleSetAmount = (e) => {
    const raw = e.currentTarget.value;
    if (raw.length === 0) {
      setAmount(0);
      return;
    }
    const intValue = parseInt(raw, 10);
    if (!Number.isNaN(intValue)) setAmount(intValue);
  };

  const handleSetTo = (e) => {
    const value = e.currentTarget.value;
    if (/^[0-9a-fA-Fx]{0,42}$/.test(value)) {
      setToError("");
      setTo(value);
    } else {
      setToError("Invalid character for an Address");
    }
  };

  const handleMax = () => setAmount(Math.floor(balance));

  const handleSend = () => {
    if (!/^0x[0-9a-fA-F]{40}$/.test(to)) {
      setToError("Invalid Address");
    } else {
      setToError("");
    }
  };

  const isDisabledByAmount =
    forceError === "no_balance" ? true : balance < amount;
  const sendDisabled = amount <= 0 || isDisabledByAmount;

  return (
    <AccountChrome>
      <div className="actmm__scrim" role="presentation" onClick={onClose}>
        <div
          className="actmm"
          role="dialog"
          aria-modal="true"
          aria-label="Send Tokens"
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose} />

          <header className="actmm__header">
            <div className="actmm__title">Send Tokens</div>
            <div className="actmm__subtitle">Send Tokens to the desired Wallet</div>
          </header>

          <div className="actmm__content">
            <div className="actmm__field">
              <div className="actmm__flabel">Amount</div>
              <div className="actmm__inputwrap">
                <input
                  className="actmm__input actmm__input--amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={amount === 0 ? "" : String(amount)}
                  onChange={handleSetAmount}
                  aria-label="Amount"
                />
                <button type="button" className="actmm__max" onClick={handleMax}>
                  Max
                </button>
              </div>
            </div>

            {isDisabledByAmount ? (
              <div className="actmm__amount-error">You don't have enough balance</div>
            ) : (
              <div className="actmm__usd-amount">
                {(amount * manaPrice).toFixed(2)} USD
              </div>
            )}

            <div className={"actmm__field" + (toError ? " is-error" : "")}>
              <div className="actmm__flabel">Wallet</div>
              <div className="actmm__inputwrap">
                <input
                  className="actmm__input actmm__input--wallet"
                  type="text"
                  placeholder="0x0000...0000"
                  value={to}
                  onChange={handleSetTo}
                  aria-label="Wallet"
                />
              </div>
              {toError ? <div className="actmm__message">{toError}</div> : null}
            </div>

            <div className="actmm__fees-warning">
              {network === "ethereum"
                ? "Remember, any transaction that moves assets within, to, or from the Ethereum blockchain will incur gas fees. Only transactions conducted exclusively on Polygon are gas-less."
                : null}
            </div>

            <button
              type="button"
              className={
                "actmm__send" +
                (isMatic ? " actmm__send--matic" : "") +
                (loading ? " is-loading" : "")
              }
              onClick={handleSend}
              disabled={sendDisabled || loading}
            >
              {loading ? (
                <span className="actmm__spinner" aria-hidden="true" />
              ) : (
                "Send Tokens"
              )}
            </button>
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
