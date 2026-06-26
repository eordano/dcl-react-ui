import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import AssetTopbar from "../components/AssetTopbar.jsx";
import EnsCard from "../../builder/components/EnsCard.jsx";
import FilterBox from "../../components/FilterBox.jsx";
import PriceRange from "../components/PriceRange.jsx";
import FilterRadios from "../../components/FilterRadios.jsx";
import "./mknamespage.css";

const SECTIONS = [
  { id: "wearables", label: "Wearables" },
  { id: "emotes", label: "Emotes" },
  { id: "ens", label: "Names" },
  { id: "land", label: "Land" },
];

const SORTS_DEFAULT = [
  { id: "newest", label: "Newest" },
  { id: "name", label: "Name" },
];
const SORTS_ON_SALE = [
  { id: "recently_listed", label: "Recently listed" },
  { id: "recently_sold", label: "Recently sold" },
  { id: "cheapest", label: "Cheapest" },
  ...SORTS_DEFAULT,
];

const STATUSES = [
  { id: "all", label: "All" },
  { id: "on_sale", label: "On sale" },
  { id: "minting", label: "Only minting" },
  { id: "listing", label: "Only listings" },
  { id: "not_for_sale", label: "Not for sale" },
];

const NAMES = [
  { name: "vitalik", price: "12,000" },
  { name: "STARSHIELD", price: "8,500" },
  { name: "genesis", price: "4,200" },
  { name: "xAI", price: "1,950" },
  { name: "aurora" },
  { name: "pixel", price: "740" },
  { name: "satoshi", price: "21,000" },
  { name: "lumina", price: "3,100" },
  { name: "voyager", price: "1,200" },
  { name: "echo" },
  { name: "nebula", price: "2,650" },
  { name: "phoenix", price: "5,400" },
];

export default function MkNamesPage({ items = NAMES }) {
  const [tab, setTab] = useState("names");
  const [sort, setSort] = useState("newest");

  const [open, setOpen] = useState({ categories: true, price: true, status: false, sale: true });
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  const [section, setSection] = useState("ens");
  const [status, setStatus] = useState("all");
  const [onlyOnSale, setOnlyOnSale] = useState(false);

  const sortOptions = onlyOnSale ? SORTS_ON_SALE : SORTS_DEFAULT;
  const count = items.length;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mknamespage">
        <aside className="mknamespage__filters" aria-label="Filters">
          <FilterBox title="Categories" open={open.categories} onToggle={() => toggle("categories")}>
            <ul className="mknamespage__catlist">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"mknamespage__catopt" + (s.id === section ? " is-active" : "")}
                    aria-pressed={s.id === section}
                    onClick={() => setSection(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </FilterBox>

          <FilterBox title="Price" open={open.price} onToggle={() => toggle("price")}>
            <PriceRange />
          </FilterBox>

          <FilterBox title="Status" open={open.status} onToggle={() => toggle("status")}>
            <FilterRadios name="mknamespage-status" value={status} onChange={setStatus} options={STATUSES} />
          </FilterBox>

          <FilterBox title="On sale" open={open.sale} onToggle={() => toggle("sale")}>
            <label className="mknamespage__toggle">
              <span className="mknamespage__togglelabel">Only on sale</span>
              <button
                type="button"
                role="switch"
                aria-checked={onlyOnSale}
                className={"mknamespage__switch" + (onlyOnSale ? " is-on" : "")}
                onClick={() => setOnlyOnSale((v) => !v)}
              >
                <span className="mknamespage__switchknob" />
              </button>
            </label>
          </FilterBox>
        </aside>

        <main className="mknamespage__main">
          <AssetTopbar
            layout="stacked"
            searchPlaceholder="Search"
            count={count}
            sort={sortOptions.some((s) => s.id === sort) ? sort : sortOptions[0].id}
            onSort={setSort}
            sortOptions={sortOptions}
          />

          {count ? (
            <>
              <div className="mknamespage__grid">
                {items.map((item, i) => (
                  <div className="mknamespage__cell" key={i}>
                    <EnsCard {...item} />
                  </div>
                ))}
              </div>

              <div className="mknamespage__loadmore">
                <button type="button" className="mknamespage__loadbtn">Load more</button>
              </div>
            </>
          ) : (
            <div className="mknamespage__empty">
              <div className="mknamespage__watermelon" aria-hidden="true" />
              <span className="mknamespage__emptytitle">No results found for these filters.</span>
              <button type="button" className="mknamespage__emptyaction">Reset filters</button>
            </div>
          )}
        </main>
      </div>
    </MarketplaceChrome>
  );
}
