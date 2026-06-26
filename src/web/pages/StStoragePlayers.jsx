import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./ststorageplayers.css";

const truncateAddress = (address) => {
  if (!address || address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const PLAYERS = [
  "0x6a77833d2b7f0c6c0e6c4a45a6f8e3c1d9b27a41",
  "0x8f2a5c9d0b1e4f7a3c6d8b2e5a9f0c3d7b1e6a82",
  "0x1b3c5d7e9f0a2c4e6d8b0a1c3e5f7d9b2a4c6e80",
  "0xc4e6a8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2",
  "0x3d5f7a9c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d10",
  "0x9a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a64",
  "0x5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c30",
  "0x2e4c6a8d0b2f4e6c8a0d2b4f6e8c0a2d4b6f8e09"
];

const PROFILE_NAMES = new Map([
  ["0x6a77833d2b7f0c6c0e6c4a45a6f8e3c1d9b27a41", "BraveExplorer"],
  ["0x8f2a5c9d0b1e4f7a3c6d8b2e5a9f0c3d7b1e6a82", "NeonNomad"],
  ["0xc4e6a8b0d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2", "pixel.dcl.eth"],
  ["0x9a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a64", "VoxelVagrant"],
  ["0x5c7e9b1d3f5a7c9e1b3d5f7a9c1e3b5d7f9a1c30", "AuroraBuilder"]
]);

const ArrowBackIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </svg>
);
const FmdGoodIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);
const SettingsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M19.14 12.94a7.49 7.49 0 0 0 .05-.94 7.49 7.49 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.61l-1.92-3.32a.5.5 0 0 0-.59-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.49.49 0 0 0-.5-.42h-3.84a.49.49 0 0 0-.5.42l-.36 2.54a7.03 7.03 0 0 0-1.62.94l-2.39-.96a.5.5 0 0 0-.59.22L2.74 8.87a.5.5 0 0 0 .12.61l2.03 1.58c-.03.31-.05.62-.05.94s.02.63.05.94l-2.03 1.58a.5.5 0 0 0-.12.61l1.92 3.32c.13.22.39.31.59.22l2.39-.96c.5.38 1.05.7 1.62.94l.36 2.54c.04.24.25.42.5.42h3.84c.25 0 .46-.18.5-.42l.36-2.54c.57-.24 1.12-.56 1.62-.94l2.39.96c.2.09.46 0 .59-.22l1.92-3.32a.5.5 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z" />
  </svg>
);
const ViewInArIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M3 6l9-4 9 4v12l-9 4-9-4V6zm9-1.74L6.18 6.7 12 9.28l5.82-2.58L12 4.26zM5 8.18v8.52l6 2.67v-8.4L5 8.18zm14 0l-6 2.79v8.4l6-2.67V8.18z" />
  </svg>
);
const PeopleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
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
const DeleteSweepIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12V5z" />
  </svg>
);

const STORAGE_TABS = [
  { value: "env", label: "Environment", Icon: SettingsIcon },
  { value: "scene", label: "Scene", Icon: ViewInArIcon },
  { value: "players", label: "Player", Icon: PeopleIcon }
];

function StorageLayout({ realm, position, active = "players", children }) {
  const scopeLabel = realm ?? position ?? "";
  const activeIndex = STORAGE_TABS.findIndex((t) => t.value === active);
  return (
    <div className="ststp__container">
      <div className="ststp__header">
        <button type="button" className="ststp__back" aria-label="Back">
          <ArrowBackIcon className="ststp__backicon" />
          <span className="ststp__backlabel">Back</span>
        </button>
        {scopeLabel ? (
          <div className="ststp__scoperow">
            <span className="ststp__scopechip">
              <FmdGoodIcon className="ststp__scopeicon" />
              <span className="ststp__scopelabel">{scopeLabel}</span>
            </span>
            {realm && position ? <span className="ststp__scopepos">Position: {position}</span> : null}
          </div>
        ) : null}
      </div>

      <div className="ststp__tabsroot">
        <div className="ststp__tabs" role="tablist" aria-label="storage sections">
          {STORAGE_TABS.map((tab) => {
            const isActive = tab.value === active;
            const Icon = tab.Icon;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={"ststp__tab" + (isActive ? " is-active" : "")}
              >
                <Icon className="ststp__tabicon" />
                <span>{tab.label}</span>
              </button>
            );
          })}
          <span
            className="ststp__tabline"
            style={{ width: `${100 / STORAGE_TABS.length}%`, transform: `translateX(${activeIndex * 100}%)` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {children}
    </div>
  );
}

function SearchField({ value, onChange, onClear, placeholder }) {
  return (
    <div className="ststp__search">
      <div className="ststp__searchbox">
        <SearchIcon className="ststp__searchicon" />
        <input
          className="ststp__searchinput"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        {value ? (
          <button type="button" className="ststp__searchclear" onClick={onClear} aria-label="Clear search">
            <ClearIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function PlayerCard({ address, displayName, onClick }) {
  const label = displayName ?? truncateAddress(address);
  return (
    <button
      type="button"
      className="ststp__card"
      onClick={onClick}
      aria-label={`View storage for ${address}`}
    >
      <span className="ststp__cardtitle">{label}</span>
      <span className="ststp__cardcaption">{truncateAddress(address)}</span>
    </button>
  );
}

function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="ststp__scrim" role="presentation" onClick={onCancel}>
      <div
        className="ststp__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ststp-dialog-title"
        aria-describedby="ststp-dialog-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="ststp__dialogtitle" id="ststp-dialog-title">{title}</h2>
        <div className="ststp__dialogbody">
          <p className="ststp__dialogtext" id="ststp-dialog-desc">{message}</p>
        </div>
        <div className="ststp__dialogactions">
          <button type="button" className="ststp__dlgbtn ststp__dlgbtn--text" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="ststp__dlgbtn ststp__dlgbtn--error" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StStoragePlayers({
  realm = "magma.dcl.eth",
  position = null,
  players = PLAYERS,
  profileNames = PROFILE_NAMES,
  isLoading = false
}) {
  const [query, setQuery] = useState("");
  const [clearOpen, setClearOpen] = useState(false);

  const playerAddresses = useMemo(() => players ?? [], [players]);

  const filteredPlayers = useMemo(() => {
    if (!query.trim()) return playerAddresses;
    const needle = query.trim().toLowerCase();
    return playerAddresses.filter((address) => {
      if (address.toLowerCase().includes(needle)) return true;
      const name = profileNames.get(address.toLowerCase());
      return name ? name.toLowerCase().includes(needle) : false;
    });
  }, [playerAddresses, query, profileNames]);

  const hasPlayers = playerAddresses.length > 0;

  return (
    <SitesChrome active="create">
      <div className="ststp">
        <StorageLayout realm={realm} position={position} active="players">
          <div className="ststp__sectionhead">
            <h2 className="ststp__title">Player Storage</h2>
            {hasPlayers ? (
              <button type="button" className="ststp__clearbtn" onClick={() => setClearOpen(true)}>
                <DeleteSweepIcon className="ststp__clearicon" />
                <span>Clear All Players</span>
              </button>
            ) : null}
          </div>

          <p className="ststp__desc">Browse players with stored data, or search by name or address.</p>

          <SearchField
            value={query}
            onChange={setQuery}
            onClear={() => setQuery("")}
            placeholder="Search by name or address…"
          />

          {isLoading ? (
            <div className="ststp__loading">
              <span className="ststp__spinner" role="status" aria-label="Loading players" />
            </div>
          ) : filteredPlayers.length === 0 ? (
            <p className="ststp__empty">
              {query ? `No results for "${query}"` : "No players found"}
            </p>
          ) : (
            <div className="ststp__grid">
              {filteredPlayers.map((address) => (
                <PlayerCard
                  key={address}
                  address={address}
                  displayName={profileNames.get(address.toLowerCase())}
                  onClick={() => {}}
                />
              ))}
            </div>
          )}

          <ConfirmDialog
            open={clearOpen}
            title="Clear All Player Storage"
            message="Are you sure you want to delete ALL player storage data? This action cannot be undone."
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            onConfirm={() => setClearOpen(false)}
            onCancel={() => setClearOpen(false)}
          />
        </StorageLayout>
      </div>
    </SitesChrome>
  );
}

export { PLAYERS, PROFILE_NAMES, truncateAddress };
