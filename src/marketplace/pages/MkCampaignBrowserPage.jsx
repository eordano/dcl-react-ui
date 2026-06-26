import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import NftCard from "../components/NftCard.jsx";
import AssetTopbar from "../components/AssetTopbar.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./mkcampaignbrowserpage.css";

const CAMPAIGN = {
  tag: "MVMF24",
  title: "Metaverse Music Festival",
  subtitle:
    "A curated drop of festival-exclusive wearables and emotes. Collect the look, hit the dance floor.",
  cta: "Shop the collection",
};

const SECTIONS = [
  { id: "wearables", label: "Wearables" },
  { id: "emotes", label: "Emotes" },
];

const SORTS = [
  { id: "recently_listed", label: "Recently listed" },
  { id: "newest", label: "Newest" },
  { id: "cheapest", label: "Cheapest" },
  { id: "most_expensive", label: "Most expensive" },
  { id: "recently_sold", label: "Recently sold" },
];

const ITEMS = [
  { name: "Festival Visor", collection: "MVMF Official", price: "420", rarity: "epic", tag: "Mint" },
  { name: "Bassline Bomber", collection: "MVMF Official", price: "880", rarity: "legendary" },
  { name: "Glow Stick Wave", collection: "MVMF Emotes", price: "150", rarity: "rare" },
  { name: "Neon Rave Gloves", collection: "MVMF Official", price: "210", rarity: "uncommon" },
  { name: "Stage Diver Emote", collection: "MVMF Emotes", price: "340", rarity: "epic" },
  { name: "Holographic Cape", collection: "MVMF Official", price: "1,200", rarity: "mythic", tag: "3 left" },
  { name: "Synthwave Sneakers", collection: "MVMF Official", price: "560", rarity: "rare" },
  { name: "Crowd Surf Emote", collection: "MVMF Emotes", rarity: "legendary" },
  { name: "LED Mohawk", collection: "MVMF Official", price: "95", rarity: "uncommon" },
  { name: "Pyro Blast Emote", collection: "MVMF Emotes", price: "275", rarity: "epic" },
  { name: "VIP Backstage Pass", collection: "MVMF Official", price: "2,400", rarity: "exotic" },
  { name: "Drop the Beat Emote", collection: "MVMF Emotes", price: "180", rarity: "rare" },
];

const Sparkles = () => (
  <svg className="mkcampaignbrowserpage__sparkle" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" fill="currentColor" />
    <path d="M18.5 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3z" fill="currentColor" opacity=".85" />
  </svg>
);

export default function MkCampaignBrowserPage({
  items = ITEMS,
  campaign = CAMPAIGN,
  isLoadingCampaign = false,
  isEmpty = false,
}) {
  const [tab, setTab] = useState("collectibles");
  const [section, setSection] = useState("wearables");
  const [sort, setSort] = useState("recently_listed");

  const list = isEmpty ? [] : items;
  const count = list.length;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mkcampaignbrowserpage">
        <section className="mkcampaignbrowserpage__hero" aria-label={campaign.title}>
          <div className="mkcampaignbrowserpage__heroglow" aria-hidden="true" />
          <div className="mkcampaignbrowserpage__herobody">
            <span className="mkcampaignbrowserpage__badge">
              <Sparkles />
              {campaign.tag}
            </span>
            <h1 className="mkcampaignbrowserpage__herotitle">{campaign.title}</h1>
            <p className="mkcampaignbrowserpage__herosub">{campaign.subtitle}</p>
            <button type="button" className="mkcampaignbrowserpage__herocta">
              {campaign.cta}
            </button>
          </div>
          <div className="mkcampaignbrowserpage__heroart" aria-hidden="true">
            <span className="mkcampaignbrowserpage__heroorb mkcampaignbrowserpage__heroorb--a" />
            <span className="mkcampaignbrowserpage__heroorb mkcampaignbrowserpage__heroorb--b" />
            <span className="mkcampaignbrowserpage__heroorb mkcampaignbrowserpage__heroorb--c" />
          </div>
        </section>

        {isLoadingCampaign ? (
          <div className="mkcampaignbrowserpage__loading">
            <Spinner size={56} />
          </div>
        ) : (
          <div className="mkcampaignbrowserpage__browse">
            <aside className="mkcampaignbrowserpage__sidebar" aria-label="Sections">
              <div className="mkcampaignbrowserpage__sidehead">Browse</div>
              <ul className="mkcampaignbrowserpage__sections">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={
                        "mkcampaignbrowserpage__section" +
                        (s.id === section ? " is-active" : "")
                      }
                      aria-current={s.id === section ? "page" : undefined}
                      onClick={() => setSection(s.id)}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="mkcampaignbrowserpage__main">
              <AssetTopbar
                layout="stacked"
                searchPlaceholder="Search this collection"
                count={count}
                sort={sort}
                onSort={setSort}
                sortOptions={SORTS}
              />

              {count ? (
                <>
                  <div className="mkcampaignbrowserpage__grid mkcampaignbrowserpage__grid--grid">
                    {list.map((item, i) => (
                      <div className="mkcampaignbrowserpage__cell" key={i}>
                        <NftCard {...item} />
                      </div>
                    ))}
                  </div>

                  <div className="mkcampaignbrowserpage__loadmore">
                    <button type="button" className="mkcampaignbrowserpage__loadbtn">Load more</button>
                  </div>
                </>
              ) : (
                <div className="mkcampaignbrowserpage__empty">
                  <div className="mkcampaignbrowserpage__emptyicon" aria-hidden="true">
                    <Sparkles />
                  </div>
                  <p className="mkcampaignbrowserpage__emptytitle">Nothing here yet</p>
                  <p className="mkcampaignbrowserpage__emptysub">
                    This campaign has no items on sale right now. Check back soon.
                  </p>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </MarketplaceChrome>
  );
}
