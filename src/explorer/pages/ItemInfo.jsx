import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { rarityColor, rarityVars, Avatar } from "../../atoms/primitives.jsx";
import { asset } from "../../asset.js";
import { Swatches, SKIN, HAIRC } from "../components/AvatarPreview.jsx";
import "./iteminfo.css";

const CATS = [
  "body", "hair", "eyebrows", "eyes", "mouth", "facial",
  "upper", "hands", "lower", "feet", "hat", "eyewear",
  "earring", "mask", "tiara", "helmet",
];

const ITEMS = [
  { name: "Aviator Sunglasses", rarity: "base" },
  { name: "Cyber Jacket", rarity: "legendary" },
  { name: "Pixel Tee", rarity: "common" },
  { name: "Aztec Hood", rarity: "rare" },
  { name: "Neon Visor", rarity: "epic" },
  { name: "Worn Boots", rarity: "uncommon" },
  { name: "Sun Hat", rarity: "common" },
  { name: "Hover Pack", rarity: "mythic" },
  { name: "Bee Hair", rarity: "unique" },
  { name: "Leather Jacket", rarity: "rare" },
  { name: "Cool Shades", rarity: "epic" },
  { name: "Buzz Cut", rarity: "common" },
  { name: "Ring Set", rarity: "legendary" },
  { name: "Spark Aura", rarity: "exotic" },
];

const DETAIL = {
  name: "Aviator Sunglasses",
  rarity: "base",
  desc: "This wearable does not have a description set.",
  hides: [
    { id: "mask", label: "Mask" },
    { id: "helmet", label: "Helmet" },
  ],
};

const BASE_TINT = "#a09bb0";
const rarityStyle = (r) =>
  r === "base" ? { "--r": BASE_TINT, "--rb": "none" } : rarityVars(r);
const rarityLabelColor = (r) => (r === "base" ? BASE_TINT : rarityColor(r));

export default function ItemInfo({ avatarPreview = null }) {
  const [tab, setTab] = useState("backpack");
  const [sub, setSub] = useState("wearables");
  const [cat, setCat] = useState("all");
  const [picked, setPicked] = useState(0);
  const it = DETAIL;

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="ii">
        <div className="ii__bar">
          <h1 className="ii__title">Backpack</h1>
          <div className="ii__subtabs" role="tablist">
            <button
              className={"ii__subtab" + (sub === "wearables" ? " is-active" : "")}
              onClick={() => setSub("wearables")}
            >
              Wearables
            </button>
            <button
              className={"ii__subtab" + (sub === "emotes" ? " is-active" : "")}
              onClick={() => setSub("emotes")}
              data-sb-linkto="Explorer/Pages/BackpackEmotes"
            >
              Emotes
            </button>
          </div>
          <div className="ii__tools">
            <button className="ii__filter">
              Filter &amp; Sort
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="ii__search"><SearchField placeholder="Search item" /></div>
          </div>
        </div>

        <div className="ii__main">
          <div className="ii__avatar">
            <div className="ii__stage">
              {avatarPreview ? (
                avatarPreview
              ) : (
                <Avatar size={200} name="DCL Avatar" className="ii__figure" />
              )}
              <span className="ii__platform" />
            </div>
            <div className="ii__avbar">
              <Swatches colors={SKIN} />
              <Swatches colors={HAIRC} />
            </div>
          </div>

          <div className="ii__center">
            <div className="ii__crumbs">
              <button className="is-active">Categories</button>
              <span className="ii__crumbsep">/</span>
              <button data-sb-linkto="Explorer/Pages/BackpackOutfits">Saved Outfits</button>
              <button className="ii__market">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
                Marketplace
              </button>
            </div>

            <div className="ii__centerrow">
              <nav className="ii__rail" aria-label="Categories">
                {CATS.map((c) => (
                  <button
                    key={c}
                    className={"ii__cat" + (cat === c ? " is-active" : "")}
                    onClick={() => setCat(c)}
                    title={c}
                  >
                    <span
                      className="ii__caticon u-mask-icon"
                      style={{ "--i": `url(${asset("assets/categories/" + c + ".png")})` }}
                    />
                  </button>
                ))}
              </nav>

              <div className="ii__gridwrap">
                <button
                  className={"ii__allpill" + (cat === "all" ? " is-active" : "")}
                  onClick={() => setCat("all")}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" /></svg>
                  All
                </button>

                <div className="ii__grid">
                  {ITEMS.map((g, i) => (
                    <button
                      key={g.name}
                      className={"ii__cell is-filled" + (picked === i ? " is-picked" : "")}
                      style={rarityStyle(g.rarity)}
                      onClick={() => setPicked(i)}
                      title={g.name}
                    >
                      <span className="ii__cellart" />
                    </button>
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={"e" + i} className="ii__cell" />
                  ))}
                </div>

                <div className="ii__pager">
                  <button className="ii__pgnav" aria-label="Previous">‹</button>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className={"ii__pg" + (n === 1 ? " is-active" : "")}>{n}</button>
                  ))}
                  <button className="ii__pgnav" aria-label="Next">›</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="ii__panel">
            {picked == null ? (
              <div className="ii__none">No item selected</div>
            ) : (
              <>
                <div className="ii__preview" style={rarityStyle(it.rarity)}>
                  <span className="ii__art" />
                </div>

                <div className="ii__name">{it.name}</div>
                <span
                  className="ii__rarity"
                  style={{ "--rar": rarityLabelColor(it.rarity) }}
                >
                  {it.rarity}
                </span>

                <div className="ii__sec">
                  <h3 className="ii__sectitle">Description</h3>
                  <p className="ii__desc">{it.desc}</p>
                </div>

                {it.hides.length > 0 && (
                  <div className="ii__sec">
                    <h3 className="ii__sectitle">Hides</h3>
                    <div className="ii__hides">
                      {it.hides.map((h) => (
                        <span key={h.id} className="ii__hide">
                          <span
                            className="ii__hideicon u-mask-icon"
                            style={{ "--i": `url(${asset("assets/categories/" + h.id + ".png")})` }}
                          />
                          {h.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      </div>
    </ExploreChrome>
  );
}
