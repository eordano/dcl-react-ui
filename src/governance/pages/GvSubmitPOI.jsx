import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import { ChevronLeft } from "../../atoms/icons.jsx";
import "./gvsubmitpoi.css";

const COORD = {
  x: { min: -150, max: 163 },
  y: { min: -150, max: 159 },
};

const DESCRIPTION_LIMIT = 250;
const DESCRIPTION_MIN = 20;

const VARIANTS = {
  add: {
    title: "Add a Point of Interest",
    coordinates_label: "What location do you want to add as a POI?",
    description_detail:
      "Why do you think that this location should be a featured point of interest within Decentraland? Please describe the scene located at these coordinates, explaining how it would be interesting or helpful for other Decentraland users.",
    description_placeholder:
      "The scene located at 0,0 is both visually stunning and informative for new users. The interactive tutorial hosted here would provide people with a fun and enjoyable way to learn more about Decentraland.",
  },
  remove: {
    title: "Remove a Point of Interest",
    coordinates_label: "What location do you want to remove as a POI?",
    description_detail:
      "Why do you think that this location should be removed as a featured point of interest within Decentraland? Please describe the scene located at these coordinates, explaining why it is no longer an interesting or helpful place for other Decentraland users.",
    description_placeholder:
      "The scene located at 0,0 is no longer visually stunning for users. The location has been abandoned for a long time.",
  },
};

const POI_DESCRIPTION =
  "Points of interest (POIs) are scenes that have been highlighted on Decentraland’s map in a ‘pin drop’ form, helping other users to quickly find and access especially interesting areas.";
const COORDINATES_DETAIL = "Enter the X and Y coordinates of the location.";
const COORD_PLACEHOLDER = "-150 through 150";
const DESCRIPTION_LABEL = "Description";
const MARKDOWN_NOTICE =
  "You can format your proposal using markdown! Toggle the preview switch to see how your post will be displayed.";

const CloseGlyph = ({ size = 14 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const LockGlyph = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
const NotFoundGlyph = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.2 9.2a3 3 0 0 1 5.5 1.2c0 2-2.7 2.4-2.7 3.6M12 17h.01" />
  </svg>
);

function FieldLabel({ children, markdown, optional }) {
  return (
    <label className="gvpoi__label">
      <span>{children}</span>
      {markdown ? (
        <sup className="gvpoi__notice" title={MARKDOWN_NOTICE}>
          (markdown)
        </sup>
      ) : null}
      {optional ? <sup className="gvpoi__optional">(optional)</sup> : null}
    </label>
  );
}

function MarkdownField({ value, onChange, disabled, error, placeholder, name }) {
  const [preview, setPreview] = useState(false);
  return (
    <div className={"gvpoi__mdfield" + (error ? " is-error" : "")}>
      <div className="gvpoi__mdbar" aria-hidden="true">
        <button type="button" className="gvpoi__mdbtn" title="Bold">B</button>
        <button type="button" className="gvpoi__mdbtn" title="Italic"><i>I</i></button>
        <button type="button" className="gvpoi__mdbtn" title="Link">↗</button>
        <button type="button" className="gvpoi__mdbtn" title="List">•</button>
        <span className="gvpoi__mdspacer" />
        <label className="gvpoi__mdtoggle">
          <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} disabled={disabled} />
          <span className="gvpoi__mdswitch" />
          Preview
        </label>
      </div>
      <textarea
        className="gvpoi__textarea"
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function GvSubmitPOI({
  request = "add",
  account = "0x9f3c…7a21",
  votingPower = 12480,
  authState = "ready",
}) {
  const [tab, setTab] = useState("proposals");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [description, setDescription] = useState("");
  const [coAuthors, setCoAuthors] = useState([]);
  const [error] = useState("");

  const variant = VARIANTS[request];

  const addCoAuthor = () =>
    setCoAuthors((list) =>
      list.length >= 5
        ? list
        : [
            ...list,
            {
              addr:
                "0x" +
                Math.random().toString(16).slice(2, 6) +
                "…" +
                Math.random().toString(16).slice(2, 6),
              hue: Math.floor(Math.random() * 360),
            },
          ]
    );
  const removeCoAuthor = (i) => setCoAuthors((list) => list.filter((_, idx) => idx !== i));

  const xNum = x === "" ? null : Number(x);
  const yNum = y === "" ? null : Number(y);
  const xOut = xNum !== null && (xNum < COORD.x.min || xNum > COORD.x.max);
  const yOut = yNum !== null && (yNum < COORD.y.min || yNum > COORD.y.max);
  const coordError = xOut || yOut ? "These coordinates are outside of the map limits." : "";

  if (!variant) {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account={account} vp={votingPower.toLocaleString()}>
        <div className="gvpoi">
          <div className="gvpoi__notfound">
            <div className="gvpoi__notfoundicon" aria-hidden="true"><NotFoundGlyph /></div>
            <h1 className="gvpoi__notfoundtitle">Page not found</h1>
            <p className="gvpoi__notfounddesc">
              The proposal type you are looking for doesn’t exist. Choose to add or remove a Point
              of Interest from the proposal menu.
            </p>
            <button type="button" className="gvpoi__loginbtn">Back to proposals</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  if (authState === "loading") {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account={account}>
        <div className="gvpoi">
          <div className="gvpoi__loading">
            <span className="gvpoi__spinner" aria-hidden="true" />
            Loading…
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  if (authState === "guest") {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account="Sign in">
        <div className="gvpoi">
          <div className="gvpoi__login">
            <div className="gvpoi__loginicon" aria-hidden="true"><LockGlyph /></div>
            <h1 className="gvpoi__logintitle">{variant.title}</h1>
            <p className="gvpoi__logindesc">{POI_DESCRIPTION}</p>
            <button type="button" className="gvpoi__loginbtn">Sign in</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <GovernanceChrome active={tab} onTab={setTab} account={account} vp={votingPower.toLocaleString()}>
      <div className="gvpoi">
        <button type="button" className="gvpoi__back" aria-label="Back">
          <ChevronLeft size={16} strokeWidth={2.2} />
        </button>

        <div className="gvpoi__col">
          <header className="gvpoi__section">
            <h1 className="gvpoi__title">{variant.title}</h1>
          </header>

          <div className="gvpoi__section">
            <p className="gvpoi__intro">{POI_DESCRIPTION}</p>
          </div>

          <form className="gvpoi__form" onSubmit={onSubmit}>
            <div className="gvpoi__section">
              <FieldLabel>{variant.coordinates_label}</FieldLabel>
              <p className="gvpoi__sublabel">{COORDINATES_DETAIL}</p>
              <div className="gvpoi__coords">
                <input
                  className={"gvpoi__coordinput" + (xOut ? " is-error" : "")}
                  type="number"
                  inputMode="numeric"
                  min={COORD.x.min}
                  max={COORD.x.max}
                  placeholder={COORD_PLACEHOLDER}
                  aria-label="X coordinate"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                />
                <input
                  className={"gvpoi__coordinput" + (yOut ? " is-error" : "")}
                  type="number"
                  inputMode="numeric"
                  min={COORD.y.min}
                  max={COORD.y.max}
                  placeholder={COORD_PLACEHOLDER}
                  aria-label="Y coordinate"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                />
                {coordError ? <div className="gvpoi__coorderror">{coordError}</div> : null}
              </div>
            </div>

            <div className="gvpoi__section">
              <FieldLabel markdown>{DESCRIPTION_LABEL}</FieldLabel>
              <p className="gvpoi__sublabel">{variant.description_detail}</p>
              <MarkdownField
                name="description"
                value={description}
                placeholder={variant.description_placeholder}
                error={description.length > 0 && description.length < DESCRIPTION_MIN}
                onChange={setDescription}
              />
              <div className="gvpoi__message">
                {description.length > 0 && description.length < DESCRIPTION_MIN ? (
                  <span className="gvpoi__error">This description is too short.</span>
                ) : null}
                <span>
                  ({description.length} out of {DESCRIPTION_LIMIT} characters)
                </span>
              </div>
            </div>

            <div className="gvpoi__section">
              <FieldLabel optional>Co-authors</FieldLabel>
              <p className="gvpoi__sublabel">
                If you co-authored this proposal with someone else, you can add their wallet addresses
                to acknowledge their work. After you publish the proposal, co-authors will be asked to
                confirm or reject the request. Only if they confirm, they will be listed publicly on
                the proposal page.
              </p>
              <div className="gvpoi__coauthors">
                {coAuthors.map((c, i) => (
                  <span className="gvpoi__coauthor" key={i}>
                    <span className="u-avatar" style={{ "--sz": "22px", "--hue": c.hue }} aria-hidden="true" />
                    {c.addr}
                    <button
                      type="button"
                      className="gvpoi__coremove"
                      aria-label="Remove co-author"
                      onClick={() => removeCoAuthor(i)}
                    >
                      <CloseGlyph size={12} />
                    </button>
                  </span>
                ))}
                {coAuthors.length < 5 ? (
                  <button type="button" className="gvpoi__coadd" onClick={addCoAuthor}>
                    + Add co-author
                  </button>
                ) : null}
              </div>
            </div>

            <div className="gvpoi__submitrow">
              <button type="submit" className="gvpoi__submit">Submit proposal</button>
            </div>

            {error ? (
              <div className="gvpoi__section">
                <div className="gvpoi__errorbox" role="alert">
                  <span className="gvpoi__errorlabel">
                    There was an error while trying to create the proposal, please try again later.
                  </span>
                  <span className="gvpoi__errortext">{error}</span>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </GovernanceChrome>
  );
}
