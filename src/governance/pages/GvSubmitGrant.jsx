import { useMemo, useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import { asset } from "../../asset.js";
import "./gvsubmitgrant.css";

const VALID_CATEGORIES = [
  { id: "Accelerator", tone: "green", desc: "A private company or for-profit initiative in need of funding" },
  { id: "Core Unit", tone: "blue", desc: "Provide core infrastructure and operations for the DAO" },
  { id: "Documentation", tone: "purple", desc: "Creation of free educational content related to Decentraland’s dynamics" },
  { id: "In-World Content", tone: "red", desc: "Development of experiences aiming to improve user retention" },
  { id: "Platform", tone: "fuchsia", desc: "Creation of tools and applications extending our platform and ecosystem" },
  { id: "Social Media Content", tone: "yellow", desc: "Marketing efforts aiming to reach new users and keeping them engaged" },
  { id: "Sponsorship", tone: "orange", desc: "Supporting IRL initiatives targeting audiences relevant to Decentraland" },
];

const INVALID_CATEGORIES = [
  { id: "Community", tone: "neutral", desc: "Building and nurturing the Decentraland community" },
];

const PAGE_TITLE = "Request a Grant";
const PAGE_DESCRIPTION =
  "The Decentraland Grants program allocates MANA owned by the DAO to fund the creation of features or content beneficial to the Decentraland platform and its growth. Either individuals or teams may request grant funding through the DAO.";
const SUBMISSION_THRESHOLD_GRANT = "2,000,000";

const SECTIONS = ["Funding", "General Information", "Team", "Due Diligence", "Category-Specific Assessment", "Final Consent"];

function CategoryGlyph({ tone }) {
  return (
    <span className={"gvsubmitgrant__catglyph gvsubmitgrant__catglyph--" + tone} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-4 9 4-9 4-9-4Z" />
        <path d="M3 7v6l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    </span>
  );
}

function SectionIcon({ n, validated }) {
  return (
    <span className="gvsubmitgrant__secicon" aria-hidden="true">
      <svg viewBox="0 0 34 42" width="34" height="42" fill="none">
        <circle cx="16" cy="21" r="15.5" stroke="#736e7d" strokeOpacity="0.32" />
        <text x="16" y="26" textAnchor="middle" fontSize="15" fontWeight="600" fill="#16141a">{n}</text>
        {validated && (
          <>
            <circle cx="27" cy="32" r="6" fill="#44b600" stroke="#fff" strokeWidth="2" />
            <path d="M25 32C26 33 26.5 33.5 26.5 33.5L29.5 30.5" stroke="#fff" strokeWidth="1.2" />
          </>
        )}
      </svg>
    </span>
  );
}

function CategoryCard({ cat, disabled, onPick }) {
  return (
    <button
      type="button"
      className={
        "gvsubmitgrant__cat" +
        (disabled ? " is-disabled" : " gvsubmitgrant__cat--" + cat.tone)
      }
      disabled={disabled}
      onClick={() => !disabled && onPick(cat)}
    >
      <CategoryGlyph tone={disabled ? "neutral" : cat.tone} />
      <span className="gvsubmitgrant__catcontent">
        <span className="gvsubmitgrant__catname">{cat.id}</span>
        <span className="gvsubmitgrant__catdesc">{cat.desc}</span>
      </span>
    </button>
  );
}

function SectionCard({ title, helper, content, titleExtra, subtitle, caps }) {
  return (
    <div className="gvsubmitgrant__sectioncard">
      <div className="gvsubmitgrant__sccardhead">
        <span className="gvsubmitgrant__sccardtitle">{title}</span>
        {helper}
      </div>
      <div className="gvsubmitgrant__sccardcontent">
        {content ? (
          <span className="gvsubmitgrant__sccardvalue">{content}</span>
        ) : (
          <span className="gvsubmitgrant__sccardempty" aria-hidden="true" />
        )}
        {titleExtra && <span className="gvsubmitgrant__sccardextra">{titleExtra}</span>}
      </div>
      <div className={caps ? "gvsubmitgrant__sccardcapsub" : "gvsubmitgrant__sccardsub"}>{subtitle}</div>
    </div>
  );
}

const Helper = () => (
  <span className="gvsubmitgrant__helper" aria-hidden="true">?</span>
);

function FormSection({ n, title, validated, children }) {
  return (
    <section className="gvsubmitgrant__section">
      <div className="gvsubmitgrant__sectionhead">
        <SectionIcon n={n} validated={validated} />
        <span className="gvsubmitgrant__sectiontitle">{title}</span>
        <span className="gvsubmitgrant__rule" aria-hidden="true" />
      </div>
      {children && <div className="gvsubmitgrant__sectionbody">{children}</div>}
    </section>
  );
}

export default function GvSubmitGrant({ initialCategory = null }) {
  const [tab, setTab] = useState("projects");
  const [category, setCategory] = useState(initialCategory);
  const [funding, setFunding] = useState("");
  const [duration, setDuration] = useState(3);
  const [vesting, setVesting] = useState("first");
  const [token, setToken] = useState("MANA");

  const isCategorySelected = category !== null;

  const passThreshold = useMemo(() => {
    const f = Number(funding);
    if (!f) return null;
    return Math.round(2000 + f * 0.5).toLocaleString();
  }, [funding]);

  return (
    <GovernanceChrome active={tab} onTab={setTab}>
      <div className="gvsubmitgrant">
        <div className="gvsubmitgrant__head">
          <div className="gvsubmitgrant__headleft">
            <img className="gvsubmitgrant__logo" src={asset("assets/dcl-logo.png")} alt="" />
            <h1 className="gvsubmitgrant__h1">{PAGE_TITLE}</h1>
          </div>
          <button type="button" className="gvsubmitgrant__cancel">Cancel</button>
        </div>

        <p className="gvsubmitgrant__desc">{PAGE_DESCRIPTION}</p>
        <p className="gvsubmitgrant__desc gvsubmitgrant__desc--fine">
          This action requires at least {SUBMISSION_THRESHOLD_GRANT} VP. Buy MANA to get VP, or run for delegate.
        </p>

        {!isCategorySelected ? (
          <div className="gvsubmitgrant__selector">
            <p className="gvsubmitgrant__selectordesc">Choose a category that best suits your project</p>
            <div className="gvsubmitgrant__catgrid">
              {VALID_CATEGORIES.map((c) => (
                <CategoryCard key={c.id} cat={c} onPick={setCategory} />
              ))}
            </div>

            <p className="gvsubmitgrant__suspended">
              The budget allocation for the following Grant categories has been suspended for the time being as a
              result of a binding community decision on this proposal.
            </p>
            <div className="gvsubmitgrant__catgrid">
              {INVALID_CATEGORIES.map((c) => (
                <CategoryCard key={c.id} cat={c} disabled />
              ))}
            </div>

            <p className="gvsubmitgrant__doc">
              Not sure which one to choose? Find out more about our Categories on our Grants Documentation.
            </p>
          </div>
        ) : (
          <div className="gvsubmitgrant__form">
            <FormSection n={1} title="Funding" validated={!!funding}>
              <div className="gvsubmitgrant__cardrow">
                <SectionCard
                  title="Project Category"
                  helper={
                    <button type="button" className="gvsubmitgrant__cardaction" onClick={() => setCategory(null)}>
                      Change
                    </button>
                  }
                  content={category.id}
                  subtitle={category.desc}
                />
                <SectionCard
                  title="Remaining Category Budget"
                  helper={<Helper />}
                  content="$501,750"
                  titleExtra="(83%)"
                  subtitle="Category total for Q: $605,000"
                  caps
                />
              </div>

              <div className="gvsubmitgrant__cardrow">
                <div className="gvsubmitgrant__field">
                  <span className="gvsubmitgrant__label">Desired Funding</span>
                  <div className="gvsubmitgrant__budget">
                    <span className="gvsubmitgrant__budgetusd">USD</span>
                    <input
                      className="gvsubmitgrant__budgetinput"
                      type="number"
                      placeholder="100-240000"
                      value={funding}
                      onChange={(e) => setFunding(e.target.value)}
                    />
                  </div>
                  <span className="gvsubmitgrant__sub">More about our Funding Tiers</span>
                </div>
                <div className="gvsubmitgrant__field">
                  <span className="gvsubmitgrant__label">Estimated Project Duration</span>
                  <div className="gvsubmitgrant__stepper">
                    <button type="button" className="gvsubmitgrant__stepbtn" onClick={() => setDuration((d) => Math.max(1, d - 1))}>−</button>
                    <span className="gvsubmitgrant__stepval">{duration} months</span>
                    <button type="button" className="gvsubmitgrant__stepbtn" onClick={() => setDuration((d) => Math.min(12, d + 1))}>+</button>
                  </div>
                </div>
              </div>

              <div className="gvsubmitgrant__cardrow">
                <SectionCard
                  title="Pass Threshold"
                  helper={<Helper />}
                  content={passThreshold ? `${passThreshold} VP in 14 days` : null}
                  subtitle="Accumulated VP needed for this proposal to pass"
                />
                <SectionCard
                  title="Payout Strategy"
                  helper={<Helper />}
                  content={funding ? `${duration} Monthly Payments` : null}
                  subtitle="Executed 7 days after the proposal has passed"
                />
              </div>

              <div className="gvsubmitgrant__field">
                <span className="gvsubmitgrant__label">What time of the month would you like for the funding to happen?</span>
                <label className="gvsubmitgrant__radio">
                  <input type="radio" name="gvsg-vesting" checked={vesting === "first"} onChange={() => setVesting("first")} />
                  <span className="gvsubmitgrant__radiomark" aria-hidden="true" />
                  1st day of month
                </label>
                <label className="gvsubmitgrant__radio">
                  <input type="radio" name="gvsg-vesting" checked={vesting === "fifteenth"} onChange={() => setVesting("fifteenth")} />
                  <span className="gvsubmitgrant__radiomark" aria-hidden="true" />
                  15th day of month
                </label>
              </div>

              <div className="gvsubmitgrant__field">
                <span className="gvsubmitgrant__label">What is your preferred payment token?</span>
                <label className="gvsubmitgrant__radio">
                  <input type="radio" name="gvsg-token" checked={token === "MANA"} onChange={() => setToken("MANA")} />
                  <span className="gvsubmitgrant__radiomark" aria-hidden="true" />
                  MANA
                </label>
                <label className="gvsubmitgrant__radio">
                  <input type="radio" name="gvsg-token" checked={token === "DAI"} onChange={() => setToken("DAI")} />
                  <span className="gvsubmitgrant__radiomark" aria-hidden="true" />
                  DAI
                </label>
              </div>
            </FormSection>

            {SECTIONS.slice(1).map((title, i) => (
              <FormSection key={title} n={i + 2} title={title} validated={false} />
            ))}

            <div className="gvsubmitgrant__submitrow">
              <button type="button" className="gvsubmitgrant__submit" disabled={!funding}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </GovernanceChrome>
  );
}
