import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./backpackemotes.css";

const SLOTS = [
  { n: 1, name: "Cry" },
  { n: 2, name: "Dab" },
  { n: 3, name: "Dance" },
  { n: 4, name: "Disco" },
  { n: 5, name: "Don't see" },
  { n: 6, name: "Fist pump" },
  { n: 7, name: "Hammer" },
  { n: 8, name: "Hands air" },
  { n: 9, name: "Wave" },
  { n: 0, name: "Clap" },
];

const GRID_CELLS = Array.from({ length: 16 });

export default function BackpackEmotes({ avatarPreview = null }) {
  const [tab, setTab] = useState("emotes");
  const [activeSlot, setActiveSlot] = useState(1);

  const slot = SLOTS.find((s) => s.n === activeSlot);

  return (
    <ExploreChrome active="backpack" onTab={() => {}} onClose={() => {}}>
      <div className="bpe">
        <header className="bpe__head">
          <h1 className="bpe__title">Backpack</h1>
          <div className="bpe__pills" role="tablist" aria-label="Backpack sections">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "wearables"}
              className={"bpe__pill" + (tab === "wearables" ? " is-active" : "")}
              onClick={() => setTab("wearables")}
              data-sb-linkto="Explorer/Pages/Backpack"
            >
              <span className="bpe__pillicon u-mask-icon bpe__ic-wear" />
              Wearables
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "emotes"}
              className={"bpe__pill bpe__pill--emotes" + (tab === "emotes" ? " is-active" : "")}
              onClick={() => setTab("emotes")}
            >
              <span className="bpe__pillicon u-mask-icon bpe__ic-emote" />
              Emotes
            </button>

            <div className="bpe__headright">
              <button type="button" className="bpe__filter">
                <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                  <path d="M2 4h12M4 8h8M6 12h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Filter &amp; Sort
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" className="bpe__chev">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="bpe__search"><SearchField placeholder="Search item" /></div>
            </div>
          </div>
        </header>

        <div className="bpe__main">
          <div className="bpe__preview">
            <div className="bpe__stage">
              {avatarPreview ? (
                avatarPreview
              ) : (
                <Avatar size={180} name="DCL Avatar" className="bpe__avatar" />
              )}
            </div>
            <button className="bpe__expand" title="Fullscreen" aria-label="Fullscreen">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <nav className="bpe__slots" aria-label="Equipped emotes">
            {SLOTS.map((s) => (
              <button
                key={s.n}
                type="button"
                className={"bpe__slot" + (activeSlot === s.n ? " is-active" : "")}
                onClick={() => setActiveSlot(s.n)}
                aria-pressed={activeSlot === s.n}
                title={s.name}
              >
                <span className="bpe__slotnum">{s.n}</span>
                <span className="bpe__slotname u-truncate">{s.name}</span>
                <span className="bpe__slotart" />
              </button>
            ))}
          </nav>

          <section className="bpe__panel">
            <div className="bpe__grid">
              <div className="bpe__gridtop">
                <span className="bpe__emotechip">
                  <span className="bpe__emotechipnum">{slot?.n}</span>
                  EMOTE {slot?.n}
                </span>
              </div>

              <div className="bpe__cells">
                {GRID_CELLS.map((_, i) => (
                  <span key={i} className="bpe__cell" />
                ))}
              </div>

              <div className="bpe__pager">
                <button type="button" className="bpe__pagebtn" aria-label="Previous page">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M10 3l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="bpe__pagebtn" aria-label="Next page">
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <aside className="bpe__detail">
              <p className="bpe__empty">No item selected</p>
            </aside>
          </section>
        </div>
      </div>
    </ExploreChrome>
  );
}
