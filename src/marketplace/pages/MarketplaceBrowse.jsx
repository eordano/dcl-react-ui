import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import NftCard from "../components/NftCard.jsx";
import AssetTopbar from "../components/AssetTopbar.jsx";
import FilterBox from "../../components/FilterBox.jsx";
import PriceRange from "../components/PriceRange.jsx";
import FilterRadios from "../../components/FilterRadios.jsx";
import "./marketplacebrowse.css";

const CATEGORIES = [
  {
    id: "wearables",
    label: "Wearables",
    children: [
      { id: "head", label: "Head" },
      { id: "upper_body", label: "Upper Body" },
      { id: "hands_wear", label: "Handwear" },
      { id: "lower_body", label: "Lower Body" },
      { id: "feet", label: "Feet" },
      { id: "accessories", label: "Accessories" },
      { id: "skins", label: "Skins" },
    ],
  },
  {
    id: "emotes",
    label: "Emotes",
    children: [
      { id: "dance", label: "Dance" },
      { id: "stunt", label: "Stunt" },
      { id: "greetings", label: "Greetings" },
      { id: "fun", label: "Fun" },
      { id: "poses", label: "Poses" },
    ],
  },
];

const RARITIES = [
  { id: "common", label: "Common" },
  { id: "uncommon", label: "Uncommon" },
  { id: "rare", label: "Rare" },
  { id: "epic", label: "Epic" },
  { id: "legendary", label: "Legendary" },
  { id: "mythic", label: "Mythic" },
  { id: "unique", label: "Unique" },
  { id: "exotic", label: "Exotic" },
];

const NETWORKS = [
  { id: "all", label: "All items" },
  { id: "ethereum", label: "Ethereum" },
  { id: "polygon", label: "Polygon" },
];

const SORTS = [
  { id: "recently_listed", label: "Recently listed" },
  { id: "newest", label: "Newest" },
  { id: "cheapest", label: "Cheapest" },
  { id: "most_expensive", label: "Most expensive" },
  { id: "recently_sold", label: "Recently sold" },
];

const ITEMS = [
  { name: "Cyber Ronin Jacket", collection: "NeonForge", price: "1,250", rarity: "legendary", tag: "Mint" },
  { name: "Aurora Wings", collection: "Skybound", price: "980", rarity: "mythic" },
  { name: "Pixel Shades", collection: "8bitClub", price: "120", rarity: "rare" },
  { name: "Golden Crown", collection: "RoyalDCL", price: "3,400", rarity: "unique", network: "ethereum" },
  { name: "Frost Hoodie", collection: "WinterSet", price: "85", rarity: "uncommon" },
  { name: "Plasma Boots", collection: "NeonForge", price: "640", rarity: "epic", network: "ethereum" },
  { name: "Vapor Tee", collection: "VaporWave", price: "45", rarity: "common" },
  { name: "Dragonscale Cape", collection: "MythMakers", rarity: "legendary" },
  { name: "Holo Backpack", collection: "FutureGear", price: "310", rarity: "epic", tag: "4 left" },
  { name: "Sakura Kimono", collection: "EdoStyle", price: "560", rarity: "rare", network: "ethereum" },
  { name: "Glitch Mask", collection: "404Wear", price: "199", rarity: "uncommon" },
  { name: "Solar Halo", collection: "Skybound", price: "1,780", rarity: "exotic" },
];

export default function MarketplaceBrowse({ items = ITEMS }) {
  const [tab, setTab] = useState("collectibles");
  const [sort, setSort] = useState("recently_listed");

  const [open, setOpen] = useState({
    category: true,
    special: true,
    rarity: true,
    price: true,
    network: false,
    sale: true,
  });
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  const [parentCat, setParentCat] = useState("wearables");
  const [category, setCategory] = useState("upper_body");
  const [rarities, setRarities] = useState(["legendary", "mythic"]);
  const [network, setNetwork] = useState("all");
  const [onlyOnSale, setOnlyOnSale] = useState(true);
  const [onlySmart, setOnlySmart] = useState(false);

  const toggleRarity = (id) =>
    setRarities((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  const count = items.length;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mb">
        <aside className="mb__filters" aria-label="Filters">
          <FilterBox title="Categories" open={open.category} onToggle={() => toggle("category")}>
            <div className="mb__cats">
              {CATEGORIES.map((parent) => {
                const expanded = parent.id === parentCat;
                return (
                  <div key={parent.id} className="mb__catgroup">
                    <button
                      type="button"
                      className={"mb__cattop" + (expanded ? " is-active" : "")}
                      aria-expanded={expanded}
                      onClick={() => setParentCat(parent.id)}
                    >
                      {parent.label}
                    </button>
                    {expanded ? (
                      <ul className="mb__catlist">
                        {parent.children.map((c) => (
                          <li key={c.id}>
                            <button
                              type="button"
                              className={"mb__catopt" + (c.id === category ? " is-active" : "")}
                              aria-pressed={c.id === category}
                              onClick={() => setCategory(c.id)}
                            >
                              {c.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </FilterBox>

          <FilterBox title="Special filters" open={open.special} onToggle={() => toggle("special")}>
            <div className="mb__toggle">
              <span className="mb__smartbadge">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
                </svg>
                Smart
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={onlySmart}
                className={"mb__switch" + (onlySmart ? " is-on" : "")}
                onClick={() => setOnlySmart((v) => !v)}
              >
                <span className="mb__switchknob" />
              </button>
            </div>
          </FilterBox>

          <FilterBox title="Rarity" open={open.rarity} onToggle={() => toggle("rarity")}>
            <div className="mb__chips">
              {RARITIES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={"mb__chip" + (rarities.includes(r.id) ? " is-active" : "")}
                  aria-pressed={rarities.includes(r.id)}
                  style={{ "--chip": `var(--rar-${r.id})` }}
                  onClick={() => toggleRarity(r.id)}
                >
                  <span className="mb__chipdot" />
                  {r.label}
                </button>
              ))}
            </div>
          </FilterBox>

          <FilterBox title="Price" open={open.price} onToggle={() => toggle("price")}>
            <PriceRange />
          </FilterBox>

          <FilterBox title="Network" open={open.network} onToggle={() => toggle("network")}>
            <FilterRadios name="mb-network" value={network} onChange={setNetwork} options={NETWORKS} />
          </FilterBox>

          <FilterBox title="On sale" open={open.sale} onToggle={() => toggle("sale")}>
            <label className="mb__toggle">
              <span className="mb__togglelabel">Only on sale</span>
              <button
                type="button"
                role="switch"
                aria-checked={onlyOnSale}
                className={"mb__switch" + (onlyOnSale ? " is-on" : "")}
                onClick={() => setOnlyOnSale((v) => !v)}
              >
                <span className="mb__switchknob" />
              </button>
            </label>
          </FilterBox>
        </aside>

        <main className="mb__main">
          <AssetTopbar
            layout="stacked"
            searchPlaceholder="Search collectibles"
            showCount={false}
            sort={sort}
            onSort={setSort}
            sortOptions={SORTS}
          />

          {rarities.length ? (
            <div className="mb__subbar">
              <div className="mb__pills">
                {rarities.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="mb__pill"
                    style={{ "--chip": `var(--rar-${id})` }}
                    onClick={() => toggleRarity(id)}
                  >
                    <span className="mb__chipdot" />
                    {RARITIES.find((r) => r.id === id)?.label}
                    <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {count ? (
            <>
              <div className="mb__grid mb__grid--grid">
                {items.map((item, i) => (
                  <div className="mb__cell" key={i}>
                    <NftCard {...item} />
                  </div>
                ))}
              </div>

              <div className="mb__loadmore">
                <button type="button" className="mb__loadbtn">Load more</button>
              </div>
            </>
          ) : (
            <div className="mb__noresults">
              <div className="mb__noicon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <p className="mb__notitle">No collectibles found</p>
              <p className="mb__nosub">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </main>
      </div>
    </MarketplaceChrome>
  );
}
