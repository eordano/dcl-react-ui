import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import Modal from "../../components/Modal.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import { asset } from "../../asset.js";
import "./mkactivitypage.css";

const PENDING = "pending";
const CONFIRMED = "confirmed";
const REVERTED = "reverted";

const FEED = [
  {
    id: "local:0xa1",
    rarity: "legendary",
    status: PENDING,
    timestamp: "a few seconds ago",
    parts: [
      "You bought ",
      { link: "Cyber Ronin Jacket" },
      " for ",
      { mana: "1,250" },
      ".",
    ],
  },
  {
    id: "local:0xb2",
    rarity: "rare",
    status: PENDING,
    timestamp: "a minute ago",
    parts: [
      "You listed ",
      { link: "Pixel Shades" },
      " on sale for ",
      { mana: "120" },
      ".",
    ],
  },
  {
    id: "server:e1",
    rarity: "mythic",
    status: CONFIRMED,
    timestamp: "12 minutes ago",
    parts: [
      "You sold ",
      { link: "Aurora Wings" },
      " to ",
      { profile: "0x7f2c…91ab" },
      " for ",
      { mana: "980" },
      ".",
    ],
  },
  {
    id: "server:e2",
    rarity: "epic",
    status: CONFIRMED,
    timestamp: "about 1 hour ago",
    parts: [
      "You placed a bid of ",
      { mana: "640" },
      " on ",
      { link: "Plasma Boots" },
      ".",
    ],
  },
  {
    id: "server:e3",
    rarity: "unique",
    status: CONFIRMED,
    timestamp: "about 3 hours ago",
    parts: [
      "You received a bid of ",
      { mana: "3,400" },
      " on ",
      { link: "Golden Crown" },
      " from ",
      { profile: "0x3a9d…44e1" },
      ".",
    ],
  },
  {
    id: "local:0xc3",
    rarity: null,
    mana: true,
    status: REVERTED,
    timestamp: "about 5 hours ago",
    parts: ["You bought 100 Polygon MANA via Transak."],
  },
  {
    id: "server:e4",
    rarity: "epic",
    status: CONFIRMED,
    timestamp: "1 day ago",
    parts: [
      "You transferred ",
      { link: "Holo Backpack" },
      " to ",
      { profile: "0x91be…20af" },
      ".",
    ],
  },
  {
    id: "server:e5",
    rarity: "uncommon",
    status: CONFIRMED,
    timestamp: "2 days ago",
    parts: [
      "You removed the listing of ",
      { link: "Frost Hoodie" },
      " for ",
      { mana: "85" },
      ".",
    ],
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
    <path d="M12 3 1.5 21h21L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 9.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="17.6" r="1.1" fill="currentColor" />
  </svg>
);

function Description({ parts }) {
  return (
    <div className="mkactivitypage__desc">
      {parts.map((p, i) => {
        if (typeof p === "string") return <span key={i}>{p}</span>;
        if (p.link) return <span key={i} role="button" tabIndex={0} className="mkactivitypage__link">{p.link}</span>;
        if (p.profile) return <span key={i} role="button" tabIndex={0} className="mkactivitypage__profile">{p.profile}</span>;
        if (p.mana)
          return (
            <span key={i} className="mkactivitypage__mana">
              <ManaMark size={14} className="mkactivitypage__manamark" />
              {p.mana}
            </span>
          );
        return null;
      })}
    </div>
  );
}

function Status({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span role="button" tabIndex={0} className={"mkactivitypage__status mkactivitypage__status--" + status}>
      <span className="mkactivitypage__statuslabel">{label}</span>
      {status === PENDING ? (
        <span className="mkactivitypage__statusspin"><Spinner size={16} /></span>
      ) : status === REVERTED ? (
        <WarningIcon />
      ) : (
        <CheckIcon />
      )}
    </span>
  );
}

function ActivityRow({ item }) {
  return (
    <div className="mkactivitypage__row">
      <div className="mkactivitypage__left">
        <div className="mkactivitypage__image">
          {item.mana ? (
            <span className="mkactivitypage__imgmana"><ManaMark size={14} className="mkactivitypage__manamark" /></span>
          ) : (
            <div
              className="mkactivitypage__thumb u-rar-bg"
              style={{ "--rb": `var(--rar-bg-${item.rarity})` }}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="mkactivitypage__text">
          <Description parts={item.parts} />
          <div className="mkactivitypage__timestamp">{item.timestamp}.</div>
        </div>
      </div>
      <div className="mkactivitypage__right">
        <Status status={item.status} />
      </div>
    </div>
  );
}

export default function MkActivityPage({
  feed = FEED,
  loading = false,
  paging = false,
}) {
  const [tab, setTab] = useState("activity");
  const [confirm, setConfirm] = useState(false);
  const [items, setItems] = useState(feed);

  const isInitialLoading = loading && items.length === 0;
  const isEmpty = !loading && items.length === 0;

  const handleClear = () => {
    setItems([]);
    setConfirm(false);
  };

  let content;
  if (isInitialLoading) {
    content = (
      <div className="mkactivitypage__center">
        <Spinner size={48} />
        <p className="mkactivitypage__loadingtext">Loading your activity…</p>
      </div>
    );
  } else if (isEmpty) {
    content = (
      <div className="mkactivitypage__center">
        <p className="mkactivitypage__emptytext">You have no activity yet.</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="mkactivitypage__header">
          <h2 className="mkactivitypage__subheader">Latest Activity</h2>
          <button type="button" className="mkactivitypage__clear" onClick={() => setConfirm(true)}>
            Clear History
          </button>
        </div>

        <div className="mkactivitypage__list">
          {items.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </div>

        <div className="mkactivitypage__sentinel" aria-hidden="true">
          {paging ? <Spinner size={20} /> : null}
        </div>
      </>
    );
  }

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mkactivitypage">
        <div className="mkactivitypage__page">{content}</div>
      </div>

      {confirm ? (
        <Modal width={420} onClose={() => setConfirm(false)}>
          <h3 className="mkactivitypage__modaltitle">Are you sure?</h3>
          <p className="mkactivitypage__modaltext">
            You are about to clear your transaction history. Do you want to proceed?
          </p>
          <div className="mkactivitypage__actions">
            <Button variant="secondary" className="mkactivitypage__actionbtn" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="mkactivitypage__actionbtn" onClick={handleClear}>
              Proceed
            </Button>
          </div>
        </Modal>
      ) : null}
    </MarketplaceChrome>
  );
}

export { asset };
