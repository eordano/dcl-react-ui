import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdcollectionsitemstab.css";

const TABS = {
  STANDARD: "standard_collections",
  THIRD_PARTY: "third_party_collections",
  ITEMS: "orphan_items",
};

const ITEM_TYPE_LABEL = {
  wearable: "Wearable",
  emote: "Emote",
  smart_wearable: "Smart Wearable",
};

const STATUS_LABEL = {
  synced: "Synced",
  under_review: "Under Review",
  loading: "Loading...",
  unsynced: "Unsynced",
};

const ITEMS = [
  { id: "i1", name: "Crystal Crown", type: "wearable", status: "synced", createdAt: "3 months ago", updatedAt: "2 weeks ago", grad: "linear-gradient(135deg,#ffc647,#3a2c00)" },
  { id: "i2", name: "Dancefloor Shuffle", type: "emote", status: "under_review", createdAt: "2 months ago", updatedAt: "5 days ago", grad: "linear-gradient(135deg,#ff4bed,#350447)" },
  { id: "i3", name: "Holo Visor", type: "smart_wearable", status: "loading", createdAt: "6 weeks ago", updatedAt: "3 days ago", grad: "linear-gradient(135deg,#73d3d3,#062a2a)" },
  { id: "i4", name: "Spirit Wings", type: "wearable", status: "unsynced", createdAt: "1 month ago", updatedAt: "1 day ago", grad: "linear-gradient(135deg,#b05cff,#1a0a2e)" },
  { id: "i5", name: "Neon Kicks", type: "wearable", status: "unpublished", createdAt: "3 weeks ago", updatedAt: "yesterday", grad: "linear-gradient(135deg,#438fff,#06231c)" },
  { id: "i6", name: "Victory Pose", type: "emote", status: "synced", createdAt: "2 weeks ago", updatedAt: "yesterday", grad: "linear-gradient(135deg,#34ce76,#06231c)" },
  { id: "i7", name: "Glitch Mask", type: "wearable", status: "synced", createdAt: "12 days ago", updatedAt: "8 hours ago", grad: "linear-gradient(135deg,#ff2d55,#350447)" },
  { id: "i8", name: "Pulse Backpack", type: "smart_wearable", status: "unpublished", createdAt: "5 days ago", updatedAt: "2 hours ago", grad: "linear-gradient(135deg,#982de2,#220040)" },
];

const CubeGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 1.6 14 5v6L8 14.4 2 11V5L8 1.6Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    <path d="M2 5l6 3.4L14 5M8 8.4V14.4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
  </svg>
);
const GridGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
    <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
  </svg>
);
const ListGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
    <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
    <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor" />
  </svg>
);
const KebabGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="3.5" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="12.5" r="1.4" fill="currentColor" />
  </svg>
);
const CollectionsGlyph = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="bditems__pageicon">
    <path d="M18 18H28V28H18V18Z" fill="#A09BA8" />
    <path d="M4 4H14V14H4V4Z" fill="#A09BA8" />
    <path d="M18 4H28V14H18V4Z" fill="#A09BA8" />
    <path d="M4 18H14V28H4V18Z" fill="#A09BA8" />
  </svg>
);

function ItemStatusOrb({ status }) {
  if (!status || status === "unpublished") return null;
  return <span className={"bditems__orb bditems__orb--" + status} title={STATUS_LABEL[status]} />;
}

function ItemCard({ item }) {
  return (
    <div className="bditems__card is-card">
      <button type="button" className="bditems__cardopts" aria-label="Item options">
        <KebabGlyph />
      </button>
      <a className="bditems__cardlink" href="#item">
        <div className="bditems__image">
          <span className="bditems__imgcell" style={{ background: item.grad }} />
        </div>
        <div className="bditems__content">
          <div className="bditems__text u-truncate" title={item.name}>
            {item.name}
          </div>
          <div className="bditems__subtitle">{ITEM_TYPE_LABEL[item.type]}</div>
        </div>
      </a>
    </div>
  );
}

function ItemRow({ item }) {
  return (
    <tr className="bditems__trow">
      <td className="bditems__td-name">
        <div className="bditems__rowname">
          <span className="bditems__rowthumb" style={{ background: item.grad }} />
          <div className="bditems__rowtitle">
            <ItemStatusOrb status={item.status} />
            <span className="bditems__rowtext u-truncate">{item.name}</span>
          </div>
        </div>
      </td>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
    </tr>
  );
}

export default function BdCollectionsItemsTab({
  items = ITEMS,
  view = "grid",
  loading = false,
}) {
  const [navTab, setNavTab] = useState("collections");
  const [activeView, setActiveView] = useState(view);

  const count = items.length;
  const hasResults = count > 0;

  return (
    <BuilderChrome active={navTab} onTab={setNavTab}>
      <div className="bditems">
        <div className="bditems__filters">
          <div className="bditems__tabsrow">
            <CollectionsGlyph />
            <nav className="bditems__tabs" aria-label="Collection sections">
              <button type="button" className="bditems__tab">
                Collections
              </button>
              <button type="button" className="bditems__tab">
                Linked Wearables
              </button>
              <button type="button" className="bditems__tab is-active" aria-current="page">
                Single items
              </button>
            </nav>
          </div>

          <div className="bditems__mainactions">
            <div className="bditems__actions">
              <button type="button" className="bditems__btn bditems__btn--basic bditems__btn--editor">
                <CubeGlyph /> Open editor
              </button>
              <button type="button" className="bditems__btn bditems__btn--primary">
                <span className="bditems__plus" aria-hidden="true">＋</span> Create Collection
              </button>
            </div>
          </div>

          <div className="bditems__resultsrow">
            <div className="bditems__results">
              {!loading && hasResults ? `${count} ${count === 1 ? "result" : "results"}` : ""}
            </div>
            <div className="bditems__viewactions">
              <div className="bditems__chips">
                <button
                  type="button"
                  className={"bditems__chip bditems__chip--grid" + (activeView === "grid" ? " is-active" : "")}
                  aria-label="Grid view"
                  aria-pressed={activeView === "grid"}
                  onClick={() => setActiveView("grid")}
                >
                  <GridGlyph />
                </button>
                <button
                  type="button"
                  className={"bditems__chip bditems__chip--list" + (activeView === "list" ? " is-active" : "")}
                  aria-label="List view"
                  aria-pressed={activeView === "list"}
                  onClick={() => setActiveView("list")}
                >
                  <ListGlyph />
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bditems__loader" role="status" aria-label="Loading">
            <span className="bditems__spinner" />
          </div>
        ) : !hasResults ? (
          <div className="bditems__empty">
            <h2 className="bditems__emptytitle">No collections</h2>
            <p className="bditems__emptydesc">
              You have no collections yet. Create a new collection, and dress the metaverse in style!
            </p>
            <div className="bditems__createnew">
              <span className="bditems__createtext">Create Collection</span>
            </div>
          </div>
        ) : activeView === "grid" ? (
          <div className="bditems__grid">
            {items.map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        ) : (
          <div className="bditems__listwrap">
            <table className="bditems__table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Created</th>
                  <th>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <ItemRow key={it.id} item={it} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && hasResults && (
          <nav className="bditems__pagination" aria-label="Pagination">
            <button type="button" className="bditems__page is-active">1</button>
            <button type="button" className="bditems__page">2</button>
            <button type="button" className="bditems__page">3</button>
          </nav>
        )}
      </div>
    </BuilderChrome>
  );
}
