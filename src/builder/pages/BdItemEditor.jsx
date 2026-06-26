import { useState } from "react";
import { Avatar } from "../../atoms/primitives.jsx";
import "./bditemeditor.css";

const COLLECTIONS = [
  { id: "c1", name: "Cyberpunk Streetwear", itemCount: 12, status: "published" },
  { id: "c2", name: "Solarpunk Garden Set", itemCount: 8, status: "draft" },
  { id: "c3", name: "Neon Arcade Capsule", itemCount: 5, status: "under_review" },
  { id: "c4", name: "Genesis Founders Hats", itemCount: 20, status: "published" },
];

const ITEMS = [
  { id: "i1", name: "Holographic Jacket", type: "wearable", rarity: "epic", visible: true },
  { id: "i2", name: "LED Visor", type: "wearable", rarity: "rare", visible: false },
  { id: "i3", name: "Carbon Sneakers", type: "wearable", rarity: "uncommon", visible: false },
  { id: "i4", name: "Reactor Backpack", type: "wearable", rarity: "legendary", visible: false },
  { id: "i5", name: "Pulse Gloves", type: "wearable", rarity: "common", visible: false },
  { id: "i6", name: "Synthwave Dance", type: "emote", rarity: "rare", visible: false },
];

const RARITY_VAR = {
  common: "--rar-common",
  uncommon: "--rar-uncommon",
  rare: "--rar-rare",
  epic: "--rar-epic",
  legendary: "--rar-legendary",
  mythic: "--rar-mythic",
  unique: "--rar-unique",
  exotic: "--rar-exotic",
};

const SKIN_COLORS = ["#f5d6c0", "#e8b48c", "#c98c63", "#8d5a3c", "#5c3824", "#3b2415"];
const EYE_COLORS = ["#4a3829", "#6b4f2a", "#37516b", "#3a6e4a", "#5a5a5a", "#7d3a3a"];
const HAIR_COLORS = ["#1a1a1a", "#3a2418", "#5c3824", "#b06a2c", "#d9a441", "#9b2d2d"];

const CATEGORIES = ["Upper body", "Lower body", "Feet", "Hat", "Helmet", "Mask", "Eyewear", "Earring", "Tiara", "Top head", "Skin"];
const RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic", "Unique", "Exotic"];

const CloseGlyph = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const BackGlyph = () => (
  <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden="true">
    <path d="M7 1L1 7l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AddGlyph = () => (
  <svg viewBox="0 0 15 15" width="15" height="15" aria-hidden="true">
    <path d="M7.5 1v13M1 7.5h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const KebabGlyph = () => (
  <svg viewBox="0 0 18 4" width="18" height="4" aria-hidden="true">
    <circle cx="2" cy="2" r="1.6" fill="currentColor" />
    <circle cx="9" cy="2" r="1.6" fill="currentColor" />
    <circle cx="16" cy="2" r="1.6" fill="currentColor" />
  </svg>
);
const UserGlyph = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
    <circle cx="9" cy="6" r="3.4" fill="currentColor" />
    <path d="M2.5 16c0-3.6 2.9-5.8 6.5-5.8s6.5 2.2 6.5 5.8" fill="currentColor" />
  </svg>
);
const PlayGlyph = () => (
  <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
    <path d="M3 2l9 5-9 5z" fill="currentColor" />
  </svg>
);
const CaretGlyph = () => (
  <svg viewBox="0 0 8 8" width="8" height="8" aria-hidden="true" className="bdie__handle-svg">
    <path d="M1 3l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckCircle = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
    <circle cx="9" cy="9" r="8" fill="#36d41d" />
    <path d="M5 9.2l2.6 2.6L13 6.4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Chevron = ({ open }) => (
  <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"
    className={"bdie__chev" + (open ? " is-open" : "")}>
    <path d="M3 2l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function StatusPip({ status }) {
  const map = {
    published: { c: "var(--online)", t: "Published" },
    draft: { c: "var(--bdie-secondary-text)", t: "Draft" },
    under_review: { c: "var(--gold)", t: "Under review" },
  };
  const s = map[status] || map.draft;
  return <span className="bdie__pip" style={{ background: s.c }} title={s.t} />;
}

function SidebarCollection({ collection, selected, onClick }) {
  return (
    <div className={"bdie__col" + (selected ? " is-selected" : "")} onClick={onClick}>
      <span className="bdie__col-img" />
      <div className="bdie__col-wrap">
        <div className="bdie__col-name u-truncate">
          <StatusPip status={collection.status} />
          {collection.name}
        </div>
        <div className="bdie__col-count">{collection.itemCount} items</div>
      </div>
    </div>
  );
}

function SidebarItem({ item, selected, onClick, onToggle }) {
  return (
    <div className={"bdie__item" + (selected ? " is-selected" : "")}>
      <button type="button" className="bdie__item-link" onClick={onClick}>
        <span className="bdie__item-img u-rar-bg" style={{ "--rb": "var(" + (RARITY_VAR[item.rarity] || "--rar-common") + ")" }} />
        <span className="bdie__item-name u-truncate">{item.name}</span>
        {item.type === "emote" ? (
          <span className="bdie__item-emote" onClick={(e) => { e.stopPropagation(); }}>
            <PlayGlyph />
          </span>
        ) : (
          <span
            className={"bdie__item-toggle" + (item.visible ? " is-visible" : " is-hidden")}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          />
        )}
      </button>
    </div>
  );
}

function AttrColor({ label, colors, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bdie__attr">
      <div className="bdie__select" onClick={() => setOpen((o) => !o)}>
        <div className="bdie__select-label">{label}</div>
        <div className="bdie__select-value">
          <i className="bdie__color" style={{ background: value }} />
        </div>
        <CaretGlyph />
      </div>
      {open && (
        <div className="bdie__colors-menu">
          {colors.map((c) => (
            <button key={c} type="button" className="bdie__color-item" onClick={() => { onChange(c); setOpen(false); }}>
              <i className="bdie__color" style={{ background: c }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AttrSelect({ label, value }) {
  return (
    <div className="bdie__attr">
      <div className="bdie__select">
        <div className="bdie__select-label">{label}</div>
        <div className="bdie__select-value u-truncate">{value}</div>
        <CaretGlyph />
      </div>
    </div>
  );
}

function Collapsable({ label, children, defaultOpen = true, info }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={"bdie__collapsable" + (open ? " is-open" : "")}>
      <button type="button" className="bdie__collapsable-head" onClick={() => setOpen((o) => !o)}>
        <Chevron open={open} />
        <span className="bdie__collapsable-label">{label}</span>
        {info && <span className="bdie__info" title={info}>i</span>}
      </button>
      {open && <div className="bdie__collapsable-body">{children}</div>}
    </div>
  );
}

function Field({ label, value, blank, isSelect }) {
  return (
    <div className={"bdie__field" + (blank ? " is-blank" : "") + (isSelect ? " is-select" : "")}>
      <div className="bdie__field-label">{label}</div>
      <div className="bdie__field-value">{value}</div>
      {isSelect && <span className="bdie__field-handle"><CaretGlyph /></span>}
    </div>
  );
}

export default function BdItemEditor({ mode = "editing" }) {
  const [tab, setTab] = useState("items");
  const [selectedCollection] = useState(COLLECTIONS[0]);
  const [selectedItemId, setSelectedItemId] = useState("i1");
  const [items, setItems] = useState(ITEMS);
  const [skin, setSkin] = useState(SKIN_COLORS[1]);
  const [eye, setEye] = useState(EYE_COLORS[0]);
  const [hair, setHair] = useState(HAIR_COLORS[3]);
  const [showAttrs, setShowAttrs] = useState(false);
  const [tags, setTags] = useState(["streetwear", "neon", "cyber"]);

  const isReviewing = mode === "reviewing";
  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  function toggleVisible(id) {
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, visible: !i.visible } : i)));
  }

  return (
    <div className={"bdie" + (isReviewing ? " is-reviewing" : "")}>
      {isReviewing && (
        <div className="bdie__top">
          <div className="bdie__top-actions">
            <button type="button" className="bdie__icon-btn back" aria-label="Back"><BackGlyph /></button>
          </div>
          <div className="bdie__top-title">
            {selectedCollection.name}&nbsp;·&nbsp;Standard Collection
            <span className="bdie__jumpin">See in Decentraland</span>
          </div>
          <div className="bdie__top-actions">
            <span className="bdie__top-counter">
              4 of 4 items reviewed <CheckCircle />
            </span>
            <button type="button" className="bdie__btn bdie__btn--primary">Approve</button>
            <button type="button" className="bdie__btn bdie__btn--secondary">Reject</button>
          </div>
        </div>
      )}

      <div className="bdie__content">
        <aside className="bdie__left">
          <div className="bdie__header">
            <button type="button" className="bdie__icon-btn" aria-label="Close">
              <CloseGlyph />
            </button>
            <div className="bdie__header-title u-truncate">
              {selectedCollection.name}
              <StatusPip status={selectedCollection.status} />
            </div>
            <button type="button" className="bdie__icon-btn" aria-label="Actions">
              <KebabGlyph />
            </button>
          </div>

          {!isReviewing && (
            <div className="bdie__tabs">
              <button type="button" className={"bdie__tab" + (tab === "collections" ? " is-active" : "")} onClick={() => setTab("collections")}>Collections</button>
              <button type="button" className={"bdie__tab" + (tab === "items" ? " is-active" : "")} onClick={() => setTab("items")}>Items</button>
            </div>
          )}

          {isReviewing && (
            <div className="bdie__tabs bdie__tabs--three">
              <button type="button" className="bdie__tab is-active">To review</button>
              <button type="button" className="bdie__tab">Reviewed</button>
              <button type="button" className="bdie__tab">All items</button>
            </div>
          )}

          <div className="bdie__left-scroll">
            {tab === "collections" && !isReviewing ? (
              <div className="bdie__collections">
                {COLLECTIONS.map((c) => (
                  <SidebarCollection
                    key={c.id}
                    collection={c}
                    selected={c.id === selectedCollection.id}
                    onClick={() => setTab("items")}
                  />
                ))}
              </div>
            ) : (
              <div className="bdie__items">
                {items.map((it) => (
                  <SidebarItem
                    key={it.id}
                    item={it}
                    selected={it.id === selectedItemId}
                    onClick={() => setSelectedItemId(it.id)}
                    onToggle={() => toggleVisible(it.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        <section className="bdie__center">
          <div className="bdie__preview">
            <Avatar size={200} name="DCL Avatar" className="bdie__avatar" />
          </div>

          <div className="bdie__footer">
            <div className="bdie__options">
              <button
                type="button"
                className={"bdie__option" + (showAttrs ? " is-active" : "")}
                onClick={() => setShowAttrs((s) => !s)}
                aria-label="Avatar attributes"
              >
                <UserGlyph />
              </button>

              <div className="bdie__emote-selector">
                <button type="button" className="bdie__emote-btn">
                  <PlayGlyph /><span>Play emote</span>
                </button>
                <button type="button" className="bdie__emote-caret"><CaretGlyph /></button>
              </div>

              <div className="bdie__right-container">
                <button type="button" className="bdie__option" aria-label="Scene boundaries">
                  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                    <ellipse cx="9" cy="4.4" rx="6" ry="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M3 4.4v9.2c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V4.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
                <button type="button" className="bdie__option validation-pass" aria-label="Validation passed">
                  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" fill="none" stroke="#21ba45" strokeWidth="1.6" />
                    <path d="M5 9.2l2.6 2.6L13 6.4" fill="none" stroke="#21ba45" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={"bdie__attrs" + (showAttrs ? " is-active" : "")}>
              <AttrSelect label="Body shape" value="Female" />
              <AttrColor label="Skin" colors={SKIN_COLORS} value={skin} onChange={setSkin} />
              <AttrColor label="Eyes" colors={EYE_COLORS} value={eye} onChange={setEye} />
              <AttrColor label="Hair" colors={HAIR_COLORS} value={hair} onChange={setHair} />
              <AttrSelect label="Hair" value="Modern Hair" />
              <AttrSelect label="Facial hair" value="None" />
              <AttrSelect label="Upper body" value="Casual Hoodie" />
              <AttrSelect label="Lower body" value="Jeans" />
            </div>
          </div>
        </section>

        <aside className="bdie__right">
          <div className="bdie__rp-header">
            <div className="bdie__rp-title">PROPERTIES</div>
            <button type="button" className="bdie__rp-actions" aria-label="Item actions"><KebabGlyph /></button>
          </div>

          <div className="bdie__rp-container">
            <Collapsable label="Details">
              <div className="bdie__details">
                <span
                  className="bdie__details-img u-rar-bg"
                  style={{ "--rb": "var(" + (RARITY_VAR[selectedItem.rarity] || "--rar-common") + ")" }}
                />
                <div className="bdie__details-props">
                  <div className="bdie__prop"><span>Triangles</span><b>3,142</b></div>
                  <div className="bdie__prop"><span>Materials</span><b>2</b></div>
                  <div className="bdie__prop"><span>Textures</span><b>3</b></div>
                </div>
              </div>
            </Collapsable>

            <Collapsable label="Basics">
              <Field label="Name" value={selectedItem.name} />
              <div className="bdie__textarea">
                <div className="bdie__field-label">Description</div>
                <textarea defaultValue="A holographic streetwear jacket with reactive LED panels." rows={2} />
              </div>
              <Field label="Category" value="Upper body" isSelect />
              <Field label="Rarity" value={selectedItem.rarity.charAt(0).toUpperCase() + selectedItem.rarity.slice(1)} isSelect />
            </Collapsable>

            <Collapsable label="Overrides" info="Choose which other categories this item replaces or hides.">
              <Field label="Replaces" value="Select categories" isSelect blank />
              <Field label="Hides" value="Tiara, Helmet" isSelect />
            </Collapsable>

            <Collapsable label="Tags">
              <div className={"bdie__tags" + (tags.length ? "" : " is-blank")}>
                <div className="bdie__tags-values">
                  {tags.map((tg) => (
                    <span className="bdie__tag" key={tg}>
                      {tg}
                      <button type="button" className="bdie__tag-x" aria-label={"Remove " + tg}
                        onClick={() => setTags((t) => t.filter((x) => x !== tg))}>
                        <CloseGlyph />
                      </button>
                    </span>
                  ))}
                  <input className="bdie__tags-input" placeholder="" />
                </div>
              </div>
            </Collapsable>

            <Collapsable label="Spring Bones" defaultOpen={false}>
              <div className="bdie__springbones">
                <div className="bdie__sb-row">
                  <span className="bdie__sb-name"><i className="bdie__bone" />Hair_Root</span>
                  <Chevron open={false} />
                </div>
                <button type="button" className="bdie__btn bdie__btn--secondary bdie__sb-add">
                  <AddGlyph /> Add bone
                </button>
              </div>
            </Collapsable>
          </div>

          <div className="bdie__rp-buttons">
            <button type="button" className="bdie__btn bdie__btn--secondary">Revert</button>
            <button type="button" className="bdie__btn bdie__btn--primary bdie__btn--grow">Save</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
