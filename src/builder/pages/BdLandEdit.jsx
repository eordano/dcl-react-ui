import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdlandedit.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const ROLE_ATLAS = {
  owner: { fill: "#ff2d55", empty: "#ab2039" },
  lessor: { fill: "#ff743a", empty: "#d18157" },
  operator: { fill: "#982de2", empty: "#8f1d9b" },
  tenant: { fill: "#ff2d55", empty: "#ab2039" },
};

const PARCEL_LAND = {
  id: "-45,12",
  tokenId: "115...0012",
  type: "parcel",
  x: -45,
  y: 12,
  size: 1,
  role: "owner",
  roles: ["owner"],
  owner: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  operators: [],
  name: "My Genesis Plot",
  description:
    "A cozy corner of Genesis City, two parcels from the central road. Home to a small interactive gallery.",
  parcels: [{ x: -45, y: 12 }],
};

const ESTATE_LAND = {
  id: "estate-204",
  tokenId: "204",
  type: "estate",
  size: 6,
  role: "owner",
  roles: ["owner"],
  owner: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  operators: [],
  name: "Aurora Estate",
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
          strokeWidth={owned ? 1.5 : 1}
        />
      );
    }
  }
  return (
    <div className="bdlandedit__atlas">
      <svg
        className="bdlandedit__atlassvg"
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

function Field({ label, value, onChange }) {
  return (
    <div className="bdlandedit__field">
      <div className="bdlandedit__fieldlabel">
        <label>{label}</label>
      </div>
      <div className="bdlandedit__input">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

export default function BdLandEdit({ land = PARCEL_LAND, loading = false }) {
  const [tab, setTab] = useState("land");
  const [name, setName] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdlandedit bdlandedit--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  const getName = () => (typeof name === "undefined" ? land.name : name);
  const getDescription = () =>
    typeof description === "undefined" ? land.description || "" : description;

  const isPristine = !name && !description;
  const submitDisabled = isPristine || !getName() || land.role !== "owner";

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdlandedit">
        <div className="bdlandedit__action">
          <div className="bdlandedit__backrow">
            <button type="button" className="bdlandedit__back" aria-label="Back">
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="bdlandedit__main">
            <div className="bdlandedit__narrow">
              <div className="bdlandedit__atlascol">
                <MiniAtlas land={land} />
              </div>

              <div className="bdlandedit__content">
                <div className="bdlandedit__section">
                  <h1 className="bdlandedit__title">Edit</h1>
                  <span className="bdlandedit__subtitle">
                    You are editing <strong>{land.name}</strong>.
                  </span>
                </div>

                <form
                  className="bdlandedit__form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Field label="Name" value={getName()} onChange={setName} />
                  <Field
                    label="Description"
                    value={getDescription()}
                    onChange={setDescription}
                  />

                  <div className="bdlandedit__row">
                    <span className="bdlandedit__cancel">
                      <button type="button" className="bdlandedit__btn">
                        Cancel
                      </button>
                    </span>
                    <button
                      type="submit"
                      className="bdlandedit__btn bdlandedit__btn--primary"
                      disabled={submitDisabled}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { PARCEL_LAND, ESTATE_LAND };
