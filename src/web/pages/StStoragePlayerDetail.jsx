import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./ststorageplayerdetail.css";

const COPY = {
  back: "Back",
  position: "Position",
  envTab: "Environment",
  sceneTab: "Scene",
  playerTab: "Player",
  backToPlayers: "Back to players",
  keysFor: (address) => `Keys for ${address}`,
  add: "Add",
  clearThisPlayer: "Clear this player",
  noKeys: "No keys found for this player",
  loadingKeys: "Loading player keys",
  key: "Key",
  actions: "Actions",
  addDialogTitle: "Add Player Value",
  addAddressLabel: "Player Address",
  addKeyLabel: "Key",
  addValueLabel: "Value",
  addValuePlaceholder: "Plain text or JSON: { … }",
  editDialogTitle: (key) => `Edit Value: ${key}`,
  editSubtitle: (address) => `Player: ${address}`,
  editValueLabel: "Value",
  deleteDialogTitle: "Delete Player Value",
  deleteDialogMessage: (key, address) =>
    `Are you sure you want to delete the value "${key}" for player "${address}"? This action cannot be undone.`,
  clearDialogTitle: "Clear Player Storage",
  clearDialogMessage: (address) =>
    `Are you sure you want to delete ALL values for player "${address}"? This action cannot be undone.`,
  save: "Save",
  cancel: "Cancel",
  confirm: "Confirm",
};

function truncateAddress(address) {
  if (!address || address.length <= 10) return address || "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const DEFAULT_ADDRESS = "0x9aBc1234De56789F0aBc1234De56789F0aBc1234";
const DEFAULT_KEYS = [
  { key: "inventory" },
  { key: "quest_progress" },
  { key: "settings" },
  { key: "last_position" },
  { key: "achievements" },
];

const ArrowBackIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </svg>
);
const FmdGoodIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M12 2c3.86 0 7 3.14 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.86 3.14-7 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z"
    />
  </svg>
);
const SettingsIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M19.14 12.94a7.49 7.49 0 0 0 .05-.94 7.49 7.49 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.62l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.49.49 0 0 0-.49-.42h-3.84a.49.49 0 0 0-.49.42l-.36 2.54a7 7 0 0 0-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.74 8.86a.5.5 0 0 0 .12.62l2.03 1.58a7.49 7.49 0 0 0 0 1.88l-2.03 1.58a.5.5 0 0 0-.12.62l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96a7 7 0 0 0 1.62.94l.36 2.54a.49.49 0 0 0 .49.42h3.84a.49.49 0 0 0 .49-.42l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.62l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"
    />
  </svg>
);
const ViewInArIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M3 5.27v13.46a1 1 0 0 0 .51.87l8 4.5a1 1 0 0 0 .98 0l8-4.5a1 1 0 0 0 .51-.87V5.27a1 1 0 0 0-.51-.87l-8-4.5a1 1 0 0 0-.98 0l-8 4.5A1 1 0 0 0 3 5.27zM12 2.15 18.5 5.8 12 9.45 5.5 5.8 12 2.15zM5 7.53l6 3.37v7.55l-6-3.37V7.53zm14 0v7.55l-6 3.37V10.9l6-3.37z"
    />
  </svg>
);
const PeopleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
    />
  </svg>
);
const AddIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
const DeleteSweepIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12V5z"
    />
  </svg>
);
const EditIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
  </svg>
);
const DeleteIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);

const STORAGE_TABS = [
  { value: "env", label: COPY.envTab, icon: <SettingsIcon /> },
  { value: "scene", label: COPY.sceneTab, icon: <ViewInArIcon /> },
  { value: "players", label: COPY.playerTab, icon: <PeopleIcon /> },
];

function StorageLayout({ realm, position, activeTab = "players", children }) {
  const scopeLabel = realm ?? position ?? "";
  return (
    <div className="stplayer__layout">
      <div className="stplayer__header">
        <button type="button" className="stplayer__backbtn" aria-label={COPY.back}>
          <ArrowBackIcon />
          <span className="stplayer__body2">{COPY.back}</span>
        </button>
        {scopeLabel ? (
          <div className="stplayer__scoperow">
            <span className="stplayer__scopechip">
              <FmdGoodIcon />
              <span className="stplayer__scopelabel">{scopeLabel}</span>
            </span>
            {realm && position ? (
              <span className="stplayer__caption">
                {COPY.position}: {position}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="stplayer__tabsroot">
        <div className="stplayer__tabs" role="tablist" aria-label="storage sections">
          {STORAGE_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={tab.value === activeTab}
              className={"stplayer__tab" + (tab.value === activeTab ? " is-active" : "")}
            >
              <span className="stplayer__tabicon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

function KeyTable({ keys, emptyLabel, onEdit, onDelete }) {
  if (keys.length === 0) {
    return (
      <div className="stplayer__paper stplayer__emptypaper">
        <span className="stplayer__emptytext">{emptyLabel}</span>
      </div>
    );
  }
  return (
    <div className="stplayer__paper stplayer__tablecontainer">
      <table className="stplayer__table">
        <thead>
          <tr>
            <th className="stplayer__th">{COPY.key}</th>
            <th className="stplayer__th stplayer__th--right">{COPY.actions}</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((item) => (
            <tr key={item.key} className="stplayer__row">
              <td className="stplayer__td">{item.key}</td>
              <td className="stplayer__td stplayer__td--right">
                <button
                  type="button"
                  className="stplayer__iconbtn stplayer__iconbtn--primary"
                  aria-label={`edit ${item.key}`}
                  onClick={() => onEdit(item.key)}
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className="stplayer__iconbtn stplayer__iconbtn--error"
                  aria-label={`delete ${item.key}`}
                  onClick={() => onDelete(item.key)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dialog({ open, onClose, maxWidth = "sm", children, labelledBy }) {
  if (!open) return null;
  return (
    <div className="stplayer__backdrop" onClick={onClose}>
      <div
        className={"stplayer__dialog stplayer__dialog--" + maxWidth}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function PlayerAddDialog({ open, address, onClose }) {
  const [newKey, setNewKey] = useState("");
  const [value, setValue] = useState("");
  const canSave = newKey.trim().length > 0 && value.trim().length > 0;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" labelledBy="stplayer-add-title">
      <h3 className="stplayer__dialogtitle" id="stplayer-add-title">
        {COPY.addDialogTitle}
      </h3>
      <div className="stplayer__dialogcontent">
        <label className="stplayer__field stplayer__field--disabled">
          <span className="stplayer__fieldlabel">{COPY.addAddressLabel}</span>
          <input className="stplayer__input" value={address} disabled />
        </label>
        <label className="stplayer__field">
          <span className="stplayer__fieldlabel">{COPY.addKeyLabel}</span>
          <input
            className="stplayer__input"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            autoFocus
          />
        </label>
        <label className="stplayer__field">
          <span className="stplayer__fieldlabel">{COPY.addValueLabel}</span>
          <textarea
            className="stplayer__input stplayer__textarea"
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={COPY.addValuePlaceholder}
          />
        </label>
      </div>
      <div className="stplayer__dialogactions">
        <button type="button" className="stplayer__btn stplayer__btn--text" onClick={onClose}>
          {COPY.cancel}
        </button>
        <button
          type="button"
          className="stplayer__btn stplayer__btn--contained"
          disabled={!canSave}
        >
          {COPY.save}
        </button>
      </div>
    </Dialog>
  );
}

function PlayerEditDialog({ open, address, keyName, onClose }) {
  const [value, setValue] = useState('{\n  "level": 12,\n  "xp": 4820\n}');
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" labelledBy="stplayer-edit-title">
      <h3 className="stplayer__dialogtitle" id="stplayer-edit-title">
        {COPY.editDialogTitle(keyName)}
      </h3>
      <div className="stplayer__dialogcontent">
        <p className="stplayer__dialogsub">{COPY.editSubtitle(truncateAddress(address))}</p>
        <label className="stplayer__field">
          <span className="stplayer__fieldlabel">{COPY.editValueLabel}</span>
          <textarea
            className="stplayer__input stplayer__textarea stplayer__textarea--tall"
            rows={12}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </label>
      </div>
      <div className="stplayer__dialogactions">
        <button type="button" className="stplayer__btn stplayer__btn--text" onClick={onClose}>
          {COPY.cancel}
        </button>
        <button type="button" className="stplayer__btn stplayer__btn--contained">
          {COPY.save}
        </button>
      </div>
    </Dialog>
  );
}

function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" labelledBy="stplayer-confirm-title">
      <h3 className="stplayer__dialogtitle" id="stplayer-confirm-title">
        {title}
      </h3>
      <div className="stplayer__dialogcontent">
        <p className="stplayer__dialogtext">{message}</p>
      </div>
      <div className="stplayer__dialogactions">
        <button type="button" className="stplayer__btn stplayer__btn--text" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button type="button" className="stplayer__btn stplayer__btn--contained stplayer__btn--error">
          {confirmLabel}
        </button>
      </div>
    </Dialog>
  );
}

export default function StStoragePlayerDetail({
  address = DEFAULT_ADDRESS,
  realm = "main",
  position = "0,0",
  keys = DEFAULT_KEYS,
  isLoading = false,
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [deleteKey, setDeleteKey] = useState(null);
  const [clearOpen, setClearOpen] = useState(false);

  const shortAddress = useMemo(() => truncateAddress(address), [address]);
  const hasKeys = (keys?.length ?? 0) > 0;

  return (
    <SitesChrome active="create">
      <div className="stplayer">
        <StorageLayout realm={realm} position={position} activeTab="players">
          <div className="stplayer__backwrap">
            <button type="button" className="stplayer__backlink" aria-label={COPY.backToPlayers}>
              <ArrowBackIcon width="18" height="18" />
              <span className="stplayer__body2">{COPY.backToPlayers}</span>
            </button>
          </div>

          <div className="stplayer__sectionheader">
            <h2 className="stplayer__h2">{COPY.keysFor(shortAddress)}</h2>
            <div className="stplayer__actions">
              <button
                type="button"
                className="stplayer__btn stplayer__btn--contained stplayer__btn--withicon"
                onClick={() => setAddOpen(true)}
              >
                <AddIcon />
                {COPY.add}
              </button>
              {hasKeys ? (
                <button
                  type="button"
                  className="stplayer__btn stplayer__btn--outlined stplayer__btn--erroroutline stplayer__btn--withicon"
                  onClick={() => setClearOpen(true)}
                >
                  <DeleteSweepIcon />
                  {COPY.clearThisPlayer}
                </button>
              ) : null}
            </div>
          </div>

          {isLoading ? (
            <div className="stplayer__loading">
              <span className="stplayer__spinner" role="status" aria-label={COPY.loadingKeys} />
            </div>
          ) : (
            <KeyTable
              keys={keys ?? []}
              emptyLabel={COPY.noKeys}
              onEdit={setEditKey}
              onDelete={setDeleteKey}
            />
          )}

          <PlayerAddDialog open={addOpen} address={address} onClose={() => setAddOpen(false)} />
          {editKey ? (
            <PlayerEditDialog open address={address} keyName={editKey} onClose={() => setEditKey(null)} />
          ) : null}
          <ConfirmDialog
            open={Boolean(deleteKey)}
            title={COPY.deleteDialogTitle}
            message={COPY.deleteDialogMessage(deleteKey ?? "", shortAddress)}
            confirmLabel={COPY.confirm}
            cancelLabel={COPY.cancel}
            onCancel={() => setDeleteKey(null)}
          />
          <ConfirmDialog
            open={clearOpen}
            title={COPY.clearDialogTitle}
            message={COPY.clearDialogMessage(shortAddress)}
            confirmLabel={COPY.confirm}
            cancelLabel={COPY.cancel}
            onCancel={() => setClearOpen(false)}
          />
        </StorageLayout>
      </div>
    </SitesChrome>
  );
}

export { DEFAULT_KEYS, DEFAULT_ADDRESS, truncateAddress };
