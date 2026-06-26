import { useState } from "react";
import { Close } from "../../atoms/icons.jsx";
import "./acseealltransactionsmodal.css";

const ArrowGlyph = ({ dir }) =>
  dir === "in" ? (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4497 13.7421L11.3433 22.6569L20.258 22.5504C20.7763 22.5442 21.2015 22.1191 21.2076 21.6008C21.2138 21.0826 20.7987 20.6675 20.2804 20.6736L14.6738 20.7406L22.657 12.7574C23.0475 12.3668 23.0475 11.7337 22.657 11.3431C22.2665 10.9526 21.6333 10.9526 21.2428 11.3431L13.2596 19.3264L13.3265 13.7197C13.3327 13.2014 12.9176 12.7863 12.3993 12.7925C11.881 12.7987 11.4559 13.2238 11.4497 13.7421Z"
      fill="currentColor"
    />
  ) : (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.5505 20.2578L22.657 11.3431L13.7422 11.4495C13.224 11.4557 12.7988 11.8808 12.7926 12.3991C12.7864 12.9174 13.2015 13.3325 13.7198 13.3263L19.3265 13.2594L11.3433 21.2426C10.9527 21.6331 10.9527 22.2663 11.3433 22.6568C11.7338 23.0473 12.367 23.0473 12.7575 22.6568L20.7407 14.6736L20.6738 20.2802C20.6676 20.7985 21.0827 21.2136 21.6009 21.2074C22.1192 21.2012 22.5444 20.7761 22.5505 20.2578Z"
      fill="currentColor"
    />
  );

function TransactionLogo({ dir, pending }) {
  return (
    <svg
      className={"acseealltransactionsmodal__logo" + (pending ? " is-pending" : "")}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      {pending ? (
        <rect x="1.5" y="1.5" width="31" height="31" rx="15.5" stroke="currentColor" />
      ) : (
        <rect x="1" y="1" width="32" height="32" rx="16" fill="#F3F2F5" />
      )}
      <g className="acseealltransactionsmodal__glyph">
        <ArrowGlyph dir={dir} />
      </g>
    </svg>
  );
}

function AccountTransaction({ tx }) {
  const dir = tx.type === "deposit" || tx.type === "purchase" ? "in" : "out";
  const checkpoint = tx.type === "withdrawal" && tx.statusKey === "checkpoint";
  return (
    <div className="acseealltransactionsmodal__row" role="button" tabIndex={0}>
      <div className="acseealltransactionsmodal__type">
        <TransactionLogo dir={dir} pending={tx.pending} />
      </div>
      <div className="acseealltransactionsmodal__desc">
        <div>{tx.description}</div>
        <div className="acseealltransactionsmodal__status">
          <span className={checkpoint ? "acseealltransactionsmodal__checkpoint" : ""}>
            {tx.status}
          </span>{" "}
          - {tx.timeAgo}
        </div>
      </div>
      <div className="acseealltransactionsmodal__amount">{tx.amount}</div>
    </div>
  );
}

const POLYGON_TX = [
  { type: "purchase", status: "Complete", statusKey: "complete", description: "Add tokens via Transak", timeAgo: "2 hours ago", amount: "500", pending: false },
  { type: "transfer", status: "Complete", statusKey: "complete", description: "Send tokens to 0x9f3c…7a21", timeAgo: "5 hours ago", amount: "120", pending: false },
  { type: "deposit", status: "Pending", statusKey: "pending", description: "Deposit to Polygon MANA", timeAgo: "8 hours ago", amount: "1,000", pending: true },
  { type: "purchase", status: "Refunded", statusKey: "refunded", description: "Add tokens via MoonPay", timeAgo: "1 day ago", amount: "250", pending: false },
  { type: "transfer", status: "Pending", statusKey: "pending", description: "Send tokens to 0x4a1c…0d92", timeAgo: "1 day ago", amount: "75", pending: true },
  { type: "deposit", status: "Complete", statusKey: "complete", description: "Deposit to Polygon MANA", timeAgo: "2 days ago", amount: "2,000", pending: false },
  { type: "purchase", status: "Failed", statusKey: "failed", description: "Add tokens via Transak", timeAgo: "3 days ago", amount: "300", pending: false },
  { type: "transfer", status: "Complete", statusKey: "complete", description: "Send tokens to 0x8b21…ee14", timeAgo: "4 days ago", amount: "60", pending: false },
  { type: "purchase", status: "Complete", statusKey: "complete", description: "Add tokens via Wert", timeAgo: "5 days ago", amount: "450", pending: false },
];

const ETHEREUM_TX = [
  { type: "withdrawal", status: "Ready to withdraw", statusKey: "checkpoint", description: "Withdrawal to Ethereum MANA", timeAgo: "1 hour ago", amount: "800", pending: true },
  { type: "withdrawal", status: "Pending", statusKey: "pending", description: "Withdrawal to Ethereum MANA", timeAgo: "6 hours ago", amount: "350", pending: true },
  { type: "transfer", status: "Complete", statusKey: "complete", description: "Send tokens to 0x2f7a…11bd", timeAgo: "12 hours ago", amount: "200", pending: false },
  { type: "withdrawal", status: "Complete", statusKey: "complete", description: "Withdrawal to Ethereum MANA", timeAgo: "2 days ago", amount: "1,500", pending: false },
  { type: "transfer", status: "Rejected", statusKey: "rejected", description: "Send tokens to 0x6c90…ab02", timeAgo: "3 days ago", amount: "40", pending: false },
  { type: "withdrawal", status: "Complete", statusKey: "complete", description: "Withdrawal to Ethereum MANA", timeAgo: "6 days ago", amount: "920", pending: false },
];

export default function AcSeeAllTransactionsModal({
  network = "matic",
  transactions,
  onClose,
}) {
  const [closing, setClosing] = useState(false);
  const rows =
    transactions || (network === "matic" ? POLYGON_TX : ETHEREUM_TX);
  const title =
    network === "matic" ? "Polygon Transactions" : "Ethereum Transactions";

  return (
    <div
      className="u-modal-overlay acseealltransactionsmodal"
      onClick={() => {
        setClosing(true);
        onClose && onClose();
      }}
    >
      <div
        className="acseealltransactionsmodal__card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="acseealltransactionsmodal__close"
          aria-label="Close"
          onClick={() => onClose && onClose()}
        >
          <Close size={16} />
        </button>

        <div className="acseealltransactionsmodal__header">{title}</div>

        <div className="acseealltransactionsmodal__content">
          {rows.length === 0 ? (
            <div className="acseealltransactionsmodal__empty">
              <div className="acseealltransactionsmodal__watermelon" aria-hidden="true" />
              <p>No transactions yet</p>
            </div>
          ) : (
            rows.map((tx, i) => <AccountTransaction tx={tx} key={i} />)
          )}
        </div>
      </div>
    </div>
  );
}
