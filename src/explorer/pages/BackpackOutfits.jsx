import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./backpackoutfits.css";

const EMPTY_SLOTS = [0, 1, 2, 3, 4];

export default function BackpackOutfits({ avatarPreview = null }) {
  const [tab, setTab] = useState("backpack");
  const [bptab, setBptab] = useState("wearables");
  const [sub, setSub] = useState("outfits");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="bpo">
        <div className="bpo__bar">
          <h1 className="bpo__pagetitle">Backpack</h1>
          <div className="bpo__bptabs" role="tablist" aria-label="Backpack sections">
            <button
              type="button"
              role="tab"
              aria-selected={bptab === "wearables"}
              className={"bpo__bptab" + (bptab === "wearables" ? " is-active" : "")}
              onClick={() => setBptab("wearables")}
              data-sb-linkto="Explorer/Pages/Backpack"
            >
              <span className="bpo__bptabicon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7l6-3 3 2 3-2 6 3-2 4-2-1v9H7v-9l-2 1-2-4Z" />
                </svg>
              </span>
              Wearables
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={bptab === "emotes"}
              className={"bpo__bptab" + (bptab === "emotes" ? " is-active" : "")}
              onClick={() => setBptab("emotes")}
              data-sb-linkto="Explorer/Pages/BackpackEmotes"
            >
              <span className="bpo__bptabicon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="6" r="2.4" />
                  <path d="M12 9v6M6 11l6-2 6 2M9 21l3-6 3 6" />
                </svg>
              </span>
              Emotes
            </button>
          </div>
        </div>

        <div className="bpo__main">
          <div className="bpo__preview">
            <div className="bpo__stage">
              {avatarPreview ? (
                avatarPreview
              ) : (
                <Avatar size={200} name="DCL Avatar" className="bpo__avatar" />
              )}
            </div>
          </div>

          <section className="bpo__panel">
            <div className="bpo__panelhead">
              <div className="bpo__subtabs" role="tablist" aria-label="Backpack view">
                <button
                  type="button"
                  role="tab"
                  aria-selected={sub === "categories"}
                  className={"bpo__subtab" + (sub === "categories" ? " is-active" : "")}
                  onClick={() => setSub("categories")}
                  data-sb-linkto="Explorer/Pages/Backpack"
                >
                  <span className="bpo__subicon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </span>
                  CATEGORIES
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={sub === "outfits"}
                  className={"bpo__subtab" + (sub === "outfits" ? " is-active" : "")}
                  onClick={() => setSub("outfits")}
                >
                  <span className="bpo__subicon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4h12v4l-3 1v11H9V9L6 8V4Z" />
                    </svg>
                  </span>
                  SAVED OUTFITS
                </button>
              </div>
              <button type="button" className="bpo__marketplace">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="18" cy="20" r="1.4" />
                  <path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
                </svg>
                MARKETPLACE
              </button>
            </div>

            <div className="bpo__controls">
              <button type="button" className="bpo__filter">
                FILTER &amp; SORT
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="bpo__search">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4-4" />
                </svg>
                <input type="search" placeholder="Search" aria-label="Search outfits" />
              </div>
            </div>

            <div className="bpo__slots">
              <button type="button" className="bpo__slot bpo__slot--save">
                <span className="bpo__plus" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span className="bpo__slotlabel">SAVE OUTFIT</span>
              </button>

              {EMPTY_SLOTS.map((i) => (
                <div key={i} className="bpo__slot bpo__slot--empty">
                  <span className="bpo__silhouette" aria-hidden="true">
                    <svg viewBox="0 0 60 130" width="52" height="112">
                      <circle cx="30" cy="20" r="14" />
                      <path d="M14 56c0-9 7-16 16-16s16 7 16 16v34c0 6-32 6-32 0V56Z" />
                      <rect x="6" y="56" width="9" height="40" rx="4.5" />
                      <rect x="45" y="56" width="9" height="40" rx="4.5" />
                    </svg>
                  </span>
                  <span className="bpo__emptylabel">Empty<br />Slot</span>
                </div>
              ))}
            </div>

            <div className="bpo__promo">
              <div className="bpo__promobody">
                <div className="bpo__promotitle">Unlock 5 more Outfit slots by getting a NAME!</div>
                <p className="bpo__promotext">
                  NAMEs are unique Decentraland usernames that come with a <a href="#name">badge</a>, the ability to
                  create Communities, 5 more Outfits slots, and 100 Voting Power in the DAO.
                </p>
                <p className="bpo__promotext">Get your own for the full Decentraland experience!</p>
                <button type="button" className="bpo__getname">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
                  </svg>
                  GET A NAME
                </button>
              </div>
              <div className="bpo__promoart" aria-hidden="true">
                <span className="bpo__chip bpo__chip--a">
                  Cattie
                  <svg className="bpo__chipbadge" viewBox="0 0 24 24" width="13" height="13">
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="#ff2d55" />
                    <path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="bpo__chip bpo__chip--b">
                  Kiera
                  <svg className="bpo__chipbadge" viewBox="0 0 24 24" width="13" height="13">
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="#ff2d55" />
                    <path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="bpo__fig bpo__fig--a">
                  <span className="bpo__fighead" />
                  <span className="bpo__figbody" />
                </span>
                <span className="bpo__fig bpo__fig--b">
                  <span className="bpo__fighead" />
                  <span className="bpo__figbody" />
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ExploreChrome>
  );
}
