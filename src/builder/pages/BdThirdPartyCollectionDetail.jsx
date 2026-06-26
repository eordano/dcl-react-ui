import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Checkbox from "../../atoms/Checkbox.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdthirdpartycollectiondetail.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const PAGE_SIZE = 50;

const STATUS = {
  synced: { label: "Published", cls: "is-synced", icon: "check" },
  unsynced: { label: "Ready to push changes", cls: "is-unsynced", icon: "cloud" },
  unpublished: { label: "Ready to publish", cls: "is-unpublished", icon: "cloud" },
  under_review: { label: "Under Review", cls: "is-review", icon: "review" },
  pending_migration: { label: "Pending Migration", cls: "is-pending_migration", icon: "warn" },
  pending_mapping: { label: "Pending Mapping", cls: "is-pending_mapping", icon: "map" },
};

const MAPPING_TYPES = [
  { value: "any", label: "All NFTs" },
  { value: "single", label: "Single" },
  { value: "multiple", label: "Multiple" },
  { value: "range", label: "Range" },
];
const MAPPING_TYPE_LABELS = Object.fromEntries(MAPPING_TYPES.map((m) => [m.value, m.label]));

const STATUS_FILTER = ["All items", "Published", "Ready to push changes", "Pending Migration", "Pending Mapping"];

const COLLECTION = {
  id: "tpc-1",
  name: "CryptoKitties Capsule",
  isPublished: false,
  isMappingComplete: false,
  itemCount: 4,
  linkedContractAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
  linkedContractNetwork: "MATIC",
};

const THIRD_PARTY = {
  id: "urn:decentraland:matic:collections-thirdparty:cryptokitties",
  isProgrammatic: false,
  availableSlots: 132,
  maxItems: 200,
};

const ITEMS = [
  {
    id: "i1", name: "Genesis Kitty", hue: 332, isPublished: false,
    status: "unpublished", mappingType: "single", mappingValue: "1001",
  },
  {
    id: "i2", name: "Fancy Furball", hue: 196, isPublished: false,
    status: "unsynced", mappingType: "multiple", mappingValue: "12, 34, 56, 78",
  },
  {
    id: "i3", name: "Cosmic Whiskers", hue: 268, isPublished: false,
    status: "pending_mapping", mappingType: "any", mappingValue: "",
  },
  {
    id: "i4", name: "Pixel Paws", hue: 38, isPublished: true,
    status: "synced", mappingType: "range", mappingValue: "1,4000",
  },
];

const PlusGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const UploadGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 11v2.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M8 10.5V2.5m0 0L5 5.5M8 2.5l3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CopyGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10.5 5.5V3.9A1.4 1.4 0 0 0 9.1 2.5H3.9A1.4 1.4 0 0 0 2.5 3.9v5.2a1.4 1.4 0 0 0 1.4 1.4h1.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);
const SyncGlyph = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
    <path d="M14.5 4.5A6.5 6.5 0 0 0 3.2 7M3.5 13.5A6.5 6.5 0 0 0 14.8 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14.5 2v2.8h-2.8M3.5 16v-2.8h2.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DotsGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="3" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="13" cy="8" r="1.4" fill="currentColor" />
  </svg>
);
const InfoGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 7v4M8 5v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

function StatusGlyph({ icon }) {
  const p = {
    check: <><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M5.3 8.2l1.9 1.9 3.6-3.9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>,
    cloud: <path d="M5 11.5a3 3 0 0 1 .4-6 4 4 0 0 1 7.6 1.2 2.6 2.6 0 0 1-.5 5.1H5z M8 9.5V5.5m0 0L6.3 7.2M8 5.5l1.7 1.7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />,
    warn: <><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M8 4.6v4.2M8 11v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></>,
    review: <><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M8 4.8V8l2.4 1.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></>,
    map: <><path d="M6 2.5L2.5 4v9.5L6 12l4 1.5 3.5-1.5V2.5L10 4 6 2.5z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M6 2.5V12M10 4v9.5" fill="none" stroke="currentColor" strokeWidth="1.2" /></>,
  }[icon];
  return <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">{p}</svg>;
}

function shorten(addr) {
  return addr.length > 12 ? addr.slice(0, 6) + "..." + addr.slice(-4) : addr;
}

function ItemStatusBadge({ status }) {
  const s = STATUS[status] || STATUS.unpublished;
  return (
    <span className={"bdtpd__statusbadge " + s.cls}>
      <StatusGlyph icon={s.icon} />
      {s.label}
    </span>
  );
}

function MappingEditor({ type, value, error, disabled, onTypeChange }) {
  const renderValue = () => {
    if (type === undefined) return <span className="bdtpd__mapfield is-empty" />;
    if (type === "any")
      return <span className="bdtpd__mapfield is-disabled">Any token ID</span>;
    if (type === "single")
      return (
        <span className={"bdtpd__mapfield" + (error ? " has-error" : "")}>
          {value || <span className="bdtpd__mapph">1234567890</span>}
        </span>
      );
    if (type === "multiple") {
      const count = value ? value.split(",").map((s) => s.trim()).filter(Boolean).length : 0;
      return (
        <span className="bdtpd__mapmultiple">
          <span className={"bdtpd__mapfield" + (error ? " has-error" : "")}>
            {value || <span className="bdtpd__mapph">1, 2, 3, 4</span>}
          </span>
          <span className="bdtpd__mapinfo">
            {error || `${count} linked token ${count === 1 ? "ID" : "IDs"}`}
          </span>
        </span>
      );
    }
    if (type === "range") {
      const [from, to] = (value || ",").split(",");
      return (
        <span className="bdtpd__maprange">
          <span className={"bdtpd__mapfield is-num" + (error ? " has-error" : "")}>
            {from || <span className="bdtpd__mapph">1</span>}
          </span>
          <span className="bdtpd__mapto">To</span>
          <span className={"bdtpd__mapfield is-num" + (error ? " has-error" : "")}>
            {to || <span className="bdtpd__mapph">4000</span>}
          </span>
        </span>
      );
    }
    return null;
  };

  return (
    <div className={"bdtpd__mapping" + (disabled ? " is-disabled" : "")}>
      <div className="bdtpd__maptype">
        <Dropdown
          options={MAPPING_TYPES.map((m) => m.label)}
          value={MAPPING_TYPE_LABELS[type]}
          onChange={(label) => {
            const t = MAPPING_TYPES.find((m) => m.label === label);
            onTypeChange && onTypeChange(t ? t.value : "any");
          }}
        />
      </div>
      <div className="bdtpd__mapvalue">{renderValue()}</div>
    </div>
  );
}

function CollectionItemRow({ item, selected, onSelect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [type, setType] = useState(item.mappingType);
  const error = type === "single" && !item.mappingValue ? "Invalid mapping" : undefined;
  return (
    <div className="bdtpd__row">
      <div className="bdtpd__col bdtpd__itemcol">
        <Checkbox checked={selected} onChange={() => onSelect(item)} />
        <span
          className="bdtpd__itemimg"
          style={{ background: `linear-gradient(135deg, hsl(${item.hue} 60% 42%), hsl(${(item.hue + 40) % 360} 55% 26%))` }}
        />
        <span className="bdtpd__itemname u-truncate" title={item.name}>{item.name}</span>
      </div>
      <div className="bdtpd__col bdtpd__mapcol">
        <MappingEditor type={type} value={item.mappingValue} error={error} disabled={item.isPublished} onTypeChange={setType} />
      </div>
      <div className="bdtpd__col bdtpd__statuscol">
        <ItemStatusBadge status={item.status} />
      </div>
      <div className="bdtpd__col bdtpd__menucol">
        <button
          type="button"
          className="bdtpd__rowmenu"
          aria-label="Item options"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <DotsGlyph />
        </button>
        {menuOpen ? (
          <ul className="bdtpd__dropdown" role="menu">
            <li role="menuitem">See details</li>
            <li role="menuitem">See in Decentraland</li>
            <li role="menuitem">Open in editor</li>
            <li role="menuitem" className={item.isPublished ? "is-disabled" : ""}>Edit URN</li>
            {!item.isPublished ? <li role="menuitem" className="is-danger">Delete</li> : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function InfoChip({ title, children }) {
  return (
    <div className="bdtpd__info">
      <div className="bdtpd__infohead">
        {title}
        <span className="bdtpd__infohelp" aria-hidden="true"><InfoGlyph /></span>
      </div>
      <div className="bdtpd__infocontent">{children}</div>
    </div>
  );
}

export default function BdThirdPartyCollectionDetail({
  collection = COLLECTION,
  thirdParty = THIRD_PARTY,
  items = ITEMS,
  totalItems = ITEMS.length,
  page = 1,
  loading = false,
  empty = false,
}) {
  const [tab, setTab] = useState("collections");
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTER[0]);
  const [ctxOpen, setCtxOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const list = empty ? [] : items;
  const total = empty ? 0 : totalItems;
  const isCollectionEmpty = (collection.itemCount ?? 0) === 0 || empty;
  const totalPages = Math.ceil(Math.max(total, 1) / PAGE_SIZE);

  const selectableItems = useMemo(() => list.filter((i) => !i.isPublished), [list]);
  const selectedCount = useMemo(() => list.filter((i) => selected[i.id]).length, [list, selected]);
  const allSelected = selectableItems.length > 0 && selectableItems.every((i) => selected[i.id]);

  const toggleItem = (item) =>
    setSelected((s) => ({ ...s, [item.id]: !s[item.id] }));
  const toggleAll = () => {
    const next = { ...selected };
    const value = !allSelected;
    selectableItems.forEach((i) => { next[i.id] = value; });
    setSelected(next);
  };
  const clearSelection = () => setSelected({});

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdtpd bdtpd--loading">
          <Spinner size={56} />
        </div>
      </BuilderChrome>
    );
  }

  const showFrom = (page - 1) * PAGE_SIZE + 1;
  const showTo = Math.min(total, page * PAGE_SIZE);

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdtpd">
        <div className="bdtpd__header">
          <button type="button" className="bdtpd__back" aria-label="Back">
            <ChevronLeft size={18} />
          </button>

          <div className="bdtpd__content">
            <div className="bdtpd__title">
              <span
                className="bdtpd__tpimg"
                style={{ background: `linear-gradient(135deg, hsl(282 58% 44%), hsl(322 52% 26%))` }}
                aria-hidden="true"
              />
              <div className="bdtpd__nameandtype">
                <div className="bdtpd__namewrap">
                  <h1 className="bdtpd__name u-truncate" title={collection.name}>{collection.name}</h1>
                  {!collection.isPublished ? (
                    <span className="bdtpd__editname" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="15" height="15">
                        <path d="M11 2.5l2.5 2.5L6 12.5l-3 .5.5-3L11 2.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : null}
                </div>
                <div className="bdtpd__type">
                  <span className="bdtpd__badge bdtpd__badge--linked">Linked Wearables</span>
                  <span className={"bdtpd__badge " + (thirdParty.isProgrammatic ? "bdtpd__badge--prog" : "bdtpd__badge--std")}>
                    {thirdParty.isProgrammatic ? "Programmatic" : "Standard"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bdtpd__actions">
              {collection.linkedContractAddress && collection.linkedContractNetwork ? (
                <InfoChip title="SCA">
                  {shorten(collection.linkedContractAddress)}
                  <button type="button" className="bdtpd__copy" aria-label="Copy smart contract address">
                    <CopyGlyph />
                  </button>
                </InfoChip>
              ) : null}
              <InfoChip title="Slots">
                <span className="bdtpd__slotsicon" aria-hidden="true" />
                <span>{thirdParty.availableSlots ?? 0} / {thirdParty.maxItems}</span>
              </InfoChip>
              <button type="button" className="bdtpd__newitems">
                <PlusGlyph /> New Items
              </button>
              <button type="button" className="bdtpd__publish">
                <UploadGlyph /> Publish
              </button>
              <div className="bdtpd__ctxwrap">
                <button
                  type="button"
                  className="bdtpd__ctxbtn"
                  aria-label="Collection options"
                  aria-expanded={ctxOpen}
                  onClick={() => setCtxOpen((v) => !v)}
                >
                  <DotsGlyph />
                </button>
                {ctxOpen ? (
                  <ul className="bdtpd__dropdown is-right" role="menu">
                    <li role="menuitem">See in Decentraland</li>
                    <li role="menuitem">Open in editor</li>
                    <li role="menuitem" className="is-danger">Delete</li>
                    <li role="menuitem" className="is-disabled">Edit URN</li>
                    <li role="menuitem">Edit in bulk</li>
                    <li role="menuitem" className="is-disabled">View Forum post</li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {!collection.isMappingComplete ? (
          <div className="bdtpd__migration">
            <SyncGlyph /> One or many items in your collection must be migrated to new version
          </div>
        ) : null}

        <div className="bdtpd__body">
          {(collection.itemCount ?? 0) > 0 && !empty ? (
            <div className="bdtpd__search">
              {list.length > 0 ? (
                <div className="bdtpd__searchinfo">{showFrom}-{showTo} of {total}</div>
              ) : null}
              <div className="bdtpd__statusfilter">
                <Dropdown
                  options={collection.isMappingComplete ? STATUS_FILTER.slice(0, 3) : STATUS_FILTER}
                  value={statusFilter}
                  onChange={setStatusFilter}
                />
              </div>
            </div>
          ) : null}

          {list.length > 0 ? (
            <>
              {selectedCount > 0 ? (
                <div className="bdtpd__selection">
                  {selectedCount} {selectedCount === 1 ? "item" : "items"} selected.&nbsp;
                  <span className="bdtpd__link" onClick={clearSelection}>Clear selection</span>.&nbsp;
                  {totalPages > 1 ? (
                    <span className="bdtpd__link">Select all {total} items</span>
                  ) : null}
                </div>
              ) : null}

              <div className="bdtpd__listhead">
                <div className="bdtpd__col bdtpd__itemcol">
                  <Checkbox checked={allSelected} onChange={toggleAll} />
                  <span className="bdtpd__headlabel">Item</span>
                </div>
                <div className="bdtpd__col bdtpd__mapcol">
                  <span>Linked to</span>
                  <span className="bdtpd__infohelp" aria-hidden="true"><InfoGlyph /></span>
                </div>
                <div className="bdtpd__col bdtpd__statuscol">Status</div>
                <div className="bdtpd__col bdtpd__menucol" />
              </div>

              {list.map((item) => (
                <CollectionItemRow
                  key={item.id}
                  item={item}
                  selected={!!selected[item.id]}
                  onSelect={toggleItem}
                />
              ))}

              {totalPages > 1 ? (
                <div className="bdtpd__pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={"bdtpd__page" + (p === page ? " is-active" : "")}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="bdtpd__empty">
              <div className={isCollectionEmpty ? "bdtpd__start" : "bdtpd__sparkles"} aria-hidden="true">
                {isCollectionEmpty ? (
                  <svg viewBox="0 0 16 16" width="40" height="40">
                    <path d="M8 11V3m0 0L4.5 6.5M8 3l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12.5h11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 54 56" width="54" height="56">
                    <path d="M27 6l3.5 9.5L40 19l-9.5 3.5L27 32l-3.5-9.5L14 19l9.5-3.5L27 6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M44 36l1.6 4.4L50 42l-4.4 1.6L44 48l-1.6-4.4L38 42l4.4-1.6L44 36z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {isCollectionEmpty ? (
                <>
                  <h3>Looking good! Start adding items to your new collection</h3>
                  <p>You will not be able to add or remove items after publishing them.</p>
                </>
              ) : (
                <>
                  <h3>There are no items available with this search criteria</h3>
                  <p>Try changing the filters to find what you're looking for.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </BuilderChrome>
  );
}
