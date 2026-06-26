import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import NftCard from "../components/NftCard.jsx";
import "./mklistpage.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const SAVED_ITEMS = [
  { name: "Cyber Ronin Jacket", collection: "NeonForge", price: "1,250", rarity: "legendary" },
  { name: "Aurora Wings", collection: "Skybound", price: "980", rarity: "mythic" },
  { name: "Golden Crown", collection: "RoyalDCL", price: "3,400", rarity: "unique", network: "ethereum" },
  { name: "Plasma Boots", collection: "NeonForge", price: "640", rarity: "epic", network: "ethereum" },
  { name: "Sakura Kimono", collection: "EdoStyle", price: "560", rarity: "rare" },
  { name: "Solar Halo", collection: "Skybound", price: "1,780", rarity: "exotic" },
  { name: "Holo Backpack", collection: "FutureGear", price: "310", rarity: "epic" },
  { name: "Dragonscale Cape", collection: "MythMakers", rarity: "legendary" },
];

const DEFAULT_LIST = {
  id: "92347e3a-favs",
  name: "Cyberpunk Collection",
  description: "A curated set of neon-soaked wearables for my night-city avatar.",
  isPrivate: false,
  itemsCount: SAVED_ITEMS.length,
  updatedAt: "2 days ago",
  userAddress: "0x9f3c…7a21",
  isDefault: false,
};

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" />
  </svg>
);

const KebabIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 12 8.9c0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8a8.2 8.2 0 0 1-5.1 1.8H2a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
  </svg>
);

function PrivateTag() {
  return (
    <span className="mklistpage__private">
      <LockIcon />
      Private
    </span>
  );
}

function ShareListModal({ list, onClose }) {
  const [copied, setCopied] = useState(false);
  const preview = SAVED_ITEMS.slice(0, 4);
  return (
    <div className="mklistpage__backdrop" onClick={onClose}>
      <div
        className="mklistpage__sharecard"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mklistpage__sharenav">
          <span className="mklistpage__sharetitle">Share List</span>
          <button type="button" className="mklistpage__shareclose" aria-label="Close" onClick={onClose}>×</button>
        </div>

        <div className="mklistpage__sharepreview">
          <div className="mklistpage__sharepreviewart">
            {preview.map((it, i) => (
              <span
                key={i}
                className="mklistpage__sharepreviewtile u-rar-bg"
                style={{ "--rb": `var(--rar-bg-${it.rarity})` }}
              />
            ))}
          </div>
          <div className="mklistpage__sharepreviewbody">
            <div className="mklistpage__sharepreviewname">{list.name}</div>
            <span className="mklistpage__sharepreviewcount">
              {list.itemsCount} {list.itemsCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="mklistpage__shareactions">
          <button
            type="button"
            className="mklistpage__sharebtn mklistpage__sharebtn--primary"
            onClick={() => { setCopied(true); }}
          >
            {copied ? "Copied" : "copy link"}
          </button>
          <button type="button" className="mklistpage__sharebtn mklistpage__sharebtn--inverted">
            <TwitterIcon />
            Share on twitter
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MkListPage({
  list = DEFAULT_LIST,
  items = SAVED_ITEMS,
  isPublicView = false,
  state = "loaded",
  errorType = "could_not_load",
}) {
  const [tab, setTab] = useState("my-assets");
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const isDefault = !!list.isDefault;
  const showBack = !isPublicView || isDefault;
  const showActions = !isPublicView;
  const isEmpty = state === "empty" || (state === "loaded" && !list.itemsCount);
  const privacyView = isPublicView ? "public" : "owner";

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mklistpage">
        {state === "loading" ? (
          <div className="mklistpage__loaderwrap">
            <div className="mklistpage__loader" role="status" aria-label="Loading list" />
          </div>
        ) : state === "error" ? (
          <div className="mklistpage__error">
            <div className="mklistpage__errorimg" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
            </div>
            <h1 className="mklistpage__errortitle">
              {errorType === "not_found"
                ? "This list is private or doesn't exist."
                : "Oops! This list couldn't load."}
            </h1>
            <p className="mklistpage__errorsub">
              {errorType === "not_found" ? "Try with another list." : "Please try again."}
            </p>
            {errorType !== "not_found" && (
              <button type="button" className="mklistpage__primary">Try again</button>
            )}
          </div>
        ) : (
          <div className="mklistpage__container">
            <div className="mklistpage__header">
              {showBack && (
                <button type="button" className="mklistpage__back" aria-label="Go back">
                  <ChevronLeft size={18} />
                </button>
              )}
              <div className="mklistpage__name">
                <span className="mklistpage__nametext">{list.name}</span>
                {list.isPrivate && <PrivateTag />}
              </div>

              {showActions && (
                <div className="mklistpage__actions">
                  <button
                    type="button"
                    className="mklistpage__iconbtn mklistpage__iconbtn--share"
                    aria-label="Share list"
                    disabled={list.isPrivate}
                    title={list.isPrivate ? "Private lists cannot be shared." : "Share list"}
                    onClick={() => setShareOpen(true)}
                  >
                    <ShareIcon />
                  </button>
                  <button
                    type="button"
                    className="mklistpage__iconbtn"
                    aria-label="More options"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    disabled={isDefault}
                    title={isDefault ? "The wishlist can't be edited or deleted." : "More options"}
                    onClick={() => setMenuOpen((o) => !o)}
                  >
                    <KebabIcon />
                  </button>
                  {menuOpen && !isDefault && (
                    <div className="mklistpage__menu" role="menu">
                      <button type="button" className="mklistpage__menuitem" role="menuitem">Edit List</button>
                      <button type="button" className="mklistpage__menuitem" role="menuitem">Delete List</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mklistpage__subheader">
              <div className="mklistpage__subleft">
                {list.description ? (
                  <span className="mklistpage__description">{list.description}</span>
                ) : null}
                {isPublicView && list.userAddress && (
                  <a className="mklistpage__owner" href="#owner" onClick={(e) => e.preventDefault()}>
                    <span
                      className="mklistpage__owneravatar u-avatar"
                      style={{ "--sz": "24px", "--hue": 292 }}
                    />
                    {list.userAddress}
                  </a>
                )}
              </div>
              {list.updatedAt ? (
                <div className="mklistpage__updated">
                  <b>Last updated:</b> {list.updatedAt}
                </div>
              ) : null}
            </div>

            <div className="mklistpage__browse">
              {isEmpty ? (
                <div className="mklistpage__empty">
                  <div className="mklistpage__emptylogo" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 11.1 12 20l-8.8-8.9A4.5 4.5 0 0 1 9.6 4.7L12 7l2.4-2.3a4.5 4.5 0 0 1 6.4 6.4Z" />
                    </svg>
                  </div>
                  <h1>
                    {isPublicView
                      ? "The list is empty"
                      : "You don't have any saved items in this list"}
                  </h1>
                  <p>{isPublicView ? "Try with another list." : "Discover amazing items."}</p>
                  {!isPublicView && (
                    <div className="mklistpage__emptyactions">
                      <a className="mklistpage__primary" href="#browse" onClick={(e) => e.preventDefault()}>
                        Explore collectibles
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="mklistpage__grid">
                    {items.map((it, i) => (
                      <NftCard key={i} {...it} />
                    ))}
                  </div>
                  <div className="mklistpage__loadmore">
                    <button type="button" className="mklistpage__loadbtn">Load more</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {shareOpen && <ShareListModal list={list} onClose={() => setShareOpen(false)} />}
      </div>
    </MarketplaceChrome>
  );
}
