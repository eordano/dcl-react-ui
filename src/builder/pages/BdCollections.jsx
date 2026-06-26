import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdcollections.css";
import { Caret } from "../../atoms/icons.jsx";

const TABS = {
  STANDARD: "standard_collections",
  THIRD_PARTY: "third_party_collections",
  ITEMS: "orphan_items",
};

const SORT_OPTIONS = [
  { value: "MOST_RELEVANT", text: "Most relevant" },
  { value: "CREATED_AT_DESC", text: "Newest" },
  { value: "CREATED_AT_ASC", text: "Oldest" },
  { value: "UPDATED_AT_DESC", text: "Last updated ↓" },
  { value: "UPDATED_AT_ASC", text: "Last updated ↑" },
  { value: "NAME_DESC", text: "Name ↓" },
  { value: "NAME_ASC", text: "Name ↑" },
];

const COLLECTIONS = [
  {
    id: "c1", name: "Genesis Threads", type: "collection", status: "synced", count: 12,
    thumbs: ["linear-gradient(135deg,#438fff,#2f004d)", "linear-gradient(135deg,#ff2d55,#350447)", "linear-gradient(135deg,#ff4bed,#220040)", "linear-gradient(135deg,#982de2,#1a0a2e)"],
  },
  {
    id: "c2", name: "Neon Streetwear Drop", type: "collection", status: "under_review", count: 8,
    thumbs: ["linear-gradient(135deg,#1f8a70,#06231c)", "linear-gradient(135deg,#ff743a,#3a1500)", "linear-gradient(135deg,#73d3d3,#062a2a)", "linear-gradient(135deg,#ffc647,#3a2c00)"],
  },
  {
    id: "c3", name: "Cyber Samurai Armory", type: "collection", status: "unsynced", count: 5,
    thumbs: ["linear-gradient(135deg,#b05cff,#2f004d)", "linear-gradient(135deg,#438fff,#06231c)", "linear-gradient(135deg,#ff2d55,#3a1500)"],
  },
  {
    id: "c4", name: "Lo-Fi Emote Pack", type: "collection", status: "synced", count: 4,
    thumbs: ["linear-gradient(135deg,#ff4bed,#350447)", "linear-gradient(135deg,#34ce76,#06231c)", "linear-gradient(135deg,#ffc647,#3a2c00)", "linear-gradient(135deg,#438fff,#1a0a2e)"],
  },
  {
    id: "c5", name: "Desert Festival Wearables", type: "collection", status: null, count: 0, thumbs: [],
  },
  {
    id: "c6", name: "Pixel Heroes Helmets", type: "collection", status: "synced", count: 16,
    thumbs: ["linear-gradient(135deg,#982de2,#220040)", "linear-gradient(135deg,#ff743a,#3a1500)", "linear-gradient(135deg,#73d3d3,#062a2a)", "linear-gradient(135deg,#ff2d55,#350447)"],
  },
  {
    id: "c7", name: "Aether Linked Wearables", type: "third_party", count: 24, pending: true,
    thumbs: ["linear-gradient(135deg,#438fff,#2f004d)", "linear-gradient(135deg,#b05cff,#1a0a2e)", "linear-gradient(135deg,#34ce76,#06231c)", "linear-gradient(135deg,#ffc647,#3a2c00)"],
  },
  {
    id: "c8", name: "Vaporwave Capsule", type: "collection", status: "loading", count: 2,
    thumbs: ["linear-gradient(135deg,#ff4bed,#220040)", "linear-gradient(135deg,#438fff,#06231c)"],
  },
];

const ITEMS = [
  { id: "i1", name: "Crystal Crown", type: "wearable", grad: "linear-gradient(135deg,#ffc647,#3a2c00)" },
  { id: "i2", name: "Dancefloor", type: "emote", grad: "linear-gradient(135deg,#ff4bed,#350447)" },
  { id: "i3", name: "Holo Visor", type: "smart_wearable", grad: "linear-gradient(135deg,#73d3d3,#062a2a)" },
  { id: "i4", name: "Spirit Wings", type: "wearable", grad: "linear-gradient(135deg,#b05cff,#1a0a2e)" },
];

const TYPE_LABEL = { collection: "Collection", third_party: "Linked Wearables Collection" };
const ITEM_TYPE_LABEL = { wearable: "Wearable", emote: "Emote", smart_wearable: "Smart Wearable" };

const SearchGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="7" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
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
const WarnGlyph = () => (
  <svg viewBox="0 0 18 18" width="14" height="14" aria-hidden="true">
    <circle cx="9" cy="9" r="7.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M9 5.4v4.4M9 12.2v.05" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const KebabGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="3.5" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="12.5" r="1.4" fill="currentColor" />
  </svg>
);
const CheckGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CollectionsGlyph = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="bdcoll__pageicon">
    <path d="M18 18H28V28H18V18Z" fill="#A09BA8" />
    <path d="M4 4H14V14H4V4Z" fill="#A09BA8" />
    <path d="M18 4H28V14H18V4Z" fill="#A09BA8" />
    <path d="M4 18H14V28H4V18Z" fill="#A09BA8" />
  </svg>
);

function CollectionImage({ thumbs = [], count }) {
  if (count === 0 || thumbs.length === 0) {
    return (
      <div className="bdcoll__image bdcoll__image--empty">
        <span className="bdcoll__sparkles" aria-hidden="true" />
        <span className="bdcoll__noitems">No items</span>
      </div>
    );
  }
  const first = thumbs.slice(0, 2);
  const second = thumbs.slice(2, 4);
  const rowStyle = { height: second.length ? "50%" : "100%" };
  return (
    <div className="bdcoll__image">
      {first.length > 0 && (
        <div className="bdcoll__imgrow" style={rowStyle}>
          {first.map((g, i) => (
            <span key={i} className="bdcoll__imgcell" style={{ background: g }} />
          ))}
        </div>
      )}
      {second.length > 0 && (
        <div className="bdcoll__imgrow" style={rowStyle}>
          {second.map((g, i) => (
            <span key={i} className="bdcoll__imgcell" style={{ background: g }} />
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionStatusDot({ status }) {
  if (!status) return null;
  const labels = { synced: "Synced", under_review: "Under Review", unsynced: "Unsynced", loading: "Loading..." };
  return <span className={"bdcoll__status bdcoll__status--" + status} title={labels[status]} />;
}

function CollectionCard({ collection }) {
  const { name, type, status, count, thumbs, pending } = collection;
  return (
    <div className="bdcoll__card is-card">
      {status !== "synced" && (
        <button type="button" className="bdcoll__cardopts" aria-label="Collection options">
          <KebabGlyph />
        </button>
      )}
      <a className="bdcoll__cardlink" href="#collection">
        <CollectionImage thumbs={thumbs} count={count} />
        <div className="bdcoll__content">
          <div className="bdcoll__text u-truncate" title={name}>
            <CollectionStatusDot status={status} /> {name}
          </div>
          <div className="bdcoll__subtitle">
            {TYPE_LABEL[type]}&nbsp;·&nbsp;{count} {count === 1 ? "item" : "items"}
          </div>
          {pending && (
            <div className="bdcoll__pending">
              <WarnGlyph /> Pending migration
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

function ItemCard({ item }) {
  return (
    <div className="bdcoll__card is-card">
      <button type="button" className="bdcoll__cardopts" aria-label="Item options">
        <KebabGlyph />
      </button>
      <a className="bdcoll__cardlink" href="#item">
        <div className="bdcoll__image bdcoll__image--single">
          <span className="bdcoll__imgcell" style={{ background: item.grad }} />
        </div>
        <div className="bdcoll__content">
          <div className="bdcoll__text u-truncate" title={item.name}>{item.name}</div>
          <div className="bdcoll__subtitle">{ITEM_TYPE_LABEL[item.type]}</div>
        </div>
      </a>
    </div>
  );
}

export default function BdCollections({
  collections = COLLECTIONS,
  items = ITEMS,
  view = "grid",
  tab = TABS.STANDARD,
  loading = false,
}) {
  const [navTab, setNavTab] = useState("collections");
  const [activeTab, setActiveTab] = useState(tab);
  const [activeView, setActiveView] = useState(view);
  const [sort, setSort] = useState("MOST_RELEVANT");
  const [sortOpen, setSortOpen] = useState(false);

  const isItemsTab = activeTab === TABS.ITEMS;
  const list = isItemsTab ? items : collections;
  const count = list.length;
  const hasResults = count > 0;
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.text ?? "";

  return (
    <BuilderChrome active={navTab} onTab={setNavTab}>
      <div className="bdcoll">
        <div className="bdcoll__filters">
          <div className="bdcoll__tabsrow">
            <CollectionsGlyph />
            <nav className="bdcoll__tabs" aria-label="Collection sections">
              <button
                type="button"
                className={"bdcoll__tab" + (activeTab === TABS.STANDARD ? " is-active" : "")}
                onClick={() => setActiveTab(TABS.STANDARD)}
              >
                Collections
              </button>
              <button
                type="button"
                className={"bdcoll__tab" + (activeTab === TABS.THIRD_PARTY ? " is-active" : "")}
                onClick={() => setActiveTab(TABS.THIRD_PARTY)}
              >
                Linked Wearables
              </button>
              <button
                type="button"
                className={"bdcoll__tab" + (activeTab === TABS.ITEMS ? " is-active" : "")}
                onClick={() => setActiveTab(TABS.ITEMS)}
              >
                Single items
              </button>
            </nav>
          </div>

          <div className="bdcoll__mainactions">
            {!isItemsTab && (
              <div className="bdcoll__search">
                <span className="bdcoll__searchicon" aria-hidden="true"><SearchGlyph /></span>
                <input type="text" placeholder="Search items" aria-label="Search items" />
              </div>
            )}
            <div className="bdcoll__actions">
              {activeTab === TABS.THIRD_PARTY && (
                <button type="button" className="bdcoll__btn bdcoll__btn--basic">
                  Create Linked Wearables Collection
                </button>
              )}
              <button type="button" className="bdcoll__btn bdcoll__btn--basic bdcoll__btn--editor">
                <CubeGlyph /> Open editor
              </button>
              <button type="button" className="bdcoll__btn bdcoll__btn--primary">
                <span className="bdcoll__plus" aria-hidden="true">＋</span> Create Collection
              </button>
            </div>
          </div>

          <div className="bdcoll__resultsrow">
            <div className="bdcoll__results">
              {!loading && hasResults ? `${count} ${count === 1 ? "result" : "results"}` : ""}
            </div>
            <div className="bdcoll__viewactions">
              {!isItemsTab && (
                <div className="bdcoll__sort">
                  <button
                    type="button"
                    className="bdcoll__sortbtn"
                    onClick={() => setSortOpen((v) => !v)}
                    aria-expanded={sortOpen}
                  >
                    {sortLabel} <Caret size={12} />
                  </button>
                  {sortOpen && (
                    <div className="bdcoll__sortmenu" role="menu">
                      {SORT_OPTIONS.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          role="menuitemradio"
                          aria-checked={o.value === sort}
                          className={"bdcoll__sortitem" + (o.value === sort ? " is-active" : "")}
                          onClick={() => { setSort(o.value); setSortOpen(false); }}
                        >
                          {o.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="bdcoll__chips">
                <button
                  type="button"
                  className={"bdcoll__chip bdcoll__chip--grid" + (activeView === "grid" ? " is-active" : "")}
                  aria-label="Grid view"
                  aria-pressed={activeView === "grid"}
                  onClick={() => setActiveView("grid")}
                >
                  <GridGlyph />
                </button>
                <button
                  type="button"
                  className={"bdcoll__chip bdcoll__chip--list" + (activeView === "list" ? " is-active" : "")}
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
          <div className="bdcoll__loader" role="status" aria-label="Loading">
            <span className="bdcoll__spinner" />
          </div>
        ) : !hasResults ? (
          <div className="bdcoll__empty">
            <h2 className="bdcoll__emptytitle">No collections</h2>
            <p className="bdcoll__emptydesc">
              You have no collections yet. Create a new collection, and dress the metaverse in style!
            </p>
            <div className="bdcoll__createnew">
              <span className="bdcoll__createtext">Create Collection</span>
            </div>
          </div>
        ) : activeView === "grid" ? (
          <div className="bdcoll__grid">
            {isItemsTab
              ? items.map((it) => <ItemCard key={it.id} item={it} />)
              : collections.map((c) => <CollectionCard key={c.id} collection={c} />)}
          </div>
        ) : (
          <div className="bdcoll__listwrap">
            {isItemsTab ? (
              <table className="bdcoll__table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Created</th>
                    <th>Last modified</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="bdcoll__trow">
                      <td>
                        <div className="bdcoll__rowname">
                          <span className="bdcoll__rowthumb" style={{ background: it.grad }} />
                          <span className="u-truncate">{it.name}</span>
                        </div>
                      </td>
                      <td>2 weeks ago</td>
                      <td>3 days ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="bdcoll__table">
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Type</th>
                    <th>Items</th>
                    <th>Created</th>
                    <th>Last modified</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {collections.map((c) => (
                    <tr key={c.id} className="bdcoll__trow">
                      <td>
                        <div className="bdcoll__rowname">
                          <span className="bdcoll__rowthumb" style={{ background: c.thumbs?.[0] || "var(--fill-3)" }} />
                          <CollectionStatusDot status={c.status} />
                          <span className="u-truncate">{c.name}</span>
                        </div>
                      </td>
                      <td>{TYPE_LABEL[c.type]}</td>
                      <td>{c.count}</td>
                      <td>2 weeks ago</td>
                      <td>3 days ago</td>
                      <td>
                        {c.status === "synced" ? (
                          <span className="bdcoll__published">Published <CheckGlyph /></span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {!loading && hasResults && (
          <nav className="bdcoll__pagination" aria-label="Pagination">
            <button type="button" className="bdcoll__page is-active">1</button>
            <button type="button" className="bdcoll__page">2</button>
            <button type="button" className="bdcoll__page">3</button>
          </nav>
        )}
      </div>
    </BuilderChrome>
  );
}
