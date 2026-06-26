import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import Modal from "../../components/Modal.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkassetpage2.css";

const COPY = {
  back: "Back",
  description: "Description",
  no_description: "No description",
  read_more: "READ MORE",
  read_less: "READ LESS",
  creator: "Creator",
  collection: "Collection",
  mint_title: "Buy directly from the creator",
  price: "PRICE",
  stock: "STOCK",
  cheapest: "Cheapest Listing",
  issue_number: "Issue Number",
  highest_offer: "HIGHEST OFFER",
  no_offer: "No offer",
  view_listing: "View listing",
  empty_title: "There are no available listings for this item",
  empty_you_can: "You can ",
  empty_check: "check the current owners",
  empty_make_offer: " and make an offer.",
  buy_with_mana: "Buy with MANA",
  buy_with_card: "Buy with card",
  make_offer: "Make offer",
  smart_badge: "Smart",
  play_showcase: "Play showcase video",
  listings_title: "Other available listings",
  th_owner: "Owner",
  th_published: "Published date",
  th_expiration: "Expiration date",
  th_issue: "Issue Number",
  th_price: "Price",
  no_listings: "No available listings",
};

const PERMISSION_LABELS = {
  ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE: "Move player",
  ALLOW_TO_TRIGGER_AVATAR_EMOTE: "Trigger emotes",
  ALLOW_MEDIA_HOSTNAMES: "Play media content",
  USE_WEB3_API: "Wallet interaction",
  USE_FETCH: "Communicate with other servers",
  USE_WEBSOCKET: "Exchange data",
  OPEN_EXTERNAL_LINK: "Open external links",
};

const WearableGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.92)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3l3 2 3-2 4 3-2 3-2-1v11H9V8L7 9 5 6z" />
  </svg>
);

const EmoteGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.92)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="4.2" r="1.8" />
    <path d="M12 6.5v7M12 8.5l4-2M12 8.5l-4-2M12 13.5l3 6M12 13.5l-3 6" />
  </svg>
);

function fmtMana(n) {
  const v = parseFloat(String(n).replace(/,/g, ""));
  return Number.isFinite(v) ? v.toLocaleString() : "0";
}

function RarityBadge({ rarity }) {
  return (
    <span
      className="mkassetpage2__rarity"
      style={{ "--rar": `var(--rar-${rarity})` }}
      title={rarity}
    >
      {rarity}
    </span>
  );
}

function PlainBadge({ icon, children }) {
  return (
    <span className="mkassetpage2__badge">
      {icon ? <span className="mkassetpage2__badgeicon">{icon}</span> : null}
      {children}
    </span>
  );
}

const SmartIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </svg>
);

function PriceLine({ price, fiat }) {
  return (
    <div className="mkassetpage2__price">
      <span className="mkassetpage2__managlyph"><ManaMark size={24} /></span>
      <span className="mkassetpage2__priceval">{fmtMana(price)}</span>
      {fiat ? <span className="mkassetpage2__fiat">(${fiat})</span> : null}
    </div>
  );
}

function MintCard({ item, onScrollToTable }) {
  return (
    <div className="mkassetpage2__buycard mkassetpage2__buycard--filled">
      <div className="mkassetpage2__buycardhead">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M3 7v10l9 4 9-4V7" />
        </svg>
        {COPY.mint_title}
        <span className="mkassetpage2__infodot" title="When you mint an item you become its first owner. It also means buying directly from the creator.">i</span>
      </div>
      <div className="mkassetpage2__buycardbody">
        <div className="mkassetpage2__pricelabels">
          <span className="mkassetpage2__plabel">{COPY.price}</span>
          <span className="mkassetpage2__plabel">{COPY.stock}</span>
        </div>
        <div className="mkassetpage2__pricerow">
          <PriceLine price={item.price} fiat={item.fiat} />
          <div className="mkassetpage2__stock">
            {item.available.toLocaleString()}/{item.maxSupply.toLocaleString()}
          </div>
        </div>
        <div className="mkassetpage2__buybtns">
          <Button variant="primary" className="mkassetpage2__buybtn">{COPY.buy_with_mana}</Button>
          <Button variant="secondary" className="mkassetpage2__buybtn">{COPY.buy_with_card}</Button>
          <Button variant="ghost" className="mkassetpage2__buybtn">{COPY.make_offer}</Button>
        </div>
      </div>
    </div>
  );
}

function CheapestListingCard({ listing }) {
  return (
    <div className="mkassetpage2__buycard mkassetpage2__buycard--filled">
      <div className="mkassetpage2__buycardhead">
        {COPY.cheapest}:&nbsp;{COPY.issue_number}&nbsp; #{listing.issuedId}
      </div>
      <div className="mkassetpage2__buycardbody">
        <div className="mkassetpage2__pricelabels">
          <span className="mkassetpage2__plabel">{COPY.price}</span>
          <span className="mkassetpage2__plabel">{COPY.highest_offer}</span>
        </div>
        <div className="mkassetpage2__pricerow">
          <PriceLine price={listing.price} fiat={listing.fiat} />
          <div className="mkassetpage2__highestoffer">
            {listing.highestOffer ? (
              <PriceLine price={listing.highestOffer} />
            ) : (
              <span className="mkassetpage2__nooffer">{COPY.no_offer}</span>
            )}
          </div>
        </div>
        <div className="mkassetpage2__buybtns">
          <Button variant="primary" className="mkassetpage2__buybtn">{COPY.buy_with_mana}</Button>
          <Button variant="secondary" className="mkassetpage2__buybtn">{COPY.buy_with_card}</Button>
          <Button variant="ghost" className="mkassetpage2__buybtn">{COPY.view_listing}</Button>
          <span className="mkassetpage2__expires">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            &nbsp;{listing.expiresLabel}.
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyBuyCard({ onCheckOwners }) {
  return (
    <div className="mkassetpage2__buycard mkassetpage2__buycard--empty">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mkassetpage2__emptyicon" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2M3 13h18" />
      </svg>
      <div className="mkassetpage2__emptytext">
        <span className="mkassetpage2__emptytitle">{COPY.empty_title}</span>
        <span>
          {COPY.empty_you_can}
          <span className="mkassetpage2__checkowners" onClick={onCheckOwners}>{COPY.empty_check}</span>
          {COPY.empty_make_offer}
        </span>
      </div>
    </div>
  );
}

function RequiredPermissions({ permissions }) {
  if (!permissions || permissions.length === 0) return null;
  return (
    <div className="mkassetpage2__perms">
      <div className="mkassetpage2__permstitle">
        This wearable requires the following {permissions.length === 1 ? "permission" : "permissions"}
        <span className="mkassetpage2__infodot" title="To use this Wearable, you must grant it the following permissions.">i</span>
      </div>
      <div className="mkassetpage2__permschips">
        {permissions.map((p) => (
          <span key={p} className="mkassetpage2__permchip">{PERMISSION_LABELS[p] || p}</span>
        ))}
      </div>
    </div>
  );
}

function ListingsTable({ orders }) {
  return (
    <div className="mkassetpage2__listings">
      <h3 className="mkassetpage2__listingstitle">{COPY.listings_title}</h3>
      {orders.length === 0 ? (
        <div className="mkassetpage2__emptytable">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a4 4 0 0 1 8 0v2M3 13h18" />
          </svg>
          <span>{COPY.no_listings}</span>
        </div>
      ) : (
        <div className="mkassetpage2__table" role="table">
          <div className="mkassetpage2__thead" role="row">
            <span role="columnheader">{COPY.th_owner}</span>
            <span role="columnheader">{COPY.th_published}</span>
            <span role="columnheader">{COPY.th_expiration}</span>
            <span role="columnheader">{COPY.th_issue}</span>
            <span role="columnheader" className="mkassetpage2__tprice">{COPY.th_price}</span>
          </div>
          {orders.map((o) => (
            <div className="mkassetpage2__trow" role="row" key={o.issuedId}>
              <span className="mkassetpage2__towner" role="cell">
                <span className="u-avatar" style={{ "--sz": "24px", "--hue": o.hue }} />
                {o.owner}
              </span>
              <span role="cell">{o.published}</span>
              <span role="cell">{o.expires}</span>
              <span className="mkassetpage2__tissue" role="cell">
                <span className="mkassetpage2__listedbadge">Listed</span>
                #<b>{o.issuedId}</b>
              </span>
              <span className="mkassetpage2__tprice" role="cell">
                <span className="mkassetpage2__tmana">
                  <ManaMark size={16} />
                  {fmtMana(o.price)}
                </span>
                <Button variant="ghost" size="sm" className="mkassetpage2__viewbtn">{COPY.view_listing}</Button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const DEFAULT_ITEM = {
  name: "Cyber Ronin Jacket",
  category: "wearable",
  rarity: "legendary",
  network: "matic",
  isSmart: true,
  loop: false,
  hasSound: false,
  hasGeometry: false,
  isSocialEmote: false,
  wearableCategory: "Upper Body",
  description:
    "A reactive smart wearable forged in the neon back-alleys of Genesis City. The jacket pulses with light synced to your movement and unlocks an emissive aura when you enter creator scenes.",
  creator: "0xRoninLabs",
  creatorHue: 268,
  collection: "Neon Frontier",
  price: "1200",
  fiat: "684.00",
  available: 84,
  maxSupply: 100,
  permissions: ["ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE", "USE_FETCH", "ALLOW_MEDIA_HOSTNAMES"],
  buyOption: "MINT",
};

const DEFAULT_LISTING = {
  issuedId: 17,
  price: "1450",
  fiat: "826.50",
  highestOffer: "900",
  expiresLabel: "expires in 28 days",
};

const DEFAULT_ORDERS = [
  { owner: "luna.eth", hue: 312, published: "May 28", expires: "in 25 days", issuedId: 17, price: "1450" },
  { owner: "0x4f2a…b18c", hue: 188, published: "May 31", expires: "in 12 days", issuedId: 42, price: "1620" },
  { owner: "voxelking", hue: 44, published: "Jun 02", expires: "in 6 days", issuedId: 8, price: "1799" },
];

function ShowcaseModal({ onClose }) {
  return (
    <Modal width={720} onClose={onClose} className="mkassetpage2__modalcard">
      <div className="mkassetpage2__showcase">
        <div className="mkassetpage2__showcasehead">
          <h3 className="mkassetpage2__showcasetitle">Smart Wearable Showcase</h3>
          <button type="button" className="mkassetpage2__close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>
        <div className="mkassetpage2__showcasevideo">
          <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="3" aria-hidden="true">
            <circle cx="32" cy="32" r="28" />
            <path d="M26 22l16 10-16 10z" fill="rgba(255,255,255,.85)" stroke="none" />
          </svg>
        </div>
      </div>
    </Modal>
  );
}

export default function MkAssetPage2({
  item = DEFAULT_ITEM,
  listing = DEFAULT_LISTING,
  orders = DEFAULT_ORDERS,
}) {
  const [tab, setTab] = useState("collectibles");
  const [showcase, setShowcase] = useState(false);

  const isEmote = item.category === "emote";
  const hasPerms = item.isSmart && item.permissions && item.permissions.length > 0;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mkassetpage2">
        <div className="mkassetpage2__page">
          <button type="button" className="mkassetpage2__back">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            {COPY.back}
          </button>

          <div className="mkassetpage2__info">
            <div className="mkassetpage2__imgcol">
              <div className="mkassetpage2__assetimg">
                <div className="u-rar-bg" style={{ "--rb": `var(--rar-bg-${item.rarity})` }} />
                <div className="mkassetpage2__assetfig">
                  {isEmote ? <EmoteGlyph /> : <WearableGlyph />}
                </div>
                {item.isSmart ? (
                  <button type="button" className="mkassetpage2__showcasebtn" onClick={() => setShowcase(true)}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {COPY.play_showcase}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mkassetpage2__textcol">
              <div>
                <h1 className="mkassetpage2__title">{item.name}</h1>
                <div className="mkassetpage2__badges">
                  <RarityBadge rarity={item.rarity} />
                  {!isEmote ? <PlainBadge>{item.wearableCategory}</PlainBadge> : null}
                  {isEmote ? (
                    <PlainBadge icon="↻">{item.loop ? "Play loop" : "Play once"}</PlainBadge>
                  ) : null}
                  {isEmote && item.hasSound ? <PlainBadge icon="♪">Sound</PlainBadge> : null}
                  {isEmote && item.hasGeometry ? <PlainBadge icon="◆">Props</PlainBadge> : null}
                  {isEmote && item.isSocialEmote ? <PlainBadge icon="✦">Social</PlainBadge> : null}
                  {item.isSmart && !isEmote ? (
                    <PlainBadge icon={<SmartIcon />}>{COPY.smart_badge}</PlainBadge>
                  ) : null}
                </div>
              </div>

              <div className="mkassetpage2__attrrow">
                <div className="mkassetpage2__attrcol">
                  <div className="mkassetpage2__subhead">{COPY.description}</div>
                  <div className="mkassetpage2__desc">{item.description || COPY.no_description}</div>
                </div>
              </div>

              <div className="mkassetpage2__attrrow">
                {item.network === "matic" ? (
                  <div className="mkassetpage2__attrcol">
                    <div className="mkassetpage2__subhead">{COPY.creator}</div>
                    <div className="mkassetpage2__creator">
                      <span className="u-avatar" style={{ "--sz": "36px", "--hue": item.creatorHue }} />
                      <span className="mkassetpage2__creatorname">{item.creator}</span>
                    </div>
                  </div>
                ) : null}
                <div className="mkassetpage2__attrcol">
                  <div className="mkassetpage2__subhead">{COPY.collection}</div>
                  <div className="mkassetpage2__collection">
                    <span className="mkassetpage2__collimg">
                      <span className="u-rar-bg" style={{ "--rb": `var(--rar-bg-${item.rarity})` }} />
                    </span>
                    <span className="mkassetpage2__collname">{item.collection}</span>
                  </div>
                </div>
              </div>

              <div className="mkassetpage2__bottom">
                {hasPerms ? <RequiredPermissions permissions={item.permissions} /> : null}
                {item.buyOption === "MINT" ? (
                  <MintCard item={item} />
                ) : item.buyOption === "BUY_LISTING" ? (
                  <CheapestListingCard listing={listing} />
                ) : (
                  <EmptyBuyCard />
                )}
              </div>
            </div>
          </div>

          <ListingsTable orders={orders} />
        </div>

        {showcase ? <ShowcaseModal onClose={() => setShowcase(false)} /> : null}
      </div>
    </MarketplaceChrome>
  );
}
