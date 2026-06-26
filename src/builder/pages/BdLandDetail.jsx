import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdlanddetail.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const ROLE_ATLAS = {
  owner: { fill: "#ff2d55", empty: "#ab2039" },
  lessor: { fill: "#ff743a", empty: "#d18157" },
  operator: { fill: "#982de2", empty: "#8f1d9b" },
  tenant: { fill: "#ff2d55", empty: "#ab2039" },
};

const ROLE_LABEL = {
  owner: "Owner",
  lessor: "Owner",
  tenant: "Tenant",
  operator: "Operator",
};

const PARCEL_LAND = {
  id: "-45,12",
  name: "My Genesis Plot",
  type: "parcel",
  x: -45,
  y: 12,
  size: 1,
  role: "owner",
  roles: ["owner"],
  owner: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  operators: ["0x71c7656ec7ab88b098defb751b7401b5f6d8976f"],
  description: "A cozy corner of Genesis City, two parcels from the central road. Home to a small interactive gallery.",
  parcels: [{ x: -45, y: 12 }],
};

const ESTATE_LAND = {
  id: "estate-204",
  name: "Aurora Estate",
  type: "estate",
  size: 6,
  role: "owner",
  roles: ["owner"],
  owner: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  operators: [],
  description: "",
  parcels: [
    { x: 20, y: -8 },
    { x: 21, y: -8 },
    { x: 22, y: -8 },
    { x: 20, y: -9 },
    { x: 21, y: -9 },
    { x: 22, y: -9 },
  ],
};

const DEPLOYMENTS = [
  {
    id: "dep-1",
    name: "Interactive Gallery",
    thumbnail: null,
    layout: { rows: 1, cols: 1 },
    projectId: "proj-1",
    stats: { users: 1284, sessions: 3120, medianSessionTime: "4m 12s", maxConcurrentUsers: 38 },
  },
];

const ENS_LIST = [{ subdomain: "myplot.dcl.eth" }, { subdomain: "aurora.dcl.eth" }];

const STAT_LABELS = {
  users: "Weekly Users",
  sessions: "Weekly Sessions",
  medianSessionTime: "Med. Session Time",
  maxConcurrentUsers: "Peak Users",
};
const STATS_NOTICE = "*Metrics are refreshed weekly every Monday";

const PinGlyph = () => (
  <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" className="bdlanddetail__pinicon">
    <path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 3.2 4.5 8 4.5 8s4.5-4.8 4.5-8C12.5 3.5 10.5 1.5 8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="6" r="1.6" fill="currentColor" />
  </svg>
);
const DotsGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="3" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="13" cy="8" r="1.4" fill="currentColor" />
  </svg>
);
const WatermelonGlyph = () => (
  <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" className="bdlanddetail__watermelon">
    <path d="M4 6 A 12 12 0 0 0 26 26 z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="11" cy="17" r="1" fill="currentColor" />
    <circle cx="15" cy="20" r="1" fill="currentColor" />
    <circle cx="9" cy="21" r="1" fill="currentColor" />
  </svg>
);

function Profile({ address, hue = 280 }) {
  const short = address.slice(0, 6) + "..." + address.slice(-4);
  return (
    <span className="bdlanddetail__profile">
      <span className="bdlanddetail__avatar u-avatar" style={{ "--sz": "28px", "--hue": hue }} />
      <span className="bdlanddetail__addr">{short}</span>
    </span>
  );
}

function ENSChip({ subdomain }) {
  return (
    <span className="bdlanddetail__chip">
      {subdomain}
      <button type="button" className="bdlanddetail__chipunset" aria-label="Unset link">
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M4 8h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bdlanddetail__statcol">
      <div className="bdlanddetail__statlabel">{label}</div>
      <div className="bdlanddetail__statvalue">{value}</div>
    </div>
  );
}

function Scene({ deployment, clickable }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const s = deployment.stats;
  return (
    <div className={"bdlanddetail__scene" + (clickable ? " is-clickable" : "")}>
      {deployment.thumbnail ? (
        <div className="bdlanddetail__thumbnail" style={{ backgroundImage: `url(${deployment.thumbnail})` }} />
      ) : (
        <div className="bdlanddetail__nothumbnail">
          <WatermelonGlyph />
        </div>
      )}
      <div className="bdlanddetail__scenestat">
        <div className="bdlanddetail__scenetitle u-truncate" title={deployment.name}>
          {deployment.name}
        </div>
        {deployment.layout ? (
          <div className="bdlanddetail__secondary">
            {deployment.layout.rows}x{deployment.layout.cols}
          </div>
        ) : null}
      </div>
      <Stat label={STAT_LABELS.users} value={s.users.toLocaleString()} />
      <Stat label={STAT_LABELS.sessions} value={s.sessions.toLocaleString()} />
      <Stat label={STAT_LABELS.medianSessionTime} value={s.medianSessionTime} />
      <Stat label={STAT_LABELS.maxConcurrentUsers} value={s.maxConcurrentUsers.toLocaleString()} />
      <div className="bdlanddetail__scenemenu">
        <button
          type="button"
          className="bdlanddetail__iconbtn"
          aria-label="Scene options"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <DotsGlyph />
        </button>
        {menuOpen ? (
          <ul className="bdlanddetail__dropdown is-right" role="menu">
            <li role="menuitem">Unpublish</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function MiniAtlas({ land }) {
  if (land.image) {
    return (
      <div className="bdlanddetail__atlaswrapper">
        <img
          className="bdlanddetail__atlas"
          src={land.image}
          alt="LAND preview"
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }
  const palette = ROLE_ATLAS[land.role] || ROLE_ATLAS.owner;
  const cell = 32;
  const ownedSet = new Set((land.parcels || []).map((p) => `${p.x},${p.y}`));
  const xs = (land.parcels || []).map((p) => p.x);
  const ys = (land.parcels || []).map((p) => p.y);
  const minX = Math.min(...xs) - 4;
  const maxX = Math.max(...xs) + 4;
  const minY = Math.min(...ys) - 3;
  const maxY = Math.max(...ys) + 3;
  const cols = maxX - minX + 1;
  const rows = maxY - minY + 1;
  const tiles = [];
  for (let gy = maxY; gy >= minY; gy--) {
    for (let gx = minX; gx <= maxX; gx++) {
      const owned = ownedSet.has(`${gx},${gy}`);
      tiles.push(
        <rect
          key={`${gx},${gy}`}
          x={(gx - minX) * cell + 1}
          y={(maxY - gy) * cell + 1}
          width={cell - 2}
          height={cell - 2}
          rx={3}
          fill={owned ? palette.fill : "#18141a"}
          stroke={owned ? palette.empty : "#2c2731"}
          strokeWidth={owned ? 1.5 : 1}
        />
      );
    }
  }
  return (
    <div className="bdlanddetail__atlaswrapper">
      <svg
        className="bdlanddetail__atlas"
        viewBox={`0 0 ${cols * cell} ${rows * cell}`}
        preserveAspectRatio="xMidYMid slice"
        aria-label="LAND map"
      >
        <rect x="0" y="0" width={cols * cell} height={rows * cell} fill="#13101a" />
        {tiles}
      </svg>
    </div>
  );
}

export default function BdLandDetail({
  land = PARCEL_LAND,
  deployments = DEPLOYMENTS,
  ensList = ENS_LIST,
  rental = null,
  loading = false,
}) {
  const [tab, setTab] = useState("land");
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdlanddetail bdlanddetail--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  const isParcel = land.type === "parcel";
  const isEstate = land.type === "estate";
  const isOwnerLike = land.role === "owner" || land.role === "lessor";
  const isRenting = land.role === "lessor";

  const occupiedTotal = deployments.reduce(
    (total, d) => total + (d.layout ? d.layout.rows * d.layout.cols : 0),
    0
  );

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdlanddetail">
        <div className="bdlanddetail__container">
          <button type="button" className="bdlanddetail__back" aria-label="Back">
            <ChevronLeft size={18} />
          </button>

          <div className="bdlanddetail__header">
            <div className="bdlanddetail__titlegroup">
              <h1 className="bdlanddetail__name">{land.name}</h1>
              {isParcel ? (
                <span className="bdlanddetail__badge">
                  <PinGlyph />
                  {land.id}
                </span>
              ) : (
                <span className="bdlanddetail__badge">{land.size} LAND</span>
              )}
              <button type="button" className="bdlanddetail__jumpin" aria-label="Jump in" />
            </div>

            {isOwnerLike ? (
              <div className="bdlanddetail__actions">
                <button type="button" className="bdlanddetail__btn" disabled={isRenting}>
                  Transfer
                </button>
                <button type="button" className="bdlanddetail__btn" disabled={isRenting}>
                  Edit
                </button>
                <div className="bdlanddetail__ctxwrap">
                  <button
                    type="button"
                    className="bdlanddetail__iconbtn bdlanddetail__btn"
                    aria-label="Land options"
                    aria-expanded={menuOpen}
                    disabled={isRenting}
                    onClick={() => setMenuOpen((v) => !v)}
                  >
                    <DotsGlyph />
                  </button>
                  {menuOpen ? (
                    <ul className="bdlanddetail__dropdown is-right" role="menu">
                      {isEstate ? (
                        <>
                          <li role="menuitem">Add Or Remove Parcels</li>
                          <li role="menuitem" className="bdlanddetail__menudivider">Dissolve Estate</li>
                        </>
                      ) : null}
                      <li role="menuitem" className="bdlanddetail__menudivider">Set link</li>
                      <li role="menuitem">Set Operator</li>
                    </ul>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="bdlanddetail__section">
            <MiniAtlas land={land} />
          </div>

          <div className="bdlanddetail__section">
            <h3 className="bdlanddetail__subheader">Online Scenes</h3>
            {deployments.length === 0 ? (
              <div className="bdlanddetail__empty">None</div>
            ) : (
              <>
                <div className="bdlanddetail__deployments">
                  {deployments.map((d) => (
                    <Scene key={d.id} deployment={d} clickable={!isRenting && !!d.projectId} />
                  ))}
                </div>
                <div className="bdlanddetail__notice">{STATS_NOTICE}</div>
              </>
            )}
          </div>

          {ensList.length > 0 ? (
            <div className="bdlanddetail__section">
              <h3 className="bdlanddetail__subheader">Assigned names</h3>
              <div className="bdlanddetail__enslist">
                {ensList.map((ens) => (
                  <ENSChip key={ens.subdomain} subdomain={ens.subdomain} />
                ))}
              </div>
            </div>
          ) : null}

          {land.description ? (
            <div className="bdlanddetail__section">
              <h3 className="bdlanddetail__subheader">Description</h3>
              <p className="bdlanddetail__description">{land.description}</p>
            </div>
          ) : null}

          <div className="bdlanddetail__data">
            <div className="bdlanddetail__stat bdlanddetail__stat--role">
              <div className="bdlanddetail__stattitle">Role</div>
              <div className="bdlanddetail__statheader">{ROLE_LABEL[land.role]}</div>
              {rental ? (
                <span className="bdlanddetail__rental">
                  {rental.ended ? "Rental Period Over" : `Ends in ${rental.endsIn}`}
                </span>
              ) : null}
            </div>

            <div className="bdlanddetail__stat">
              <div className="bdlanddetail__stattitle">Owner</div>
              <Profile address={rental ? rental.lessor : land.owner} hue={280} />
            </div>

            {rental && land.role === "lessor" ? (
              <div className="bdlanddetail__stat">
                <div className="bdlanddetail__stattitle">Tenant</div>
                <Profile address={rental.tenant} hue={196} />
              </div>
            ) : null}

            {land.operators.length > 0 ? (
              <div className="bdlanddetail__stat">
                <div className="bdlanddetail__stattitle">Operated by</div>
                <div className="bdlanddetail__operators">
                  {land.operators.map((op, i) => (
                    <Profile key={i} address={op} hue={48 + i * 60} />
                  ))}
                </div>
              </div>
            ) : null}

            {isEstate ? (
              <>
                <div className="bdlanddetail__stat">
                  <div className="bdlanddetail__stattitle">Total Land</div>
                  <div className="bdlanddetail__statheader">{land.size}</div>
                </div>
                <div className="bdlanddetail__stat">
                  <div className="bdlanddetail__stattitle">Empty Land</div>
                  <div className="bdlanddetail__statheader">{land.size - occupiedTotal}</div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { PARCEL_LAND, ESTATE_LAND, DEPLOYMENTS, ENS_LIST };
