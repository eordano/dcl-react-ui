import { useState } from "react";
import "./chworldpermissionstabbedsections.css";

const COPY = {
  title: (worldName) => `Permissions - ${worldName}`,
  tabs: { access: "Access", collaborators: "Collaborators" },
  access: {
    title: "Manage who can access your World",
    type: {
      public: "Public",
      invitation_only: "Invitation only",
      password_protected: "Password protected",
      public_description: "Anyone can access this world",
      invitation_only_description:
        "Only addresses and communities included in the whitelist can join.",
      password_protected_description:
        "Only users who know the access password can join",
    },
    approved_addresses: (n) => `Approved Addresses: ${n}`,
    new_invite: "New Invite",
    clear_list: "Clear List",
    empty_list: "You haven't approved any addresses yet",
    remove: "Remove",
  },
  collaborators: {
    description:
      "Add up to 100 collaborators and manage their permission to deploy, or stream into your World.",
    column_name_label: (n) => `Collaborators: ${n}`,
    add: "Add",
    clear_list: "Clear List",
    empty_list: "You haven't added any collaborators yet",
    deployment: {
      world_wide: "All Parcels",
      parcels: "Custom Coordinates",
      none: "None",
    },
    parcels_count: (n) => `${n} Parcels`,
  },
  parcels: {
    title: "Custom Coordinates",
    description: "Click individual tiles to include/exclude them in the layout.",
    parcels_count: (n) =>
      `Selecting ${n} ${n === 1 ? "parcel" : "parcels"}`,
    discard: "Discard",
    confirm: "Confirm",
  },
  roles: { owner: "Owner", collaborator: "Collaborator" },
};

const MAX_COLLABORATORS = 100;

const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
    />
  </svg>
);
const PublicIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
    />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.59 13.59L12 13.41l-3.59 3.59-1.42-1.41L10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12l3.59 3.59-1.41 1.41z"
    />
  </svg>
);
const AddIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);
const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  </svg>
);
const ArrowBackIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
    />
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" className="chwp__chevron" aria-hidden="true">
    <path fill="currentColor" d="M7 10l5 5 5-5z" />
  </svg>
);

const shorten = (addr) =>
  addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

const hueFor = (addr) => {
  let h = 0;
  for (let i = 0; i < addr.length; i++) h = (h * 31 + addr.charCodeAt(i)) % 360;
  return h;
};

function AvatarInfo({ value, name }) {
  return (
    <div className="chwp__avatar">
      <span
        className="chwp__face u-avatar"
        style={{ "--sz": "32px", "--hue": hueFor(value) }}
      />
      <span className="chwp__paragraph">
        {name && <span className="chwp__name">{name}</span>}
        <span className="chwp__addr">{shorten(value)}</span>
      </span>
    </div>
  );
}

function PermissionRow({ value, name, role, control, onRemove }) {
  const roleLabel =
    role === "owner"
      ? COPY.roles.owner
      : role === "collaborator"
        ? COPY.roles.collaborator
        : null;
  return (
    <div className={"chwp__item" + (control ? " chwp__item--collab" : "")}>
      <div className="chwp__iteminfo">
        <AvatarInfo value={value} name={name} />
        {roleLabel && <span className="chwp__badge">{roleLabel}</span>}
      </div>
      <div className="chwp__itemcontrol">{control}</div>
      {onRemove ? (
        <button
          type="button"
          className="chwp__rowmenu"
          aria-label={COPY.access.remove}
          onClick={onRemove}
        >
          <DeleteIcon />
        </button>
      ) : (
        <span className="chwp__rowmenu chwp__rowmenu--empty" />
      )}
    </div>
  );
}

const ACCESS_TYPE_OPTIONS = [
  {
    value: "unrestricted",
    label: COPY.access.type.public,
    icon: <PublicIcon />,
    description: COPY.access.type.public_description,
  },
  {
    value: "allow-list",
    label: COPY.access.type.invitation_only,
    icon: <LockIcon />,
    description: COPY.access.type.invitation_only_description,
  },
  {
    value: "shared-secret",
    label: COPY.access.type.password_protected,
    icon: <LockIcon />,
    description: COPY.access.type.password_protected_description,
  },
];

function AccessTab({ ownerAddress, wallets }) {
  const [accessType, setAccessType] = useState("allow-list");
  const [list, setList] = useState(wallets);
  const current = ACCESS_TYPE_OPTIONS.find((o) => o.value === accessType);
  const isInvitationOnly = accessType === "allow-list";
  const total = list.length;

  return (
    <div className={"chwp__accesstab" + (accessType !== "unrestricted" ? " is-restricted" : "")}>
      <h6 className="chwp__sectiontitle">{COPY.access.title}</h6>

      <div className="chwp__accesstyperow">
        <div className="chwp__select">
          <select
            className="chwp__nativeselect"
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            aria-label="Access type"
          >
            {ACCESS_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="chwp__selectvalue">
            {current.icon}
            {current.label}
          </span>
          <ChevronIcon />
        </div>
        <p className="chwp__accessdesc">{current.description}</p>
      </div>

      {isInvitationOnly && (
        <div className="chwp__accessform">
          <div className="chwp__listheader">
            <span className="chwp__approvedcount">
              {COPY.access.approved_addresses(total)}
            </span>
            <div className="chwp__listactions">
              <button type="button" className="chwp__textlink">
                {COPY.access.clear_list}
              </button>
              <button type="button" className="chwp__btn chwp__btn--primary chwp__btn--icon">
                <AddIcon />
                {COPY.access.new_invite}
              </button>
            </div>
          </div>

          <div className="chwp__list">
            {[ownerAddress, ...list.map((w) => w.address)].length === 0 ? (
              <p className="chwp__emptylist">{COPY.access.empty_list}</p>
            ) : (
              <>
                <PermissionRow
                  value={ownerAddress}
                  name="WorldOwner.dcl.eth"
                  role="owner"
                />
                {list.map((w) => (
                  <PermissionRow
                    key={w.address}
                    value={w.address}
                    name={w.name}
                    role={w.role}
                    onRemove={
                      w.role
                        ? undefined
                        : () =>
                            setList((prev) =>
                              prev.filter((x) => x.address !== w.address),
                            )
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DeploymentSelect({ value, parcelsCount, onPickParcels }) {
  const renderLabel =
    value === "none"
      ? COPY.collaborators.deployment.none
      : value === "parcels"
        ? COPY.collaborators.parcels_count(parcelsCount)
        : COPY.collaborators.deployment.world_wide;
  return (
    <div className="chwp__deployselect">
      <select
        className="chwp__nativeselect"
        value={value}
        onChange={(e) => {
          if (e.target.value === "parcels") onPickParcels?.();
        }}
        aria-label="Deployment scope"
      >
        <option value="world-wide">{COPY.collaborators.deployment.world_wide}</option>
        <option value="parcels">{COPY.collaborators.deployment.parcels}</option>
        {value === "none" && (
          <option value="none">{COPY.collaborators.deployment.none}</option>
        )}
      </select>
      <span className="chwp__deployvalue">{renderLabel}</span>
      <ChevronIcon />
    </div>
  );
}

function CollaboratorsTab({ ownerAddress, collaborators, onPickParcels }) {
  const count = collaborators.length;
  if (count === 0) {
    return (
      <div className="chwp__collabtab">
        <p className="chwp__collabdesc">
          <span>Add up to 100 collaborators</span> and manage their permission to
          deploy, or stream into your World.
        </p>
        <div className="chwp__emptystate">
          <p>{COPY.collaborators.empty_list}</p>
          <button type="button" className="chwp__btn chwp__btn--primary chwp__btn--icon">
            <AddIcon />
            {COPY.collaborators.add}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="chwp__collabtab">
      <p className="chwp__collabdesc">
        <span>Add up to 100 collaborators</span> and manage their permission to
        deploy, or stream into your World.
      </p>
      <div className="chwp__collablist">
        <div className="chwp__collabheaderrow">
          <span className="chwp__collabheadertitle">
            {COPY.collaborators.column_name_label(`${count}/${MAX_COLLABORATORS}`)}
          </span>
          <button type="button" className="chwp__textlink">
            {COPY.collaborators.clear_list}
          </button>
          <button type="button" className="chwp__btn chwp__btn--primary chwp__btn--icon">
            <AddIcon />
            {COPY.collaborators.add}
          </button>
        </div>
        <PermissionRow
          value={ownerAddress}
          name="WorldOwner.dcl.eth"
          role="owner"
        />
        {collaborators.map((c) => (
          <PermissionRow
            key={c.address}
            value={c.address}
            name={c.name}
            role="collaborator"
            onRemove={() => {}}
            control={
              <DeploymentSelect
                value={c.deployment}
                parcelsCount={c.parcelsCount}
                onPickParcels={() => onPickParcels(c)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}

function ParcelsTab({ collaborator, onGoBack }) {
  const SIZE = 9;
  const [selected, setSelected] = useState(() => {
    const s = new Set();
    for (let x = 3; x <= 5; x++) for (let y = 3; y <= 4; y++) s.add(`${x},${y}`);
    return s;
  });
  const [dirty, setDirty] = useState(false);

  const toggle = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setDirty(true);
  };

  return (
    <div className="chwp__parcelstab">
      <div className="chwp__parcelheader">
        <button
          type="button"
          className="chwp__back"
          aria-label="Go back"
          onClick={onGoBack}
        >
          <ArrowBackIcon />
        </button>
        <h6 className="chwp__sectiontitle">{COPY.parcels.title}</h6>
      </div>
      <p className="chwp__parceldesc">{COPY.parcels.description}</p>

      <div className="chwp__atlas">
        <div className="chwp__atlasfloating">
          <AvatarInfo value={collaborator.address} name={collaborator.name} />
        </div>
        <div
          className="chwp__grid"
          style={{ "--cols": SIZE }}
        >
          {Array.from({ length: SIZE * SIZE }).map((_, i) => {
            const x = i % SIZE;
            const y = Math.floor(i / SIZE);
            const key = `${x},${y}`;
            const on = selected.has(key);
            return (
              <button
                key={key}
                type="button"
                className={"chwp__tile" + (on ? " is-selected" : "")}
                aria-pressed={on}
                onClick={() => toggle(key)}
              />
            );
          })}
        </div>
      </div>

      <div className="chwp__parcelactions">
        {dirty && (
          <button type="button" className="chwp__btn chwp__btn--outlined">
            {COPY.parcels.discard}
          </button>
        )}
        <span className="chwp__parcelcount">
          {COPY.parcels.parcels_count(selected.size)}
        </span>
        <button
          type="button"
          className="chwp__btn chwp__btn--primary chwp__savebtn"
          disabled={!dirty}
          onClick={onGoBack}
        >
          {COPY.parcels.confirm}
        </button>
      </div>
    </div>
  );
}

const TABS = [
  { value: "access", label: COPY.tabs.access },
  { value: "collaborators", label: COPY.tabs.collaborators },
];

export default function ChWorldPermissionsTabbedSections({
  open = true,
  worldName = "myworld.dcl.eth",
  initialTab = "access",
  onClose = () => {},
  ownerAddress = "0x9f3c2b1d4e5a6f7081920a3b4c5d6e7f80a1b2c3",
  accessWallets = [
    { address: "0x2a8b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", name: "DesignLead.dcl.eth", role: "collaborator" },
    { address: "0x71c0ffee00d34dbeefcafe1234567890abcdef12", name: "alice.eth" },
    { address: "0x4b22f3a91d0e8c7b6a5f4e3d2c1b0a9f8e7d6c5b" },
    { address: "0x88aa77bb66cc55dd44ee33ff2211009988776655", name: "bob.eth" },
  ],
  collaborators = [
    { address: "0x2a8b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", name: "DesignLead.dcl.eth", deployment: "world-wide", parcelsCount: 0 },
    { address: "0x55de01ab23cd45ef67ab89cd01ef23ab45cd67ef", name: "builder.eth", deployment: "parcels", parcelsCount: 6 },
    { address: "0xc0ffee2548cafe9876543210fedcba0123456789", deployment: "none", parcelsCount: 0 },
  ],
}) {
  const [activeTab, setActiveTab] = useState(
    initialTab === "parcels" ? "collaborators" : initialTab,
  );
  const [parcelsFor, setParcelsFor] = useState(
    initialTab === "parcels" ? collaborators[1] : null,
  );

  if (!open) return null;

  const showParcels = activeTab === "collaborators" && parcelsFor;

  return (
    <div className="chwp" role="presentation">
      <div
        className="chwp__paper"
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title(worldName)}
      >
        <div className="chwp__header">
          <div className="chwp__headertitle">
            <LockIcon />
            <span className="chwp__title">{COPY.title(worldName)}</span>
          </div>
          <button
            type="button"
            className="chwp__close"
            aria-label="close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="chwp__layout">
          <div className="chwp__tabs" role="tablist" aria-orientation="vertical">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.value}
                className={
                  "chwp__tab" + (activeTab === tab.value ? " is-selected" : "")
                }
                onClick={() => {
                  setActiveTab(tab.value);
                  setParcelsFor(null);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="chwp__content">
            {activeTab === "access" && (
              <AccessTab ownerAddress={ownerAddress} wallets={accessWallets} />
            )}
            {activeTab === "collaborators" &&
              (showParcels ? (
                <ParcelsTab
                  collaborator={parcelsFor}
                  onGoBack={() => setParcelsFor(null)}
                />
              ) : (
                <CollaboratorsTab
                  ownerAddress={ownerAddress}
                  collaborators={collaborators}
                  onPickParcels={(c) => setParcelsFor(c)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
