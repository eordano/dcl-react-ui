import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./ststorageselect.css";

const COPY = {
  title: "Select Asset to Manage",
  subtitle: "Choose a world or land parcel to manage its storage.",
  worlds: "Worlds",
  lands: "Lands",
  noWorlds: "No worlds found",
  noLands: "No lands found",
  loading: "Loading assets",
  searchWorlds: "Search worlds…",
  searchLands: "Search lands…",
  noSearchResults: (q) => `No results for "${q}"`,
  clearSearch: "Clear search",
  scenesCount: (n) => `${n} scenes`,
  sceneCountOne: "1 scene",
  edit: "Edit",
  editScenes: "Edit Scenes",
  selectScene: "Select scene",
  owner: "Owner",
  collaborator: "Collaborator",
};

const ROLE = { OWNER: "Owner", LESSOR: "Lessor", TENANT: "Tenant", OPERATOR: "Operator" };

const WORLDS = [
  { name: "genesis.dcl.eth", role: "owner", scenes: 1 },
  { name: "myestate.dcl.eth", role: "owner", scenes: 3 },
  { name: "gallery.dcl.eth", role: "collaborator", scenes: 1 },
  { name: "lounge.dcl.eth", role: "owner", scenes: 2 },
  { name: "studio.dcl.eth", role: "collaborator", scenes: 0 },
];

const LANDS = [
  { id: "0x1", name: "Casa Verde", role: ROLE.OWNER },
  { id: "0x2", name: "Plaza Norte (12 parcels)", role: ROLE.OWNER },
  { id: "0x3", name: "Parcel 14,-9", role: ROLE.OPERATOR },
  { id: "0x4", name: "Beachfront Estate", role: ROLE.TENANT },
  { id: "0x5", name: "Downtown Lot", role: ROLE.LESSOR },
  { id: "0x6", name: "Parcel -33,52", role: ROLE.OWNER },
];

const FmdGoodIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M12 2c3.86 0 7 3.14 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.86 3.14-7 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z"
    />
  </svg>
);
const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5 1.49-1.49-5-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
    />
  </svg>
);
const ClearIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </svg>
);
const ArrowDropDownIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M7 10l5 5 5-5z" />
  </svg>
);

function SearchField({ value, onChange, onClear, placeholder }) {
  return (
    <div className="ststorageselect__search">
      <div className="ststorageselect__field">
        <span className="ststorageselect__fieldstart" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          className="ststorageselect__input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        {value ? (
          <button
            type="button"
            className="ststorageselect__clear"
            onClick={onClear}
            aria-label={COPY.clearSearch}
          >
            <ClearIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function WorldCard({ world, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMultiScene = world.scenes > 1;
  const sceneCountLabel =
    world.scenes === 1 ? COPY.sceneCountOne : COPY.scenesCount(world.scenes);

  return (
    <div className="ststorageselect__card">
      <div className="ststorageselect__cardcontent">
        <div className="ststorageselect__cardlabel">
          <FmdGoodIcon className="ststorageselect__pin" />
          <span className="ststorageselect__cardname">{world.name}</span>
        </div>
        <span className="ststorageselect__caption">{sceneCountLabel}</span>
      </div>
      <div className="ststorageselect__cardactions">
        <span className="ststorageselect__chip">
          {world.role === "owner" ? COPY.owner : COPY.collaborator}
        </span>
        <div className="ststorageselect__editwrap">
          {isMultiScene ? (
            <span className="ststorageselect__splitbtn">
              <button
                type="button"
                className="ststorageselect__btn ststorageselect__btn--split"
                onClick={onEdit}
                aria-label={COPY.edit}
              >
                {COPY.edit}
              </button>
              <span className="ststorageselect__menudivider" aria-hidden="true" />
              <button
                type="button"
                className="ststorageselect__btn ststorageselect__chevron"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={COPY.selectScene}
                aria-expanded={menuOpen}
              >
                <ArrowDropDownIcon />
              </button>
              {menuOpen ? (
                <div className="ststorageselect__menu" role="menu">
                  <div className="ststorageselect__menuhead">{COPY.editScenes}</div>
                  {Array.from({ length: world.scenes }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="ststorageselect__menuitem"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit();
                      }}
                    >
                      Scene {i + 1}
                    </button>
                  ))}
                </div>
              ) : null}
            </span>
          ) : (
            <button
              type="button"
              className="ststorageselect__btn"
              onClick={onEdit}
              aria-label={COPY.edit}
            >
              {COPY.edit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LandCard({ land, onClick }) {
  const isOwner = land.role === ROLE.OWNER;
  return (
    <button
      type="button"
      className="ststorageselect__card ststorageselect__card--action"
      onClick={onClick}
      aria-label={`Select ${land.name}`}
    >
      <div className="ststorageselect__cardcontent">
        <span className="ststorageselect__landname">{land.name}</span>
        <div>
          <span
            className={
              "ststorageselect__chip" +
              (isOwner ? " ststorageselect__chip--primary" : "")
            }
          >
            {land.role}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function StStorageSelect({
  worlds = WORLDS,
  lands = LANDS,
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [worldsQuery, setWorldsQuery] = useState("");
  const [landsQuery, setLandsQuery] = useState("");

  const filteredWorlds = useMemo(() => {
    const q = worldsQuery.trim().toLowerCase();
    if (!q) return worlds;
    return worlds.filter((w) => w.name.toLowerCase().includes(q));
  }, [worlds, worldsQuery]);

  const filteredLands = useMemo(() => {
    const q = landsQuery.trim().toLowerCase();
    if (!q) return lands;
    return lands.filter((l) => l.name.toLowerCase().includes(q));
  }, [lands, landsQuery]);

  return (
    <SitesChrome>
      <div className="ststorageselect">
        <div className="ststorageselect__container">
          <h1 className="ststorageselect__title">{COPY.title}</h1>
          <p className="ststorageselect__subtitle">{COPY.subtitle}</p>

          <div className="ststorageselect__tabs" role="tablist" aria-label="asset type tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 0}
              className={
                "ststorageselect__tab" + (activeTab === 0 ? " is-active" : "")
              }
              onClick={() => setActiveTab(0)}
            >
              {COPY.worlds} ({worlds.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 1}
              className={
                "ststorageselect__tab" + (activeTab === 1 ? " is-active" : "")
              }
              onClick={() => setActiveTab(1)}
            >
              {COPY.lands} ({lands.length})
            </button>
          </div>

          {loading ? (
            <div className="ststorageselect__loading">
              <span
                className="ststorageselect__spinner"
                role="progressbar"
                aria-label={COPY.loading}
              />
            </div>
          ) : null}

          {!loading && activeTab === 0 ? (
            <div className="ststorageselect__panel" role="tabpanel">
              <SearchField
                value={worldsQuery}
                onChange={(e) => setWorldsQuery(e.target.value)}
                onClear={() => setWorldsQuery("")}
                placeholder={COPY.searchWorlds}
              />
              {filteredWorlds.length === 0 ? (
                <p className="ststorageselect__empty">
                  {worldsQuery ? COPY.noSearchResults(worldsQuery) : COPY.noWorlds}
                </p>
              ) : (
                <div className="ststorageselect__grid">
                  {filteredWorlds.map((world) => (
                    <WorldCard key={world.name} world={world} onEdit={() => {}} />
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {!loading && activeTab === 1 ? (
            <div className="ststorageselect__panel" role="tabpanel">
              <SearchField
                value={landsQuery}
                onChange={(e) => setLandsQuery(e.target.value)}
                onClear={() => setLandsQuery("")}
                placeholder={COPY.searchLands}
              />
              {filteredLands.length === 0 ? (
                <p className="ststorageselect__empty">
                  {landsQuery ? COPY.noSearchResults(landsQuery) : COPY.noLands}
                </p>
              ) : (
                <div className="ststorageselect__grid">
                  {filteredLands.map((land) => (
                    <LandCard key={land.id} land={land} onClick={() => {}} />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </SitesChrome>
  );
}
