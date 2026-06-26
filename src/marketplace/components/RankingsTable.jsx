import { useState } from "react";
import ManaMark from "../../atoms/ManaMark.jsx";
import { ChevronDown } from "../../atoms/icons.jsx";
import "./rankingstable.css";

const ENTITIES = [
  { id: "wearables", label: "Wearables" },
  { id: "emotes", label: "Emotes" },
  { id: "creators", label: "Creators" },
  { id: "collectors", label: "Collectors" },
];

const TIMEFRAMES = [
  { id: "day", label: "Day" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "all", label: "All" },
];

const ROWS = [
  { name: "Cyber Ronin Jacket", creator: "NeonForge", category: "Upper Body", rarity: "legendary", sold: "1,204", volume: "184.2K" },
  { name: "Aurora Wings", creator: "Skybound", category: "Accessories", rarity: "mythic", sold: "318", volume: "126.9K" },
  { name: "Obsidian Suit", creator: "VoidForge", category: "Upper Body", rarity: "mythic", sold: "642", volume: "98.4K" },
  { name: "Pixel Shades", creator: "8bitClub", category: "Eyewear", rarity: "rare", sold: "2,510", volume: "61.0K" },
  { name: "Circuit Wings", creator: "VoltAtelier", category: "Accessories", rarity: "legendary", sold: "455", volume: "47.7K" },
  { name: "Solar Halo", creator: "Skybound", category: "Top Head", rarity: "exotic", sold: "129", volume: "39.5K" },
];

function Dropdown({ label, value }) {
  return (
    <button type="button" className="rk__dropdown">
      <span className="rk__dropdown-label">{label}</span>
      <span className="rk__dropdown-value">{value}</span>
      <ChevronDown size={14} />
    </button>
  );
}

export default function RankingsTable({ rows = ROWS }) {
  const [entity, setEntity] = useState("wearables");
  const [timeframe, setTimeframe] = useState("week");

  return (
    <section className="rk">
      <header className="rk__head">
        <div className="rk__titlewrap">
          <h2 className="rk__title">Rankings</h2>
          <p className="rk__subtitle">Includes only Wearables and Emotes</p>
        </div>
        <div className="rk__timeframe" role="tablist" aria-label="Rankings timeframe">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.id}
              type="button"
              role="tab"
              aria-selected={tf.id === timeframe}
              className={"rk__tf" + (tf.id === timeframe ? " is-active" : "")}
              onClick={() => setTimeframe(tf.id)}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </header>

      <nav className="rk__tabs" aria-label="Rankings category">
        {ENTITIES.map((e) => (
          <button
            key={e.id}
            type="button"
            className={"rk__tab" + (e.id === entity ? " is-active" : "")}
            aria-current={e.id === entity ? "true" : undefined}
            onClick={() => setEntity(e.id)}
          >
            {e.label}
          </button>
        ))}
      </nav>

      <div className="rk__filters">
        <Dropdown label="Category" value="All categories" />
        <Dropdown label="Rarity" value="All rarities" />
        <Dropdown label="Sort by" value="Volume (MANA)" />
      </div>

      <div className="rk__table" role="table">
        <div className="rk__row rk__row--head" role="row">
          <span className="rk__cell rk__cell--item" role="columnheader">Wearable</span>
          <span className="rk__cell" role="columnheader">Category</span>
          <span className="rk__cell" role="columnheader">Rarity</span>
          <span className="rk__cell rk__cell--num" role="columnheader">Wearables sold</span>
          <span className="rk__cell rk__cell--num" role="columnheader">Total Volume</span>
        </div>

        {rows.map((r, i) => (
          <div className="rk__row" role="row" key={i}>
            <span className="rk__cell rk__cell--item" role="cell">
              <span className="rk__rank">{i + 1}</span>
              <span className="rk__thumb" style={{ "--rar": `var(--rar-${r.rarity})` }} aria-hidden="true" />
              <span className="rk__namewrap">
                <span className="rk__name u-truncate">{r.name}</span>
                <span className="rk__creator u-truncate">{r.creator}</span>
              </span>
            </span>
            <span className="rk__cell" role="cell">{r.category}</span>
            <span className="rk__cell" role="cell">
              <span className="rk__rarity" style={{ "--rar": `var(--rar-${r.rarity})` }}>{r.rarity}</span>
            </span>
            <span className="rk__cell rk__cell--num" role="cell">{r.sold}</span>
            <span className="rk__cell rk__cell--num rk__cell--vol" role="cell">
              <ManaMark size={13} className="rk__manamark" />
              {r.volume}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
