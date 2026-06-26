import { useMemo, useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import Button from "../../atoms/Button.jsx";
import { asset } from "../../asset.js";
import "./chmanage.css";

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M5 12a7 7 0 0 1 11.9-5M19 6v4h-4M19 12a7 7 0 0 1-11.9 5M5 18v-4h4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="5" r="1.7" fill="currentColor" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    <circle cx="12" cy="19" r="1.7" fill="currentColor" />
  </svg>
);
const LayersIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const WorldSettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <rect x="13" y="3" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <rect x="3" y="13" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <rect x="13" y="13" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.7" fill="none" />
  </svg>
);

const LogoDCL = () => (
  <span className="chm__logo" aria-hidden="true">
    <img src={asset("assets/dcl-logo.png")} alt="" />
  </span>
);
const LogoENS = () => (
  <span className="chm__logo chm__logo--ens" aria-hidden="true">
    <svg viewBox="0 0 20 20" width="20" height="20">
      <defs>
        <linearGradient id="chm-ens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#5e7bff" />
        </linearGradient>
      </defs>
      <path d="M10 1.5 4.5 9l5.5 9.5L15.5 9 10 1.5Z" fill="url(#chm-ens)" />
    </svg>
  </span>
);

function formatName(name) {
  const m = name.match(/^(.+?)(\.dcl\.eth|\.eth)$/);
  if (m) return (<>{m[1]}<span className="chm__ens">{m[2]}</span></>);
  return name;
}

function PublishedProjectCard({ project }) {
  const { type, id, displayName, role, deployment } = project;
  const logo =
    type === "land" ? <span className="chm__logo chm__logo--land"><PinIcon /></span>
      : id.endsWith(".eth") && !id.endsWith(".dcl.eth") ? <LogoENS />
        : <LogoDCL />;
  const roleLabel = role === "collaborator" ? "Collaborator" : role === "operator" ? "Operator" : role === "tenant" ? "Tenant" : null;

  return (
    <div className="chm__card">
      <div className="chm__cardhead">
        {logo}
        <span className="chm__cardtitle u-truncate">
          {type === "land" ? displayName : formatName(displayName)}
        </span>
        <button type="button" className="chm__cardmenu" aria-label="More options"><MoreIcon /></button>
      </div>

      {!deployment ? (
        <div className="chm__emptyscene">
          <span className="chm__emptyscenetext">No scene published</span>
          <Button variant="secondary" size="sm">VIEW SCENES</Button>
        </div>
      ) : (
        <>
          <div className="chm__cardthumb">
            <div className="chm__thumbimg" style={{ background: deployment.grad }} />
            <div className="chm__chips">
              {type === "world" && deployment.scenesCount > 0 ? (
                <span className="chm__chip">
                  <LayersIcon size={16} />
                  {deployment.scenesCount} {deployment.scenesCount === 1 ? "scene" : "scenes"}
                </span>
              ) : null}
              {roleLabel ? (
                <span className="chm__chip"><PersonIcon />{roleLabel}</span>
              ) : null}
            </div>
          </div>
          <div className="chm__cardbody">
            <span className="chm__publabel">
              {type === "land" ? "Published Scene" : "Published World"}
            </span>
            <span className="chm__projtitle">{deployment.title}</span>
            {type === "world" ? (
              <button type="button" className="chm__settingsbtn">
                <WorldSettingsIcon />
                {role === "owner" ? "Settings" : "Layout"}
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

function StorageUsed({ used = 102.4, max = 350 }) {
  const pct = max > 0 ? (used / max) * 100 : 0;
  const size = 150, stroke = 7, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <aside className="chm__storage">
      <h2 className="chm__storagetitle">Space used</h2>
      <p className="chm__storagesub">for Decentraland NAMEs</p>
      <p className="chm__storagedesc">
        Total storage is calculated based on MANA, LAND, and NAME holdings.
      </p>
      <button type="button" className="chm__storagelink">View details</button>

      <div className="chm__progresswrap">
        <svg className="chm__progress" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--chm-transp)" strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="var(--chm-primary)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
      </div>
      <p className="chm__progressvals">
        <span className="chm__usedval">{used.toFixed(2)}</span> / {max.toFixed(0)} MB
      </p>
    </aside>
  );
}

function SignInCard() {
  return (
    <div className="chm__signin">
      <p className="chm__signintitle">Sign in to manage your worlds</p>
      <button type="button" className="chm__signinbtn">Sign In</button>
    </div>
  );
}

const PROJECTS = [
  {
    id: "neon-market.dcl.eth", displayName: "neon-market.dcl.eth", type: "world", role: "owner",
    deployment: { title: "Neon Night Market", scenesCount: 3, grad: "linear-gradient(135deg,#ff2d55 0%,#350447 100%)" },
  },
  {
    id: "gallery.dcl.eth", displayName: "gallery.dcl.eth", type: "world", role: "owner",
    deployment: { title: "Crystalline Art Gallery", scenesCount: 1, grad: "linear-gradient(135deg,#438fff 0%,#2f004d 100%)" },
  },
  {
    id: "studio.eth", displayName: "studio.eth", type: "world", role: "collaborator",
    deployment: { title: "Downtown Studio Loft", scenesCount: 2, grad: "linear-gradient(135deg,#34ce76 0%,#0c2a1a 100%)" },
  },
  {
    id: "-15,42", displayName: "-15, 42", type: "land", role: "owner",
    deployment: { title: "Genesis Plaza Outpost", scenesCount: 0, grad: "linear-gradient(135deg,#ff743a 0%,#3a0653 100%)" },
  },
  {
    id: "lounge.dcl.eth", displayName: "lounge.dcl.eth", type: "world", role: "owner",
    deployment: null,
  },
  {
    id: "12,-7", displayName: "12, -7", type: "land", role: "tenant",
    deployment: { title: "Riverside Game Arena", scenesCount: 0, grad: "linear-gradient(135deg,#982de2 0%,#1f0040 100%)" },
  },
];

const FILTERS = [
  { label: "Published", value: "published" },
  { label: "Not published", value: "unpublished" },
];
const SORT_OPTIONS = ["Last published", "Domain name"];

export default function ChManage({ state = "default" }) {
  const [filter, setFilter] = useState("published");
  const isLoading = state === "loading";
  const isSignedOut = state === "signedout";
  const projects = state === "empty" || isLoading ? [] : PROJECTS;

  const empty = useMemo(() => {
    if (filter === "unpublished") {
      return { title: "No places to display", desc: "Mint a NAME or become a collaborator to see more results.", cta: "mint" };
    }
    return { title: "No published places to display", desc: "Publish one of your Scenes or become a collaborator to see more results.", cta: "scenes" };
  }, [filter]);

  return (
    <CreatorHubChrome active="manage">
      <main className="chm">
        <div className="chm__container">
          <h1 className="chm__title">
            Manage Worlds
            {!isSignedOut ? (
              <button
                type="button"
                className={"chm__refresh" + (isLoading ? " is-loading" : "")}
                aria-label="Refresh"
                disabled={isLoading}
              >
                <RefreshIcon />
              </button>
            ) : null}
          </h1>

          {isSignedOut ? (
            <SignInCard />
          ) : (
            <div className="chm__row">
              <div className="chm__content">
                <div className="chm__filtersbar">
                  <div className="chm__filtersleft">
                    <h2 className="chm__count">
                      {projects.length} {projects.length === 1 ? "item" : "items"}
                    </h2>
                    <div className="chm__chipsfilter">
                      <span className="chm__filterlabel">Filter by</span>
                      {FILTERS.map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          className={"chm__filterchip" + (f.value === filter ? " is-active" : "")}
                          onClick={() => !isLoading && setFilter(f.value)}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {filter === "published" ? (
                    <div className="chm__filtersright">
                      <span className="chm__filterlabel">Sort by</span>
                      <Dropdown options={SORT_OPTIONS} defaultValue="Last published" />
                      <SearchField placeholder="Search" />
                    </div>
                  ) : null}
                </div>

                {isLoading ? (
                  <div className="chm__loader"><span className="chm__spinner" /></div>
                ) : projects.length === 0 ? (
                  <div className="chm__emptylist">
                    <h3 className="chm__emptytitle">{empty.title}</h3>
                    <p className="chm__emptydesc">{empty.desc}</p>
                    {empty.cta === "mint" ? (
                      <Button variant="secondary">Mint a new NAME</Button>
                    ) : (
                      <Button variant="secondary">View Scenes</Button>
                    )}
                  </div>
                ) : (
                  <div className="chm__list">
                    {projects.map((p) => (
                      <PublishedProjectCard key={p.id} project={p} />
                    ))}
                    {projects.length < 9 ? (
                      <div className="chm__loadmore">
                        <Button variant="secondary">Load more</Button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <StorageUsed used={102.4} max={350} />
            </div>
          )}
        </div>
      </main>
    </CreatorHubChrome>
  );
}
