import { useMemo } from "react";
import { Close } from "../../atoms/icons.jsx";
import "./actransactiondetailmodal.css";

const TransactionType = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
  TRANSFER: "transfer",
  PURCHASE: "purchase",
};
const TransactionStatus = { CONFIRMED: "confirmed", PENDING: "pending", REJECTED: "rejected" };
const WithdrawalStatus = { PENDING: "pending", CHECKPOINT: "checkpoint", COMPLETE: "complete" };
const DepositStatus = { PENDING: "pending", COMPLETE: "complete" };
const TransferStatus = { CONFIRMED: "confirmed", PENDING: "pending", REJECTED: "rejected" };
const PurchaseStatus = {
  PENDING: "pending",
  COMPLETE: "complete",
  REFUNDED: "refunded",
  FAILED: "failed",
  CANCELLED: "cancelled",
};

const LABELS = {
  title: "Transaction Detail",
  operation: "Operation",
  amount: "Amount",
  type: "Type",
  status: "Status",
  datetime: "Date time",
  to: "Sent to",
  tx: "Tx Hash",
  initialize_tx: "Tx Hash (Initialize withdrawal)",
  finalize_tx: "Tx Hash (Complete withdrawal)",
};

function getStatusMessage(type, parentStatus, childStatus) {
  if (type === TransactionType.WITHDRAWAL) {
    if (childStatus === WithdrawalStatus.COMPLETE) return "Complete";
    if (childStatus === WithdrawalStatus.CHECKPOINT) return "Ready to withdraw";
    return "Pending";
  }
  if (type === TransactionType.DEPOSIT) {
    if (childStatus === DepositStatus.COMPLETE) return "Complete";
    return "Pending";
  }
  if (type === TransactionType.TRANSFER) {
    if (parentStatus === TransactionStatus.PENDING) return "Pending";
    if (childStatus === TransferStatus.CONFIRMED) return "Complete";
    if (childStatus === TransferStatus.REJECTED) return "Rejected";
    return "Pending";
  }
  if (type === TransactionType.PURCHASE) {
    if (parentStatus === TransactionStatus.PENDING) return "Pending";
    if (childStatus === PurchaseStatus.COMPLETE) return "Complete";
    if (childStatus === PurchaseStatus.REFUNDED) return "Refunded";
    if (childStatus === PurchaseStatus.FAILED) return "Failed";
    return "Pending";
  }
  return "";
}

const explorerHref = (network, txHash) =>
  (network === "MATIC" || network === "matic"
    ? "https://polygonscan.com/tx/"
    : "https://etherscan.io/tx/") + txHash;

function Data({ label, children }) {
  return (
    <div className="actd__data">
      <div className="actd__data-label">{LABELS[label]}</div>
      <div className="actd__data-value">{children}</div>
    </div>
  );
}

function ExplorerLink({ network, txHash }) {
  return (
    <a className="actd__link" href={explorerHref(network, txHash)} target="_blank" rel="noreferrer">
      {txHash}
    </a>
  );
}

export default function AcTransactionDetailModal({
  description = "Send tokens to",
  transaction = {
    hash: "0x4f1e8a7c9b2d3e6f0a1c5b8d7e4f2a9c6b3d05a721e8f4c7b2a9d6e3f1c0b5a82",
    type: TransactionType.TRANSFER,
    status: TransactionStatus.CONFIRMED,
    amount: 1500.55,
    data: {
      to: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      hash: "0x4f1e8a7c9b2d3e6f0a1c5b8d7e4f2a9c6b3d05a721e8f4c7b2a9d6e3f1c0b5a82",
      network: "MATIC",
      chainId: 137,
      status: TransferStatus.CONFIRMED,
      timestamp: 1718800200000,
    },
  },
  withdrawals = [],
  onClose = () => {},
}) {
  const { type, status, amount, data } = transaction;

  const dataRows = useMemo(() => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return (
          <Data label="tx">
            <ExplorerLink network="ETHEREUM" txHash={data.hash} />
          </Data>
        );
      case TransactionType.WITHDRAWAL: {
        const w = withdrawals.find((x) => x.initializeHash === data.initializeHash) || data;
        if (!w || !w.initializeHash) return null;
        return (
          <>
            <Data label="initialize_tx">
              <ExplorerLink network="MATIC" txHash={w.initializeHash} />
            </Data>
            {w.finalizeHash ? (
              <Data label="finalize_tx">
                <ExplorerLink network="ETHEREUM" txHash={w.finalizeHash} />
              </Data>
            ) : null}
          </>
        );
      }
      case TransactionType.PURCHASE:
        return data.txHash ? (
          <Data label="tx">
            <ExplorerLink network={data.network} txHash={data.txHash} />
          </Data>
        ) : null;
      case TransactionType.TRANSFER:
        return (
          <>
            <Data label="to">{data.to}</Data>
            <Data label="tx">
              <ExplorerLink network={data.network} txHash={data.hash} />
            </Data>
          </>
        );
      default:
        return null;
    }
  }, [type, data, withdrawals]);

  const datetime = data && data.timestamp ? new Date(data.timestamp).toLocaleString() : "";
  const statusMessage = data ? getStatusMessage(type, status, data.status) : "";

  return (
    <div className="u-modal-overlay actd" onClick={onClose}>
      <div
        className="actd__card"
        role="dialog"
        aria-modal="true"
        aria-label={LABELS.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="actd__close" aria-label="Close" onClick={onClose}>
          <Close size={14} />
        </button>

        <header className="actd__header">{LABELS.title}</header>

        <div className="actd__content">
          <Data label="operation">{description}</Data>
          <Data label="datetime">{datetime}</Data>
          <Data label="amount">{amount.toLocaleString()}</Data>
          {dataRows}
          <Data label="status">{statusMessage}</Data>
        </div>
      </div>
    </div>
  );
}
