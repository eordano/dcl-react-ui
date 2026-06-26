import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import { ChevronLeft, Caret } from "../../atoms/icons.jsx";
import "./bdlandselectens.css";

const LAND = {
  id: "-45,12",
  name: "My Genesis Plot",
  type: "parcel",
  role: "owner",
  parcels: [{ x: -45, y: 12 }],
};

const ENS_LIST = [
  { name: "genesisplot", subdomain: "genesisplot.dcl.eth", landId: null },
  { name: "aurora", subdomain: "aurora.dcl.eth", landId: null },
  { name: "nightowl", subdomain: "nightowl.dcl.eth", landId: "-45,12" },
];

const ROLE_ATLAS = {
  owner: { fill: "#ff2d55", empty: "#ab2039" },
  lessor: { fill: "#ff743a", empty: "#d18157" },
  operator: { fill: "#982de2", empty: "#8f1d9b" },
  tenant: { fill: "#ff2d55", empty: "#ab2039" },
};

function MiniAtlas({ land }) {
  const palette = ROLE_ATLAS[land.role] || ROLE_ATLAS.owner;
  const cell = 30;
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
    <div className="bdselectens__atlas">
      <svg
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

function SelectForm({ land, ensList, isLoading }) {
  const [selectedName, setSelectedName] = useState("");
  const [open, setOpen] = useState(false);

  const isEmpty = !isLoading && ensList.length === 0;
  const selectedENS = ensList.find((e) => e.name === selectedName);
  const isAssigned = !!selectedENS && selectedENS.landId === land.id;
  const isButtonDisabled = !selectedENS || isAssigned;

  if (isEmpty) {
    return (
      <form className="bdselectens__form" onSubmit={(e) => e.preventDefault()}>
        <div className="bdselectens__section bdselectens__empty">
          You don't have any available names. To assign a name to your LAND, you
          first need to claim it.
        </div>
        <div className="bdselectens__row">
          <button type="button" className="bdselectens__btn bdselectens__cancel">
            Cancel
          </button>
          <button type="button" className="bdselectens__btn is-primary">
            Claim a new name
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="bdselectens__form" onSubmit={(e) => e.preventDefault()}>
      <div className="bdselectens__section">
        <div className="bdselectens__selectnames">
          <div className="bdselectens__subheader">My names</div>
          <div className="bdselectens__dropdown">
            <button
              type="button"
              className="bdselectens__ddtrigger"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={
                  "bdselectens__ddtext" + (selectedENS ? "" : " is-default")
                }
              >
                {selectedENS ? selectedENS.subdomain : "Choose a name..."}
              </span>
              <Caret size={14} className="bdselectens__caret" />
            </button>
            {open ? (
              <ul className="bdselectens__menu" role="listbox">
                {ensList.map((ens) => (
                  <li
                    key={ens.name}
                    role="option"
                    aria-selected={ens.name === selectedName}
                    className={
                      "bdselectens__option" +
                      (ens.name === selectedName ? " is-selected" : "")
                    }
                    onClick={() => {
                      setSelectedName(ens.name);
                      setOpen(false);
                    }}
                  >
                    {ens.subdomain}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="bdselectens__message">
          {isAssigned ? (
            <span className="bdselectens__danger">
              This name has been assigned to this land
            </span>
          ) : (
            <span>
              <a className="bdselectens__link" href="#claim">
                Click here
              </a>{" "}
              to claim a new name
            </span>
          )}
        </div>
      </div>

      <div className="bdselectens__row">
        <button type="button" className="bdselectens__btn bdselectens__cancel">
          Cancel
        </button>
        <button
          type="submit"
          className="bdselectens__btn is-primary"
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? (
            <span className="bdselectens__btnspin">
              <Spinner size={16} />
            </span>
          ) : null}
          Continue
        </button>
      </div>
    </form>
  );
}

export default function BdLandSelectENS({
  land = LAND,
  ensList = ENS_LIST,
  isLoading = false,
  empty = false,
}) {
  const [tab, setTab] = useState("land");
  const list = empty ? [] : ensList;

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdselectens">
        <div className="bdselectens__container">
          <div className="bdselectens__backrow">
            <button type="button" className="bdselectens__back" aria-label="Back">
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="bdselectens__main">
            <div className="bdselectens__atlascol">
              <MiniAtlas land={land} />
            </div>

            <div className="bdselectens__content">
              <div className="bdselectens__titlesection">
                <h1 className="bdselectens__title">Select a Name</h1>
                <span className="bdselectens__subtitle">
                  It will be used as a link to{" "}
                  <a className="bdselectens__link" href="#land">
                    {land.name}
                  </a>
                </span>
              </div>

              <SelectForm land={land} ensList={list} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { LAND, ENS_LIST };
