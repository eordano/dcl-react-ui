import { useState } from "react";
import { Close } from "../../atoms/icons.jsx";
import "./acwithdrawalstatusmodal.css";

const STATUS = { PENDING: "pending", CHECKPOINT: "checkpoint", COMPLETE: "complete" };

function LinkWrapper({ href, children }) {
  return (
    <a className="acws__link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalIcon />
    </a>
  );
}

function ExternalIcon() {
  return (
    <svg className="acws__exticon" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path
        d="M14 4h6v6M20 4l-9 9M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusCheck({ checked, disabled, children }) {
  return (
    <span className={"acws__check" + (disabled ? " is-disabled" : "")}>
      <span className={"acws__box" + (checked ? " is-checked" : "")}>
        {checked ? (
          <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
            <path
              d="M3 8.5l3 3 7-7"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span className="acws__checklabel">{children}</span>
    </span>
  );
}

function TinyLoader() {
  return <span className="acws__loader" role="status" aria-label="Loading" />;
}

export default function AcWithdrawalStatusModal({
  withdrawal = {
    initializeHash:
      "0x4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
    finalizeHash: null,
    status: STATUS.CHECKPOINT,
    from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
    amount: 1500,
    timestamp: 1718841600000,
  },
  cost = "0.0042",
  isLoadingCost = false,
  isLoading = false,
  isFinalizingWithdrawal = false,
  onFinishWithdrawal = () => {},
  onClose = () => {},
}) {
  const [w] = useState(withdrawal);
  const { status, amount, initializeHash, finalizeHash } = w;

  const isReadyToWithdraw =
    status === STATUS.CHECKPOINT || status === STATUS.COMPLETE;
  const isComplete = status === STATUS.COMPLETE;

  const initHref = "https://polygonscan.com/tx/" + initializeHash;
  const finalizeHref = finalizeHash
    ? "https://etherscan.io/tx/" + finalizeHash
    : null;

  return (
    <div className="u-modal-overlay acws" onClick={onClose}>
      <div
        className="acws__card"
        role="dialog"
        aria-modal="true"
        aria-label="Convert to Mana"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="acws__nav">
          <div className="acws__title">Convert to Mana</div>
          <button
            type="button"
            className="acws__close"
            aria-label="Close"
            onClick={onClose}
          >
            <Close size={14} />
          </button>
        </header>

        <div className="acws__content">
          <div className="acws__amount-placeholder">Amount</div>
          <div className="acws__amount">{amount} MANA</div>

          <div className="acws__status">
            <div className="acws__status-placeholder">Status</div>

            <LinkWrapper href={initHref}>
              <StatusCheck checked={true}>Withdrawal initialized</StatusCheck>
            </LinkWrapper>

            <div className="acws__ready">
              <StatusCheck checked={isReadyToWithdraw}>
                Ready to withdraw
              </StatusCheck>
              <div className="acws__ready-placeholder">
                Usually takes 30 minutes
              </div>
            </div>

            {finalizeHref ? (
              <LinkWrapper href={finalizeHref}>
                <StatusCheck checked={isComplete} disabled>
                  Complete withdrawal
                </StatusCheck>
              </LinkWrapper>
            ) : (
              <StatusCheck checked={isComplete} disabled>
                Complete withdrawal
              </StatusCheck>
            )}
          </div>

          {isReadyToWithdraw ? (
            isLoadingCost ? (
              <div className="acws__cost-loader">
                <TinyLoader />
              </div>
            ) : (
              <div className="acws__cost">
                The withdrawal process will cost approximately{" "}
                <b>{cost ?? "Unknown"} ETH</b> of gas fees.
                <br />
                Be sure to have enough ETH in your wallet to cover the withdrawal
                or the transaction will fail. Gas fees might vary depending on the
                network congestion.
              </div>
            )
          ) : null}

          {isComplete && !isFinalizingWithdrawal ? (
            <button
              type="button"
              className="acws__cta"
              onClick={onClose}
            >
              Done
            </button>
          ) : (
            <button
              type="button"
              className={
                "acws__cta acws__cta--network" +
                (isLoading || isFinalizingWithdrawal ? " is-loading" : "")
              }
              disabled={
                status === STATUS.PENDING || isLoading || isFinalizingWithdrawal
              }
              onClick={() => onFinishWithdrawal(w)}
            >
              {isLoading || isFinalizingWithdrawal ? (
                <TinyLoader />
              ) : (
                <>
                  <EthMark />
                  Complete Withdrawal
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EthMark() {
  return (
    <svg className="acws__ethmark" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M12 2 5 12l7 4 7-4L12 2Z" fill="currentColor" opacity=".85" />
      <path d="M5 13.5 12 22l7-8.5-7 4-7-4Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
