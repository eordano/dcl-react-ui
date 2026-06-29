import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdland.css";

const ROLE = { OWNER: 1, LESSOR: 2, TENANT: 3, OPERATOR: 4 };
const ROLE_LABEL = { 1: "Owner", 2: "Owner", 3: "Tenant", 4: "Operator" };
const ROLE_COLOR = {
  1: "#ab2039",
  2: "#d18157",
  3: "#ab2039",
  4: "#8f1d9b",
};

const PAGE_SIZE = 20;

const LANDS = [
  { id: "p1", type: "parcel", role: ROLE.OWNER, name: "My First Parcel", x: -52, y: 14, operators: ["0x9f3c…7a21"], deployments: ["Cozy Gallery"] },
  { id: "e1", type: "estate", role: ROLE.OWNER, name: "Genesis Plaza Annex", size: 6, x: 0, y: 0, operators: [], deployments: ["Plaza Lobby", "Quest Hall"] },
  { id: "p2", type: "parcel", role: ROLE.OWNER, name: "Sunset Boulevard", x: 33, y: -71, operators: ["0x4b1a…9d02", "0x77ce…1f55"], deployments: [] },
  { id: "p3", type: "parcel", role: ROLE.OPERATOR, name: "Neon District Lot", x: -120, y: 88, operators: ["0xa11c…0e7b"], deployments: ["Arcade Floor"] },
  { id: "p4", type: "parcel", role: ROLE.TENANT, name: "Rented Studio", x: 145, y: -12, operators: [], deployments: [] },
  { id: "e2", type: "estate", role: ROLE.OPERATOR, name: "Festival Grounds", size: 4, x: 60, y: 40, operators: ["0x9f3c…7a21"], deployments: ["Main Stage"] },
  { id: "p5", type: "parcel", role: ROLE.OWNER, name: "Quiet Corner", x: -8, y: -150, operators: [], deployments: [] },
  { id: "p6", type: "parcel", role: ROLE.TENANT, name: "Pop-up Shop", x: 99, y: 102, operators: ["0x21ab…44cd"], deployments: ["Merch Booth"] },
];

const TableGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="1.5" y="3" width="13" height="10" rx="1.4" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M1.5 6.5h13M6 6.5V13" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);
const PinGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 1.5c2.6 0 4.5 2 4.5 4.6 0 3.2-4.5 8.4-4.5 8.4S3.5 9.3 3.5 6.1C3.5 3.5 5.4 1.5 8 1.5Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <circle cx="8" cy="6" r="1.7" fill="currentColor" />
  </svg>
);
const ArrowGlyph = ({ dir }) => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path
      d={dir === "prev" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
      stroke="currentColor"
      strokeWidth="1.7"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function inlineList(list) {
  if (!list || list.length === 0) return "—";
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list[0]}, ${list[1]} and ${list.length - 2} more`;
}

function activateOnKey(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.currentTarget.click();
  }
}

function AtlasThumb({ land, size = 45 }) {
  if (land.image) {
    return (
      <span className="bdland__minimap" style={{ width: size, height: size }} aria-hidden="true">
        <img
          src={land.image}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          style={{ width: size, height: size, objectFit: "cover", borderRadius: 4, display: "block" }}
        />
      </span>
    );
  }
  const color = ROLE_COLOR[land.role];
  const span = land.type === "estate" ? Math.min(land.size || 2, 4) : 1;
  const cells = [];
  const dim = 5;
  const cs = size / dim;
  for (let gy = 0; gy < dim; gy++) {
    for (let gx = 0; gx < dim; gx++) {
      const start = Math.floor((dim - span) / 2);
      const filled = gx >= start && gx < start + span && gy >= start && gy < start + span;
      cells.push(
        <span
          key={`${gx}-${gy}`}
          className="bdland__minicell"
          style={{
            width: cs,
            height: cs,
            background: filled ? color : "rgba(255,255,255,.05)",
          }}
        />
      );
    }
  }
  return (
    <span className="bdland__minimap" style={{ width: size, height: size }} aria-hidden="true">
      {cells}
    </span>
  );
}

function AtlasMap({ lands, selected }) {
  const cols = 24;
  const rows = 14;
  const tiles = [];
  const placed = lands.map((land, i) => ({
    land,
    col: ((i * 5 + 3) % cols),
    row: ((i * 3 + 2) % rows),
    span: land.type === "estate" ? Math.min(land.size || 2, 4) : 1,
  }));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tiles.push(<span key={`${c}-${r}`} className="bdland__tile" />);
    }
  }
  return (
    <div className="bdland__map" role="img" aria-label="Land atlas map">
      <div className="bdland__tiles">{tiles}</div>
      <div className="bdland__overlays">
        {placed.map(({ land, col, row, span }, i) => (
          <span
            key={land.id}
            className={"bdland__plot" + (selected === i ? " is-selected" : "")}
            style={{
              left: `calc(${col} * (100% / ${cols}))`,
              top: `calc(${row} * (100% / ${rows}))`,
              width: `calc(${span} * (100% / ${cols}))`,
              height: `calc(${span} * (100% / ${rows}))`,
              background: ROLE_COLOR[land.role],
            }}
            title={`${land.name} (${land.x},${land.y})`}
            tabIndex={0}
            role="button"
            aria-label={land.name}
            onKeyDown={activateOnKey}
          >
            {(selected === i || span > 1) && <span className="bdland__plotlabel">{land.name}</span>}
          </span>
        ))}
      </div>
      <div className="bdland__mapcontrols">
        <button type="button" className="bdland__mapctl" aria-label="Zoom in">＋</button>
        <button type="button" className="bdland__mapctl" aria-label="Zoom out">－</button>
      </div>
    </div>
  );
}

export default function BdLand({ lands = LANDS, view = "grid", isLoading = false, signedIn = false, account = "" }) {
  const [navTab, setNavTab] = useState("land");
  const [activeView, setActiveView] = useState(view);
  const [showOwner, setShowOwner] = useState(true);
  const [showOperator, setShowOperator] = useState(true);
  const [showTenant, setShowTenant] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedLand, setSelectedLand] = useState(0);

  const filtered = lands.filter((land) => {
    if (showOwner && (land.role === ROLE.OWNER || land.role === ROLE.LESSOR)) return true;
    if (showOperator && land.role === ROLE.OPERATOR) return true;
    if (showTenant && land.role === ROLE.TENANT) return true;
    return false;
  });

  const count = filtered.length;
  const totalPages = Math.ceil(count / PAGE_SIZE);
  const isAtlas = activeView === "atlas";
  const isEmpty = !isLoading && lands.length === 0;

  const stepNext = () => setSelectedLand((s) => (s >= count - 1 ? 0 : s + 1));
  const stepPrev = () => setSelectedLand((s) => (s <= 0 ? count - 1 : s - 1));

  const pageSlice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <BuilderChrome active={navTab} onTab={setNavTab} signedIn={signedIn} account={account}>
      <div className={"bdland" + (isAtlas ? " bdland--atlas" : "")}>
        {isLoading ? (
          <div className="bdland__loader" role="status" aria-label="Loading">
            <span className="bdland__spinner" />
          </div>
        ) : isEmpty ? (
          <div className="bdland__empty">
            <span className="bdland__emptyicon" aria-hidden="true"><PinGlyph /></span>
            <h2 className="bdland__emptytitle">You don't have any LAND</h2>
            <p className="bdland__emptydesc">
              Get started by acquiring LAND or an Estate in the Marketplace, or ask an owner to grant
              you operator permissions.
            </p>
            <a className="bdland__emptycta" href="https://decentraland.org/marketplace/browse?assetType=nft&section=land">Get LAND</a>
          </div>
        ) : (
          <>
            <div className="bdland__filters">
              <div className="bdland__results">
                <span className="bdland__resultcount">
                  {count.toLocaleString()} {count === 1 ? "result" : "results"}
                </span>
                {isAtlas && count > 1 && (
                  <span className="bdland__arrows">
                    <button type="button" className="bdland__arrow bdland__arrow--prev" onClick={stepPrev} aria-label="Previous land">
                      <ArrowGlyph dir="prev" />
                    </button>
                    <button type="button" className="bdland__arrow bdland__arrow--next" onClick={stepNext} aria-label="Next land">
                      <ArrowGlyph dir="next" />
                    </button>
                  </span>
                )}
              </div>

              <div className="bdland__controls">
                <label className="bdland__radio">
                  <input type="checkbox" checked={showOwner} onChange={() => setShowOwner((v) => !v)} />
                  <span className="bdland__dot bdland__dot--owner" />
                  Owner
                </label>
                <label className="bdland__radio">
                  <input type="checkbox" checked={showOperator} onChange={() => setShowOperator((v) => !v)} />
                  <span className="bdland__dot bdland__dot--operator" />
                  Operator
                </label>
                <label className="bdland__radio">
                  <input type="checkbox" checked={showTenant} onChange={() => setShowTenant((v) => !v)} />
                  <span className="bdland__dot bdland__dot--tenant" />
                  Tenant
                </label>

                <div className="bdland__chips">
                  <button
                    type="button"
                    className={"bdland__chip bdland__chip--grid" + (!isAtlas ? " is-active" : "")}
                    aria-label="Grid view"
                    aria-pressed={!isAtlas}
                    onClick={() => setActiveView("grid")}
                  >
                    <TableGlyph />
                  </button>
                  <button
                    type="button"
                    className={"bdland__chip bdland__chip--atlas" + (isAtlas ? " is-active" : "")}
                    aria-label="Atlas view"
                    aria-pressed={isAtlas}
                    onClick={() => setActiveView("atlas")}
                  >
                    <PinGlyph />
                  </button>
                </div>
              </div>
            </div>

            {isAtlas ? (
              <div className="bdland__atlaswrap">
                <AtlasMap lands={filtered} selected={count > 0 ? selectedLand % count : 0} />
              </div>
            ) : (
              <div className="bdland__container">
                {count > 0 && (
                  <table className="bdland__table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Operated by</th>
                        <th>Online Scenes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageSlice.map((land) => (
                        <tr
                          key={land.id}
                          className="bdland__row"
                          tabIndex={0}
                          role="button"
                          aria-label={`Open ${land.name}`}
                          onKeyDown={activateOnKey}
                        >
                          <td>
                            <div className="bdland__namecell">
                              <AtlasThumb land={land} />
                              <span className="bdland__name">
                                {land.name}{" "}
                                <span className="bdland__coords">({land.x},{land.y})</span>
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="bdland__role">{ROLE_LABEL[land.role]}</span>
                          </td>
                          <td className="bdland__muted">{inlineList(land.operators)}</td>
                          <td className="bdland__muted">{inlineList(land.deployments)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {totalPages > 1 && (
                  <nav className="bdland__pagination" aria-label="Pagination">
                    <button type="button" className="bdland__pagearrow" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                      <ArrowGlyph dir="prev" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={"bdland__page" + (p === page ? " is-active" : "")}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    ))}
                    <button type="button" className="bdland__pagearrow" aria-label="Next page" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                      <ArrowGlyph dir="next" />
                    </button>
                  </nav>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </BuilderChrome>
  );
}
