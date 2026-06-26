import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkassetpage.css";

const COPY = {
  back: "Back",
  description: "Description",
  no_description: "This item has no description.",
  read_more: "READ MORE",
  read_less: "READ LESS",
  owner: "Owner",
  collection: "Collection",
  price: "PRICE",
  issue_number: "ISSUE NUMBER",
  buy: "Buy",
  buy_with_card: "Buy with card",
  make_offer: "Make an offer",
  your_offer: "Your offer",
  other_available_listings: "Other available listings",
  cheapest: "Cheapest",
  newest: "Newest",
  oldest: "Oldest",
  issue_asc: "Issue number: Low to high",
  issue_desc: "Issue number: High to low",
  th_owner: "Owner",
  th_published: "Published",
  th_expires: "Expiration date",
  th_issue: "Issue number",
  th_price: "Price",
  view_listing: "View listing",
  no_listings: "There are no listings for this item yet.",
  transaction_history: "Transaction history",
};

const AssetGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3l3 2 3-2 4 3-2 3-2-1v11H9V8L7 9 5 6z" />
  </svg>
);

function RarityBadge({ rarity }) {
  return (
    <span className="mkassetpage__badge mkassetpage__badge--rarity" style={{ "--chip": `var(--rar-${rarity})` }}>
      {rarity}
    </span>
  );
}

function MetaBadge({ icon, children }) {
  return (
    <span className="mkassetpage__badge mkassetpage__badge--meta">
      {icon ? <span className="mkassetpage__badgeicon">{icon}</span> : null}
      {children}
    </span>
  );
}

function shortAddr(a) {
  return a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a;
}
function avatarHue(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

const DEFAULT_NFT = {
  name: "Cyber Ronin Jacket",
  issuedId: 142,
  category: "upper_body",
  rarity: "legendary",
  bodyShape: "Unisex",
  isSmart: true,
  network: "ethereum",
  description:
    "A battle-worn techwear jacket forged in the neon districts. Reactive plating, an emissive collar trim, and a holographic clan sigil stitched across the back. Part of the Ronin drop — one of only 100 ever minted.",
  owner: { address: "0x9f3c2b71a4d5e6f8c0b1a2d3e4f5a6b7c8d9e0a1", name: "neon.dcl" },
  collection: { name: "Neon Districts", address: "0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd" },
  order: { price: "4250", issuedId: 142, expiresLabel: "Expires in 27 days" },
};

const DEFAULT_LISTINGS = [
  { owner: "0x4d1f9a3c2e7b8d0f1a6c5b4e3d2f1a0b9c8d7e6f", name: "vapor.dcl", published: "Jun 04", expires: "in 24 days", issued: 88, price: "3990", listed: true },
  { owner: "0x7a2b1c0d9e8f3a4b5c6d7e8f9a0b1c2d3e4f5a6b", name: "kira", published: "Jun 11", expires: "in 30 days", issued: 203, price: "4100", listed: true },
  { owner: "0x1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d", name: "0xshogun", published: "May 28", expires: "in 12 days", issued: 17, price: "4400", listed: true },
  { owner: "0x9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f", name: "mizu.dcl", published: "Jun 15", expires: "in 41 days", issued: 311, price: "4800", listed: false },
];

const SORT_OPTIONS = [
  { value: "cheapest", text: COPY.cheapest },
  { value: "newest", text: COPY.newest },
  { value: "oldest", text: COPY.oldest },
  { value: "issue_asc", text: COPY.issue_asc },
  { value: "issue_desc", text: COPY.issue_desc },
];

function BuyNFTBox({ nft }) {
  const order = nft.order;
  return (
    <div className="mkassetpage__buybox">
      {order ? (
        <>
          <div className="mkassetpage__buyinfo">
            <div className="mkassetpage__buycol">
              <span className="mkassetpage__buytitle">{COPY.price}</span>
              <div className="mkassetpage__price">
                <span className="mkassetpage__pricemana"><ManaMark size={28} /></span>
                <span className="mkassetpage__priceval">{Number(order.price).toLocaleString()}</span>
                <span className="mkassetpage__pricefiat">($ {(Number(order.price) * 0.31).toLocaleString(undefined, { maximumFractionDigits: 2 })})</span>
              </div>
            </div>
            <div className="mkassetpage__buycol">
              <span className="mkassetpage__buytitle">{COPY.issue_number}</span>
              <div className="mkassetpage__issue">#{order.issuedId}</div>
            </div>
          </div>

          <Button variant="primary" className="mkassetpage__buybtn">{COPY.buy}</Button>
          <Button variant="secondary" className="mkassetpage__buybtn mkassetpage__buybtn--card">{COPY.buy_with_card}</Button>
          <Button variant="secondary" className="mkassetpage__buybtn mkassetpage__offerbtn">{COPY.make_offer}</Button>

          <span className="mkassetpage__expires">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
            </svg>
            {order.expiresLabel}.
          </span>
        </>
      ) : (
        <>
          <div className="mkassetpage__buyinfo">
            <div className="mkassetpage__buycol">
              <span className="mkassetpage__buytitle">{COPY.price}</span>
              <div className="mkassetpage__issue">Not for sale</div>
            </div>
            <div className="mkassetpage__buycol">
              <span className="mkassetpage__buytitle">{COPY.issue_number}</span>
              <div className="mkassetpage__issue">#{nft.issuedId}</div>
            </div>
          </div>
          <Button variant="secondary" className="mkassetpage__buybtn mkassetpage__offerbtn">{COPY.make_offer}</Button>
        </>
      )}
    </div>
  );
}

function StatTile({ label, children }) {
  return (
    <div className="mkassetpage__stat">
      <span className="mkassetpage__statlabel">{label}</span>
      {children}
    </div>
  );
}

function ListingsTable({ listings, sortBy, onSort }) {
  return (
    <div className="mkassetpage__tablecard">
      <div className="mkassetpage__tabletop">
        <div className="mkassetpage__tabs">
          <button type="button" className="mkassetpage__tab is-active">{COPY.other_available_listings}</button>
        </div>
        <label className="mkassetpage__sort">
          <span>Order by</span>
          <select value={sortBy} onChange={(e) => onSort(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.text}</option>
            ))}
          </select>
        </label>
      </div>

      {listings.length ? (
        <table className="mkassetpage__table">
          <thead>
            <tr>
              <th>{COPY.th_owner}</th>
              <th>{COPY.th_published}</th>
              <th>{COPY.th_expires}</th>
              <th>{COPY.th_issue}</th>
              <th className="mkassetpage__th--right">{COPY.th_price}</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.issued}>
                <td>
                  <span className="mkassetpage__profile">
                    <span className="u-avatar" style={{ "--sz": "28px", "--hue": avatarHue(l.owner) }} />
                    {l.name || shortAddr(l.owner)}
                  </span>
                </td>
                <td className="mkassetpage__muted">{l.published}</td>
                <td className="mkassetpage__muted">{l.expires}</td>
                <td>
                  <span className="mkassetpage__issuecell">
                    {l.listed ? <span className="mkassetpage__listed">Listed</span> : null}
                    #{l.issued}
                  </span>
                </td>
                <td className="mkassetpage__th--right">
                  <span className="mkassetpage__rowprice">
                    <span className="mkassetpage__rowmana"><ManaMark size={16} /></span>
                    {Number(l.price).toLocaleString()}
                    <Button variant="secondary" className="mkassetpage__viewlisting">{COPY.view_listing}</Button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mkassetpage__emptytable">
          <div className="mkassetpage__emptyicon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 14h8" />
            </svg>
          </div>
          <span>{COPY.no_listings}</span>
        </div>
      )}
    </div>
  );
}

export default function MkAssetPage({
  nft = DEFAULT_NFT,
  listings = DEFAULT_LISTINGS,
  emptyListings = false,
}) {
  const [tab, setTab] = useState("collectibles");
  const [showMore, setShowMore] = useState(false);
  const [sortBy, setSortBy] = useState("cheapest");

  const MAX = 148;
  const desc = nft.description || "";
  const hasMore = desc.length > MAX;
  const descText = hasMore && !showMore ? `${desc.slice(0, MAX)}...` : desc;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mkassetpage">
        <div className="mkassetpage__page">
          <button type="button" className="mkassetpage__back">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            {COPY.back}
          </button>

          <div className="mkassetpage__image">
            <div className="u-rar-bg" style={{ "--rb": `var(--rar-bg-${nft.rarity})` }} />
            {nft.image ? (
              <img className="mkassetpage__img" src={nft.image} alt={nft.name} />
            ) : (
              <div className="mkassetpage__imagefig"><AssetGlyph /></div>
            )}
          </div>

          <div className="mkassetpage__inforow">
            <div className="mkassetpage__info">
              <div>
                <h1 className="mkassetpage__title">
                  {nft.name} {nft.issuedId ? <span className="mkassetpage__issued">#{nft.issuedId}</span> : null}
                </h1>
                <div className="mkassetpage__badges">
                  <RarityBadge rarity={nft.rarity} />
                  {nft.category ? <MetaBadge>{String(nft.category).replace(/[_-]+/g, " ")}</MetaBadge> : null}
                  <MetaBadge>{nft.bodyShape}</MetaBadge>
                  {nft.isSmart ? (
                    <MetaBadge
                      icon={
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                        </svg>
                      }
                    >
                      Smart wearable
                    </MetaBadge>
                  ) : null}
                </div>
              </div>

              <div className="mkassetpage__attrs">
                <div className="mkassetpage__attrcol">
                  <h4 className="mkassetpage__sub">{COPY.description}</h4>
                  <p className="mkassetpage__desc">{desc ? descText : COPY.no_description}</p>
                  {hasMore ? (
                    <button type="button" className="mkassetpage__readmore" onClick={() => setShowMore((v) => !v)}>
                      {showMore ? COPY.read_less : COPY.read_more}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mkassetpage__attrs">
                <div className="mkassetpage__attrcol">
                  <StatTile label={COPY.owner}>
                    <span className="mkassetpage__profile mkassetpage__profile--lg">
                      <span className="u-avatar" style={{ "--sz": "34px", "--hue": avatarHue(nft.owner.address) }} />
                      {nft.owner.name || shortAddr(nft.owner.address)}
                    </span>
                  </StatTile>
                </div>
                <div className="mkassetpage__attrcol">
                  <StatTile label={COPY.collection}>
                    <span className="mkassetpage__profile mkassetpage__profile--lg">
                      <span className="mkassetpage__collimg" style={{ "--hue": avatarHue(nft.collection.address) }} />
                      {nft.collection.name}
                    </span>
                  </StatTile>
                </div>
              </div>
            </div>

            <div className="mkassetpage__actions">
              <BuyNFTBox nft={nft} />
            </div>
          </div>

          <div className="mkassetpage__below">
            <ListingsTable listings={emptyListings ? [] : listings} sortBy={sortBy} onSort={setSortBy} />
          </div>
        </div>
      </div>
    </MarketplaceChrome>
  );
}
