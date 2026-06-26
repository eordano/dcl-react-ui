import { useMemo, useState } from "react";
import { ChevronLeft, ChevronDownAlt, Close } from "../../atoms/icons.jsx";
import "./chmodalworldpermissions.css";

const LockIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);
const PublicIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" stroke="currentColor" strokeWidth="1.7" fill="none" />
  </svg>
);
const AddIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="5" r="1.7" fill="currentColor" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    <circle cx="12" cy="19" r="1.7" fill="currentColor" />
  </svg>
);
const InfoIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M12 11v5M12 7.6v.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const FileIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WORLD_NAME = "mystore.dcl.eth";
const OWNER = "0x9f3c2b1a7d8e4c5f6a0b1c2d3e4f5a6b7c8d9e21";

const ACCESS_WALLETS = [
  OWNER,
  "0x4a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d",
  "0x12ab34cd56ef7890ab12cd34ef5678901234abcd",
  "0x778899aabbccddeeff00112233445566778899aa",
];
const ACCESS_COMMUNITIES = [
  { id: "aa11bb22-cc33-dd44-ee55-ff6677889900", name: "Wearable Wizards", membersCount: 248 },
  { id: "bb22cc33-dd44-ee55-ff66-7788990011aa", name: "DCL Builders Guild", membersCount: 1320 },
];

const COLLABORATORS = [
  { address: OWNER, role: "owner", deployment: "world_wide", streaming: true, parcels: 0 },
  { address: "0x4a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d", role: "collaborator", deployment: "world_wide", streaming: true, parcels: 0 },
  { address: "0x12ab34cd56ef7890ab12cd34ef5678901234abcd", role: "collaborator", deployment: "parcels", streaming: false, parcels: 6 },
  { address: "0x778899aabbccddeeff00112233445566778899aa", role: "collaborator", deployment: "none", streaming: true, parcels: 0 },
];

function shorten(addr) {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}
function hueOf(addr) {
  let h = 0;
  for (let i = 2; i < addr.length; i++) h = (h * 31 + addr.charCodeAt(i)) % 360;
  return h;
}

const ACCESS_TYPE_OPTIONS = [
  { value: "unrestricted", label: "Public", icon: <PublicIcon />, description: "Anyone can access this world" },
  { value: "allowList", label: "Invitation only", icon: <LockIcon size={16} />, description: "Only addresses and communities included in the whitelist can join." },
  { value: "sharedSecret", label: "Password protected", icon: <LockIcon size={16} />, description: "Only users who know the access password can join" },
];

function Avatar({ addr, size = 32 }) {
  return <span className="wp__avatar" style={{ "--sz": size + "px", "--hue": hueOf(addr) }} />;
}

function PermSelect({ value, children, className = "" }) {
  return (
    <button type="button" className={"wp__permselect " + className}>
      <span className="wp__permselectval">{value}</span>
      <ChevronDownAlt size={18} />
    </button>
  );
}

function PrimaryBtn({ children, icon, disabled }) {
  return (
    <button type="button" className="wp__btn wp__btn--primary" disabled={disabled}>
      {icon}
      {children}
    </button>
  );
}
function SecondaryBtn({ children }) {
  return <button type="button" className="wp__btn wp__btn--secondary">{children}</button>;
}
function LinkBtn({ children }) {
  return <button type="button" className="wp__linkbtn">{children}</button>;
}

function AvatarWithInfo({ addr, name, subtitle, icon }) {
  if (icon) {
    return (
      <div className="wp__avinfo">
        {icon}
        <span className="wp__paragraph">
          {name && <span className="wp__name">{name}</span>}
          {subtitle && <span>{subtitle}</span>}
        </span>
      </div>
    );
  }
  return (
    <div className="wp__avinfo">
      <Avatar addr={addr} />
      <span className="wp__paragraph">
        {name && <span className="wp__name">{name}</span>}
        <span>{shorten(addr)}</span>
      </span>
    </div>
  );
}

function AccessItem({ addr, role, name, subtitle, icon }) {
  return (
    <div className="wp__item">
      <div className="wp__iteminfo">
        <AvatarWithInfo addr={addr} name={name} subtitle={subtitle} icon={icon} />
        {role ? <span className="wp__rolebadge">{role === "owner" ? "Owner" : "Collaborator"}</span> : null}
      </div>
      <div />
      {role ? <div /> : (
        <button type="button" className="wp__moreicon" aria-label="actions"><MoreIcon /></button>
      )}
    </div>
  );
}

function CollaboratorItem({ c }) {
  const deployLabel =
    c.deployment === "world_wide" ? "All Parcels"
      : c.deployment === "parcels" ? c.parcels + " Parcels"
        : "None";
  return (
    <div className="wp__item wp__item--collab">
      <div className="wp__iteminfo">
        <AvatarWithInfo addr={c.address} />
        <span className="wp__rolebadge">{c.role === "owner" ? "Owner" : "Collaborator"}</span>
      </div>
      {c.role !== "owner" ? (
        <PermSelect value={deployLabel} className="wp__deployselect" />
      ) : <div />}
      {c.role !== "owner" ? (
        <button type="button" className="wp__moreicon" aria-label="actions"><MoreIcon /></button>
      ) : <div />}
    </div>
  );
}

function AccessDefault({ accessType }) {
  const isPublic = accessType === "unrestricted";
  const isAllowList = accessType === "allowList";
  const isPassword = accessType === "sharedSecret";
  const opt = ACCESS_TYPE_OPTIONS.find((o) => o.value === accessType) || ACCESS_TYPE_OPTIONS[1];

  const nonOwner = ACCESS_WALLETS.filter((w) => w !== OWNER);
  const totalInvited = ACCESS_WALLETS.length + ACCESS_COMMUNITIES.reduce((s, c) => s + c.membersCount, 0);

  return (
    <div className={"wp__accesstab" + (isPublic ? "" : " wp__accesstab--restricted")}>
      <h6 className="wp__sectiontitle">Manage who can access your World</h6>

      <div className="wp__accesstyperow">
        <PermSelect
          className="wp__accesstypeselect"
          value={<span className="wp__accesstypeval">{opt.icon}{opt.label}</span>}
        />
        <p className="wp__accesstypedesc">{opt.description}</p>
      </div>

      {isPassword && (
        <div className="wp__passwordsection">
          <PrimaryBtn>Change Password</PrimaryBtn>
        </div>
      )}

      {isAllowList && (
        <div className="wp__accessform">
          <div className="wp__accesslistheader">
            <h6 className="wp__approvedcount">
              Approved Addresses: {totalInvited}
              {totalInvited > 100 && <span className="wp__infoicon"><InfoIcon /></span>}
            </h6>
            <div className="wp__accesslistactions">
              <button type="button" className="wp__clearlist">Clear List</button>
              <PrimaryBtn icon={<AddIcon />}>New Invite</PrimaryBtn>
            </div>
          </div>

          <div className="wp__accesslist">
            <AccessItem addr={OWNER} role="owner" />
            <AccessItem addr={COLLABORATORS[1].address} role="collaborator" />
            {nonOwner
              .filter((w) => w !== COLLABORATORS[1].address)
              .map((w) => <AccessItem key={w} addr={w} />)}
            {ACCESS_COMMUNITIES.map((cm) => (
              <AccessItem
                key={cm.id}
                addr={cm.id}
                name={cm.name}
                subtitle={cm.membersCount + " Members"}
                icon={<span className="wp__communitythumb" style={{ "--hue": hueOf(cm.id) }} />}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AddUserForm({ inviteTab = "wallet" }) {
  const tabs = [
    { id: "wallet", label: "Wallet Address" },
    { id: "community", label: "Community" },
    { id: "csv", label: "Import CSV" },
  ];
  return (
    <div className="wp__centered">
      <div className="wp__adduserform">
        <h5 className="wp__formtitle">New Invite</h5>
        <div className="wp__formtabs">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              type="button"
              className={"wp__formtab" + (tb.id === inviteTab ? " is-active" : "")}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {inviteTab === "wallet" && (
          <div className="wp__textfield">
            <input placeholder="0x..." />
          </div>
        )}

        {inviteTab === "community" && (
          <div className="wp__communitysearch">
            <div className="wp__textfield wp__textfield--icon">
              <span className="wp__inputicon"><SearchIcon /></span>
              <input placeholder="Search for a community..." />
            </div>
            <div className="wp__communitydropdown">
              {ACCESS_COMMUNITIES.map((cm) => (
                <div key={cm.id} className="wp__communitydropitem">
                  {cm.name}{" "}
                  <span className="wp__communitydropmembers">({cm.membersCount} Members)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {inviteTab === "csv" && (
          <div className="wp__csv">
            <div className="wp__csvdrop">
              <p className="wp__csvdroptext">Drop your CSV file here or</p>
              <p className="wp__csvbrowse">Browse your device files</p>
            </div>
          </div>
        )}

        <div className="wp__formactions">
          <SecondaryBtn>Cancel</SecondaryBtn>
          <PrimaryBtn>Confirm</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function PasswordForm({ isChanging }) {
  return (
    <div className="wp__centered">
      <div className="wp__passwordform">
        <h5 className="wp__formtitle">{isChanging ? "Change Password" : "Create New Password"}</h5>

        <div className="wp__pwfield">
          <p className="wp__pwlabel">Type your password</p>
          <div className="wp__textfield wp__textfield--icon-end">
            <input type="password" defaultValue="••••••••" />
            <span className="wp__inputicon wp__inputicon--end"><EyeIcon /></span>
          </div>
        </div>

        <div className="wp__pwfield">
          <p className="wp__pwlabel">Repeat your password</p>
          <div className="wp__textfield wp__textfield--icon-end">
            <input type="password" defaultValue="••••••••" />
            <span className="wp__inputicon wp__inputicon--end"><EyeIcon /></span>
          </div>
        </div>

        <div className="wp__pwinfo">
          <InfoIcon size={18} />
          <span>Make sure to write down your password so you don't lose it!</span>
        </div>

        <div className="wp__formactions">
          <SecondaryBtn>Cancel</SecondaryBtn>
          <PrimaryBtn>Confirm</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function ConfirmationPanel({ title, warning, cancelLabel, confirmLabel }) {
  return (
    <div className="wp__centered">
      <div className="wp__confirmpanel">
        <h5 className="wp__confirmtitle">{title}</h5>
        <p className="wp__confirmwarning">{warning}</p>
        <div className="wp__formactions">
          <SecondaryBtn>{cancelLabel}</SecondaryBtn>
          <PrimaryBtn>{confirmLabel}</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function CollaboratorsDefault() {
  const count = COLLABORATORS.length;
  return (
    <div className="wp__collabtab">
      <h6 className="wp__collabdesc">
        <span>Add up to 100 collaborators</span> and manage their permission to deploy, or stream into your World.
      </h6>

      <div className="wp__collablist">
        <div className="wp__collabheader">
          <h6>Collaborators: {count}/100</h6>
          <button type="button" className="wp__clearlist">Clear List</button>
          <PrimaryBtn icon={<AddIcon />}>Add</PrimaryBtn>
        </div>
        {COLLABORATORS.map((c) => <CollaboratorItem key={c.address} c={c} />)}
      </div>
    </div>
  );
}

function CollaboratorsEmpty() {
  return (
    <div className="wp__collabtab">
      <h6 className="wp__collabdesc">
        <span>Add up to 100 collaborators</span> and manage their permission to deploy, or stream into your World.
      </h6>
      <div className="wp__emptystate">
        <p>You haven't added any collaborators yet</p>
        <PrimaryBtn icon={<AddIcon />}>Add</PrimaryBtn>
      </div>
    </div>
  );
}

function AddCollaboratorDialog() {
  return (
    <div className="wp__centered">
      <div className="wp__addcollab">
        <h5 className="wp__formtitle">Add Collaborator</h5>
        <div className="wp__textfield">
          <input placeholder="0x..." />
        </div>
        <div className="wp__formactions">
          <SecondaryBtn>Cancel</SecondaryBtn>
          <PrimaryBtn>Confirm</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function AtlasStub() {
  const cells = [];
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 22; c++) {
      const owned = (r + c) % 6 === 0 || (r * c) % 11 === 0;
      const selected = (r >= 3 && r <= 5) && (c >= 9 && c <= 11);
      cells.push(
        <div
          key={r + "-" + c}
          className={"wp__parcel" + (owned ? " is-owned" : "") + (selected ? " is-selected" : "")}
        />
      );
    }
  }
  return (
    <div className="wp__atlas">
      <div className="wp__atlasgrid">{cells}</div>
      <div className="wp__atlasfloat">
        <AvatarWithInfo addr={COLLABORATORS[2].address} />
      </div>
    </div>
  );
}

function ParcelsTab() {
  return (
    <div className="wp__parcelstab">
      <div className="wp__parcelsheader">
        <button type="button" className="wp__parcelsback" aria-label="back"><ChevronLeft size={24} /></button>
        <h6>Custom Coordinates</h6>
      </div>
      <p className="wp__parcelsdesc">Click individual tiles to include/exclude them in the layout.</p>
      <AtlasStub />
      <div className="wp__parcelsactions">
        <SecondaryBtn>Discard</SecondaryBtn>
        <span className="wp__parcelscount">Selecting 9 parcels</span>
        <PrimaryBtn>Confirm</PrimaryBtn>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="wp__loader">
      <span className="wp__spinner" aria-hidden="true" />
    </div>
  );
}

export default function ChModalWorldPermissions({
  tab = "access",
  view = "default",
  accessType = "allowList",
  inviteTab = "wallet",
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState(tab);
  const isParcels = tab === "collaborators" && view === "parcels";

  const TABS = [
    { value: "access", label: "Access" },
    { value: "collaborators", label: "Collaborators" },
  ];

  const body = useMemo(() => {
    if (loading) return <Loader />;

    if (tab === "access") {
      switch (view) {
        case "invite_form":
          return <AddUserForm inviteTab={inviteTab} />;
        case "password_form":
          return <PasswordForm isChanging={accessType === "sharedSecret"} />;
        case "clear_list_confirm":
          return (
            <ConfirmationPanel
              title="Clear List?"
              warning="If you continue, your list of approved addresses will be erased."
              cancelLabel="Cancel"
              confirmLabel="Confirm"
            />
          );
        case "change_access_type_confirm":
          return (
            <ConfirmationPanel
              title="Change access type?"
              warning="If you switch world access type, your list of approved addresses will be erased."
              cancelLabel="Cancel"
              confirmLabel="Continue"
            />
          );
        default:
          return <AccessDefault accessType={accessType} />;
      }
    }

    switch (view) {
      case "add":
        return <AddCollaboratorDialog />;
      case "clear_confirmation":
        return (
          <ConfirmationPanel
            title="Clear List?"
            warning="If you continue, your list of collaborators will be erased."
            cancelLabel="Cancel"
            confirmLabel="Confirm"
          />
        );
      case "empty":
        return <CollaboratorsEmpty />;
      case "parcels":
        return <ParcelsTab />;
      default:
        return <CollaboratorsDefault />;
    }
  }, [tab, view, accessType, inviteTab, loading]);

  return (
    <div className="wp__backdrop">
      <div className="wp__modal" role="dialog" aria-modal="true" aria-label="World permissions">
        <header className="wp__header">
          <div className="wp__headertitle">
            <LockIcon />
            <h6>Permissions - {WORLD_NAME}</h6>
          </div>
          <button type="button" className="wp__close" aria-label="close"><Close size={22} /></button>
        </header>

        <div className="wp__layout">
          {!isParcels && (
            <div className="wp__tabslist" role="tablist">
              {TABS.map((tb) => (
                <button
                  key={tb.value}
                  type="button"
                  role="tab"
                  aria-selected={tb.value === activeTab}
                  className={"wp__tab" + (tb.value === activeTab ? " is-selected" : "")}
                  onClick={() => setActiveTab(tb.value)}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          )}
          <div className={"wp__content" + (isParcels ? " wp__content--full" : "")}>{body}</div>
        </div>
      </div>
    </div>
  );
}
