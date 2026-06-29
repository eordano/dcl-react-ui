import { useState } from "react";
import { asset } from "../../asset.js";
import { ChevronLeft, ChevronDownAlt, ChevronRight, Close } from "../../atoms/icons.jsx";
import "./chpublishwizardpublishtoworld.css";

const LayersIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const GridIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const WorldIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
    <path d="M3 8.4l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoDCL = () => (
  <span className="cpw__provlogo" aria-hidden="true">
    <img src={asset("assets/dcl-logo.png")} alt="" />
  </span>
);
const LogoENS = () => (
  <span className="cpw__provlogo cpw__provlogo--ens" aria-hidden="true">
    <svg viewBox="0 0 20 20" width="20" height="20">
      <defs>
        <linearGradient id="ens-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#5e7bff" />
        </linearGradient>
      </defs>
      <path d="M10 1.5 4.5 9l5.5 9.5L15.5 9 10 1.5Z" fill="url(#ens-g)" />
    </svg>
  </span>
);

const EmptyWorldArt = () => (
  <svg className="cpw__emptyart" viewBox="0 0 220 220" width="220" height="220" aria-hidden="true">
    <defs>
      <radialGradient id="cpw-globe" cx="38%" cy="34%" r="75%">
        <stop offset="0" stopColor="#4b6bff" />
        <stop offset="0.55" stopColor="#7a3df0" />
        <stop offset="1" stopColor="#2a0c52" />
      </radialGradient>
    </defs>
    <ellipse cx="110" cy="186" rx="74" ry="13" fill="rgba(0,0,0,0.35)" />
    <circle cx="110" cy="100" r="78" fill="url(#cpw-globe)" />
    <g stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none">
      <ellipse cx="110" cy="100" rx="78" ry="30" />
      <ellipse cx="110" cy="100" rx="78" ry="58" />
      <path d="M110 22v156M48 60q62 40 124 0M48 140q62-40 124 0" />
    </g>
    <g fill="rgba(255,255,255,0.18)">
      <path d="M74 64q14-8 26 2 8 6 2 16-10 8-22 2-12-8-6-22Z" />
      <path d="M126 110q16-4 22 8 4 12-8 18-14 4-20-8-4-12 6-18Z" />
    </g>
    <circle cx="84" cy="58" r="4.5" fill="#ff7439" />
    <circle cx="148" cy="132" r="4.5" fill="#34ce76" />
  </svg>
);

function ChipsRow({ network, address, username, verified, role }) {
  return (
    <div className="cpw__chips">
      <div className="cpw__chip cpw__chip--network">{network}</div>
      <div className="cpw__chip cpw__chip--address">{address}</div>
      <div className="cpw__chip cpw__chip--username">
        {username}
        {verified ? <i className="cpw__verified" aria-label="verified" /> : null}
      </div>
      {role ? <div className="cpw__chip cpw__chip--role">{role}</div> : null}
    </div>
  );
}

function ProjectInfo({ project }) {
  return (
    <div className="cpw__info">
      <div className="cpw__projthumb" style={{ background: project.grad }} />
      <div className="cpw__projtext">
        <div className="cpw__projtitle">{project.title}</div>
        <div className="cpw__projparcels">
          <GridIcon size={12} />
          Scene size: {project.size}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label }) {
  if (!label) return null;
  return (
    <div className="cpw__worldinfoitem">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function SelectWorld({ data, multiScene, onToggleMulti, onPickName, onReview, onClaimName }) {
  const { name, world, names } = data;
  const hasName = !!name;
  const [open, setOpen] = useState(false);
  const showMenu = (open || !hasName) && names && names.length > 0;
  return (
    <div className="cpw__selectworld">
      <div className="cpw__selection">
        <p className="cpw__desc">Choose the domain where your world will be published.</p>
        <div className="cpw__selectrow">
          <button type="button" className="cpw__select cpw__select--provider">
            <span className="cpw__selectval">
              <LogoDCL />
              NAME
            </span>
            <ChevronDownAlt size={20} />
          </button>
          <button
            type="button"
            className="cpw__select cpw__select--name"
            aria-expanded={showMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={"cpw__selectval" + (hasName ? "" : " cpw__placeholder")}>
              {hasName ? name : "Select a Name"}
            </span>
            <ChevronDownAlt size={20} />
          </button>
        </div>
        {showMenu ? (
          <div className="cpw__menu" role="listbox" aria-label="World names">
            {names.map((n) => (
              <div
                key={n}
                className="cpw__menuitem"
                role="option"
                aria-selected={n === name}
                onClick={() => {
                  onPickName && onPickName(n);
                  setOpen(false);
                }}
              >
                {n}
              </div>
            ))}
            <div
              className="cpw__menuitem cpw__menuitem--claim"
              role="option"
              onClick={() => onClaimName && onClaimName()}
            >
              <PlusIcon /> Claim a new NAME
            </div>
          </div>
        ) : null}
      </div>

      {hasName ? (
        <div className="cpw__advanced">
          <div className="cpw__advrow">
            <LayersIcon />
            <div className="cpw__advtexts">
              <div className="cpw__advtitle">Multi-Scene World (Advanced)</div>
              <div className="cpw__advdesc">
                Allow your world to contain more than 1 scene. Total world size will
                depend on your published world layout.
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={multiScene}
              className={"cpw__switch" + (multiScene ? " is-on" : "")}
              onClick={() => onToggleMulti(!multiScene)}
            >
              <span className="cpw__switchknob" />
            </button>
          </div>

          {multiScene && world ? (
            <div className="cpw__worldinfo">
              <div className="cpw__worldthumb" style={{ background: world.grad }} />
              <div className="cpw__worldcontent">
                <div className="cpw__currentlabel">Current World</div>
                <div className="cpw__worldtitle">{world.title}</div>
                <div className="cpw__worldmeta">
                  <InfoItem icon={<LayersIcon size={16} />} label={`${world.scenes} ${world.scenes === 1 ? "scene" : "scenes"}`} />
                  <InfoItem icon={<GridIcon size={16} />} label={world.size} />
                </div>
              </div>
              <button type="button" className="cpw__btn cpw__btn--secondary cpw__settingsbtn">
                <WorldIcon />
                Settings
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="cpw__actions">
        <button
          type="button"
          className="cpw__btn cpw__btn--primary"
          disabled={!hasName}
          onClick={onReview}
        >
          {multiScene && world ? "Select Location" : "Review"}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function EmptyNames({ onClaimName }) {
  return (
    <div className="cpw__empty">
      <h3 className="cpw__emptytitle">You don't have any available World</h3>
      <EmptyWorldArt />
      <p className="cpw__emptybody">
        <b>Get a free world when you own a NAME</b>.<br />
        Each NAME will give you access to one World. You can have as many as you want.
      </p>
      <div className="cpw__emptyactions">
        <button type="button" className="cpw__btn cpw__btn--primary cpw__btn--block" onClick={onClaimName}>Claim a new Name</button>
        <button type="button" className="cpw__btn cpw__btn--secondary cpw__btn--block">Learn more</button>
      </div>
    </div>
  );
}

const PROJECT = {
  title: "Neon Night Market",
  size: "2x2",
  grad: "linear-gradient(135deg, #ff2d55 0%, #350447 100%)",
};
const OWNER = {
  network: "Mainnet",
  address: "0x9f3c…7a21",
  username: "javier.dcl",
  verified: true,
  role: "Owner",
};
const SELECTION_DATA = {
  name: "mystore.dcl.eth",
  names: ["mystore.dcl.eth", "gallery.dcl.eth", "lounge.dcl.eth"],
  world: {
    title: "My Store World",
    scenes: 3,
    size: "4x4",
    grad: "linear-gradient(135deg, #438fff 0%, #2f004d 100%)",
  },
};

export default function ChPublishWizardPublishToWorld({
  state = "selection",
  project =(PROJECT),
  owner =(OWNER),
  names =(SELECTION_DATA.names),
  selectedName =(SELECTION_DATA.name),
  world =(SELECTION_DATA.world),
  multiScene =(undefined),
  onToggleMulti =(undefined),
  onPickName =(undefined),
  onReview =(undefined),
  onBack =(undefined),
  onClose =(undefined),
  onClaimName =(undefined),
}) {
  const [multiSceneState, setMultiSceneState] = useState(true);
  const multiSceneOn = multiScene ?? multiSceneState;
  const toggleMulti = onToggleMulti ?? setMultiSceneState;
  const isEmpty = state === "empty";

  return (
    <div className="cpw__backdrop">
      <div className={"cpw__modal" + (isEmpty ? " cpw__modal--empty" : "")} role="dialog" aria-modal="true" aria-label="Publish to your World">
        <header className="cpw__header">
          {onBack ? (
            <button type="button" className="cpw__iconbtn cpw__back" aria-label="back" onClick={onBack}><ChevronLeft size={22} /></button>
          ) : null}
          <h2 className="cpw__titletext">{isEmpty ? "Worlds" : "Publish to your World"}</h2>
          {onClose ? (
            <button type="button" className="cpw__iconbtn cpw__close" aria-label="close" onClick={onClose}><Close size={20} /></button>
          ) : null}
        </header>

        <div className="cpw__body">
          {isEmpty ? (
            <EmptyNames onClaimName={onClaimName} />
          ) : (
            <div className="cpw__stepwrapper">
              <ChipsRow {...owner} />
              <div className="cpw__projcontainer">
                <ProjectInfo project={project} />
                <div className="cpw__content">
                  <SelectWorld
                    data={{ name: selectedName, names, world }}
                    multiScene={multiSceneOn}
                    onToggleMulti={toggleMulti}
                    onPickName={onPickName}
                    onReview={onReview}
                    onClaimName={onClaimName}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
