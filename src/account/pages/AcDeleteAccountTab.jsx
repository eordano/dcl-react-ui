import { useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import AccountSettingsRail from "../components/AccountSettingsRail.jsx";
import "./acdeleteaccounttab.css";

const ErrorOutlineIcon = () => (
  <svg className="acdel__banner-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M11 7h2v6h-2zm0 8h2v2h-2z" />
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
  </svg>
);

const WarningAmberIcon = () => (
  <svg className="acdel__asset-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M12 5.99 19.53 19H4.47L12 5.99M12 2 1 21h22L12 2z" />
    <path d="M11 10h2v5h-2zm0 6h2v2h-2z" />
  </svg>
);

const CONSEQUENCE_ICONS = {
  profile: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-9 2.2-9 5v1h18v-1c0-2.8-4.6-5-9-5z" />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3 0-7 1.5-7 4.5V20h9v-2.5c0-1 .4-1.9 1-2.7C9.4 13.5 8.7 13 8 13zm8 0c-.7 0-1.4.1-2 .3.9.9 1.5 2 1.5 3.2V20h7.5v-2.5c0-3-4-4.5-7-4.5z" />
    </svg>
  ),
  marketplace: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4v2l1 7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-7V4zM5 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  ),
  credits: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 6h-2.2c.1-.3.2-.6.2-1a2.5 2.5 0 0 0-4.5-1.5L12 5l-1.5-2.5A2.5 2.5 0 0 0 6 4c0 .4.1.7.2 1H4a2 2 0 0 0-2 2v2h20V7a2 2 0 0 0-2-1zM4 19a2 2 0 0 0 2 2h5v-9H4v7zm9 2h5a2 2 0 0 0 2-2v-7h-7v9z" />
    </svg>
  ),
  favorites: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5a6 6 0 0 0-5-5.9V4a1 1 0 1 0-2 0v1.1A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  ),
};

const CONSEQUENCES = [
  { key: "profile", title: "Profile", description: "your username, avatar, bio and display name" },
  { key: "social", title: "Social connections", description: "friends list and blocked users" },
  { key: "marketplace", title: "Marketplace activity", description: "open listings, purchase history and offers" },
  { key: "credits", title: "In-platform credits", description: "any unspent balances or rewards" },
  { key: "favorites", title: "Favorites & history", description: "saved places, recent activity and event RSVPs" },
  { key: "notifications", title: "Notifications & preferences", description: "all your settings and notification history" },
];

function DeleteAccountPanel({ address, onOpenDeleteAccountModal, onGoToWallets }) {
  return (
    <div className="acdel">
      <header className="acdel__header">
        <h1 className="acdel__title">Delete Account</h1>
      </header>

      <div className="acdel__content">
        <div className="acdel__banner">
          <ErrorOutlineIcon />
          <div className="acdel__banner-text">
            <div className="acdel__banner-title">Danger Zone</div>
            <div className="acdel__banner-desc">
              Once you delete your account, there is no going back. Please be certain.
            </div>
          </div>
        </div>

        <div className="acdel__card">
          <div className="acdel__card-desc">The following will be lost forever:</div>
          <ul className="acdel__list">
            {CONSEQUENCES.map((c) => (
              <li className="acdel__item" key={c.key}>
                <span className="acdel__item-icon">{CONSEQUENCE_ICONS[c.key]}</span>
                <span>
                  <span className="acdel__item-title">{c.title}</span>
                  {" - "}
                  {c.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="acdel__asset">
          <WarningAmberIcon />
          <div className="acdel__asset-text">
            <div className="acdel__asset-title">On-chain assets at risk</div>
            <div className="acdel__asset-desc">
              Deleting your account may cause you to permanently lose access to your
              on-chain assets (wearables, emotes, LAND, etc). Make sure to export your
              private key before proceeding.
            </div>
            <div className="acdel__export-desc">
              Go to the Wallets tab and use the wallet manager below your address to
              export your private key.
            </div>
            <button type="button" className="acdel__export-link" onClick={onGoToWallets}>
              Go to Wallets
            </button>
          </div>
        </div>

        <button
          type="button"
          className="acdel__delete-btn"
          disabled={!address}
          onClick={() => address && onOpenDeleteAccountModal(address)}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default function AcDeleteAccountTab({
  address = "0x9f3c4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4",
  onOpenDeleteAccountModal = () => {},
  onGoToWallets = () => {},
}) {
  const [tab, setTab] = useState("delete");

  return (
    <AccountChrome>
      <div className="acdel-page">
        <div className="acdel-page__layout">
          <AccountSettingsRail active={tab} onTab={setTab} />

          <div className="acdel-page__content">
            {tab === "delete" ? (
              <DeleteAccountPanel
                address={address}
                onOpenDeleteAccountModal={onOpenDeleteAccountModal}
                onGoToWallets={onGoToWallets}
              />
            ) : (
              <div className="acdel-page__placeholder">
                Select the Delete Account tab to view the danger zone.
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
