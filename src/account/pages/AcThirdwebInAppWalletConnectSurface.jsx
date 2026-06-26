import { useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import { Caret } from "../../atoms/icons.jsx";
import AccountSettingsRail from "../components/AccountSettingsRail.jsx";
import "./acthirdwebinappwalletconnectsurface.css";

const FULL_ADDRESS = "0x9f3cA1d2E47B6c0Af8b219d6E5C73a2117bE7a21";
const SHORT_ADDRESS = "0x9f3c…7a21";

const NETWORKS = [
  { id: "ethereum", title: "Ethereum MANA", amount: "1,204.30", hue: 218 },
  { id: "polygon", title: "Polygon MANA", amount: "1,276.25", hue: 276 },
];

function ThirdwebDetailsButton({ onOpen }) {
  return (
    <button type="button" className="tw-details" onClick={onOpen}>
      <span className="tw-details__blockie" aria-hidden="true" />
      <span className="tw-details__addr">{SHORT_ADDRESS}</span>
      <span className="tw-details__bal">2,480.55 MANA</span>
      <Caret size={14} className="tw-details__caret" />
    </button>
  );
}

function ThirdwebDetailsModal({ onClose }) {
  return (
    <div className="tw-overlay" role="presentation" onClick={onClose}>
      <div
        className="tw-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Connected account"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="tw-modal__close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>

        <div className="tw-modal__account">
          <span className="tw-modal__blockie" aria-hidden="true" />
          <button type="button" className="tw-modal__addr" title={FULL_ADDRESS}>
            {SHORT_ADDRESS}
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="tw-modal__copy">
              <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <div className="tw-modal__balance">
          <span className="tw-modal__bval">2,480.55</span>
          <span className="tw-modal__bsym">MANA</span>
        </div>

        <div className="tw-modal__actions">
          <button type="button" className="tw-act">
            <span className="tw-act__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
            Send
          </button>
          <button type="button" className="tw-act">
            <span className="tw-act__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </span>
            Receive
          </button>
          <button type="button" className="tw-act">
            <span className="tw-act__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </span>
            Buy
          </button>
        </div>

        <div className="tw-modal__list">
          <button type="button" className="tw-row">
            <span className="tw-row__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </span>
            View Funds
            <svg className="tw-row__chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <button type="button" className="tw-row">
            <span className="tw-row__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v5l3 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            Transactions
            <svg className="tw-row__chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>

        <button type="button" className="tw-modal__disconnect">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5M21 12H9" />
          </svg>
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
}

function WalletsHeader({ state, modalOpen, onOpenModal, onCloseModal }) {
  return (
    <>
      <div className="tw-header">
        <h3 className="tw-header__title">Wallets</h3>

        <div className="tw-manager">
          {state === "loading" ? (
            <div className="tw-skeleton" aria-label="Connecting wallet" />
          ) : state === "connected" ? (
            <ThirdwebDetailsButton onOpen={onOpenModal} />
          ) : null}
        </div>
      </div>

      {modalOpen ? <ThirdwebDetailsModal onClose={onCloseModal} /> : null}
    </>
  );
}

function AccountCard({ net }) {
  return (
    <section className="tw-card">
      <header className="tw-card__head">
        <div className="tw-card__title">
          <span className="tw-card__net" style={{ "--hue": net.hue }} />
          {net.title}
        </div>
        <div className="tw-card__amount">
          <span className="tw-card__manamark"><ManaMark size={18} /></span>
          {net.amount}
        </div>
      </header>
      <div className="tw-card__actions">
        <button type="button" className="tw-card__btn tw-card__btn--primary">Buy</button>
        <button type="button" className="tw-card__btn">Send</button>
        <button type="button" className="tw-card__btn">Receive</button>
        <button type="button" className="tw-card__btn">Swap</button>
      </div>
      <div className="tw-card__empty">You have no transactions yet.</div>
    </section>
  );
}

export default function AcThirdwebInAppWalletConnectSurface({ state = "connected" }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AccountChrome account={SHORT_ADDRESS}>
      <div className="tw">
        <h1 className="tw__title">Account Settings</h1>

        <div className="tw__layout">
          <AccountSettingsRail active="wallets" />

          <div className="tw__content">
            <WalletsHeader
              state={state}
              modalOpen={modalOpen}
              onOpenModal={() => setModalOpen(true)}
              onCloseModal={() => setModalOpen(false)}
            />

            <div className="tw__cards">
              {NETWORKS.map((net) => <AccountCard key={net.id} net={net} />)}
            </div>
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
