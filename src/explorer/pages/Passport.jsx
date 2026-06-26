import { useState } from "react";
import Tabs from "../components/Tabs.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./passport.css";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "photos", label: "Photos" },
];

const BADGES = [
  { name: "Open For Business", tint: "#e23a6a", shape: "x" },
  { name: "Emotionally Started", tint: "#8a5bd6", shape: "gem" },
  { name: "Fashionista", tint: "#3f8fd0", shape: "card" },
  { name: "Traveler", tint: "#ffb04a", shape: "cone" },
];

const BASE_RAR = "#b7c0cc";
const EQUIPPED = [
  { name: "City Style Glasses", rarity: "BASE", cat: "◠◠", rar: BASE_RAR },
  { name: "Croupier Shirt", rarity: "BASE", cat: "✦", rar: BASE_RAR },
  { name: "Walrus", rarity: "BASE", cat: "☻", rar: BASE_RAR },
  { name: "Red Modern Pants", rarity: "BASE", cat: "❘❘", rar: BASE_RAR },
  { name: "Red Sandals", rarity: "BASE", cat: "◡", rar: BASE_RAR },
  { name: "Cord Wiggly Bra…", rarity: "BASE", cat: "◡", rar: BASE_RAR },
];

function EditPencil({ to } = {}) {
  return <button className="ps__edit" aria-label="Edit" data-sb-linkto={to || undefined}>✎</button>;
}

export default function Passport({ avatarPreview = null, identity = null }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="ep__backdrop">
      <div className="ps">
        <button className="ep__close ps__close" aria-label="Close">×</button>

        <div className="ps__preview">
          {avatarPreview ? (
            avatarPreview
          ) : (
            <Avatar size={184} name={identity?.name || "Evaristo"} className="ps__avatar" />
          )}
        </div>

        <div className="ps__main">
          <header className="ps__head">
            <div className="ps__id">
              <div className="ps__idline">
                <h2 className="ps__name">{identity?.name || "Evaristo"}<span className="ps__tag">{identity?.tag || "#d5f0"}</span></h2>
                <button className="ps__icon" aria-label="Edit name">✎</button>
              </div>
              <div className="ps__addrline">
                <span className="ps__addr">{identity?.wallet || "0x23b…7d5f0"}</span>
                <button className="ps__icon ps__icon--sm" aria-label="Copy address">⧉</button>
              </div>
            </div>
            <button className="ps__claim">
              <svg className="ps__claimicon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 1.5l2.36 1.7 2.9-.28 1.13 2.68 2.68 1.13-.28 2.9 1.7 2.37-1.7 2.36.28 2.9-2.68 1.13-1.13 2.68-2.9-.28L12 22.5l-2.36-1.7-2.9.28-1.13-2.68-2.68-1.13.28-2.9L1.5 12l1.7-2.37-.28-2.9 2.68-1.13L6.74 2.92l2.9.28L12 1.5z"
                />
                <path
                  fill="none" stroke="#ff4d63" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  d="M8.5 12.2l2.4 2.4 4.6-4.9"
                />
              </svg>
              CLAIM NAME
            </button>
          </header>

          <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />

          <div className="ps__modules">
            <section className="ps__mod">
              <h3 className="ps__modtitle">Badges</h3>
              <div className="ps__badges">
                {BADGES.map((b) => (
                  <div
                    className={"ps__badge ps__badge--" + b.shape}
                    key={b.name}
                    title={b.name}
                    style={{ "--t": b.tint }}
                  >
                    <span className="ps__badgeart" />
                  </div>
                ))}
              </div>
            </section>

            <section className="ps__mod">
              <div className="ps__modhead">
                <h3 className="ps__modtitle">About me</h3>
                <EditPencil />
              </div>
              <p className="ps__empty">No intro.</p>
            </section>

            <section className="ps__mod">
              <div className="ps__modhead">
                <h3 className="ps__modtitle">Links</h3>
                <EditPencil to="Explorer/Pages/AddLink" />
              </div>
              <p className="ps__empty">No links.</p>
            </section>

            <section className="ps__mod">
              <h3 className="ps__modtitle">Equipped items</h3>
              <div className="ps__equipped">
                {EQUIPPED.map((it) => (
                  <div className="ps__eqcard" key={it.name} style={{ "--rar": it.rar }}>
                    <div className="ps__eqart">
                      <span className="ps__eqcat" aria-hidden="true">{it.cat}</span>
                    </div>
                    <div className="ps__eqname u-truncate" title={it.name}>{it.name}</div>
                    <span className="ps__eqrarity">{it.rarity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
