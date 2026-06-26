import { useState } from "react";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./recentlysoldtable.css";

const TABS = [
  { id: "wearable", label: "Wearables" },
  { id: "parcel", label: "Land" },
  { id: "emote", label: "Emotes" },
  { id: "ens", label: "Names" },
];

const ROWS = [
  { name: "Cyber Ronin Jacket", rarity: "legendary", seller: "0x9f3c…7a21", buyer: "0x1ab4…0d3e", type: "Sale", time: "2 min ago", price: "1,250" },
  { name: "Pixel Shades", rarity: "rare", seller: "0x77c0…be12", buyer: "0x52aa…9f81", type: "Mint", time: "8 min ago", price: "120" },
  { name: "Aurora Wings", rarity: "mythic", seller: "0x3a9d…44e1", buyer: "0x9f3c…7a21", type: "Sale", time: "23 min ago", price: "980" },
  { name: "Frost Hoodie", rarity: "uncommon", seller: "0x0b1e…2c77", buyer: "0x6d40…11ab", type: "Bid", time: "41 min ago", price: "85" },
  { name: "Solar Halo", rarity: "exotic", seller: "0x91be…20af", buyer: "0xa7f0…11de", type: "Sale", time: "1 h ago", price: "1,780" },
  { name: "Obsidian Suit", rarity: "mythic", seller: "0x52aa…9f81", buyer: "0x4b1a…9c02", type: "Mint", time: "2 h ago", price: "1,420" },
];

export default function RecentlySoldTable({ rows = ROWS }) {
  const [tab, setTab] = useState("wearable");

  return (
    <section className="rs">
      <header className="rs__head">
        <h2 className="rs__title">Recently Sold</h2>
        <span className="rs__updated">Last updated: just now</span>
      </header>

      <nav className="rs__tabs" aria-label="Recently sold category">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={"rs__tab" + (t.id === tab ? " is-active" : "")}
            aria-current={t.id === tab ? "true" : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="rs__table" role="table">
        <div className="rs__row rs__row--head" role="row">
          <span className="rs__cell rs__cell--item" role="columnheader">Item</span>
          <span className="rs__cell" role="columnheader">Seller</span>
          <span className="rs__cell" role="columnheader">Buyer</span>
          <span className="rs__cell" role="columnheader">Type</span>
          <span className="rs__cell" role="columnheader">Time</span>
          <span className="rs__cell rs__cell--num" role="columnheader">Price</span>
        </div>

        {rows.map((r, i) => (
          <div className="rs__row" role="row" key={i}>
            <span className="rs__cell rs__cell--item" role="cell">
              <span className="rs__thumb" style={{ "--rar": `var(--rar-${r.rarity})` }} aria-hidden="true" />
              <span className="rs__name u-truncate">{r.name}</span>
            </span>
            <span className="rs__cell rs__addr" role="cell">{r.seller}</span>
            <span className="rs__cell rs__addr" role="cell">{r.buyer}</span>
            <span className="rs__cell" role="cell">
              <span className="rs__type">{r.type}</span>
            </span>
            <span className="rs__cell rs__muted" role="cell">{r.time}</span>
            <span className="rs__cell rs__cell--num rs__cell--price" role="cell">
              <ManaMark size={13} className="rs__manamark" />
              {r.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
