import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import NftCard from "../components/NftCard.jsx";
import ParcelMiniMap from "../../components/ParcelMiniMap.jsx";
import AssetTopbar from "../components/AssetTopbar.jsx";
import FilterBox from "../../components/FilterBox.jsx";
import PriceRange from "../components/PriceRange.jsx";
import "./mklandspage.css";

const LAND_CATEGORIES = [
  { id: "land", label: "Land" },
  { id: "parcels", label: "Parcels" },
  { id: "estates", label: "Estates" },
];

const LAND_STATUS = [
  { id: "all", label: "All land" },
  { id: "sale", label: "Available to buy" },
  { id: "rent", label: "Available to rent" },
];

const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "cheapest", label: "Cheapest" },
  { id: "most_expensive", label: "Most expensive" },
  { id: "recently_listed", label: "Recently listed" },
  { id: "name", label: "Name" },
  { id: "size", label: "Size" },
];

const MAP_LEGEND = [
  { id: "plaza", label: "Plaza", mod: "plaza" },
  { id: "owned", label: "Your LAND", mod: "owned" },
  { id: "rented", label: "Your rented LAND", mod: "rented" },
  { id: "sale", label: "On sale or on rent", mod: "sale" },
  { id: "taken", label: "Taken", mod: "taken" },
];

const ITEMS = [
  { name: "Parcel 64,12", price: "4,200", network: "ethereum", metaRight: "1 LAND" },
  { name: "Genesis Plaza Estate", price: "38,500", network: "ethereum", metaRight: "12 LAND" },
  { name: "Parcel -45,77", price: "3,150", network: "ethereum", metaRight: "1 LAND" },
  { name: "Fashion District Estate", price: "21,000", network: "ethereum", metaRight: "6 LAND" },
  { name: "Parcel 102,-8", price: "2,890", network: "ethereum", metaRight: "1 LAND" },
  { name: "Vegas City Estate", network: "ethereum", metaRight: "9 LAND" },
  { name: "Parcel 5,141", price: "5,400", network: "ethereum", metaRight: "1 LAND" },
  { name: "Dragon City Estate", price: "16,750", network: "ethereum", metaRight: "4 LAND" },
  { name: "Parcel -90,30", price: "3,600", network: "ethereum", metaRight: "1 LAND" },
  { name: "Aetheria Estate", price: "62,000", network: "ethereum", metaRight: "18 LAND" },
  { name: "Parcel 33,-120", price: "2,450", network: "ethereum", metaRight: "1 LAND" },
  { name: "Museum District Estate", price: "24,300", network: "ethereum", metaRight: "7 LAND" },
];

const GridIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
);
const AtlasIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

function ViewToggle({ isMap, onChange }) {
  return (
    <div className="ml__toggle" role="group" aria-label="View mode">
      <button
        type="button"
        className={"ml__chip" + (!isMap ? " is-active" : "")}
        aria-pressed={!isMap}
        aria-label="Grid view"
        onClick={() => onChange(false)}
      >
        <GridIcon />
      </button>
      <button
        type="button"
        className={"ml__chip" + (isMap ? " is-active" : "")}
        aria-pressed={isMap}
        aria-label="Atlas map view"
        onClick={() => onChange(true)}
      >
        <AtlasIcon />
      </button>
    </div>
  );
}

function AtlasField({ showOwned, onlyOnSale, onlyOnRent }) {
  const COLS = 60;
  const ROWS = 34;
  const tiles = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const x = i % COLS;
    const y = Math.floor(i / COLS);
    let mod = "land";
    if (x % 9 === 0 || y % 8 === 0) mod = "road";
    if ((x % 18 === 9 && y % 16 === 8) || (x % 18 === 10 && y % 16 === 8) || (x % 18 === 9 && y % 16 === 9)) mod = "plaza";
    const h = (x * 73 + y * 131) % 100;
    if (mod === "land") {
      if (h < 34) mod = "taken";
      else if ((onlyOnSale || (!onlyOnSale && !onlyOnRent)) && h >= 34 && h < 44) mod = "onsale";
      else if (onlyOnRent && h >= 44 && h < 50) mod = "onsale";
      else if (showOwned && h >= 50 && h < 53) mod = "owned";
      else if (showOwned && h >= 53 && h < 55) mod = "rented";
    }
    tiles.push(<span key={i} className={"ml__parcel ml__parcel--" + mod} />);
  }
  return (
    <div className="ml__parcels" style={{ gridTemplateColumns: `repeat(${COLS}, 22px)` }} aria-hidden="true">
      {tiles}
    </div>
  );
}

export default function MkLandsPage({ items = ITEMS, mode = "grid", state = "ready" }) {
  const [tab, setTab] = useState("land");
  const [isMap, setIsMap] = useState(mode === "map");

  const [open, setOpen] = useState({ status: true, price: true, estate: true, location: true });
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const [status, setStatus] = useState("sale");
  const [cat, setCat] = useState("land");
  const [adjacent, setAdjacent] = useState(false);
  const [sort, setSort] = useState("newest");

  const [onlyOnSale, setOnlyOnSale] = useState(true);
  const [onlyOnRent, setOnlyOnRent] = useState(false);
  const [showOwned, setShowOwned] = useState(true);
  const [legendOpen, setLegendOpen] = useState(false);

  const isEmpty = state === "empty" || items.length === 0;
  const isLoading = state === "loading";
  const count = items.length;

  if (isMap) {
    return (
      <MarketplaceChrome active={tab} onTab={setTab}>
        <div className="ml ml--map">
          <div className="ml__map">
            <AtlasField showOwned={showOwned} onlyOnSale={onlyOnSale} onlyOnRent={onlyOnRent} />

            <div className="ml__mapbar">
              <label className="ml__mapcheck">
                <input type="checkbox" checked={onlyOnSale} onChange={() => setOnlyOnSale((v) => !v)} />
                <span className="ml__mapcheckmark" aria-hidden="true" />
                Available to buy
              </label>
              <label className="ml__mapcheck">
                <input type="checkbox" checked={onlyOnRent} onChange={() => setOnlyOnRent((v) => !v)} />
                <span className="ml__mapcheckmark" aria-hidden="true" />
                Available to rent
              </label>
              <label className="ml__mapcheck">
                <input type="checkbox" checked={showOwned} onChange={() => setShowOwned((v) => !v)} />
                <span className="ml__mapcheckmark" aria-hidden="true" />
                Owned by me
              </label>
              <ViewToggle isMap={isMap} onChange={setIsMap} />
            </div>

            <button type="button" className="ml__fullscreen" aria-label="Toggle fullscreen">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>

            {legendOpen ? (
              <div className="ml__legend" role="dialog" aria-label="Map colors">
                <h3 className="ml__legendtitle">Map colors</h3>
                <div className="ml__legendlist">
                  {MAP_LEGEND.map((l) => (
                    <span key={l.id} className="ml__legenditem">
                      <span className={"ml__swatch ml__swatch--" + l.mod} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className={"ml__info" + (legendOpen ? " is-open" : "")}
              aria-label="Map colors"
              aria-expanded={legendOpen}
              onClick={() => setLegendOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 7.5h.01" />
              </svg>
            </button>

            <div className="ml__zoom" role="group" aria-label="Zoom">
              <button type="button" className="ml__zoombtn" aria-label="Zoom in">+</button>
              <button type="button" className="ml__zoombtn" aria-label="Zoom out">−</button>
            </div>
          </div>
        </div>
      </MarketplaceChrome>
    );
  }

  const sortLabel = SORTS.find((s) => s.id === sort)?.label ?? SORTS[0].label;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="ml">
        <aside className="ml__filters" aria-label="LAND filters">
          <div className="ml__cats" role="group" aria-label="Categories">
            <span className="ml__catstitle">Categories</span>
            {LAND_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={"ml__cat" + (cat === c.id ? " is-active" : "")}
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <FilterBox title="Status" open={open.status} onToggle={() => toggle("status")}>
            <div className="ml__radios">
              {LAND_STATUS.map((s) => (
                <label key={s.id} className="ml__radio">
                  <input
                    type="radio"
                    name="ml-status"
                    checked={status === s.id}
                    onChange={() => setStatus(s.id)}
                  />
                  <span className="ml__radiomark" aria-hidden="true" />
                  {s.label}
                </label>
              ))}
            </div>
          </FilterBox>

          <FilterBox title="Price" open={open.price} onToggle={() => toggle("price")}>
            <PriceRange />
          </FilterBox>

          <FilterBox title="Estate size" open={open.estate} onToggle={() => toggle("estate")}>
            <div className="ml__rangeline">
              <span>1 parcel</span>
              <span>100+ parcels</span>
            </div>
            <div className="ml__track">
              <span style={{ left: "6%", right: "42%" }} />
              <span className="ml__knob" style={{ left: "6%" }} />
              <span className="ml__knob" style={{ left: "58%" }} />
            </div>
          </FilterBox>

          {status === "rent" ? (
            <FilterBox title="Rental Period" open={open.estate} onToggle={() => toggle("estate")}>
              <div className="ml__radios">
                <label className="ml__radio">
                  <input type="radio" name="ml-period" defaultChecked />
                  <span className="ml__radiomark" aria-hidden="true" />
                  All periods
                </label>
                <label className="ml__radio">
                  <input type="radio" name="ml-period" />
                  <span className="ml__radiomark" aria-hidden="true" />
                  7 days
                </label>
                <label className="ml__radio">
                  <input type="radio" name="ml-period" />
                  <span className="ml__radiomark" aria-hidden="true" />
                  30 days
                </label>
              </div>
            </FilterBox>
          ) : null}

          <FilterBox title="Location" open={open.location} onToggle={() => toggle("location")}>
            <label className="ml__check">
              <input type="checkbox" checked={adjacent} onChange={() => setAdjacent((v) => !v)} />
              <span className="ml__checkmark" aria-hidden="true" />
              Adjacent to road
            </label>
            <div style={{ marginTop: 18 }}>
              <div className="ml__rangeline">
                <span>Near a plaza</span>
                <span>0–10 parcels</span>
              </div>
              <div className="ml__track">
                <span style={{ left: "0%", right: "60%" }} />
                <span className="ml__knob" style={{ left: "0%" }} />
                <span className="ml__knob" style={{ left: "40%" }} />
              </div>
            </div>
          </FilterBox>
        </aside>

        <main className="ml__main">
          <AssetTopbar
            layout="stacked"
            searchPlaceholder="Search Land..."
            view={isMap ? "atlas" : "grid"}
            onView={(id) => setIsMap(id === "atlas")}
            viewOptions={[
              { id: "grid", label: "Grid view", icon: <GridIcon /> },
              { id: "atlas", label: "Atlas map view", icon: <AtlasIcon /> },
            ]}
            showCount={!isLoading}
            count={isEmpty ? 0 : count}
            sort={sort}
            onSort={setSort}
            sortOptions={isLoading ? undefined : SORTS}
          />

          {isLoading ? (
            <div className="ml__loading u-skel" style={{ width: "100%" }}>
              <div className="ml__grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div className="ml__cell" key={i}>
                    <div className="u-skel" style={{ width: "100%" }}>
                      <div className="u-skel__line" style={{ height: 220, borderRadius: "var(--r-card)" }} />
                      <div className="u-skel__line" style={{ width: "70%" }} />
                      <div className="u-skel__line" style={{ width: "40%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : isEmpty ? (
            <div className="ml__empty">
              <div className="ml__emptyicon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>
              <p className="ml__emptytitle">No results found for these filters.</p>
              <p className="ml__emptysub">Try clearing the filters to see all available LAND.</p>
              <button type="button" className="ml__reset">Reset filters</button>
            </div>
          ) : (
            <>
              <div className="ml__grid">
                {items.map((item, i) => (
                  <div className="ml__cell" key={i}>
                    <NftCard {...item} figure={<ParcelMiniMap seed={i + 1} />} />
                  </div>
                ))}
              </div>
              <div className="ml__loadmore">
                <button type="button" className="ml__loadbtn">Load more</button>
              </div>
            </>
          )}
        </main>
      </div>
    </MarketplaceChrome>
  );
}
