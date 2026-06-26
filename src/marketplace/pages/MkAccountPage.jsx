import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import NftCard from "../components/NftCard.jsx";
import AssetTopbar from "../components/AssetTopbar.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import FilterBox from "../../components/FilterBox.jsx";
import PriceRange from "../components/PriceRange.jsx";
import FilterRadios from "../../components/FilterRadios.jsx";
import "./mkaccountpage.css";

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

const STATUS_OPTIONS = [
  { id: "all", label: "All" },
  { id: "sale", label: "On Sale" },
  { id: "notforsale", label: "Not for sale" },
];

const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "name_asc", label: "Name (A–Z)" },
  { id: "recently_listed", label: "Recently listed" },
  { id: "cheapest", label: "Cheapest" },
  { id: "most_expensive", label: "Most expensive" },
];

const OWNED = [
  { name: "Cyber Ronin Jacket", collection: "NeonForge", price: "1,250", rarity: "legendary" },
  { name: "Aurora Wings", collection: "Skybound", rarity: "mythic" },
  { name: "Pixel Shades", collection: "8bitClub", price: "120", rarity: "rare" },
  { name: "Golden Crown", collection: "RoyalDCL", rarity: "unique", network: "ethereum" },
  { name: "Frost Hoodie", collection: "WinterSet", price: "85", rarity: "uncommon" },
  { name: "Plasma Boots", collection: "NeonForge", rarity: "epic", network: "ethereum" },
  { name: "Vapor Tee", collection: "VaporWave", price: "45", rarity: "common" },
  { name: "Dragonscale Cape", collection: "MythMakers", rarity: "legendary" },
  { name: "Holo Backpack", collection: "FutureGear", price: "310", rarity: "epic" },
  { name: "Sakura Kimono", collection: "EdoStyle", rarity: "rare", network: "ethereum" },
  { name: "Glitch Mask", collection: "404Wear", price: "199", rarity: "uncommon" },
  { name: "Solar Halo", collection: "Skybound", price: "1,780", rarity: "exotic" },
];

const ON_SALE = [
  { name: "Cyber Ronin Jacket", collection: "NeonForge", rarity: "legendary", saleType: "Listing", price: "1,250", expiresIn: "in 28 days" },
  { name: "Pixel Shades", collection: "8bitClub", rarity: "rare", saleType: "Listing", price: "120", expiresIn: "in 12 days" },
  { name: "Solar Halo", collection: "Skybound", rarity: "exotic", saleType: "Listing", price: "1,780", expiresIn: "in 5 days" },
  { name: "Glitch Mask", collection: "404Wear", rarity: "uncommon", saleType: "Listing", price: "199", expiresIn: "in 30 days" },
];

const SALES = [
  { name: "Frost Hoodie", rarity: "uncommon", type: "Sale", from: "0x9f3c…7a21", to: "0x1ab4…0d3e", price: "85", date: "Jun 12, 2026" },
  { name: "Vapor Tee", rarity: "common", type: "Sale", from: "0x9f3c…7a21", to: "0x77c0…be12", price: "45", date: "Jun 04, 2026" },
  { name: "Holo Backpack", rarity: "epic", type: "Sale", from: "0x9f3c…7a21", to: "0x52aa…9f81", price: "310", date: "May 28, 2026" },
];

export default function MkAccountPage({
  owned = OWNED,
  onSale = ON_SALE,
  sales = SALES,
  initialSection = "wearables",
}) {
  const [tab, setTab] = useState("my-assets");
  const [section, setSection] = useState(initialSection);
  const [sort, setSort] = useState("newest");
  const [rarities, setRarities] = useState([]);
  const [status, setStatus] = useState("all");
  const [onlyOnSale, setOnlyOnSale] = useState(false);

  const [open, setOpen] = useState({ status: false, rarity: false, price: false, sale: true });
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const toggleRarity = (id) =>
    setRarities((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  const isGridSection = section === "wearables" || section === "emotes" || section === "ens" || section === "land";
  const isListSection = section === "on_sale" || section === "on_rent" || section === "sales";
  const isCollections = section === "collections";
  const isSettings = section === "store_settings";

  const count = owned.length;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="ma">
        <aside className="ma__sidebar" aria-label="My store">
          <nav className="ma__menu" aria-label="Assets">
            <div className="ma__menuhead">ASSETS</div>
            <ul className="ma__menulist">
              {ASSET_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"ma__menuitem" + (s.id === section ? " is-active" : "")}
                    aria-current={s.id === section ? "true" : undefined}
                    onClick={() => setSection(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ma__menu" aria-label="Store">
            <div className="ma__menuhead">STORE</div>
            <ul className="ma__menulist">
              {STORE_SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={"ma__menuitem" + (s.id === section ? " is-active" : "")}
                    aria-current={s.id === section ? "true" : undefined}
                    onClick={() => setSection(s.id)}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {isGridSection ? (
            <div className="ma__filters">
              <FilterBox title="On sale" open={open.sale} onToggle={() => toggle("sale")}>
                <label className="ma__toggle">
                  <span className="ma__togglelabel">Only on sale</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={onlyOnSale}
                    className={"ma__switch" + (onlyOnSale ? " is-on" : "")}
                    onClick={() => setOnlyOnSale((v) => !v)}
                  >
                    <span className="ma__switchknob" />
                  </button>
                </label>
              </FilterBox>

              <FilterBox title="Status" open={open.status} onToggle={() => toggle("status")}>
                <FilterRadios name="ma-status" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
              </FilterBox>

              <FilterBox title="Rarity" open={open.rarity} onToggle={() => toggle("rarity")}>
                <div className="ma__chips">
                  {RARITIES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={"ma__chip" + (rarities.includes(r.id) ? " is-active" : "")}
                      aria-pressed={rarities.includes(r.id)}
                      style={{ "--chip": `var(--rar-${r.id})` }}
                      onClick={() => toggleRarity(r.id)}
                    >
                      <span className="ma__chipdot" />
                      {r.label}
                    </button>
                  ))}
                </div>
              </FilterBox>

              <FilterBox title="Price" open={open.price} onToggle={() => toggle("price")}>
                <PriceRange />
              </FilterBox>
            </div>
          ) : null}
        </aside>

        <main className="ma__main">
          {isGridSection ? (
            <>
              <AssetTopbar
                layout="stacked"
                searchPlaceholder="Search"
                count={count}
                sort={sort}
                onSort={setSort}
                sortOptions={SORTS}
              />

              {count ? (
                <>
                  <div className="ma__grid">
                    {owned.map((item, i) => (
                      <div className="ma__cell" key={i}>
                        <NftCard {...item} />
                      </div>
                    ))}
                  </div>
                  <div className="ma__loadmore">
                    <button type="button" className="ma__loadbtn">Load more</button>
                  </div>
                </>
              ) : (
                <EmptyState />
              )}
            </>
          ) : null}

          {isListSection ? (
            <div className="ma__list">
              <div className="ma__listhead">
                {section === "sales" ? (
                  <>
                    <span className="ma__col ma__col--item">Item</span>
                    <span className="ma__col">Type</span>
                    <span className="ma__col">From</span>
                    <span className="ma__col">To</span>
                    <span className="ma__col ma__col--price">Price</span>
                    <span className="ma__col">Date</span>
                  </>
                ) : (
                  <>
                    <span className="ma__col ma__col--item">Item</span>
                    <span className="ma__col">Type</span>
                    <span className="ma__col">Sale type</span>
                    <span className="ma__col ma__col--price">Price</span>
                    <span className="ma__col">Expires</span>
                  </>
                )}
              </div>

              {section === "sales"
                ? sales.map((r, i) => (
                    <div className="ma__row" key={i}>
                      <span className="ma__col ma__col--item">
                        <span className="ma__thumb u-rar-bg" style={{ "--rb": `var(--rar-bg-${r.rarity})` }} />
                        <span className="ma__itemname u-truncate">{r.name}</span>
                      </span>
                      <span className="ma__col">{r.type}</span>
                      <span className="ma__col ma__addr">{r.from}</span>
                      <span className="ma__col ma__addr">{r.to}</span>
                      <span className="ma__col ma__col--price">
                        <span className="ma__mana"><ManaMark size={12} className="ma__manamark" />{r.price}</span>
                      </span>
                      <span className="ma__col ma__muted">{r.date}</span>
                    </div>
                  ))
                : onSale.map((r, i) => (
                    <div className="ma__row" key={i}>
                      <span className="ma__col ma__col--item">
                        <span className="ma__thumb u-rar-bg" style={{ "--rb": `var(--rar-bg-${r.rarity})` }} />
                        <span className="ma__itemcell">
                          <span className="ma__itemname u-truncate">{r.name}</span>
                          <span className="ma__itemsub u-truncate">{r.collection}</span>
                        </span>
                      </span>
                      <span className="ma__col">{section === "on_rent" ? "Rent" : "Wearable"}</span>
                      <span className="ma__col">{section === "on_rent" ? "Rental" : r.saleType}</span>
                      <span className="ma__col ma__col--price">
                        <span className="ma__mana"><ManaMark size={12} className="ma__manamark" />{r.price}</span>
                      </span>
                      <span className="ma__col ma__muted">{r.expiresIn}</span>
                    </div>
                  ))}
            </div>
          ) : null}

          {isCollections ? (
            <div className="ma__grid ma__grid--collections">
              {["NeonForge", "Skybound", "EdoStyle"].map((name, i) => (
                <div className="ma__collection" key={i}>
                  <span className="ma__collart u-rar-bg" style={{ "--rb": `var(--rar-bg-${["legendary", "mythic", "rare"][i]})` }} />
                  <div className="ma__collbody">
                    <span className="ma__collname u-truncate">{name}</span>
                    <span className="ma__collmeta">{[12, 8, 5][i]} items · Published</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {isSettings ? (
            <div className="ma__settingsnote">
              <p className="ma__notitle">Store Settings</p>
              <p className="ma__nosub">Edit your storefront cover, description and social links.</p>
            </div>
          ) : null}
        </main>
      </div>
    </MarketplaceChrome>
  );
}

function EmptyState() {
  return (
    <div className="ma__empty">
      <div className="ma__emptyicon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7l9-4 9 4-9 4-9-4Z" />
          <path d="M3 7v10l9 4 9-4V7" />
          <path d="M12 11v10" />
        </svg>
      </div>
      <p className="ma__notitle">No assets yet</p>
      <p className="ma__nosub">Items you own will show up here.</p>
    </div>
  );
}
