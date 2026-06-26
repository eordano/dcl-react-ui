import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdworlds.css";
import { Caret } from "../../atoms/icons.jsx";

const PAGE_SIZE = 12;

const DCL_WORLDS = [
  { name: "monkeyisland.dcl.eth", subdomain: "monkeyisland.dcl.eth", deployed: true, scene: "Pirate Cove", editable: true, size: 14.2, status: "active" },
  { name: "neonbazaar.dcl.eth", subdomain: "neonbazaar.dcl.eth", deployed: true, scene: "Night Market", editable: false, size: 8.7, status: "active" },
  { name: "skyforge.dcl.eth", subdomain: "skyforge.dcl.eth", deployed: false, scene: null, editable: false, size: null, status: "inactive" },
  { name: "voidtemple.dcl.eth", subdomain: "voidtemple.dcl.eth", deployed: true, scene: "Hall of Echoes", editable: true, size: 22.9, status: "warning" },
  { name: "lofilounge.dcl.eth", subdomain: "lofilounge.dcl.eth", deployed: true, scene: "Chillwave Bar", editable: true, size: 5.1, status: "active" },
  { name: "atlasgallery.dcl.eth", subdomain: "atlasgallery.dcl.eth", deployed: false, scene: null, editable: false, size: null, status: "inactive" },
];

const ENS_WORLDS = [
  { name: "vitalik.eth", subdomain: "vitalik.eth", deployed: true, scene: "Genesis Hub", editable: false, size: 3.4, status: "active" },
  { name: "metaverse.eth", subdomain: "metaverse.eth", deployed: false, scene: null, editable: false, size: null, status: "inactive" },
  { name: "studio.eth", subdomain: "studio.eth", deployed: true, scene: "Showroom", editable: true, size: 11.8, status: "active" },
];

const SORT_OPTIONS = [
  { value: "ASC", text: "Name (A–Z)" },
  { value: "DESC", text: "Name (Z–A)" },
];

const EXPLORER = "https://decentraland.org";
const getExplorerUrl = (world) => `${EXPLORER}/world/${world}`;

const PlusGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const CopyGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="5.2" y="5.2" width="8" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M10.8 5.2V3.4a1.4 1.4 0 0 0-1.4-1.4H3.6a1.4 1.4 0 0 0-1.4 1.4v5.8a1.4 1.4 0 0 0 1.4 1.4h1.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);
const ExternalGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    <path d="M9.5 2.5H13.5V6.5M13.5 2.5 7.5 8.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const WarnGlyph = () => (
  <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
    <path d="M11 2.5 20 18.5H2L11 2.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M11 8.5v4M11 15.4v.05" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const CloseGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const GoodGlyph = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true" className="bdworlds__good">
    <circle cx="9" cy="9" r="8" fill="#34ce76" />
    <path d="M5 9.2 7.7 12 13 6.2" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function WorldUrl({ world }) {
  if (!world.deployed) {
    return <span className="bdworlds__emptyurl">To activate this world you need to publish a scene</span>;
  }
  const url = getExplorerUrl(world.subdomain);
  return (
    <div className="bdworlds__url">
      <span className="u-truncate">{url}</span>
      <div className="bdworlds__urlright">
        <button type="button" className="bdworlds__iconbtn" aria-label="Copy urn"><CopyGlyph /></button>
        <a href={url} target="_blank" rel="noopener noreferrer" className="bdworlds__iconbtn" aria-label="Open world"><ExternalGlyph /></a>
      </div>
    </div>
  );
}

function PublishSceneCell({ world }) {
  if (!world.deployed) {
    return (
      <div className="bdworlds__publish">
        <span>-</span>
        <button type="button" className="bdworlds__btn bdworlds__btn--primary bdworlds__btn--sm">Publish Scene</button>
      </div>
    );
  }
  return (
    <div className="bdworlds__publish">
      <span title={world.scene}>{world.scene}</span>
      {world.editable ? (
        <button type="button" className="bdworlds__btn bdworlds__btn--inverted bdworlds__btn--sm">Edit Scene</button>
      ) : (
        <button type="button" className="bdworlds__btn bdworlds__btn--inverted bdworlds__btn--sm">Unpublish Scene</button>
      )}
    </div>
  );
}

function WorldsStorage({ usedMbs, maxMbs, onViewDetails }) {
  const pct = Math.trunc((usedMbs * 100) / maxMbs);
  return (
    <div className="bdworlds__storage">
      <span className="bdworlds__storageused">Space Used</span>
      <div className="bdworlds__storagedesc">
        <span>Total storage is calculated based on MANA, LAND, and NAME holdings.</span>{" "}
        <span className="bdworlds__storagelink" onClick={onViewDetails}>View Details</span>
      </div>
      <div className="bdworlds__storagespace">
        <div>
          <span className="bdworlds__storagecurrent">{usedMbs.toLocaleString()}</span> / {maxMbs.toLocaleString()} Mb
        </div>
        <div className="bdworlds__bar">
          <div className="bdworlds__barfront" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

function EmptyNames({ tab, onClaim }) {
  return (
    <div className="bdworlds__empty">
      <div className={"bdworlds__emptyicon " + (tab === "dcl" ? "is-dcl" : "is-ens")} aria-hidden="true" />
      <div className="bdworlds__emptytitle">
        {tab === "dcl" ? "Get a free World when you own a NAME" : "Get a free World when you own a ENS Domain"}
      </div>
      <div className="bdworlds__emptydesc">
        {tab === "dcl" ? (
          <>Each NAME grants you access to one World, <b>your own 3D space in the metaverse</b> where you can shape the space however you like and invite up to 100 people to visit.</>
        ) : (
          <>With an ENS Domain, you can create a unique World with 25 Mb of dedicated storage. It's a great way to start your journey in Decentraland.</>
        )}
      </div>
      <button type="button" className="bdworlds__btn bdworlds__btn--primary bdworlds__emptyaction" onClick={onClaim}>
        {tab === "dcl" ? "Claim Name" : "Claim ENS Domain"}
      </button>
    </div>
  );
}

function YourStorageModal({ available, onClose }) {
  const assets = [
    { name: "MANA", desc: "Earn 100 Mb of storage per 2,000 tokens (Polygon or Ethereum).", holding: "You have 200 Mb thanks to holding 4,000 MANA tokens.", cta: "BUY MANA" },
    { name: "LANDs", desc: "Earn 100 Mb of storage per LAND.", holding: "You have 300 Mb thanks to holding 3 LANDs.", cta: "BUY LAND" },
    { name: "NAMEs", desc: "Earn 100 Mb of storage per NAME.", holding: "You have 600 Mb thanks to holding 6 Decentraland NAMEs.", cta: "BUY NAME" },
  ];
  return (
    <div className="bdworlds__scrim" role="dialog" aria-modal="true" aria-label="Your Storage" onClick={onClose}>
      <div className="bdworlds__modal" onClick={(e) => e.stopPropagation()}>
        <div className="bdworlds__modalnav">
          <h2>Your Storage</h2>
          <button type="button" className="bdworlds__iconbtn" aria-label="Close" onClick={onClose}><CloseGlyph /></button>
        </div>
        <div className="bdworlds__modalbody">
          <div className="bdworlds__total">
            <span>TOTAL AVAILABLE STORAGE</span>
            <span className="bdworlds__totalmbs">{available.toLocaleString()} Mb</span>
          </div>
          {assets.map((a, i) => (
            <div key={a.name}>
              <div className="bdworlds__asset">
                <div className="bdworlds__assettexts">
                  <span className="bdworlds__assetname">{a.name}</span>
                  <span className="bdworlds__assetsub">{a.desc}</span>
                  <span className="bdworlds__assetamount"><GoodGlyph />{a.holding}</span>
                </div>
                <button type="button" className="bdworlds__btn bdworlds__btn--primary">{a.cta}</button>
              </div>
              {i < assets.length - 1 && <div className="bdworlds__separator" />}
            </div>
          ))}
          <div className="bdworlds__proposal">
            These storage rules were voted on and passed in a governance DAO proposal.{" "}
            <span className="bdworlds__storagelink">LEARN MORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionsModal({ worldName, onClose }) {
  const [tab, setTab] = useState("Access");
  const approved = ["0x9f3c…7a21", "0x2bd1…0e4a"];
  const collaborators = [
    { addr: "0x9f3c…7a21", deploy: true, stream: false },
    { addr: "0x77ab…12cd", deploy: true, stream: true },
  ];
  return (
    <div className="bdworlds__scrim" role="dialog" aria-modal="true" aria-label="World Permissions" onClick={onClose}>
      <div className="bdworlds__modal" onClick={(e) => e.stopPropagation()}>
        <div className="bdworlds__modalnav">
          <h2>World Permissions<br /><span className="bdworlds__modalsub">{worldName}</span></h2>
          <button type="button" className="bdworlds__iconbtn" aria-label="Close" onClick={onClose}><CloseGlyph /></button>
        </div>
        <div className="bdworlds__modaltabs">
          <button type="button" className={"bdworlds__mtab" + (tab === "Access" ? " is-active" : "")} onClick={() => setTab("Access")}>access</button>
          <button type="button" className={"bdworlds__mtab" + (tab === "Collaborators" ? " is-active" : "")} onClick={() => setTab("Collaborators")}>collaborators</button>
        </div>
        <div className="bdworlds__modalbody">
          {tab === "Access" ? (
            <>
              <p className="bdworlds__permdesc">
                Manage who can access your World by toggling between "Private" and "Public". In Private mode, you can grant access
                to a max of 100 addresses (Decentraland users).
              </p>
              <div className="bdworlds__permrow">
                <span>World is private</span>
                <span className="bdworlds__permtoggle" role="switch" aria-checked="true"><span /></span>
              </div>
              <div className="bdworlds__permhead">Approved Addresses {approved.length}</div>
              <ul className="bdworlds__permlist">
                {approved.map((a) => (
                  <li key={a}><span>{a}</span><button type="button" className="bdworlds__iconbtn" aria-label="Remove"><CloseGlyph /></button></li>
                ))}
              </ul>
              <button type="button" className="bdworlds__btn bdworlds__btn--inverted bdworlds__addaddr">add address</button>
            </>
          ) : (
            <>
              <p className="bdworlds__permdesc">
                Add up to 10 addresses (Decentraland users) as collaborators and manage their permission deploy, or stream into your World.
              </p>
              <div className="bdworlds__collabhead">
                <span>collaborators {collaborators.length}</span>
                <span>deploy</span>
                <span>stream</span>
              </div>
              <ul className="bdworlds__permlist">
                {collaborators.map((c) => (
                  <li key={c.addr} className="bdworlds__collabrow">
                    <span className="u-truncate">{c.addr}</span>
                    <span className={"bdworlds__check" + (c.deploy ? " is-on" : "")} aria-checked={c.deploy} role="checkbox" />
                    <span className={"bdworlds__check" + (c.stream ? " is-on" : "")} aria-checked={c.stream} role="checkbox" />
                  </li>
                ))}
              </ul>
              <button type="button" className="bdworlds__btn bdworlds__btn--inverted bdworlds__addaddr">add collaborator</button>
            </>
          )}
        </div>
        <div className="bdworlds__modalactions">
          <button type="button" className="bdworlds__btn bdworlds__btn--primary" onClick={onClose}>done</button>
        </div>
      </div>
    </div>
  );
}

export default function BdWorlds({
  tab = "dcl",
  dcl = DCL_WORLDS,
  ens = ENS_WORLDS,
  loading = false,
  blocked = null,
  modal = null,
}) {
  const [navTab, setNavTab] = useState("worlds");
  const [activeTab, setActiveTab] = useState(tab);
  const [sort, setSort] = useState("ASC");
  const [sortOpen, setSortOpen] = useState(false);
  const [openModal, setOpenModal] = useState(modal);
  const [page, setPage] = useState(1);

  const isDcl = activeTab === "dcl";
  const items = isDcl ? dcl : ens;
  const total = items.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasResults = total > 0;
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.text ?? "";

  const usedMbs = 980;
  const maxMbs = 1100;

  const switchTab = (t) => { setActiveTab(t); setPage(1); };

  const blockedMsg =
    blocked === "warning"
      ? <>You are using more storage than you are allowed. Unpublish some scenes to free some space or increase you maximum storage before <b>12/31/2026</b> to avoid losing access to your scenes.</>
      : blocked === "blocked"
      ? <>Access to your scenes has been blocked since <b>12/15/2026</b> because you don't have enough storage to maintain your currently published Worlds. Unpublish some scenes to free some space or increase your maximum storage to regain access.</>
      : null;

  return (
    <BuilderChrome active={navTab} onTab={setNavTab}>
      <div className="bdworlds">
        <h1 className="bdworlds__title">Worlds</h1>

        <nav className="bdworlds__nametabs" aria-label="Name types">
          <button type="button" className={"bdworlds__nametab" + (isDcl ? " is-active" : "")} onClick={() => switchTab("dcl")}>
            Decentraland NAMEs
          </button>
          <button type="button" className={"bdworlds__nametab" + (!isDcl ? " is-active" : "")} onClick={() => switchTab("ens")}>
            ENS Domains
          </button>
        </nav>

        {loading ? (
          <div className="bdworlds__loader" role="status" aria-label="Loading">
            <span className="bdworlds__spinner" />
          </div>
        ) : !hasResults ? (
          <EmptyNames tab={activeTab} onClaim={() => {}} />
        ) : (
          <>
            {isDcl && (
              <WorldsStorage usedMbs={usedMbs} maxMbs={maxMbs} onViewDetails={() => setOpenModal("storage")} />
            )}
            {isDcl && blockedMsg && (
              <div className="bdworlds__warning">
                <WarnGlyph />
                <div>{blockedMsg}</div>
              </div>
            )}

            <div className="bdworlds__filters">
              <div className="bdworlds__itemscount">{total.toLocaleString()} {total === 1 ? "result" : "results"}</div>
              <div className="bdworlds__filteractions">
                <div className="bdworlds__sort">
                  <button type="button" className="bdworlds__sortbtn" onClick={() => setSortOpen((v) => !v)} aria-expanded={sortOpen}>
                    {sortLabel} <Caret size={12} />
                  </button>
                  {sortOpen && (
                    <div className="bdworlds__sortmenu" role="menu">
                      {SORT_OPTIONS.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          role="menuitemradio"
                          aria-checked={o.value === sort}
                          className={"bdworlds__sortitem" + (o.value === sort ? " is-active" : "")}
                          onClick={() => { setSort(o.value); setSortOpen(false); }}
                        >
                          {o.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button type="button" className="bdworlds__claim" aria-label="Claim name"><PlusGlyph /></button>
              </div>
            </div>

            <div className="bdworlds__tablewrap">
              <table className="bdworlds__table">
                <thead>
                  <tr>
                    <th className="bdworlds__th-name">NAME</th>
                    <th className="bdworlds__th-url">URL</th>
                    <th>Published Scene</th>
                    <th className="bdworlds__center">Size Mb</th>
                    <th className="bdworlds__center">Status</th>
                    <th className="bdworlds__center" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((w) => (
                    <tr key={w.subdomain} className="bdworlds__trow">
                      <td>{w.name}</td>
                      <td><WorldUrl world={w} /></td>
                      <td><PublishSceneCell world={w} /></td>
                      <td className="bdworlds__center">
                        {w.deployed && w.size != null ? `${w.size.toLocaleString()}${isDcl ? "" : " / 25"}` : "-"}
                      </td>
                      <td className="bdworlds__center">
                        <span className={"bdworlds__status is-" + w.status}>
                          {w.status === "active" ? "Active" : w.status === "inactive" ? "Inactive" : w.status === "warning" ? "Warning" : "Blocked"}
                        </span>
                      </td>
                      <td className="bdworlds__center">
                        <button type="button" className="bdworlds__btn bdworlds__btn--basic bdworlds__btn--sm" onClick={() => setOpenModal("permissions")}>
                          Permissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <nav className="bdworlds__pagination" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={"bdworlds__page" + (p === page ? " is-active" : "")}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </>
        )}
      </div>

      {openModal === "storage" && (
        <YourStorageModal available={maxMbs - usedMbs} onClose={() => setOpenModal(null)} />
      )}
      {openModal === "permissions" && (
        <PermissionsModal worldName="monkeyisland.dcl.eth" onClose={() => setOpenModal(null)} />
      )}
    </BuilderChrome>
  );
}
