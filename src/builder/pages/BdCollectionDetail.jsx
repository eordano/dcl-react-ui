import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdcollectiondetail.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const RARITY = {
  common: { label: "Common", token: "--rar-common" },
  uncommon: { label: "Uncommon", token: "--rar-uncommon" },
  rare: { label: "Rare", token: "--rar-rare" },
  epic: { label: "Epic", token: "--rar-epic" },
  legendary: { label: "Legendary", token: "--rar-legendary" },
  mythic: { label: "Mythic", token: "--rar-mythic" },
  unique: { label: "Unique", token: "--rar-unique" },
  exotic: { label: "Exotic", token: "--rar-exotic" },
};

const STATUS = {
  ready: { label: "Ready to submit", icon: "cloud", cls: "is-ready" },
  not_ready: { label: "Not ready", icon: "warn", cls: "is-notready" },
  published: { label: "Published", icon: "check", cls: "is-published" },
  under_review: { label: "Under Review", icon: "clock", cls: "is-review" },
  unsynced: { label: "Unsynced", icon: "alert", cls: "is-unsynced" },
};

const WEARABLES = [
  { id: "w1", name: "Cyber Visor", rarity: "epic", category: "eyewear", price: "75", supply: null, status: "ready", smart: false, hue: 212 },
  { id: "w2", name: "Neon Hoodie", rarity: "rare", category: "upper_body", price: "40", supply: null, status: "ready", smart: false, hue: 282 },
  { id: "w3", name: "Holo Sneakers", rarity: "legendary", category: "feet", price: null, supply: null, status: "not_ready", smart: false, hue: 24 },
  { id: "w4", name: "Pixel Crown", rarity: "mythic", category: "hat", price: "500", supply: null, status: "ready", smart: false, hue: 332 },
  { id: "w5", name: "Plasma Jetpack", rarity: "unique", category: "upper_body", price: "1200", supply: null, status: "not_ready", smart: true, hue: 150 },
];

const EMOTES = [
  { id: "e1", name: "Victory Dance", rarity: "rare", category: "dance", playMode: "loop", price: "30", supply: null, status: "ready", hue: 196 },
  { id: "e2", name: "Slow Clap", rarity: "common", category: "reaction_positive", playMode: "simple", price: "10", supply: null, status: "ready", hue: 48 },
  { id: "e3", name: "Floss Forever", rarity: "uncommon", category: "dance", playMode: "loop", price: null, supply: null, status: "not_ready", hue: 300 },
];

const COLLECTION = {
  name: "Genesis Capsule Vol.1",
  status: "unsynced",
  isPublished: false,
  isApproved: false,
  isOnSale: false,
  isLocked: false,
};

function StatusGlyph({ icon }) {
  const p = {
    cloud: <path d="M5 11.5a3 3 0 0 1 .4-6 4 4 0 0 1 7.6 1.2 2.6 2.6 0 0 1-.5 5.1H5z M8 9.5V5.5m0 0L6.3 7.2M8 5.5l1.7 1.7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
    warn: <><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M8 4.6v4.2M8 11v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></>,
    check: <><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M5.3 8.2l1.9 1.9 3.6-3.9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>,
    clock: <><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M8 4.8V8l2.4 1.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></>,
    alert: <><path d="M8 2.2l6 10.8H2L8 2.2z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M8 6.4v3.1M8 11.4v.05" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>,
  }[icon];
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">{p}</svg>
  );
}

const PencilGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M11 2.5l2.5 2.5L6 12.5l-3 .5.5-3L11 2.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const CubeGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M8 1.5l6 3.25v6.5L8 14.5 2 11.25v-6.5L8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M2 4.75L8 8l6-3.25M8 8v6.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const PlusGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const JumpGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M6 3h7v7M13 3L6.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 9.5v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const WearableTabGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M6 2L3 4v3l1.5.5V14h7V7.5L13 7V4l-3-2-2 1.5L6 2z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);
const EmoteTabGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5.6 9.2a2.8 2.8 0 0 0 4.8 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="6" cy="6.2" r=".8" fill="currentColor" /><circle cx="10" cy="6.2" r=".8" fill="currentColor" />
  </svg>
);
const DotsGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="3" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="13" cy="8" r="1.4" fill="currentColor" />
  </svg>
);

function RarityBadge({ rarity }) {
  const r = RARITY[rarity];
  if (!r) return null;
  return (
    <span className="bdcollectiondetail__rarity" style={{ background: `var(${r.token})` }}>
      {r.label}
    </span>
  );
}

function PriceCell({ price }) {
  if (!price) return <span className="bdcollectiondetail__setprice">SET PRICE</span>;
  return (
    <span className="bdcollectiondetail__mana">
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" className="bdcollectiondetail__manaicon">
        <path d="M8 1.6L13 8 8 14.4 3 8 8 1.6z M8 4.4L5 8l3 3.6L11 8 8 4.4z" fill="currentColor" />
      </svg>
      {price}
    </span>
  );
}

function CollectionItem({ item, showPlayMode, showPrice, showSupply, isEmote }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const st = STATUS[item.status];
  return (
    <tr className="bdcollectiondetail__row">
      <td className="bdcollectiondetail__cell bdcollectiondetail__namecell">
        <span
          className="bdcollectiondetail__itemimg"
          style={{ background: `linear-gradient(135deg, hsl(${item.hue} 60% 40%), hsl(${(item.hue + 40) % 360} 55% 24%))` }}
        />
        <span className="bdcollectiondetail__itemname u-truncate" title={item.name}>
          {item.name}
        </span>
        {item.smart ? <span className="bdcollectiondetail__smartbadge">SMART</span> : null}
      </td>
      <td className="bdcollectiondetail__cell">
        <RarityBadge rarity={item.rarity} />
      </td>
      <td className="bdcollectiondetail__cell bdcollectiondetail__muted">
        {item.category.replace(/_/g, " ")}
      </td>
      {showPlayMode ? (
        <td className="bdcollectiondetail__cell bdcollectiondetail__muted">
          {isEmote ? (item.playMode === "loop" ? "Loop" : "Single play") : ""}
        </td>
      ) : null}
      {showPrice ? (
        <td className="bdcollectiondetail__cell">
          <PriceCell price={item.price} />
        </td>
      ) : null}
      {showSupply ? (
        <td className="bdcollectiondetail__cell bdcollectiondetail__muted">
          {item.supply ? item.supply : "0/100"}
        </td>
      ) : null}
      <td className="bdcollectiondetail__cell">
        <span className={"bdcollectiondetail__status " + st.cls}>
          <StatusGlyph icon={st.icon} />
          {st.label}
        </span>
      </td>
      <td className="bdcollectiondetail__cell bdcollectiondetail__menucell">
        <button
          type="button"
          className="bdcollectiondetail__rowmenu"
          aria-label="Item options"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <DotsGlyph />
        </button>
        {menuOpen ? (
          <ul className="bdcollectiondetail__dropdown" role="menu">
            <li role="menuitem">See details</li>
            <li role="menuitem">See in Decentraland</li>
            <li role="menuitem">Preview in Editor</li>
            <li role="menuitem">Move to another collection</li>
            <li role="menuitem" className="bdcollectiondetail__divider">Reset changes</li>
            <li role="menuitem" className="is-danger">Delete item</li>
          </ul>
        ) : null}
      </td>
    </tr>
  );
}

export default function BdCollectionDetail({
  collection = COLLECTION,
  wearables = WEARABLES,
  emotes = EMOTES,
  loading = false,
  initialItemType = "wearable",
}) {
  collection = collection ?? COLLECTION;
  const [tab, setTab] = useState("collections");
  const [itemType, setItemType] = useState(
    initialItemType === "emote" ? "emote" : "wearable",
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const hasWearables = wearables.length > 0;
  const hasEmotes = emotes.length > 0;
  const showTabs = hasWearables && hasEmotes;
  const hasOnlyEmotes = hasEmotes && !hasWearables;
  const hasOnlyWearables = hasWearables && !hasEmotes;

  const activeType = showTabs ? itemType : hasOnlyEmotes ? "emote" : "wearable";
  const isEmoteView = activeType === "emote";
  const items = isEmoteView ? emotes : wearables;
  const isEmpty = !hasWearables && !hasEmotes;

  const showPrice = collection.isPublished;
  const showSupply = collection.isPublished && collection.isApproved;
  const showPlayMode = isEmoteView || hasOnlyEmotes;

  const showUnsyncedNotice = useMemo(
    () => collection.isApproved && collection.status === "unsynced",
    [collection]
  );

  const actionButtons = (
    <>
      <button type="button" className="bdcollectiondetail__action" disabled={collection.isLocked || isEmpty}>
        <JumpGlyph /> See in Decentraland
      </button>
      <button type="button" className="bdcollectiondetail__action" disabled={collection.isLocked || isEmpty}>
        <CubeGlyph /> Preview in Editor
      </button>
      {!collection.isPublished && !isEmpty ? (
        <button type="button" className="bdcollectiondetail__action" disabled={collection.isLocked}>
          <PlusGlyph /> Add Items
        </button>
      ) : null}
    </>
  );

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdcollectiondetail bdcollectiondetail--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdcollectiondetail">
        <div className="bdcollectiondetail__container">
          <button type="button" className="bdcollectiondetail__back" aria-label="Back">
            <ChevronLeft size={18} />
          </button>

          <div className="bdcollectiondetail__header">
            <div className="bdcollectiondetail__namegroup">
              {collection.isPublished && collection.status ? (
                <span
                  className={"bdcollectiondetail__statusdot is-" + collection.status}
                  title={collection.status}
                />
              ) : null}
              <h1 className="bdcollectiondetail__name u-truncate">{collection.name}</h1>
              {!collection.isLocked && !collection.isPublished ? (
                <span className="bdcollectiondetail__editname" aria-hidden="true">
                  <PencilGlyph />
                </span>
              ) : null}
              {collection.isOnSale ? <span className="bdcollectiondetail__onsale">On Sale</span> : null}
            </div>

            <div className="bdcollectiondetail__headeractions">
              {collection.isPublished && collection.isApproved ? (
                <button type="button" className="bdcollectiondetail__action">
                  Mint Items
                </button>
              ) : null}
              {!(collection.isPublished && collection.isApproved) ? (
                <button type="button" className="bdcollectiondetail__publish">
                  Publish Collection
                </button>
              ) : null}
              <div className="bdcollectiondetail__ctxwrap">
                <button
                  type="button"
                  className="bdcollectiondetail__ctxbtn"
                  aria-label="Collection options"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <DotsGlyph />
                </button>
                {menuOpen ? (
                  <ul className="bdcollectiondetail__dropdown is-right" role="menu">
                    {!collection.isLocked && !collection.isPublished ? (
                      <>
                        <li role="menuitem">Add Existing Item</li>
                        <li role="menuitem" className="is-danger">Delete</li>
                      </>
                    ) : null}
                    {collection.isPublished ? (
                      <>
                        <li role="menuitem">Collaborators</li>
                        <li role="menuitem">Minters</li>
                      </>
                    ) : null}
                    <li role="menuitem" className="bdcollectiondetail__divider">Copy URN</li>
                    <li role="menuitem" className={collection.isPublished ? "" : "is-disabled"}>Copy address</li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          {showUnsyncedNotice ? (
            <div className="bdcollectiondetail__notice">
              <span className="bdcollectiondetail__noticeicon" aria-hidden="true">
                <svg viewBox="0 0 36 36" width="32" height="32">
                  <path d="M18 4l15 27H3L18 4z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M18 14v8M18 26v.05" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
              <div className="bdcollectiondetail__noticemsg">
                <h4 className="bdcollectiondetail__noticetitle">There are unsynced items in this collection</h4>
                <p className="bdcollectiondetail__noticetext">
                  One or more items have been modified after this collection was approved.<br />
                  These updates need to be published and reviewed again by the curation commitee.
                </p>
              </div>
              <button type="button" className="bdcollectiondetail__publish">Publish Updates</button>
            </div>
          ) : null}

          {showTabs ? (
            <div className="bdcollectiondetail__tabs">
              <button
                type="button"
                className={"bdcollectiondetail__tab" + (itemType === "wearable" ? " is-active" : "")}
                onClick={() => setItemType("wearable")}
              >
                <WearableTabGlyph /> Wearables
              </button>
              <button
                type="button"
                className={"bdcollectiondetail__tab" + (itemType === "emote" ? " is-active" : "")}
                onClick={() => setItemType("emote")}
              >
                <EmoteTabGlyph /> Emotes
              </button>
              <div className="bdcollectiondetail__tabactions">{actionButtons}</div>
            </div>
          ) : !isEmpty ? (
            <div className="bdcollectiondetail__soloactions">{actionButtons}</div>
          ) : null}

          {!isEmpty ? (
            <table className="bdcollectiondetail__table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Rarity</th>
                  <th>Category</th>
                  {showPlayMode ? <th>Play Mode</th> : null}
                  {showPrice ? <th>Price</th> : null}
                  {showSupply ? <th>Supply</th> : null}
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <CollectionItem
                    key={item.id}
                    item={item}
                    isEmote={isEmoteView}
                    showPlayMode={showPlayMode}
                    showPrice={showPrice}
                    showSupply={showSupply}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bdcollectiondetail__empty">
              <div className="bdcollectiondetail__sparkles" aria-hidden="true">
                <svg viewBox="0 0 54 56" width="54" height="56">
                  <path d="M27 6l3.5 9.5L40 19l-9.5 3.5L27 32l-3.5-9.5L14 19l9.5-3.5L27 6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M44 36l1.6 4.4L50 42l-4.4 1.6L44 48l-1.6-4.4L38 42l4.4-1.6L44 36z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="bdcollectiondetail__emptybody">
                <span className="bdcollectiondetail__emptytitle">Looking good!</span>
                <br />
                Now you can start adding items to your collection
                <br />
                You will not be able to add or remove items after publishing your collection.
                <br />
                <button type="button" className="bdcollectiondetail__emptybtn" disabled={collection.isLocked}>
                  Add Items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BuilderChrome>
  );
}
