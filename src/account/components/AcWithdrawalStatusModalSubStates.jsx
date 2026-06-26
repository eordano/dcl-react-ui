import { Close } from "../../atoms/icons.jsx";
import "./acwithdrawalstatusmodalsubstates.css";

const STATUS = { PENDING: "pending", CHECKPOINT: "checkpoint", COMPLETE: "complete" };

const INIT_HASH =
  "0x4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8";
const FINAL_HASH =
  "0x7b2c4e1d8f6c0b7a2e9d1c4f8a6b3d05a721d9e4b5c6f8a0b1c2d3e4f5a6b7c8";

function LinkWrapper({ href, children }) {
  return (
    <a className="acwss__link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalIcon />
    </a>
  );
}

function ExternalIcon() {
  return (
    <svg className="acwss__exticon" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
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
    <span className={"acwss__check" + (disabled ? " is-disabled" : "")}>
      <span className={"acwss__box" + (checked ? " is-checked" : "")}>
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
      <span className="acwss__checklabel">{children}</span>
    </span>
  );
}

function EthMark() {
  return (
    <svg className="acwss__ethmark" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M12 2 5 12l7 4 7-4L12 2Z" fill="currentColor" opacity=".85" />
      <path d="M5 13.5 12 22l7-8.5-7 4-7-4Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}

function WithdrawalCard({ withdrawal, cost = "0.0042" }) {
  const { status, amount, initializeHash, finalizeHash } = withdrawal;

  const isReadyToWithdraw =
    status === STATUS.CHECKPOINT || status === STATUS.COMPLETE;
  const isComplete = status === STATUS.COMPLETE;

  const initHref = "https://polygonscan.com/tx/" + initializeHash;
  const finalizeHref = finalizeHash
    ? "https://etherscan.io/tx/" + finalizeHash
    : null;

  return (
    <div
      className="acwss__card"
      role="dialog"
      aria-modal="false"
      aria-label="Convert to Mana"
    >
      <header className="acwss__nav">
        <div className="acwss__title">Convert to Mana</div>
        <button type="button" className="acwss__close" aria-label="Close">
          <Close size={14} />
        </button>
      </header>

      <div className="acwss__content">
        <div className="acwss__amount-placeholder">Amount</div>
        <div className="acwss__amount">{amount} MANA</div>

        <div className="acwss__status">
          <div className="acwss__status-placeholder">Status</div>

          <LinkWrapper href={initHref}>
            <StatusCheck checked={true}>Withdrawal initialized</StatusCheck>
          </LinkWrapper>

          <div className="acwss__ready">
            <StatusCheck checked={isReadyToWithdraw}>Ready to withdraw</StatusCheck>
            <div className="acwss__ready-placeholder">Usually takes 30 minutes</div>
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
          <div className="acwss__cost">
            The withdrawal process will cost approximately <b>{cost ?? "Unknown"} ETH</b>{" "}
            of gas fees.
            <br />
            Be sure to have enough ETH in your wallet to cover the withdrawal or the
            transaction will fail. Gas fees might vary depending on the network
            congestion.
          </div>
        ) : null}

        {isComplete ? (
          <button type="button" className="acwss__cta">
            Done
          </button>
        ) : (
          <button
            type="button"
            className="acwss__cta acwss__cta--network"
            disabled={status === STATUS.PENDING}
          >
            <EthMark />
            Complete Withdrawal
          </button>
        )}
      </div>
    </div>
  );
}

const SUBSTATES = [
  {
    key: "initialized",
    label: "WithdrawInitialized",
    status: "PENDING",
    note: "Only the first step is checked. No cost block. The finalize button is disabled until the checkpoint is reached.",
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: STATUS.PENDING,
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
    cost: "0.0042",
  },
  {
    key: "ready",
    label: "ReadyToWithdraw",
    status: "CHECKPOINT",
    note: "Two steps checked. The grey withdrawal-cost block appears and the Complete Withdrawal button is armed.",
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: STATUS.CHECKPOINT,
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 942.75,
      timestamp: 1718841600000,
    },
    cost: "0.0051",
  },
  {
    key: "complete",
    label: "CompleteWithdrawal",
    status: "COMPLETE",
    note: "All three steps checked, the finalize tx links out to Etherscan, and the footer becomes a plain Done button.",
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: FINAL_HASH,
      status: STATUS.COMPLETE,
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
    cost: "0.0042",
  },
];

export default function AcWithdrawalStatusModalSubStates({
  only = null,
}) {
  const shown = only ? SUBSTATES.filter((s) => s.key === only) : SUBSTATES;

  return (
    <div className="acwss" role="region" aria-label="Withdrawal Status modal sub-states">
      <div className="acwss__grid">
        {shown.map((s) => (
          <figure className="acwss__cell" key={s.key}>
            <WithdrawalCard withdrawal={s.withdrawal} cost={s.cost} />
            <figcaption className="acwss__caption">
              <span className="acwss__caption-name">{s.label}</span>
              <span className="acwss__caption-status">{s.status}</span>
              <span className="acwss__caption-note">{s.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
