import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./stwhatsonadminusers.css";

const COLUMNS = [
  { key: "approve_own_event", label: "Approve Own Hangouts", modalDesc: "Allow this user to approve hangouts they create" },
  { key: "approve_any_event", label: "Approve Hangouts", modalDesc: "Allow this user to approve any hangout" },
  { key: "edit_any_event", label: "Edit Hangouts", modalDesc: "Allow this user to edit any hangout" },
  { key: "edit_any_profile", label: "Edit Users", modalDesc: "Allow this user to manage admin permissions" },
];

const USERS = [
  { user: "0x3c1f8a92b4e6d70f5a9c2e18b3d47e60a1f29c8d", name: "vegascitydao", permissions: ["approve_own_event", "approve_any_event", "edit_any_event", "edit_any_profile"], hue: 268 },
  { user: "0x7e4b21d9f0a3c65e8b1d72f04a6c98e3b5d710a2", name: "governance.dcl", permissions: ["approve_any_event", "edit_any_event"], hue: 30 },
  { user: "0xab09f3e2c7d145896b0e4a2f81c63d70e5a9b218", name: "metaversefw", permissions: ["approve_own_event"], hue: 320 },
  { user: "0x12c8b7a04e6f93d2510a8c7e3b94f06d2a8e15c4", name: null, permissions: ["approve_any_event", "edit_any_event", "edit_any_profile"], hue: 200 },
  { user: "0x5f9a3d80c2e147b6e90a4f31d8b27c05a6e93f1b", name: "soundscape.dcl", permissions: ["approve_own_event", "approve_any_event"], hue: 264 },
  { user: "0x90e7c4a13b6d28f5019e3a7c41d80b62f5a9e034", name: "dragoncity.dcl", permissions: ["edit_any_event"], hue: 18 },
  { user: "0x2d6b18f9a04e7c35b1f8d20a96c43e07d5a8b921", name: null, permissions: ["approve_own_event"], hue: 130 },
  { user: "0xc41a8e07b39d62f5104e8a2c7b95f306d1a9e842", name: "cryptoart.dcl", permissions: ["approve_any_event", "edit_any_event", "edit_any_profile"], hue: 48 },
  { user: "0x6b39d02a8c1e745f90b3e2a6c84d17f05e9a3b60", name: "hangouts.dcl", permissions: ["approve_own_event", "approve_any_event", "edit_any_event"], hue: 96 },
  { user: "0x83f0a91c5d2e647b8f10a3c7e29d45b06f1a8e93", name: null, permissions: ["edit_any_profile"], hue: 210 },
  { user: "0x1a7c93e02b8d465f9013a6c2e74f80d5b9a3e168", name: "wonderzone.dcl", permissions: ["approve_own_event"], hue: 305 },
  { user: "0x47e2b08d9a3c165f0b8e4a1c7d92f306e5a9b740", name: "builders.dcl", permissions: ["approve_any_event", "edit_any_event"], hue: 160 },
];

const truncateAddress = (value) => (value.length > 12 ? `${value.slice(0, 6)}…${value.slice(-4)}` : value);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59Z" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z" />
  </svg>
);
const CaretDown = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M7 10l5 5 5-5H7Z" />
  </svg>
);

const ADMIN_TABS = [
  { id: "whats_on", label: "What's On" },
  { id: "pending", label: "Pending Hangouts" },
  { id: "users", label: "Users" },
];

function AdminTabsBar({ active = "users" }) {
  return (
    <div className="au-bar">
      <div className="au-bar__tabs" role="tablist">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === active}
            className={"au-bar__tab" + (tab.id === active ? " is-active" : "")}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="au-bar__cta">
        <button type="button" className="au-bar__create">+ Create Hangout</button>
      </div>
    </div>
  );
}

function AdminPermissionsModal({ mode, user, hue, initialPermissions, isSubmitting, onClose, onSubmit }) {
  const [address, setAddress] = useState(mode === "edit" ? user : "");
  const [permissions, setPermissions] = useState(initialPermissions);

  const addressIsValid = /^0x[a-fA-F0-9]{40}$/.test(address.trim());
  const addressHasInvalidFormat = address.length > 0 && !addressIsValid;
  const canSave = addressIsValid && !isSubmitting;

  const toggle = (key) =>
    setPermissions((prev) => (prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]));

  return (
    <div className="au-modal__backdrop" role="presentation" onClick={onClose}>
      <div className="au-modal" role="dialog" aria-modal="true" aria-label={mode === "edit" ? "Edit User" : "Add User"} onClick={(e) => e.stopPropagation()}>
        <div className="au-modal__title">
          <span>{mode === "edit" ? "Edit User" : "Add User"}</span>
          <button type="button" className="au-modal__close" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {mode === "edit" && user && (
          <div className="au-modal__header">
            <span className="au-modal__avatar u-avatar" style={{ "--sz": "56px", "--hue": hue }} aria-hidden="true" />
            <div className="au-modal__headertext">
              <span className="au-modal__name">{truncateAddress(user)}</span>
              <span className="au-modal__address u-truncate">{user}</span>
            </div>
          </div>
        )}

        <div className="au-modal__content">
          {mode === "add" && (
            <div className="au-field">
              <label className="au-field__label" htmlFor="au-wallet">Wallet Address</label>
              <input
                id="au-wallet"
                className={"au-field__input" + (addressHasInvalidFormat ? " is-error" : "")}
                placeholder="0x…"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-label="Wallet Address"
              />
              <span className={"au-field__help" + (addressHasInvalidFormat ? " is-error" : "")}>
                {addressHasInvalidFormat ? "Enter a valid Ethereum address" : " "}
              </span>
            </div>
          )}

          <div className="au-perms">
            {COLUMNS.map((col) => {
              const on = permissions.includes(col.key);
              return (
                <div className="au-perm" key={col.key}>
                  <div className="au-perm__meta">
                    <span className="au-perm__title">{col.label}</span>
                    <span className="au-perm__desc">{col.modalDesc}</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={col.label}
                    className={"au-switch" + (on ? " is-on" : "")}
                    onClick={() => toggle(col.key)}
                  >
                    <span className="au-switch__track" />
                    <span className="au-switch__thumb" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="au-modal__footer">
          <button type="button" className="au-btn au-btn--secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            type="button"
            className="au-btn au-btn--primary"
            onClick={() => onSubmit({ address: address.trim(), permissions })}
            disabled={!canSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function UserTableRow({ row, onClick }) {
  return (
    <tr className="au-row" onClick={onClick}>
      <td className="au-cell au-cell--user">
        <span className="au-avatar u-avatar" style={{ "--sz": "40px", "--hue": row.hue }} aria-hidden="true" />
        <span className="au-cell__addr">{row.user}</span>
        {row.name ? <span className="au-cell__name">{` (${row.name})`}</span> : null}
      </td>
      {COLUMNS.map((col) => (
        <td key={col.key} className="au-cell au-cell--center">
          {row.permissions.includes(col.key) ? (
            <span className="au-check" aria-label="enabled">
              <CheckIcon />
            </span>
          ) : null}
        </td>
      ))}
    </tr>
  );
}

export default function StWhatSOnAdminUsers({
  users = USERS,
  loading = false,
  initialFeedback = null,
}) {
  const [modalState, setModalState] = useState(null);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((row) => {
      if (row.user.toLowerCase().includes(q)) return true;
      return row.name ? row.name.toLowerCase().includes(q) : false;
    });
  }, [users, search]);

  const paginated = useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  const from = filtered.length === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(filtered.length, page * rowsPerPage + rowsPerPage);
  const lastPage = Math.max(0, Math.ceil(filtered.length / rowsPerPage) - 1);

  const handleSubmit = () => {
    setModalState(null);
    setFeedback({ message: "Permissions updated", severity: "success" });
  };

  return (
    <SitesChrome active="play">
      <div className="au">
        <AdminTabsBar active="users" />

        <div className="au__container">
          <h1 className="au__title">Users</h1>

          <div className="au__header">
            <div className="au__searchwrap">
              <span className="au__searchicon" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                className="au__search"
                placeholder="Type wallet address"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />
              <span className="au__searchlabel">Search</span>
            </div>
            <button
              type="button"
              className="au__adduser"
              onClick={() => setModalState({ mode: "add", permissions: [] })}
            >
              + Add User
            </button>
          </div>

          <div className="au__tablewrap">
            <table className="au__table" aria-label="Users">
              <thead>
                <tr>
                  <th className="au__th">User</th>
                  {COLUMNS.map((col) => (
                    <th key={col.key} className="au__th au__th--center">{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row) => (
                  <UserTableRow
                    key={row.user}
                    row={row}
                    onClick={() => setModalState({ mode: "edit", user: row.user, hue: row.hue, permissions: row.permissions })}
                  />
                ))}
                {!loading && paginated.length === 0 && (
                  <tr>
                    <td className="au-cell au-cell--center au-cell--empty" colSpan={COLUMNS.length + 1}>
                      No admins configured
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="au__pagination">
              <span className="au__pglabel">Rows per page:</span>
              <span className="au__pgselect">
                {rowsPerPage}
                <CaretDown />
              </span>
              <span className="au__pgcount">
                {from}–{to} of {filtered.length}
              </span>
              <button
                type="button"
                className="au__pgbtn"
                aria-label="Go to previous page"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className="au__pgbtn"
                aria-label="Go to next page"
                disabled={page >= lastPage}
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {modalState && (
          <AdminPermissionsModal
            mode={modalState.mode}
            user={modalState.user}
            hue={modalState.hue}
            initialPermissions={modalState.permissions}
            isSubmitting={false}
            onClose={() => setModalState(null)}
            onSubmit={handleSubmit}
          />
        )}

        {feedback && (
          <div className="au-snack" role="status" aria-live="polite">
            <div className={"au-alert au-alert--" + feedback.severity}>
              <span className="au-alert__icon" aria-hidden="true">
                <CheckIcon />
              </span>
              <span className="au-alert__msg">{feedback.message}</span>
              <button type="button" className="au-alert__close" aria-label="Close" onClick={() => setFeedback(null)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </SitesChrome>
  );
}
