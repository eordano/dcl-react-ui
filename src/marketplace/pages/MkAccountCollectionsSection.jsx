import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import "./mkaccountcollectionssection.css";
import { Caret } from "../../atoms/icons.jsx";

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

const COLLECTIONS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: "name", text: "Name" },
  { value: "newest", text: "Newest" },
  { value: "recently_reviewed", text: "Recently reviewed" },
  { value: "size", text: "Size" },
];

const COLLECTIONS = [
  {
    contractAddress: "0x3a1d…b7e2",
    name: "Neon District Drop",
    size: 14,
    isOnSale: true,
    tiles: ["legendary", "epic", "rare", "mythic"],
  },
  {
    contractAddress: "0x91cf…04ad",
    name: "Cyber Ronin Capsule",
    size: 6,
    isOnSale: true,
    tiles: ["mythic", "legendary"],
  },
  {
    contractAddress: "0x52aa…9f81",
    name: "Aurora Wings Collection",
    size: 3,
    isOnSale: false,
    tiles: ["epic", "rare", "uncommon"],
  },
  {
    contractAddress: "0x77c0…be12",
    name: "Genesis Plaza Relics",
    size: 1,
    isOnSale: false,
    tiles: ["unique"],
  },
  {
    contractAddress: "0x0b9e…42cf",
    name: "Pixel Shades Series",
    size: 24,
    isOnSale: true,
    tiles: ["rare", "uncommon", "common", "epic"],
  },
];

const ListedBadge = () => (
  <span className="cl__badge" title="Listed for sale" aria-label="Listed for sale">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5V4a1 1 0 0 1 1-1h7.5L21 12.5 12.5 21 3 11.5Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  </span>
);

const SearchGlyph = () => (
  <svg className="cl__searchicon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

function CollectionImage({ tiles }) {
  const row1 = tiles.slice(0, 2);
  const row2 = tiles.slice(2, 4);
  const rowH = row2.length ? "50%" : "100%";
  const Row = ({ items, full }) => (
    <div className={"cl__imgrow" + (full ? " cl__imgrow--full" : "")} style={{ height: rowH }}>
      {items.map((rarity, i) => (
        <span
          key={i}
          className="cl__imgtile u-rar-bg"
          style={{ "--rb": `var(--rar-bg-${rarity})` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
  if (tiles.length === 0) return <div className="cl__imgrow cl__imgrow--empty" />;
  return (
    <div className="cl__image">
      {row1.length > 0 ? <Row items={row1} full={tiles.length === 2} /> : null}
      {row2.length > 0 ? <Row items={row2} /> : null}
    </div>
  );
}

export default function MkAccountCollectionsSection({
  collections = COLLECTIONS,
  count = COLLECTIONS.length,
  page = 1,
  sortBy = "newest",
  isLoading = false,
}) {
  const [tab, setTab] = useState("my-assets");
  const [section, setSection] = useState("collections");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sortBy);
  const [sortOpen, setSortOpen] = useState(false);
  const [activePage, setActivePage] = useState(page);

  const pages = Math.ceil(count / COLLECTIONS_PER_PAGE);
  const hasPagination = pages > 1;
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.text ?? "Newest";

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="cl">
        <aside className="cl__sidebar" aria-label="My assets">
          <nav className="cl__menu" aria-label="Assets">
            <div className="cl__menuhead">ASSETS</div>
            <ul className="cl__menulist">
              {ASSET_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"cl__menuitem" + (s.id === section ? " is-active" : "")}
                    aria-current={s.id === section ? "true" : undefined}
                    onClick={() => setSection(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="cl__menu" aria-label="Store">
            <div className="cl__menuhead">STORE</div>
            <ul className="cl__menulist">
              {STORE_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"cl__menuitem" + (s.id === section ? " is-active" : "")}
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

        <main className="cl__main">
          <div className="cl__filters">
            <div className="cl__search">
              <SearchGlyph />
              <input
                type="text"
                className="cl__searchinput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${isLoading ? 0 : count} collections...`}
                aria-label="Search collections"
              />
            </div>
            <div className="cl__sort">
              <button
                type="button"
                className="cl__sortbtn"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((o) => !o)}
              >
                <span>{sortLabel}</span>
                <Caret size={12} />
              </button>
              {sortOpen && (
                <ul className="cl__sortmenu" role="listbox">
                  {SORT_OPTIONS.map((o) => (
                    <li key={o.value} role="option" aria-selected={o.value === sort}>
                      <button
                        type="button"
                        className={"cl__sortopt" + (o.value === sort ? " is-active" : "")}
                        onClick={() => {
                          setSort(o.value);
                          setSortOpen(false);
                        }}
                      >
                        {o.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="cl__loaderbox">
              <span className="cl__loader" aria-label="Loading" />
            </div>
          ) : collections.length === 0 ? (
            <div className="cl__empty">No results</div>
          ) : (
            <>
              <div className="cl__cards">
                {collections.map((c) => (
                  <a key={c.contractAddress} className="cl__card" href={`/marketplace/collection?contract=${c.contractAddress}`}>
                    <div className="cl__cardcontent">
                      <div className="cl__details">
                        <div className="cl__detailsleft">
                          <CollectionImage tiles={c.tiles} />
                        </div>
                        <div className="cl__detailsright">
                          <div className="cl__name u-truncate">{c.name}</div>
                          <div className="cl__count">{c.size} items</div>
                        </div>
                      </div>
                      {c.isOnSale && <ListedBadge />}
                    </div>
                  </a>
                ))}
              </div>

              {hasPagination && (
                <div className="cl__pagination">
                  <button
                    type="button"
                    className="cl__pagebtn cl__pagebtn--prev"
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
                      className={"cl__pagebtn" + (p === activePage ? " is-active" : "")}
                      aria-current={p === activePage ? "page" : undefined}
                      onClick={() => setActivePage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="cl__pagebtn cl__pagebtn--next"
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
        </main>
      </div>
    </MarketplaceChrome>
  );
}
