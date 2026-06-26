import { useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import AccountSettingsRail from "../components/AccountSettingsRail.jsx";
import "./accountdashboard.css";

const NETWORKS = [
  {
    id: "ethereum",
    title: "Ethereum MANA",
    amount: "1,204.30",
    hue: 218,
    txs: [
      { dir: "in", desc: "Bought with Transak", status: "Confirmed", when: "2 hours ago", amount: "+500.00" },
      { dir: "out", desc: "Sent to 0x4b1a…9c02", status: "Confirmed", when: "yesterday", amount: "-120.00" },
      { dir: "in", desc: "Received from 0xa7f0…11de", status: "Confirmed", when: "3 days ago", amount: "+75.50" },
    ],
  },
  {
    id: "polygon",
    title: "Polygon MANA",
    amount: "1,276.25",
    hue: 276,
    txs: [
      { dir: "out", desc: "Withdrawal to Ethereum", status: "Pending", when: "12 minutes ago", amount: "-200.00" },
      { dir: "in", desc: "Bought with MoonPay", status: "Confirmed", when: "5 hours ago", amount: "+1,000.00" },
      { dir: "out", desc: "Sent to 0x9d22…7b41", status: "Confirmed", when: "4 days ago", amount: "-48.25" },
    ],
  },
];

const EMAIL_GROUPS = [
  { id: "marketplace", label: "Marketplace", desc: "Bids, sales and listing activity.", on: true },
  { id: "credits", label: "Credits", desc: "Weekly Marketplace Credits rewards.", on: true },
  { id: "events", label: "Events", desc: "Upcoming and live events you follow.", on: false },
  { id: "rewards", label: "Rewards", desc: "Claimable rewards and campaigns.", on: true },
  { id: "dao", label: "DAO", desc: "Governance proposals and voting.", on: false },
  { id: "worlds", label: "Worlds", desc: "Activity in your Worlds.", on: false },
];

function AccountCard({ net }) {
  return (
    <section className="acd-card">
      <header className="acd-card__head">
        <div className="acd-card__title">
          <span className="acd-card__net" style={{ "--hue": net.hue }} />
          {net.title}
        </div>
        <div className="acd-card__amount">
          <span className="acd-card__manamark"><ManaMark size={18} network={net.id} /></span>
          {net.amount}
        </div>
      </header>

      <div className="acd-card__actions">
        <button type="button" className="acd-btn acd-btn--primary">Buy</button>
        <button type="button" className="acd-btn">Swap</button>
        <details className="acd-more">
          <summary className="acd-more__btn" aria-label="More actions">⋯</summary>
          <div className="acd-more__menu">
            <button type="button" className="acd-more__item">Send</button>
            <button type="button" className="acd-more__item">Receive</button>
            {net.id === "polygon" && (
              <button type="button" className="acd-more__item">Import Withdrawal</button>
            )}
          </div>
        </details>
      </div>

      <div className="acd-tx">
        <div className="acd-tx__label">Recent transactions</div>
        {net.txs.map((tx, i) => (
          <div className="acd-tx__row" key={i}>
            <span className={"acd-tx__icon acd-tx__icon--" + tx.dir} aria-hidden="true">
              {tx.dir === "in" ? "↓" : "↑"}
            </span>
            <div className="acd-tx__info">
              <div className="acd-tx__desc">{tx.desc}</div>
              <div className="acd-tx__meta">
                <span className={"acd-tx__status is-" + tx.status.toLowerCase()}>{tx.status}</span>
                <span className="acd-tx__dot">·</span>
                {tx.when}
              </div>
            </div>
            <div className={"acd-tx__amount is-" + tx.dir}>{tx.amount}</div>
          </div>
        ))}
        <button type="button" className="acd-tx__seeall">See all transactions</button>
      </div>
    </section>
  );
}

function WalletsTab() {
  return (
    <>
      <div className="acd-total">
        <div className="acd-total__label">Total MANA balance</div>
        <div className="acd-total__value">
          <span className="acd-total__manamark"><ManaMark size={26} /></span>
          2,480.55
        </div>
        <div className="acd-total__sub">Across Ethereum and Polygon</div>
      </div>

      <div className="acd-cards">
        {NETWORKS.map((net) => <AccountCard key={net.id} net={net} />)}
      </div>
    </>
  );
}

function NotificationsTab() {
  return (
    <div className="acd-panel">
      <h3 className="acd-panel__title">Email Notifications</h3>
      <p className="acd-panel__lede">
        Choose which updates Decentraland sends to your inbox.
      </p>

      <div className="acd-email">
        <label className="acd-email__field">
          <span className="acd-email__flabel">Email address</span>
          <input
            className="acd-email__input"
            type="email"
            placeholder="you@example.com"
            defaultValue="evaristo@decentraland.org"
          />
        </label>

        <div className="acd-email__groups">
          {EMAIL_GROUPS.map((g) => (
            <div className="acd-email__group" key={g.id}>
              <div className="acd-email__gtext">
                <div className="acd-email__gtitle">{g.label}</div>
                <div className="acd-email__gdesc">{g.desc}</div>
              </div>
              <Toggle defaultChecked={g.on} />
            </div>
          ))}
        </div>

        <button type="button" className="acd-btn acd-btn--primary acd-email__save">Save preferences</button>
      </div>
    </div>
  );
}

function CreditsTab() {
  return (
    <div className="acd-panel">
      <h3 className="acd-panel__title">Credits Settings</h3>
      <p className="acd-panel__lede">
        Earn weekly Marketplace Credits to power up your look.
      </p>

      <div className="acd-credits">
        <div className="acd-credits__status">
          <span className="acd-credits__dot u-dot u-dot--online" />
          Status: <strong>Enrolled</strong>
        </div>

        <div className="acd-credits__balance">
          <div className="acd-credits__label">Available credits</div>
          <div className="acd-credits__value">
            <span className="acd-credits__manamark"><ManaMark size={22} /></span>
            312.00
          </div>
          <div className="acd-credits__exp">Expires in 5 days</div>
        </div>

        <p className="acd-credits__info">
          You are enrolled in the Marketplace Credits program and earning rewards
          every week. You can leave the program at any time.
        </p>
        <button type="button" className="acd-btn acd-credits__leave">Leave program</button>
      </div>
    </div>
  );
}

export default function AccountDashboard({ signedIn = true }) {
  const [tab, setTab] = useState("wallets");

  return (
    <AccountChrome signedIn={signedIn}>
      <div className="acd">
        <h1 className="acd__title">Account Settings</h1>

        <div className="acd__layout">
          <AccountSettingsRail active={tab} onTab={setTab} />

          <div className="acd__content">
            {tab === "wallets" && <WalletsTab />}
            {tab === "notifications" && <NotificationsTab />}
            {tab === "credits" && <CreditsTab />}
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
