import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdlandassignens.css";
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
  description: "A cozy corner of Genesis City.",
  parcels: [{ x: -45, y: 12 }],
};

const ENS_NAME = {
  nftOwnerAddress: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  ensOwnerAddress: "0x9f3c5b21a8d4e6f70c1b2a3d4e5f6a7b8c9d0e21",
  name: "aurora",
  subdomain: "aurora.dcl.eth",
  tokenId: "47781...9023",
  resolver: "0x0000000000000000000000000000000000000000",
  content: "",
};

const CheckIcon = () => (
  <svg className="bdlandassignens__check" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          strokeWidth={owned ? 1.5 : 1}
        />
      );
    }
  }
  return (
    <div className="bdlandassignens__atlas">
      <svg
        className="bdlandassignens__atlassvg"
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

function StepBox({ title, explanation, state, disabled, onClick }) {
  const isApproved = state === "approved";
  const isError = state === "error";
  const isLoading = state === "loading";
  const btnClass =
    "bdlandassignens__btn bdlandassignens__btn--primary" +
    (isApproved && !isLoading && !isError ? " bdlandassignens__btn--grey" : "");
  return (
    <div className={"bdlandassignens__box" + (disabled ? " is-disabled" : "")}>
      <h3 className="bdlandassignens__boxtitle">{title}</h3>
      <div className="bdlandassignens__messagebox">
        <p>{explanation}</p>
        <button
          type="submit"
          className={btnClass}
          disabled={disabled || isLoading}
          onClick={onClick}
        >
          {isLoading ? (
            <span className="bdlandassignens__btnloader">
              <Spinner size={16} color="#fff" />
            </span>
          ) : isError ? (
            "Retry"
          ) : isApproved ? (
            <>
              Approved
              <CheckIcon />
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

export default function BdLandAssignENS({
  land = PARCEL_LAND,
  ens = ENS_NAME,
  loading = false,
}) {
  const [tab, setTab] = useState("land");
  const [resolverState, setResolverState] = useState("idle");
  const [contentState, setContentState] = useState("idle");

  if (loading || !ens) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdlandassignens bdlandassignens--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  const hasResolver = resolverState === "approved";
  const hasContent = contentState === "approved";
  const hasData = hasResolver || hasContent;
  const needsReclaiming = ens.ensOwnerAddress !== ens.nftOwnerAddress;

  const resolverDisabled = hasData || needsReclaiming;
  const contentDisabled = !hasResolver || needsReclaiming || hasContent;

  const finishDisabled = !hasResolver || !hasContent;

  const handleResolver = () => {
    setResolverState("loading");
    setTimeout(() => setResolverState("approved"), 900);
  };
  const handleContent = () => {
    setContentState("loading");
    setTimeout(() => setContentState("approved"), 900);
  };

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdlandassignens">
        <div className="bdlandassignens__action">
          <div className="bdlandassignens__backrow">
            <button type="button" className="bdlandassignens__back" aria-label="Back">
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="bdlandassignens__main">
            <div className="bdlandassignens__narrow">
              <div className="bdlandassignens__atlascol">
                <MiniAtlas land={land} />
              </div>

              <div className="bdlandassignens__content">
                <div className="bdlandassignens__section">
                  <h1 className="bdlandassignens__title">Use {ens.subdomain} as link</h1>
                  <span className="bdlandassignens__subtitle">
                    This link will take you to{" "}
                    <a className="bdlandassignens__landlink" href={`/builder/land/${land.id}`}>
                      {land.name}
                    </a>
                  </span>
                </div>

                <form
                  className="bdlandassignens__form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <p className="bdlandassignens__message">
                    <strong>
                      Before you can assign this name to your land, you need to
                      submit 1 or 2 transactions:
                    </strong>{" "}
                    The first transaction allows you to use your name as a link
                    and the second transaction links your name to your LAND.
                  </p>

                  <StepBox
                    title="Set Resolver"
                    explanation="This allows your name to be linked to a land."
                    state={resolverState}
                    disabled={resolverDisabled}
                    onClick={handleResolver}
                  />

                  <StepBox
                    title="Set Content"
                    explanation="This resolves your name with a link to your land in Decentraland."
                    state={contentState}
                    disabled={contentDisabled}
                    onClick={handleContent}
                  />

                  <div className="bdlandassignens__confirm">
                    <button
                      type="button"
                      className="bdlandassignens__btn"
                      disabled={hasData}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="bdlandassignens__btn bdlandassignens__btn--primary"
                      disabled={finishDisabled}
                    >
                      Finish
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

export { PARCEL_LAND, ENS_NAME };
