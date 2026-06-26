import { useState } from "react";
import { asset } from "../../asset.js";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./backpack.css";

const SLOTS = [
  { id: "body", label: "Body" }, { id: "hair", label: "Hair" },
  { id: "eyebrows", label: "Eyebrows" }, { id: "eyes", label: "Eyes" },
  { id: "mouth", label: "Mouth" }, { id: "facial", label: "Facial Hair" },
  { id: "upper", label: "Upper Body" }, { id: "hands", label: "Handwear" },
  { id: "lower", label: "Lower Body" }, { id: "feet", label: "Feet" },
  { id: "hat", label: "Hat" }, { id: "eyewear", label: "Eyewear" },
  { id: "earring", label: "Earring" }, { id: "mask", label: "Mask" },
  { id: "tiara", label: "Tiara" }, { id: "helmet", label: "Helmet" },
];

export default function Backpack({ avatarPreview = null }) {
  const [tab, setTab] = useState("backpack");
  const [kind, setKind] = useState("wearables");
  const [sub, setSub] = useState("categories");
  const [cat, setCat] = useState("all");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="bp">
        <div className="bp__sub">
          <h1 className="bp__title">Backpack</h1>
          <div className="bp__kinds" role="tablist" aria-label="Backpack section">
            <button
              role="tab" aria-selected={kind === "wearables"}
              className={"bp__kind" + (kind === "wearables" ? " is-active" : "")}
              onClick={() => setKind("wearables")}
            >
              <span className="bp__kindicon" aria-hidden>◇</span> Wearables
            </button>
            <button
              role="tab" aria-selected={kind === "emotes"}
              className={"bp__kind" + (kind === "emotes" ? " is-active" : "")}
              onClick={() => setKind("emotes")}
              data-sb-linkto="Explorer/Pages/BackpackEmotes"
            >
              <span className="bp__kindicon" aria-hidden>♪</span> Emotes
            </button>
          </div>
          <div className="bp__subright">
            <button className="bp__filter" type="button">
              Filter &amp; Sort <span className="bp__caret" aria-hidden>▾</span>
            </button>
            <div className="bp__search"><SearchField placeholder="Search item" /></div>
            <button className="bp__marketplace" type="button">
              <span className="bp__mkticon" aria-hidden>🛍</span> Marketplace
            </button>
          </div>
        </div>

        <div className="bp__panes">
          <div className="bp__preview">
            <div className="bp__stage">
              {avatarPreview ? (
                avatarPreview
              ) : (
                <Avatar size={180} name="DCL Avatar" className="bp__avatar" />
              )}
            </div>
            <button className="bp__help" type="button" aria-label="Help">?</button>
          </div>

          <section className="bp__center">
            <div className="bp__subtabs" role="tablist" aria-label="Browse">
              <button
                role="tab" aria-selected={sub === "categories"}
                className={"bp__subtab" + (sub === "categories" ? " is-active" : "")}
                onClick={() => setSub("categories")}
              >
                ☰ Categories
              </button>
              <button
                role="tab" aria-selected={sub === "outfits"}
                className={"bp__subtab" + (sub === "outfits" ? " is-active" : "")}
                onClick={() => setSub("outfits")}
                data-sb-linkto="Explorer/Pages/BackpackOutfits"
              >
                ⬓ Saved Outfits
              </button>
            </div>

            <div className="bp__browse">
              <nav className="bp__rail" aria-label="Categories">
                {SLOTS.map((s) => (
                  <button
                    key={s.id}
                    className={"bp__cat" + (cat === s.id ? " is-active" : "")}
                    onClick={() => setCat(s.id)}
                    title={s.label}
                    aria-label={s.label}
                  >
                    <span
                      className="bp__catglyph u-mask-icon"
                      aria-hidden
                      style={{ "--i": `url(${asset("assets/categories/" + s.id + ".png")})` }}
                    />
                    <span className="bp__catslot" aria-hidden />
                  </button>
                ))}
              </nav>

              <div className="bp__gridcol">
                <button
                  className="bp__allpill"
                  onClick={() => setCat("all")}
                  aria-pressed={cat === "all"}
                  type="button"
                >
                  <span className="bp__allinfinity" aria-hidden>∞</span> ALL
                </button>
                <div className="bp__items" role="list">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className="bp__item" role="listitem" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="bp__info">
            <div className="bp__infoempty">No item selected</div>
          </aside>
        </div>
      </div>
    </ExploreChrome>
  );
}
