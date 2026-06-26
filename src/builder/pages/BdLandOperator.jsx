import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdlandoperator.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const ROLE_ATLAS = {
  owner: { fill: "#ff2d55", empty: "#ab2039" },
  lessor: { fill: "#ff743a", empty: "#d18157" },
  operator: { fill: "#982de2", empty: "#8f1d9b" },
  tenant: { fill: "#ff2d55", empty: "#ab2039" },
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
  parcels: [
    { x: 20, y: -8 },
    { x: 21, y: -8 },
    { x: 22, y: -8 },
    { x: 20, y: -9 },
    { x: 21, y: -9 },
    { x: 22, y: -9 },
  ],
};

const EXISTING_OPERATOR = "0x71c7656ec7ab88b098defb751b7401b5f6d8976f";

const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const isValidAddress = (v) => ADDRESS_RE.test((v || "").trim());
const isEqualAddress = (a, b) =>
  (a || "").trim().toLowerCase() === (b || "").trim().toLowerCase();
const shorten = (a) => (a ? a.slice(0, 6) + "..." + a.slice(-4) : "");

const CheckGlyph = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="#35cc63" />
    <path
      d="M5 8.4l2 2 4-4.4"
      fill="none"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const RemoveCircleGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" />
    <path d="M4.5 8h7" stroke="#16141a" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

function MiniAtlas({ land }) {
  const palette = ROLE_ATLAS[land.role] || ROLE_ATLAS.owner;
  const cell = 24;
  const ownedSet = new Set((land.parcels || []).map((p) => `${p.x},${p.y}`));
  const xs = (land.parcels || []).map((p) => p.x);
  const ys = (land.parcels || []).map((p) => p.y);
  const minX = Math.min(...xs) - 3;
  const maxX = Math.max(...xs) + 3;
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
          rx={2}
          fill={owned ? palette.fill : "#18141a"}
          stroke={owned ? palette.empty : "#2c2731"}
          strokeWidth={owned ? 1.4 : 1}
        />
      );
    }
  }
  return (
    <div className="bdlandoperator__atlas">
      <svg
        className="bdlandoperator__atlassvg"
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

function NotFound() {
  return (
    <div className="bdlandoperator__notfound">
      <h2 className="bdlandoperator__notfoundtitle">Not found</h2>
      <p className="bdlandoperator__notfoundtext">
        The page you are looking for could not be found.
      </p>
    </div>
  );
}

function LandOperatorForm({ land, initialOperator }) {
  const editing = !!initialOperator;
  const [address, setAddress] = useState(initialOperator || "");
  const [dirty, setDirty] = useState(false);
  const [revoked, setRevoked] = useState(false);

  const initial = initialOperator || "";
  const isRevokable = editing && isEqualAddress(address, initial);
  const hasError = !!address && !isValidAddress(address);
  const resolved = !revoked && isValidAddress(address) ? address : "";
  const isDisabled =
    !dirty || ((isEqualAddress(address, initial) || hasError) && !revoked);

  const handleChange = (e) => {
    setAddress(e.target.value);
    setDirty(true);
    setRevoked(false);
  };
  const handleRevoke = () => {
    setRevoked(true);
    setDirty(true);
  };
  const handleUndo = () => {
    setRevoked(false);
    setDirty(false);
  };

  const fieldClasses = ["bdlandoperator__field"];
  if (revoked) fieldClasses.push("is-revoked");
  if (editing) fieldClasses.push("is-editing");
  if (isRevokable) fieldClasses.push("is-revokable");
  if (hasError) fieldClasses.push("is-error");

  return (
    <form className="bdlandoperator__form" onSubmit={(e) => e.preventDefault()}>
      <div className={fieldClasses.join(" ")}>
        <label className="bdlandoperator__label" htmlFor="address">
          Address
        </label>
        <div className="bdlandoperator__inputwrap">
          {resolved ? (
            <span className="bdlandoperator__resolved" title={resolved}>
              {shorten(resolved)}
            </span>
          ) : null}
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="off"
            className="bdlandoperator__input"
            placeholder="0x..."
            value={address}
            onChange={handleChange}
          />
          {isRevokable ? (
            <button
              type="button"
              className="bdlandoperator__revoke"
              onClick={revoked ? handleUndo : handleRevoke}
            >
              {revoked ? "Undo" : "Revoke"}
            </button>
          ) : null}
          {!hasError && isValidAddress(address) && !revoked ? (
            <span className="bdlandoperator__validicon" aria-hidden="true">
              <CheckGlyph />
            </span>
          ) : null}
        </div>
        <p className="bdlandoperator__message">
          {hasError ? (
            <>
              <span className="bdlandoperator__messageicon" aria-hidden="true">
                <RemoveCircleGlyph />
              </span>
              Invalid address
            </>
          ) : (
            " "
          )}
        </p>
      </div>

      <div className="bdlandoperator__row">
        <a className="bdlandoperator__cancel" href={`#/land/${land.id}`}>
          <button type="button" className="bdlandoperator__btn">
            Cancel
          </button>
        </a>
        <button
          type="submit"
          className="bdlandoperator__btn bdlandoperator__btn--primary"
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default function BdLandOperator({
  land = PARCEL_LAND,
  initialOperator = EXISTING_OPERATOR,
  loading = false,
  notFound = false,
}) {
  const [tab, setTab] = useState("land");

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdlandoperator">
        <div className="bdlandoperator__page">
          {loading ? (
            <div className="bdlandoperator__loader">
              <Spinner size={56} />
            </div>
          ) : notFound ? (
            <NotFound />
          ) : (
            <div className="bdlandoperator__action">
              <div className="bdlandoperator__backrow">
                <button
                  type="button"
                  className="bdlandoperator__back"
                  aria-label="Back"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              <div className="bdlandoperator__main">
                <div className="bdlandoperator__narrow">
                  <div className="bdlandoperator__mapcol">
                    <MiniAtlas land={land} />
                  </div>

                  <div className="bdlandoperator__content">
                    <div className="bdlandoperator__section">
                      <h1 className="bdlandoperator__title">Set Operator</h1>
                      <span className="bdlandoperator__subtitle">
                        You are setting an operator for{" "}
                        <strong>{land.name}</strong>.
                        <br />
                        Operators can <strong>only</strong> deploy scenes to the
                        LAND.
                      </span>
                    </div>

                    <LandOperatorForm
                      land={land}
                      initialOperator={initialOperator}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BuilderChrome>
  );
}

export { PARCEL_LAND, ESTATE_LAND, EXISTING_OPERATOR };
