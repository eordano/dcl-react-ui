import { useMemo, useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkonsaleonrentaccountsections.css";

const ROWS_PER_PAGE = 12;

const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "name", label: "Name" },
];

const ON_SALE = [
  { id: "n1", name: "Cyber Ronin Jacket", sub: "", category: "wearable", rarity: "legendary", saleType: "secondary", price: "1,250" },
  { id: "n2", name: "Genesis Plaza Parcel", sub: "-42,18", category: "parcel", rarity: "rare", saleType: "secondary", price: "9,400" },
  { id: "n3", name: "Pixel Shades", sub: "", category: "wearable", rarity: "rare", saleType: "primary", price: "120" },
  { id: "n4", name: "Solar Halo", sub: "", category: "emote", rarity: "exotic", saleType: "secondary", price: "1,780", needsAttention: true },
  { id: "n5", name: "Aetheria Estate", sub: "6 parcels", category: "estate", rarity: "epic", saleType: "secondary", price: "21,000" },
  { id: "n6", name: "Glitch Mask", sub: "", category: "wearable", rarity: "uncommon", saleType: "secondary", price: "199", legacyExpired: true },
  { id: "n7", name: "frostfang", sub: "DCL Name", category: "ens", rarity: "unique", saleType: "secondary", price: "2,000" },
  { id: "n8", name: "Holo Backpack", sub: "", category: "wearable", rarity: "epic", saleType: "primary", price: "310" },
  { id: "n9", name: "Vapor Tee", sub: "", category: "wearable", rarity: "common", saleType: "secondary", price: "45", legacy: true },
  { id: "n10", name: "Dragonscale Cape", sub: "", category: "wearable", rarity: "legendary", saleType: "secondary", price: "640" },
  { id: "n11", name: "Sakura Kimono", sub: "", category: "wearable", rarity: "rare", saleType: "secondary", price: "275" },
  { id: "n12", name: "Plasma Boots", sub: "", category: "wearable", rarity: "epic", saleType: "primary", price: "180" },
  { id: "n13", name: "Neon District Parcel", sub: "12,-7", category: "parcel", rarity: "rare", saleType: "secondary", price: "8,900" },
];

const ON_RENT = [
  { id: "r1", name: "Aetheria Estate", sub: "6 parcels", category: "estate", rarity: "epic", status: "open", price: "120" },
  { id: "r2", name: "Genesis Plaza Parcel", sub: "-42,18", category: "parcel", rarity: "rare", status: "rented", endDate: "Jul 14", price: "45" },
  { id: "r3", name: "Neon District Parcel", sub: "12,-7", category: "parcel", rarity: "rare", status: "open", price: "60" },
  { id: "r4", name: "Riverside Estate", sub: "3 parcels", category: "estate", rarity: "legendary", status: "over", price: "90" },
  { id: "r5", name: "Skyline Parcel", sub: "88,4", category: "parcel", rarity: "common", status: "claiming", price: "30" },
];

const Mark = () => (
  <span className="mkosr__manamark">
    <ManaMark size={13} />
  </span>
);

const WarnIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor">
    <path d="M12 2 1 21h22L12 2Zm0 6 .9 7h-1.8L12 8Zm0 9.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
  </svg>
);

const SortCaret = () => (
  <svg className="mkosr__sortcaret" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const Mana = ({ amount }) => (
  <span className="mkosr__mana">
    <Mark />
    {amount}
  </span>
);

function AssetCell({ name, sub, rarity }) {
  return (
    <span role="button" tabIndex={0} className="mkosr__assetcell">
      <span className="mkosr__assetimg u-rar-bg" style={{ "--rb": `var(--rar-bg-${rarity})` }} />
      <span>
        <span className="mkosr__assettitle">{name}</span>
        {sub ? <span className="mkosr__assetsub" style={{ display: "block" }}>{sub}</span> : null}
      </span>
    </span>
  );
}

const CATEGORY_LABEL = {
  wearable: "Wearable",
  emote: "Emote",
  parcel: "Parcel",
  estate: "Estate",
  ens: "Name",
};

function rentStatus(row) {
  switch (row.status) {
    case "open":
      return { text: "Listed for rent" };
    case "rented":
      return { text: `Rented until ${row.endDate}` };
    case "over":
      return { warn: true, text: "Rented period is over" };
    case "claiming":
      return { warn: true, text: "Claiming back your asset…" };
    default:
      return { text: "" };
  }
}

export default function MkOnSaleOnRentAccountSections({
  type = "sale",
  onSale = ON_SALE,
  onRent = ON_RENT,
  isLoading = false,
  isEmpty = false,
}) {
  const [navTab, setNavTab] = useState("my-assets");
  const [view, setView] = useState(type);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const showRents = view === "rent";
  const source = isEmpty ? [] : showRents ? onRent : onSale;

  const filtered = useMemo(
    () => source.filter((el) => el.name.toLowerCase().includes(search.toLowerCase())),
    [source, search]
  );
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "name") arr.sort((a, b) => (a.name < b.name ? -1 : 1));
    return arr;
  }, [filtered, sort]);
  const total = sorted.length;
  const totalPages = Math.ceil(total / ROWS_PER_PAGE);
  const showPagination = total / ROWS_PER_PAGE > 1;
  const paginated = sorted.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const switchView = (v) => {
    setView(v);
    setPage(1);
    setSearch("");
  };

  return (
    <MarketplaceChrome active={navTab} onTab={setNavTab}>
      <div className="mkosr">
        <header className="mkosr__head">
          <div className="mkosr__titles">
            <span className="mkosr__eyebrow">Store</span>
            <h1 className="mkosr__title">{showRents ? "On Rent" : "On Sale"}</h1>
          </div>
          <div className="mkosr__switch" role="tablist" aria-label="Store listing type">
            <button
              type="button"
              role="tab"
              aria-selected={!showRents}
              className={"mkosr__seg" + (!showRents ? " is-active" : "")}
              onClick={() => switchView("sale")}
            >
              On Sale
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={showRents}
              className={"mkosr__seg" + (showRents ? " is-active" : "")}
              onClick={() => switchView("rent")}
            >
              On Rent
            </button>
          </div>
        </header>

        <div className="mkosr__table">
          <div className="mkosr__filters">
            <div className="mkosr__search">
              <SearchField
                value={search}
                onChange={(e) => {
                  setSearch(e?.target ? e.target.value : e);
                  setPage(1);
                }}
                placeholder={`Search ${source.length} item${source.length === 1 ? "" : "s"}`}
              />
            </div>
            <label className="mkosr__sort">
              <span className="mkosr__sortlabel">Sort by</span>
              <span className="mkosr__sortwrap">
                <select
                  className="mkosr__sortselect"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort by"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <SortCaret />
              </span>
            </label>
          </div>

          {isLoading ? (
            <>
              <div className="mkosr__overlay" />
              <div className="mkosr__loaderbox">
                <span className="u-skel" aria-label="Loading">
                  <span className="u-skel__line" style={{ width: 220 }} />
                  <span className="u-skel__line" style={{ width: 160 }} />
                  <span className="u-skel__line" style={{ width: 200 }} />
                </span>
              </div>
            </>
          ) : (
            <>
              <table className="mkosr__grid">
                <thead>
                  <tr>
                    <th className="mkosr__c-item">Item</th>
                    <th className="mkosr__c-type">Type</th>
                    <th className="mkosr__c-saletype">{showRents ? "Status" : "Sale type"}</th>
                    <th>{showRents ? "Rent price" : "Sell price"}</th>
                    {!showRents ? <th className="mkosr__c-actions">Actions</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((row) =>
                    showRents ? (
                      <RentRow key={row.id} row={row} />
                    ) : (
                      <SaleRow key={row.id} row={row} />
                    )
                  )}
                </tbody>
              </table>

              {total === 0 ? (
                <div className="mkosr__empty">
                  <span className="mkosr__emptytitle">No results</span>
                  <span>
                    {showRents
                      ? "Assets you list for rent will appear here."
                      : "Assets you list for sale will appear here."}
                  </span>
                </div>
              ) : null}

              {showPagination ? (
                <nav className="mkosr__pagination" aria-label="Pagination">
                  <button
                    type="button"
                    className="mkosr__page"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={"mkosr__page" + (p === page ? " is-active" : "")}
                      aria-current={p === page ? "page" : undefined}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="mkosr__page"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </div>
    </MarketplaceChrome>
  );
}

function SaleRow({ row }) {
  return (
    <tr>
      <td className="mkosr__c-item">
        <div className="mkosr__nameCell">
          <AssetCell name={row.name} sub={row.sub} rarity={row.rarity} />
          {row.legacyExpired || row.legacy ? (
            <span className="mkosr__warn">
              <WarnIcon />
              Action required
            </span>
          ) : null}
          {row.needsAttention ? (
            <span className="mkosr__needsbadge">
              <span className="mkosr__badge">
                Needs attention
                <span className="mkosr__badgeinfo" aria-hidden="true">
                  i
                </span>
              </span>
            </span>
          ) : null}
        </div>
      </td>
      <td className="mkosr__c-type">{CATEGORY_LABEL[row.category] || row.category}</td>
      <td className="mkosr__c-saletype">{row.saleType === "primary" ? "Primary" : "Secondary"}</td>
      <td>
        <Mana amount={row.price} />
      </td>
      <td className="mkosr__c-actions">
        {row.needsAttention ? (
          <button type="button" className="mkosr__actbtn mkosr__actbtn--inverted">
            Cancel sale
          </button>
        ) : row.legacyExpired ? (
          <button type="button" className="mkosr__actbtn mkosr__actbtn--primary">
            Terminate listing
          </button>
        ) : row.legacy ? (
          <button type="button" className="mkosr__actbtn mkosr__actbtn--inverted">
            Update sale
          </button>
        ) : null}
      </td>
    </tr>
  );
}

function RentRow({ row }) {
  const status = rentStatus(row);
  return (
    <tr>
      <td className="mkosr__c-item">
        <div className="mkosr__nameCell">
          <AssetCell name={row.name} sub={row.sub} rarity={row.rarity} />
        </div>
      </td>
      <td className="mkosr__c-type">{CATEGORY_LABEL[row.category] || row.category}</td>
      <td className="mkosr__c-saletype">
        <span className="mkosr__status">
          {status.warn ? (
            <span className="mkosr__statusicon">
              <WarnIcon />
            </span>
          ) : null}
          {status.text}
        </span>
      </td>
      <td>
        <Mana amount={row.price} />
      </td>
    </tr>
  );
}
