import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkmysaleshistory.css";

const ASSET_SECTIONS = [
  { id: "wearables", label: "Wearables" },
  { id: "emotes", label: "Emotes" },
  { id: "ens", label: "Names" },
  { id: "land", label: "Land" },
  { id: "collections", label: "Collections" },
];
const STORE_SECTIONS = [
  { id: "on_sale", label: "On Sale" },
  { id: "on_rent", label: "On Rent" },
  { id: "sales", label: "Sales" },
  { id: "bids", label: "Bids" },
  { id: "store_settings", label: "Settings" },
];

const SALES_PER_PAGE = 24;

const STATS = {
  totalSales: 1234,
  totalEarnings: "82,640.55",
  royalties: "4,118.20",
  ethereumEarned: "27,500.00",
  maticEarned: "55,140.55",
};

const SALES = [
  {
    id: "0xa1",
    name: "Cyber Ronin Jacket",
    rarity: "legendary",
    subtitle: null,
    time: "2 hours ago",
    buyer: "0x9f3c…7a21",
    type: "order",
    network: "matic",
    price: "1,250",
  },
  {
    id: "0xa2",
    name: "Genesis Plaza Estate",
    rarity: "mythic",
    subtitle: "4 Parcels",
    time: "8 hours ago",
    buyer: "0x77c0…be12",
    type: "bid",
    network: "ethereum",
    price: "9,800",
  },
  {
    id: "0xa3",
    name: "Aurora Wings",
    rarity: "mythic",
    subtitle: null,
    time: "yesterday",
    buyer: "0x52aa…9f81",
    type: "order",
    network: "matic",
    price: "3,420",
  },
  {
    id: "0xa4",
    name: "Parcel 34,-12",
    rarity: "rare",
    subtitle: "34,-12",
    time: "2 days ago",
    buyer: "0x1ab4…0d3e",
    type: "order",
    network: "ethereum",
    price: "2,150",
  },
  {
    id: "0xa5",
    name: "Pixel Shades",
    rarity: "rare",
    subtitle: null,
    time: "4 days ago",
    buyer: "0x0b9e…42cf",
    type: "bid",
    network: "matic",
    price: "120",
  },
  {
    id: "0xa6",
    name: "Holo Backpack",
    rarity: "epic",
    subtitle: null,
    time: "6 days ago",
    buyer: "0x3d51…ac08",
    type: "order",
    network: "matic",
    price: "310",
  },
  {
    id: "0xa7",
    name: "Glitch Mask",
    rarity: "uncommon",
    subtitle: null,
    time: "12 days ago",
    buyer: "0xcc20…11ad",
    type: "order",
    network: "matic",
    price: "199",
  },
];

const TagIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11.5V4a1 1 0 0 1 1-1h7.5L21 12.5 12.5 21 3 11.5Z" />
    <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.6 9.1l5.8-.8L12 3Z" />
  </svg>
);
const ManaCoin = ({ net }) => (
  <span className={"sh__manacoin sh__manacoin--" + net} aria-hidden="true">
    <ManaMark size={14} network={net} />
  </span>
);

function Stat({ icon, value, subtitle, isLoading }) {
  return (
    <div className="sh__stat">
      {isLoading ? (
        <div className="sh__loaderbox">
          <span className="sh__loader" aria-label="Loading" />
        </div>
      ) : (
        <>
          <div className="sh__staticon">{icon}</div>
          <div className="sh__statdetails">
            <div className="sh__statvalue">{value}</div>
            <div className="sh__statsub">{subtitle}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default function MkMySalesHistory({
  stats = STATS,
  sales = SALES,
  count = SALES.length,
  page = 1,
  isLoading = false,
}) {
  const [tab, setTab] = useState("my-assets");
  const [section, setSection] = useState("sales");
  const [activePage, setActivePage] = useState(page);

  const pages = Math.ceil(count / SALES_PER_PAGE);
  const hasPagination = pages > 1;

  const typeLabel = (t) => (t === "bid" ? "Bid" : "Listing");

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="sh">
        <aside className="sh__sidebar" aria-label="My store">
          <nav className="sh__menu" aria-label="Assets">
            <div className="sh__menuhead">ASSETS</div>
            <ul className="sh__menulist">
              {ASSET_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"sh__menuitem" + (s.id === section ? " is-active" : "")}
                    aria-current={s.id === section ? "true" : undefined}
                    onClick={() => setSection(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sh__menu" aria-label="Store">
            <div className="sh__menuhead">STORE</div>
            <ul className="sh__menulist">
              {STORE_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"sh__menuitem" + (s.id === section ? " is-active" : "")}
                    aria-current={s.id === section ? "true" : undefined}
                    onClick={() => setSection(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="sh__main">
          <div className="sh__headerrow">
            <h2 className="sh__header">Stats</h2>
          </div>

          <div className="sh__stats">
            <Stat
              isLoading={isLoading}
              value={stats.totalSales.toLocaleString()}
              subtitle="Total sales"
              icon={<span className="sh__statglyph"><TagIcon /></span>}
            />
            <Stat
              isLoading={isLoading}
              value={stats.totalEarnings}
              subtitle="Total earnings"
              icon={<span className="sh__statglyph"><BagIcon /></span>}
            />
            <Stat
              isLoading={isLoading}
              value={stats.royalties}
              subtitle="Royalty earnings"
              icon={<span className="sh__statglyph"><StarIcon /></span>}
            />
            <Stat
              isLoading={isLoading}
              value={stats.ethereumEarned}
              subtitle="Ethereum earnings"
              icon={<ManaCoin net="ethereum" />}
            />
            <Stat
              isLoading={isLoading}
              value={stats.maticEarned}
              subtitle="Polygon earnings"
              icon={<ManaCoin net="matic" />}
            />
          </div>

          <div className="sh__activity">
            <h2 className="sh__header sh__header--activity">Activity</h2>

            {isLoading ? (
              <div className="sh__loaderbox sh__loaderbox--activity">
                <span className="sh__loader" aria-label="Loading" />
              </div>
            ) : (
              <>
                <table className="sh__table">
                  <thead>
                    <tr>
                      <th className="sh__th sh__th--item">Item</th>
                      <th className="sh__th">Time</th>
                      <th className="sh__th">Buyer</th>
                      <th className="sh__th">Type</th>
                      <th className="sh__th">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr className="sh__tr" key={sale.id}>
                        <td className="sh__td sh__td--item">
                          <span role="button" tabIndex={0} className="sh__assetcell">
                            <span
                              className="sh__thumb u-rar-bg"
                              style={{ "--rb": `var(--rar-bg-${sale.rarity})` }}
                              aria-hidden="true"
                            />
                            <span className="sh__assetnames">
                              <span className="sh__assettitle u-truncate">{sale.name}</span>
                              {sale.subtitle ? (
                                <span className="sh__assetsub u-truncate">{sale.subtitle}</span>
                              ) : null}
                            </span>
                          </span>
                        </td>
                        <td className="sh__td sh__muted">{sale.time}</td>
                        <td className="sh__td">
                          <span role="button" tabIndex={0} className="sh__buyer">{sale.buyer}</span>
                        </td>
                        <td className="sh__td">{typeLabel(sale.type)}</td>
                        <td className="sh__td">
                          <span className={"sh__mana sh__mana--" + sale.network}>
                            <ManaMark size={11} className="sh__manamark" network={sale.network} />
                            {sale.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {count === 0 && <div className="sh__empty">No results</div>}

                {hasPagination && (
                  <div className="sh__pagination">
                    <button
                      type="button"
                      className="sh__pagebtn sh__pagebtn--prev"
                      disabled={activePage <= 1}
                      onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={"sh__pagebtn" + (p === activePage ? " is-active" : "")}
                        aria-current={p === activePage ? "page" : undefined}
                        onClick={() => setActivePage(p)}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="sh__pagebtn sh__pagebtn--next"
                      disabled={activePage >= pages}
                      onClick={() => setActivePage((p) => Math.min(pages, p + 1))}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </MarketplaceChrome>
  );
}
