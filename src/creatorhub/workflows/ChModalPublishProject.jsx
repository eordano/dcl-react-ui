import { useMemo, useState } from "react";
import { asset } from "../../asset.js";
import { ChevronLeft, ChevronDownAlt, ChevronRight as ChevronRightIcon, Close } from "../../atoms/icons.jsx";
import "./chmodalpublishproject.css";

const LayersIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const GridIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const WorldIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" fill="currentColor" />
    <circle cx="12" cy="10" r="2.6" fill="#000" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M12 11v5M12 7.6v.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 19 19" width="16" height="16" aria-hidden="true">
    <path
      d="M13.3 1H4.3C3.5 1 2.8 1.6 2.8 2.5V13h1.5V2.5h9V1ZM15.6 4H7.3C6.5 4 5.8 4.6 5.8 5.5V16c0 .8.7 1.5 1.5 1.5h8.3c.8 0 1.5-.7 1.5-1.5V5.5C17 4.6 16.4 4 15.6 4Zm0 12H7.3V5.5h8.3V16Z"
      fill="#A09BA8"
    />
  </svg>
);

const LogoDCL = () => (
  <span className="chp__provlogo" aria-hidden="true">
    <img src={asset("assets/dcl-logo.png")} alt="" />
  </span>
);

const SuccessArt = () => (
  <svg className="chp__successicon" viewBox="0 0 85 65" width="80" height="80" aria-hidden="true">
    <defs>
      <linearGradient id="chp-success" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFBC5B" />
        <stop offset="0.505" stopColor="#FF2D55" />
        <stop offset="1" stopColor="#C640CD" />
      </linearGradient>
    </defs>
    <path
      d="M27.6 50.7 7.7 30.8.9 37.5l26.7 26.7L84.9 6.9 78.2.2 27.6 50.7Z"
      fill="url(#chp-success)"
    />
  </svg>
);

const WarningArt = ({ size = 70 }) => (
  <svg className="chp__warnicon" viewBox="0 0 82 70" width={(size * 82) / 70} height={size} aria-hidden="true">
    <defs>
      <linearGradient id="chp-warn" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FF2D55" />
        <stop offset="1" stopColor="#C640CD" />
      </linearGradient>
    </defs>
    <path d="M40.8 14.7 68.5 62.6H13L40.8 14.7Zm0-14.7L.2 70h81L40.8 0Z" fill="url(#chp-warn)" />
    <path d="M44.4 51.6h-7.4v7.4h7.4v-7.4Z" fill="url(#chp-warn)" />
    <path d="M44.4 29.5h-7.4v18.4h7.4V29.5Z" fill="url(#chp-warn)" />
  </svg>
);

function Step({ index, name, description, state }) {
  const bullet = state === "complete" ? "✓" : state === "failed" ? "✕" : index;
  return (
    <div className={"chp__step chp__step--" + state}>
      <div className="chp__bullet">{bullet}</div>
      <div className="chp__stepbody">
        <h4>{name}</h4>
        {description ? <span>{description}</span> : null}
      </div>
    </div>
  );
}
function ConnectedSteps({ steps }) {
  return (
    <div className="chp__steps">
      {steps.map((s, i) => (
        <Step key={i} {...s} />
      ))}
    </div>
  );
}

function PublishModal({ title, subtitle, size = "small", showBack = true, empty = false, children }) {
  return (
    <div className="chp__backdrop">
      <div
        className={"chp__modal chp__modal--" + size}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Publish project"}
      >
        <header className="chp__header">
          {showBack ? (
            <button type="button" className="chp__iconbtn chp__back" aria-label="back">
              <ChevronLeft size={22} />
            </button>
          ) : null}
          <h2 className="chp__titletext">{title}</h2>
          <button type="button" className="chp__iconbtn chp__close" aria-label="close">
            <Close size={20} />
          </button>
        </header>
        {subtitle ? <p className="chp__subtitle">{subtitle}</p> : null}
        <div className={"chp__body" + (empty ? " chp__body--empty" : "")}>{children}</div>
      </div>
    </div>
  );
}

function OptionBox({ thumbnail, title, description, buttonText, learnMore }) {
  return (
    <div className="chp__optionbox">
      <div className="chp__optthumb" style={{ background: thumbnail }} />
      <h3>{title}</h3>
      <span className="chp__optdesc">{description}</span>
      <button type="button" className="chp__btn chp__btn--secondary">{buttonText}</button>
      {learnMore ? <span className="chp__learnmore">Learn more</span> : null}
    </div>
  );
}

function ChipsRow({ network, address, username, verified, parcel, role, isWorld }) {
  return (
    <div className="chp__chips">
      <div className="chp__chip chp__chip--network">{network}</div>
      <div className="chp__chip chp__chip--address">{address}</div>
      {isWorld ? (
        <div className="chp__chip chp__chip--username">
          {username}
          {verified ? <i className="chp__verified" aria-label="verified" /> : null}
        </div>
      ) : (
        <div className="chp__chip chp__chip--parcel">
          <PinIcon />
          {parcel}
        </div>
      )}
      {role ? <div className="chp__chip chp__chip--role">{role}</div> : null}
    </div>
  );
}

function ProjectInfo({ project }) {
  return (
    <div className="chp__info">
      <div className="chp__projthumb" style={{ background: project.grad }} />
      <div className="chp__projtext">
        <div className="chp__projtitle">{project.title}</div>
        <div className="chp__projparcels">
          <GridIcon size={12} />
          Scene size: {project.size}
        </div>
      </div>
    </div>
  );
}

function ProjectStepWrapper({ isWorld, project, chips, className = "", children }) {
  return (
    <div className="chp__stepwrapper">
      <ChipsRow {...chips} isWorld={isWorld} />
      <div className="chp__projcontainer">
        <ProjectInfo project={project} />
        <div className={"chp__content " + className}>{children}</div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label }) {
  if (!label) return null;
  return (
    <div className="chp__worldinfoitem">
      {icon}
      <span>{label}</span>
    </div>
  );
}

const PROJECT = {
  title: "Neon Night Market",
  size: "2x2",
  grad: "linear-gradient(135deg, #ff2d55 0%, #350447 100%)",
};
const WORLD = {
  title: "My Store World",
  scenes: 3,
  size: "4x4",
  grad: "linear-gradient(135deg, #438fff 0%, #2f004d 100%)",
};
const CHIPS_WORLD = {
  network: "Mainnet",
  address: "0x9f3c…7a21",
  username: "javier.dcl",
  verified: true,
  role: "Owner",
};
const CHIPS_LAND = {
  network: "Mainnet",
  address: "0x9f3c…7a21",
  parcel: "12,-34",
  role: "Owner",
};
const FILES = [
  { name: "scene.json", size: "1.2 KB" },
  { name: "bin/game.js", size: "842 KB" },
  { name: "assets/models/market.glb", size: "3.4 MB" },
  { name: "assets/models/stall.glb", size: "1.9 MB" },
  { name: "assets/textures/neon_atlas.png", size: "2.1 MB" },
  { name: "assets/audio/ambient_loop.mp3", size: "1.1 MB" },
  { name: "assets/scene-thumbnail.png", size: "210 KB" },
];

function InitialStep() {
  return (
    <PublishModal
      title={'Publish "Neon Night Market"'}
      subtitle="Where would you like to deploy your scene to?"
      size="small"
      showBack={false}
    >
      <div className="chp__initial">
        <div className="chp__options">
          <OptionBox
            thumbnail="linear-gradient(135deg, #7a3df0 0%, #2a0c52 100%)"
            title="Worlds"
            description="Your own virtual space, separate from Genesis City. Claim yours when you get a NAME."
            buttonText="Publish to a World"
            learnMore
          />
          <OptionBox
            thumbnail="linear-gradient(135deg, #34ce76 0%, #0e3b2b 100%)"
            title="My Land"
            description="The parcels that make up Decentraland's Genesis City map. Buy or rent your own in the Marketplace."
            buttonText="Publish to Land"
            learnMore
          />
        </div>
        <span className="chp__altlink">Publish to a different server</span>
      </div>
    </PublishModal>
  );
}

function AlternativeServersStep({ option = "test" }) {
  const isCustom = option === "custom";
  return (
    <PublishModal
      title="Publish to a different server"
      subtitle="Where would you like to deploy your scene to?"
      size="small"
    >
      <div className="chp__altservers">
        <div className="chp__altbox">
          <div className="chp__altselection">
            <div className="chp__altleft">
              <h3>Alternate Servers</h3>
              <button type="button" className="chp__altselect">
                <span>{isCustom ? "Custom Server" : "Test Server"}</span>
                <ChevronDownAlt size={20} />
              </button>
              {isCustom ? (
                <div className="chp__custominput">
                  <span className="chp__customtitle">Server URL</span>
                  <input defaultValue="https://my-content-server.example.com" />
                  <span className="chp__customerror" />
                </div>
              ) : null}
            </div>
            <div
              className="chp__altthumb"
              style={{ background: "linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)" }}
            />
          </div>
          <div className="chp__altactions">
            <span className="chp__learnmore">Learn more</span>
            <button type="button" className="chp__btn chp__btn--primary">
              {isCustom ? "Publish to Custom Server" : "Publish to Test Server"}
            </button>
          </div>
        </div>
      </div>
    </PublishModal>
  );
}

function PublishToWorldStep() {
  const [multiScene, setMultiScene] = useState(true);
  return (
    <PublishModal title="Publish to your World" size="large">
      <ProjectStepWrapper isWorld project={PROJECT} chips={CHIPS_WORLD}>
        <div className="chp__selectworld">
          <div className="chp__selection">
            <p className="chp__desc">Choose the domain where your world will be published.</p>
            <div className="chp__selectrow">
              <button type="button" className="chp__select chp__select--provider">
                <span className="chp__selectval">
                  <LogoDCL />
                  NAME
                </span>
                <ChevronDownAlt size={20} />
              </button>
              <button type="button" className="chp__select chp__select--name">
                <span className="chp__selectval">{WORLD ? "mystore.dcl.eth" : ""}</span>
                <ChevronDownAlt size={20} />
              </button>
            </div>
          </div>

          <div className="chp__advanced">
            <div className="chp__advrow">
              <LayersIcon />
              <div className="chp__advtexts">
                <div className="chp__advtitle">Multi-Scene World (Advanced)</div>
                <div className="chp__advdesc">
                  Allow your world to contain more than 1 scene. Total world size will depend on your
                  published world layout.
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={multiScene}
                className={"chp__switch" + (multiScene ? " is-on" : "")}
                onClick={() => setMultiScene(!multiScene)}
              >
                <span className="chp__switchknob" />
              </button>
            </div>

            {multiScene ? (
              <div className="chp__worldinfo">
                <div className="chp__worldthumb" style={{ background: WORLD.grad }} />
                <div className="chp__worldcontent">
                  <div className="chp__currentlabel">Current World</div>
                  <div className="chp__worldtitle">{WORLD.title}</div>
                  <div className="chp__worldmeta">
                    <InfoItem
                      icon={<LayersIcon size={16} />}
                      label={`${WORLD.scenes} ${WORLD.scenes === 1 ? "scene" : "scenes"}`}
                    />
                    <InfoItem icon={<GridIcon size={16} />} label={WORLD.size} />
                  </div>
                </div>
                <button type="button" className="chp__btn chp__btn--secondary chp__settingsbtn">
                  <WorldIcon />
                  Settings
                </button>
              </div>
            ) : null}
          </div>

          <div className="chp__actions">
            <button type="button" className="chp__btn chp__btn--primary">
              {multiScene ? "Select Location" : "Review"}
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </ProjectStepWrapper>
    </PublishModal>
  );
}

function AtlasStub() {
  const cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 16; c++) {
      const owned = (r + c) % 5 === 0 || (r * c) % 7 === 0;
      const placed = (r === 4 || r === 5) && (c === 7 || c === 8);
      cells.push(
        <div
          key={r + "-" + c}
          className={
            "chp__parcel" + (owned ? " is-owned" : "") + (placed ? " is-placed" : "")
          }
        />
      );
    }
  }
  return (
    <div className="chp__atlas">
      <div className="chp__atlasgrid">{cells}</div>
      <div className="chp__atlaszoom">
        <button type="button" aria-label="zoom in">+</button>
        <button type="button" aria-label="zoom out">−</button>
      </div>
    </div>
  );
}

function PublishToLandStep({ placed = true }) {
  return (
    <PublishModal title="Publish to Land" size="large">
      <div className="chp__land">
        <AtlasStub />
        <div className="chp__landbar">
          <div className="chp__landinfo">
            <span>
              {placed ? "Placing Scene at 12,-34" : "Select the LANDs that will host your Scene"}
            </span>
            {placed ? (
              <button type="button" className="chp__textbtn">Reset</button>
            ) : null}
          </div>
          <button type="button" className="chp__btn chp__btn--primary chp__landpublish" disabled={!placed}>
            Publish
          </button>
        </div>
      </div>
    </PublishModal>
  );
}

function DeployIdle() {
  return (
    <div className="chp__files">
      <div className="chp__filters">
        <div className="chp__count">{FILES.length} files</div>
        <div className="chp__size">
          Total Size <b>10.4 MB/300MB</b>
        </div>
      </div>
      <div className="chp__filelist">
        {FILES.map((f) => (
          <div className="chp__file" key={f.name}>
            <div className="chp__filename" title={f.name}>{f.name}</div>
            <div className="chp__filesize">{f.size}</div>
          </div>
        ))}
      </div>
      <div className="chp__fileactions">
        <p className="chp__error" />
        <button type="button" className="chp__btn chp__btn--primary">
          Publish
          <i className="chp__deployicon" />
        </button>
      </div>
    </div>
  );
}

function DeployDeploying() {
  const steps = [
    { index: 1, name: "Uploading", description: "In process...", state: "pending" },
    { index: 2, name: "Converting", description: undefined, state: "idle" },
    { index: 3, name: "Optimizing", description: undefined, state: "idle" },
  ];
  return (
    <div className="chp__deploying">
      <div className="chp__deployheader">
        <span className="chp__loader" aria-hidden="true" />
        <h3>Publishing...</h3>
      </div>
      <ConnectedSteps steps={steps} />
      <div className="chp__deployinfo">
        <InfoIcon />
        This process may take 15 minutes on average. During this time, your scene may appear empty
        until it has been updated in the client.
      </div>
    </div>
  );
}

function JumpUrl({ inProgress, target, url }) {
  return (
    <div className="chp__jumpurl">
      {inProgress ? (
        <label>You can now access your scene even while it's still processing.</label>
      ) : null}
      <label>The URL to jump in your {target} is:</label>
      <div className="chp__url">
        {url}
        <i className="chp__copyicon" aria-label="copy"><CopyIcon /></i>
      </div>
    </div>
  );
}

function DeploySuccess() {
  return (
    <div className="chp__success">
      <div className="chp__successcontent">
        <SuccessArt />
        <div className="chp__successmsg">You scene is successfully published</div>
        <JumpUrl target="World" url="decentraland://?realm=mystore.dcl.eth&dclenv=org" />
      </div>
      <div className="chp__deployactions">
        <button type="button" className="chp__btn chp__btn--primary">
          Jump In
          <i className="chp__jumpinicon" />
        </button>
      </div>
    </div>
  );
}

function DeployError() {
  const steps = [
    { index: 1, name: "Uploading", description: "Error", state: "failed" },
    { index: 2, name: "Converting", description: undefined, state: "idle" },
    { index: 3, name: "Optimizing", description: undefined, state: "idle" },
  ];
  return (
    <div className="chp__deployerror">
      <div className="chp__errheader">
        <WarningArt size={30} />
        <h3>Publishing failed</h3>
      </div>
      <p className="chp__errdesc">
        Deployment to the Catalyst nodes failed.{"\n"}Please retry or check your internet connection.
      </p>
      <div className="chp__expand">Details</div>
      <ConnectedSteps steps={steps} />
      <div className="chp__deployactions chp__deployactions--two">
        <button type="button" className="chp__btn chp__btn--secondary">Report an issue</button>
        <button type="button" className="chp__btn chp__btn--primary">Retry</button>
      </div>
    </div>
  );
}

function DeployStep({ deployState = "idle" }) {
  if (deployState === "warning") {
    return (
      <PublishModal title="Publish to your World" size="large">
        <div className="chp__publishwarning">
          <div className="chp__warningcontent">
            <WarningArt />
            <div className="chp__warningmsg">
              PLEASE READ CAREFULLY:
              <ul>
                <li>After deployment, your scene will undergo processing before becoming available.</li>
                <li>This process may take 15 minutes on average.</li>
                <li>During this time, your scene will appear empty until it has been updated on the client.</li>
              </ul>
            </div>
          </div>
          <div className="chp__warningactions">
            <label className="chp__dontshow">
              <input type="checkbox" />
              Don't show again
            </label>
            <span className="chp__warningbuttons">
              <button type="button" className="chp__btn chp__btn--secondary">Go back</button>
              <button type="button" className="chp__btn chp__btn--primary">Continue</button>
            </span>
          </div>
        </div>
      </PublishModal>
    );
  }

  const title =
    deployState === "success" || deployState === "deploying"
      ? "Publish to your World"
      : "Publish to your World";

  return (
    <PublishModal title={title} size="large">
      <ProjectStepWrapper isWorld project={PROJECT} chips={CHIPS_WORLD} className="scene">
        {deployState === "idle" ? <DeployIdle /> : null}
        {deployState === "deploying" ? <DeployDeploying /> : null}
        {deployState === "success" ? <DeploySuccess /> : null}
        {deployState === "error" ? <DeployError /> : null}
      </ProjectStepWrapper>
    </PublishModal>
  );
}

export default function ChModalPublishProject({ step = "initial", deployState = "idle" }) {
  const body = useMemo(() => {
    switch (step) {
      case "alternative-servers":
        return <AlternativeServersStep option="custom" />;
      case "publish-to-world":
        return <PublishToWorldStep />;
      case "publish-to-land":
        return <PublishToLandStep placed />;
      case "deploy":
        return <DeployStep deployState={deployState} />;
      case "initial":
      default:
        return <InitialStep />;
    }
  }, [step, deployState]);

  return body;
}
