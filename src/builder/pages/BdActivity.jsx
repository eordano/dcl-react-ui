import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdactivity.css";

const CheckGlyph = () => (
  <svg className="bdactivity__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const WarningGlyph = () => (
  <svg className="bdactivity__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);
const AssetGlyph = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 15l4-4 4 4 4-4 6 6" />
    <circle cx="8.5" cy="8.5" r="1.5" />
  </svg>
);

function TxImage({ tx }) {
  switch (tx.imageKind) {
    case "land":
      return (
        <div className="bdactivity__image bdactivity__image--land">
          <span className="bdactivity__landdot" />
        </div>
      );
    case "address":
      return (
        <div className="bdactivity__image">
          <span className="u-avatar" style={{ "--hue": tx.hue ?? 212 }} />
        </div>
      );
    case "asset":
      return (
        <div className="bdactivity__image bdactivity__image--asset">
          <AssetGlyph />
        </div>
      );
    case "ens":
      return (
        <div className="bdactivity__image bdactivity__image--ens">
          {(tx.subdomain || "?").charAt(0).toUpperCase()}
        </div>
      );
    default:
      return <div className="bdactivity__image bdactivity__image--asset" />;
  }
}

function TxStatus({ status, href }) {
  const pending = status === "pending" || !status;
  const label = status || "loading";
  const cls =
    "bdactivity__status" +
    (status ? " bdactivity__status--" + status : "");
  return (
    <a
      className={cls}
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => { if (!href) e.preventDefault(); }}
    >
      <div className="bdactivity__statuslabel">{label}</div>
      {pending ? (
        <div className="bdactivity__spinner">
          <Spinner size={14} color="rgba(255,255,255,.6)" />
        </div>
      ) : null}
      {status === "reverted" ? <WarningGlyph /> : null}
      {status === "confirmed" || status === "replaced" ? <CheckGlyph /> : null}
    </a>
  );
}

function TransactionRow({ tx }) {
  return (
    <div className="bdactivity__tx">
      <div className="bdactivity__txleft">
        <TxImage tx={tx} />
        <div className="bdactivity__txtext">
          <div className="bdactivity__desc">{tx.description}</div>
          <div className="bdactivity__timestamp">{tx.timestamp}.</div>
        </div>
      </div>
      <div className="bdactivity__txright">
        <TxStatus status={tx.status} href={tx.href} />
      </div>
    </div>
  );
}

const DEFAULT_TX = [
  {
    hash: "0x9a1",
    imageKind: "ens",
    subdomain: "atlas",
    description: <>Claimed new name: <strong>&quot;atlas&quot;</strong>.</>,
    timestamp: "12 minutes ago",
    status: "pending",
    href: "https://etherscan.io/tx/0x9a1",
  },
  {
    hash: "0x882",
    imageKind: "asset",
    description: (
      <>
        Minted <span className="bdactivity__link" role="button" tabIndex={0}>Neon Visor</span> for the collection{" "}
        <span className="bdactivity__link" role="button" tabIndex={0}>Cyber Threads</span> once
      </>
    ),
    timestamp: "1 hour ago",
    status: "confirmed",
    href: "https://polygonscan.com/tx/0x882",
  },
  {
    hash: "0x773",
    imageKind: "asset",
    description: (
      <>Published the collection <span className="bdactivity__link" role="button" tabIndex={0}>Cyber Threads</span></>
    ),
    timestamp: "3 hours ago",
    status: "confirmed",
    href: "https://polygonscan.com/tx/0x773",
  },
  {
    hash: "0x664",
    imageKind: "land",
    description: <>You edited <strong>My Genesis Plaza Lot</strong>.</>,
    timestamp: "yesterday",
    status: "confirmed",
    href: "https://etherscan.io/tx/0x664",
  },
  {
    hash: "0x555",
    imageKind: "address",
    hue: 268,
    description: (
      <>You assigned <strong>0x7c…a4e1</strong> as operator of <strong>-12,40</strong>.</>
    ),
    timestamp: "2 days ago",
    status: "confirmed",
    href: "https://etherscan.io/tx/0x555",
  },
  {
    hash: "0x446",
    imageKind: "land",
    description: (
      <>You transferred <strong>The Estate</strong> to <strong>0x3e…c901</strong>.</>
    ),
    timestamp: "4 days ago",
    status: "reverted",
    href: "https://etherscan.io/tx/0x446",
  },
  {
    hash: "0x337",
    imageKind: "address",
    hue: 130,
    description: (
      <>
        You <strong>approved</strong> the{" "}
        <span className="bdactivity__link" role="button" tabIndex={0}>Collection Manager</span> contract to operate{" "}
        <span className="bdactivity__link" role="button" tabIndex={0}>MANA</span> on your behalf.
      </>
    ),
    timestamp: "6 days ago",
    status: "confirmed",
    href: "https://polygonscan.com/tx/0x337",
  },
  {
    hash: "0x228",
    imageKind: "ens",
    subdomain: "atlas",
    description: <>Set resolver for the name <strong>&quot;atlas&quot;</strong>.</>,
    timestamp: "1 week ago",
    status: "confirmed",
    href: "https://etherscan.io/tx/0x228",
  },
];

export default function BdActivity({
  transactions = DEFAULT_TX,
  isLoggedIn = true,
  loading = false,
}) {
  const [navTab] = useState("overview");
  const [showConfirm, setShowConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);

  const list = useMemo(
    () => (cleared ? [] : [...transactions].reverse()),
    [transactions, cleared]
  );

  let body;
  if (loading) {
    body = (
      <div className="bdactivity__loading">
        <Spinner size={32} />
      </div>
    );
  } else if (!isLoggedIn) {
    body = (
      <div className="bdactivity__center">
        <p>You need to sign in to see your activity.</p>
      </div>
    );
  } else if (list.length === 0) {
    body = (
      <div className="bdactivity__center">
        <p>You have no activity yet.</p>
      </div>
    );
  } else {
    body = (
      <>
        <div className="bdactivity__history-header">
          <div className="bdactivity__hleft">
            <h2 className="bdactivity__subhead">Latest Activity</h2>
          </div>
          <div className="bdactivity__hright">
            <button
              type="button"
              className="bdactivity__clear"
              onClick={() => setShowConfirm(true)}
            >
              Clear History
            </button>
          </div>
        </div>
        <div className="bdactivity__transactions">
          {list.map((tx) => (
            <TransactionRow key={tx.hash} tx={tx} />
          ))}
        </div>
      </>
    );
  }

  return (
    <BuilderChrome active={navTab}>
      <div className="bdactivity">
        <div className="bdactivity__page">{body}</div>
      </div>

      {showConfirm ? (
        <div
          className="ep__backdrop"
          role="presentation"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bdactivity__modal"
            role="dialog"
            aria-modal="true"
            aria-label="Are you sure?"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="bdactivity__modaltitle">Are you sure?</h3>
            <p className="bdactivity__modaltext">
              You are about to clear your transaction history. Do you want to proceed?
            </p>
            <div className="bdactivity__modalactions">
              <button
                type="button"
                className="bdactivity__btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bdactivity__btn bdactivity__btn--primary"
                onClick={() => {
                  setCleared(true);
                  setShowConfirm(false);
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </BuilderChrome>
  );
}
