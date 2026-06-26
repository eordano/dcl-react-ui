import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import NftCard from "../components/NftCard.jsx";
import ParcelMiniMap from "../../components/ParcelMiniMap.jsx";
import EnsCard from "../../builder/components/EnsCard.jsx";
import RankingsTable from "../components/RankingsTable.jsx";
import RecentlySoldTable from "../components/RecentlySoldTable.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import { Info, ChevronRight } from "../../atoms/icons.jsx";
import "./marketplacehome.css";

const TIMEFRAMES = [
  { id: "7d", label: "7 DAYS" },
  { id: "30d", label: "30 DAYS" },
  { id: "all", label: "ALL" },
];

const STATS = [
  {
    key: "total_sales",
    label: "Total sales",
    tip: "Number of NFTs sold, including primary and secondary markets.",
    value: "304",
    sub: "43/day",
    mana: false,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M20 11.5 12.5 4H6a2 2 0 0 0-2 2v6.5L11.5 20a2 2 0 0 0 2.8 0l5.7-5.7a2 2 0 0 0 0-2.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "total_volume",
    label: "Total volume",
    tip: "Volume of sales and rents in MANA, including primary and secondary sales.",
    value: "125.80K",
    sub: "$9.68K",
    mana: true,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M4 17l4.5-5 3.5 3 7-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h4v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "dao_revenue",
    label: "DAO revenue",
    tip: "The DAO gets 2.5% of LAND sales, rentals and collectibles mints; and 100% of publication fees and name mints.",
    value: "14.95K",
    sub: "$1.15K",
    mana: true,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 3v16M5 19h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 6 3 11h6L6 6Zm12 0-3 5h6l-3-5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 4 6 6m6-2 6 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const TRENDING = [
  { name: "Cyber Ronin Jacket", collection: "NeonForge", price: "1,250", rarity: "legendary", tag: "Mint" },
  { name: "Aurora Wings", collection: "Skybound", price: "980", rarity: "mythic" },
  { name: "Pixel Shades", collection: "8bitClub", price: "120", rarity: "rare" },
  { name: "Golden Crown", collection: "RoyalDCL", price: "3,400", rarity: "unique" },
  { name: "Frost Hoodie", collection: "WinterSet", price: "85", rarity: "uncommon" },
  { name: "Plasma Boots", collection: "NeonForge", price: "640", rarity: "epic", network: "ethereum" },
];

const NEWEST = [
  { name: "Neon Visor", collection: "PulseLab", price: "210", rarity: "epic", tag: "Mint" },
  { name: "Coral Mohawk", collection: "ReefWear", price: "95", rarity: "rare", tag: "Mint" },
  { name: "Obsidian Suit", collection: "VoidForge", price: "1,420", rarity: "mythic", tag: "Mint" },
  { name: "Daisy Crown", collection: "BloomCo", price: "60", rarity: "uncommon", tag: "Mint" },
  { name: "Circuit Wings", collection: "VoltAtelier", price: "780", rarity: "legendary", tag: "Mint" },
  { name: "Pixel Pet", collection: "8bitClub", price: "150", rarity: "rare", tag: "Mint" },
];

const LISTINGS = [
  { name: "Vapor Tee", collection: "VaporWave", price: "45", rarity: "common" },
  { name: "Holo Backpack", collection: "FutureGear", price: "310", rarity: "epic" },
  { name: "Sakura Kimono", collection: "EdoStyle", price: "560", rarity: "rare", network: "ethereum" },
  { name: "Glitch Mask", collection: "404Wear", price: "199", rarity: "uncommon" },
  { name: "Solar Halo", collection: "Skybound", price: "1,780", rarity: "exotic" },
  { name: "Dragon Cape", collection: "MythMakers", price: "2,050", rarity: "legendary", network: "ethereum" },
];

const LANDS = [
  { name: "Parcel 64,12", price: "4,200", network: "ethereum", metaRight: "1 LAND" },
  { name: "Genesis Plaza Estate", price: "38,500", network: "ethereum", metaRight: "12 LAND" },
  { name: "Parcel -45,77", price: "3,150", network: "ethereum", metaRight: "1 LAND" },
  { name: "Fashion District Estate", price: "21,000", network: "ethereum", metaRight: "6 LAND" },
  { name: "Parcel 9,-30", price: "2,600", network: "ethereum", metaRight: "1 LAND" },
  { name: "Crypto Valley Estate", price: "54,000", network: "ethereum", metaRight: "18 LAND" },
];

const NAMES = [
  { name: "nova", price: "1,450" },
  { name: "metaverse", price: "8,900" },
  { name: "xAI", price: "2,100" },
  { name: "horizon", price: "640" },
  { name: "DAO", price: "5,000" },
  { name: "wonderland" },
];

const nftCard = (item) => <NftCard {...item} />;
const landCard = (item, i) => <NftCard {...item} figure={<ParcelMiniMap seed={i + 1} />} />;
const ensCard = (item) => <EnsCard {...item} />;
function HomeRow({ title, subtitle, items, renderCard = nftCard }) {
  return (
    <section className="mh__section">
      <header className="mh__sechead">
        <div className="mh__sectext">
          <h2 className="mh__sectitle">{title}</h2>
          {subtitle ? <p className="mh__secsub">{subtitle}</p> : null}
        </div>
        <button type="button" className="mh__exploreall">
          EXPLORE ALL
          <ChevronRight size={14} />
        </button>
      </header>

      {items.length ? (
        <div className="mh__row">
          {items.map((item, i) => (
            <div className="mh__cell" key={i}>
              {renderCard(item, i)}
            </div>
          ))}
        </div>
      ) : (
        <div className="mh__empty">Nothing here right now — check back soon.</div>
      )}
    </section>
  );
}

export default function MarketplaceHome({ stats = STATS, trending = TRENDING }) {
  const [tab, setTab] = useState("overview");
  const [timeframe, setTimeframe] = useState("7d");

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mh">
        <section className="mh__volume">
          <header className="mh__volhead">
            <div className="mh__voltext">
              <h1 className="mh__voltitle">Marketplace Volume</h1>
              <p className="mh__volsub">Includes Land, Wearables, Emotes and Names</p>
            </div>
            <div className="mh__timeframe" role="tablist" aria-label="Volume timeframe">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf.id}
                  type="button"
                  role="tab"
                  aria-selected={tf.id === timeframe}
                  className={"mh__tf" + (tf.id === timeframe ? " is-active" : "")}
                  onClick={() => setTimeframe(tf.id)}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </header>

          <div className="mh__statscard">
            {stats.map((s) => (
              <div className="mh__stat" key={s.key}>
                <span className="mh__staticon">{s.icon}</span>
                <div className="mh__statbody">
                  <div className="mh__statlabel">
                    <span>{s.label}</span>
                    <span className="mh__statinfo u-tip">
                      <Info size={13} />
                      <span className="u-tip__bubble">{s.tip}</span>
                    </span>
                  </div>
                  <div className="mh__statvalue">
                    {s.mana ? <ManaMark size={16} className="mh__statmana" /> : null}
                    {s.value}
                    <span className="mh__statsub">{s.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HomeRow title="Trending items" subtitle="Bestselling Items over the last 24hs 🔥" items={trending} />
        <HomeRow title="Newest items" items={NEWEST} />
        <RankingsTable />
        <HomeRow title="Latest listings" subtitle="Items being resold" items={LISTINGS} />
        <HomeRow title="Parcels and Estates" items={LANDS} renderCard={landCard} />
        <HomeRow title="Names" items={NAMES} renderCard={ensCard} />
        <RecentlySoldTable />
      </div>
    </MarketplaceChrome>
  );
}
