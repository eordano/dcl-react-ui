import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdlandtransfer.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const ROLE_ATLAS = {
  owner: { fill: "#ff2d55", empty: "#ab2039" },
};

const PARCEL_LAND = {
  id: "-45,12",
  name: "My Genesis Plot",
  type: "parcel",
  role: "owner",
  owner: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  parcels: [{ x: -45, y: 12 }],
};

const ESTATE_LAND = {
  id: "estate-204",
  name: "Aurora Estate",
  type: "estate",
  role: "owner",
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

const isValidAddress = (v) => /^0x[a-fA-F0-9]{40}$/.test(v);
const isEqualAddress = (a, b) =>
  !!a && !!b && a.toLowerCase() === b.toLowerCase();

const CheckCircleGlyph = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="#1fc25b" />
    <path
      d="M4.5 8.2l2.2 2.2 4.6-4.8"
      fill="none"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function MiniAtlas({ land }) {
  const palette = ROLE_ATLAS[land.role] || ROLE_ATLAS.owner;
  const cell = 32;
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
          rx={3}
          fill={owned ? palette.fill : "#18141a"}
          stroke={owned ? palette.empty : "#2c2731"}
          strokeWidth={owned ? 1.5 : 1}
        />
      );
    }
  }
  return (
    <div className="bdlandtransfer__atlas">
      <svg
        className="bdlandtransfer__atlassvg"
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

export default function BdLandTransfer({
  land = PARCEL_LAND,
  loading = false,
  notFound = false,
}) {
  const [tab, setTab] = useState("land");
  const [address, setAddress] = useState("");
  const valid = !address || isValidAddress(address);
  const isOwner = isEqualAddress(land.owner, address);

  let message;
  if (isOwner) {
    message = "That's already the owner";
  } else if (!valid) {
    message = "That's not a valid address";
  }
  const fieldError = !valid || isOwner;
  const showCheck = valid && address.length > 0 && !isOwner;

  const submitDisabled =
    !address || !valid || land.role !== "owner" || isOwner;

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdlandtransfer bdlandtransfer--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  if (notFound) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdlandtransfer bdlandtransfer--notfound">
          <div className="bdlandtransfer__nficon" aria-hidden="true">
            404
          </div>
          <h2 className="bdlandtransfer__nftitle">Not found</h2>
          <p className="bdlandtransfer__nftext">
            The LAND you are looking for doesn't exist.
          </p>
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdlandtransfer">
        <div className="bdlandtransfer__container">
          <div className="bdlandtransfer__backrow">
            <button type="button" className="bdlandtransfer__back" aria-label="Back">
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="bdlandtransfer__main">
            <div className="bdlandtransfer__mapcol">
              <MiniAtlas land={land} />
            </div>

            <div className="bdlandtransfer__content">
              <div className="bdlandtransfer__section">
                <h1 className="bdlandtransfer__title">Transfer</h1>
                <span className="bdlandtransfer__subtitle">
                  Your are about to transfer <strong>{land.name}</strong>.
                </span>
              </div>

              <form
                className="bdlandtransfer__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  className={
                    "bdlandtransfer__field" +
                    (fieldError ? " is-error" : "")
                  }
                >
                  <label className="bdlandtransfer__label" htmlFor="address">
                    Address
                  </label>
                  <div className="bdlandtransfer__inputwrap">
                    <input
                      id="address"
                      name="address"
                      className="bdlandtransfer__input"
                      type="text"
                      autoComplete="off"
                      placeholder="0x..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {showCheck ? (
                      <span className="bdlandtransfer__checkicon" aria-hidden="true">
                        <CheckCircleGlyph />
                      </span>
                    ) : null}
                  </div>
                  {message ? (
                    <div className="bdlandtransfer__message">{message}</div>
                  ) : null}
                </div>

                <div className="bdlandtransfer__disclaimer">
                  <p className="bdlandtransfer__dangertext">
                    Remember that transferring is an irreversible operation.
                    <br />
                    Please check the address carefully.
                  </p>
                </div>

                <div className="bdlandtransfer__actions">
                  <button type="button" className="bdlandtransfer__btn bdlandtransfer__cancel">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bdlandtransfer__btn bdlandtransfer__submit"
                    disabled={submitDisabled}
                  >
                    <span className="bdlandtransfer__neticon" aria-hidden="true" />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { PARCEL_LAND, ESTATE_LAND };
