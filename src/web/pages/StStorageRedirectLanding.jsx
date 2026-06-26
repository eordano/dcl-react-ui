import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./ststorageredirectlanding.css";

const RoleType = { OWNER: 1, LESSOR: 2, TENANT: 3, OPERATOR: 4 };
const ROLE_LABEL = {
  [RoleType.OWNER]: "Owner",
  [RoleType.LESSOR]: "Lessor",
  [RoleType.TENANT]: "Tenant",
  [RoleType.OPERATOR]: "Operator"
};

const WORLDS = [
  { name: "myworld.dcl.eth", role: "owner", sceneCount: 1 },
  { name: "genesis-plaza.dcl.eth", role: "owner", sceneCount: 3 },
  { name: "build-jam.dcl.eth", role: "collaborator", sceneCount: 1 },
  { name: "neon-arcade.dcl.eth", role: "owner", sceneCount: 2 },
  { name: "studio-collab.dcl.eth", role: "collaborator", sceneCount: 1 }
];

const LANDS = [
  { id: "0-101,-12", name: "Aetheria HQ", role: RoleType.OWNER },
  { id: "1-72,8", name: "Parcel 72, 8", role: RoleType.OWNER },
  { id: "2-est-512", name: "Sunset Estate", role: RoleType.OPERATOR },
  { id: "3-15,-44", name: "Parcel 15, -44", role: RoleType.TENANT },
  { id: "4-est-877", name: "Vegas Plaza", role: RoleType.LESSOR }
];

const FmdGoodIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);
const SearchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
  </svg>
);
const ClearIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
const ArrowDropDownIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);
const ArrowBackIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </svg>
);

function SearchField({ value, onChange, onClear, placeholder }) {
  return (
    <div className="ststo__search">
      <div className="ststo__searchbox">
        <SearchIcon className="ststo__searchicon" />
        <input
          className="ststo__searchinput"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        {value ? (
          <button type="button" className="ststo__searchclear" onClick={onClear} aria-label="Clear search">
            <ClearIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function WorldCard({ world, onEdit }) {
  const sceneLabel = world.sceneCount === 1 ? "1 scene" : `${world.sceneCount} scenes`;
  const isMulti = world.sceneCount > 1;
  return (
    <div className="ststo__card">
      <div className="ststo__cardcontent">
        <div className="ststo__cardlabel">
          <FmdGoodIcon className="ststo__cardicon" />
          <span className="ststo__cardtitle">{world.name}</span>
        </div>
        <span className="ststo__cardcaption">{sceneLabel}</span>
      </div>
      <div className="ststo__cardactions">
        <span className="ststo__chip">{world.role === "owner" ? "Owner" : "Collaborator"}</span>
        {isMulti ? (
          <span className="ststo__btn ststo__btn--split">
            <button type="button" className="ststo__btnmain" onClick={onEdit} aria-label="Edit">
              Edit
            </button>
            <span className="ststo__btndiv" />
            <button type="button" className="ststo__btnchevron" aria-label="Select scene" onClick={onEdit}>
              <ArrowDropDownIcon />
            </button>
          </span>
        ) : (
          <button type="button" className="ststo__btn" onClick={onEdit} aria-label="Edit">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

function LandCard({ land, onClick }) {
  const isOwner = land.role === RoleType.OWNER;
  return (
    <button type="button" className="ststo__card ststo__card--action" onClick={onClick} aria-label={`Select ${land.name}`}>
      <div className="ststo__cardcontent">
        <span className="ststo__cardtitle ststo__cardtitle--lg">{land.name}</span>
        <span className={"ststo__chip" + (isOwner ? " ststo__chip--primary" : "")}>{ROLE_LABEL[land.role]}</span>
      </div>
    </button>
  );
}

function SelectLanding({ worlds, lands, isLoading }) {
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
    <div className="ststo__container">
      <h1 className="ststo__h4">Select Asset to Manage</h1>
      <p className="ststo__subtitle">Choose a world or land parcel to manage its storage.</p>

      <div className="ststo__tabs" role="tablist" aria-label="asset type tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 0}
          className={"ststo__tab" + (activeTab === 0 ? " is-active" : "")}
          onClick={() => setActiveTab(0)}
        >
          Worlds ({worlds.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 1}
          className={"ststo__tab" + (activeTab === 1 ? " is-active" : "")}
          onClick={() => setActiveTab(1)}
        >
          Lands ({lands.length})
        </button>
        <span className="ststo__tabline" style={{ transform: `translateX(${activeTab * 100}%)` }} aria-hidden="true" />
      </div>

      {isLoading ? (
        <div className="ststo__loading">
          <span className="ststo__spinner" role="status" aria-label="Loading assets" />
        </div>
      ) : null}

      {!isLoading && activeTab === 0 ? (
        <div role="tabpanel" className="ststo__panel">
          <SearchField
            value={worldsQuery}
            onChange={setWorldsQuery}
            onClear={() => setWorldsQuery("")}
            placeholder="Search worlds…"
          />
          {filteredWorlds.length === 0 ? (
            <p className="ststo__empty">{worldsQuery ? `No results for "${worldsQuery}"` : "No worlds found"}</p>
          ) : (
            <div className="ststo__grid">
              {filteredWorlds.map((world) => (
                <WorldCard key={world.name} world={world} onEdit={() => {}} />
              ))}
            </div>
          )}
        </div>
      ) : null}

      {!isLoading && activeTab === 1 ? (
        <div role="tabpanel" className="ststo__panel">
          <SearchField
            value={landsQuery}
            onChange={setLandsQuery}
            onClear={() => setLandsQuery("")}
            placeholder="Search lands…"
          />
          {filteredLands.length === 0 ? (
            <p className="ststo__empty">{landsQuery ? `No results for "${landsQuery}"` : "No lands found"}</p>
          ) : (
            <div className="ststo__grid">
              {filteredLands.map((land) => (
                <LandCard key={land.id} land={land} onClick={() => {}} />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function RedirectInterstitial({ realm, position }) {
  const scopeLabel = realm ?? position ?? "";
  return (
    <div className="ststo__redirect">
      <button type="button" className="ststo__back" aria-label="Back">
        <ArrowBackIcon />
        <span>Back</span>
      </button>
      <span className="ststo__spinner ststo__spinner--lg" role="status" aria-label="Loading" />
      <p className="ststo__redirecttitle">Opening storage…</p>
      {scopeLabel ? (
        <span className="ststo__scope">
          <FmdGoodIcon className="ststo__scopeicon" />
          <span className="ststo__scopelabel">{scopeLabel}</span>
        </span>
      ) : null}
      {realm && position ? <span className="ststo__redirectsub">Position: {position}</span> : null}
    </div>
  );
}

export default function StStorageRedirectLanding({
  mode = "select",
  realm = null,
  position = null,
  worlds = WORLDS,
  lands = LANDS,
  isLoading = false
}) {
  return (
    <SitesChrome active="create">
      <div className="ststo">
        {mode === "redirect" ? (
          <RedirectInterstitial realm={realm} position={position} />
        ) : (
          <SelectLanding worlds={worlds} lands={lands} isLoading={isLoading} />
        )}
      </div>
    </SitesChrome>
  );
}

export { RoleType, WORLDS, LANDS };
