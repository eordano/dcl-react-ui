import { useState } from "react";
import { asset } from "../../asset.js";
import "./cheditordeploymodal.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const DEFAULT_PROJECT = {
  title: "My Awesome Scene",
  base: "-9,12",
  sceneSize: "32m x 32m",
  parcelCount: 4,
  name: "myname.dcl.eth",
  username: "PixelSmith",
  network: "Mainnet",
  address: "0x9f3c…7a21",
  role: "Owner",
  files: [
    { name: "bin/index.js", size: "1.84 MB" },
    { name: "bin/game.js.lib", size: "612 KB" },
    { name: "assets/scene/models/Tree_01.glb", size: "8.92 MB" },
    { name: "assets/scene/models/Rock_Cluster.glb", size: "4.13 MB" },
    { name: "assets/scene/textures/grass_albedo.png", size: "2.07 MB" },
    { name: "assets/scene/audio/ambient_loop.mp3", size: "1.21 MB" },
    { name: "scene.json", size: "3.4 KB" },
    { name: "entities/main_crystal_with_a_really_long_filename.composite", size: "94 KB" },
    { name: "package.json", size: "1.1 KB" },
    { name: "tsconfig.json", size: "412 B" },
  ],
};

const DeployIcon = () => (
  <svg className="cheditordeploymodal__svg" width="22" height="22" viewBox="0 0 25 24" aria-hidden="true">
    <path d="M2.84984 21L23.8398 12L2.84984 3L2.83984 10L17.8398 12L2.83984 14L2.84984 21Z" fill="currentColor" />
  </svg>
);
const JumpInIcon = () => (
  <svg className="cheditordeploymodal__svg" width="22" height="22" viewBox="0 0 25 25" aria-hidden="true">
    <rect x="1.7" y="0.96" width="22.5" height="22.5" rx="7.25" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
    <path d="M19.66 11.28 14.99 6.6c-.84-.83-2.24-.24-2.24.94v1.54H8.21c-.75 0-1.36.61-1.36 1.36v3.32c0 .75.61 1.36 1.36 1.36h4.54v1.54c0 1.18 1.4 1.77 2.24.94l4.67-4.67a1.36 1.36 0 0 0 0-1.65Z" fill="currentColor" />
  </svg>
);
const CopyIcon = ({ onClick }) => (
  <svg className="cheditordeploymodal__copy" width="16" height="16" viewBox="0 0 19 19" aria-hidden="true" onClick={onClick}>
    <path d="M13.32.96h-9c-.82 0-1.5.68-1.5 1.5v10.5h1.5V2.46h9V.96Zm2.25 3h-8.25c-.82 0-1.5.68-1.5 1.5v10.5c0 .82.68 1.5 1.5 1.5h8.25c.82 0 1.5-.68 1.5-1.5V5.46c0-.82-.68-1.5-1.5-1.5Zm0 12h-8.25V5.46h8.25v10.5Z" fill="currentColor" />
  </svg>
);
const SuccessIcon = () => (
  <svg className="cheditordeploymodal__bigicon" width="80" height="61" viewBox="0 0 85 65" aria-hidden="true">
    <defs>
      <linearGradient id="cheditordeploymodal-ok" x1="0" y1="0" x2="89" y2="57" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff2d55" /><stop offset="1" stopColor="#ffb03a" />
      </linearGradient>
    </defs>
    <path d="M27.63 50.7 7.73 30.8.95 37.53l26.68 26.68L84.9 6.94 78.17.21 27.63 50.7Z" fill="url(#cheditordeploymodal-ok)" />
  </svg>
);
const WarningTriangle = ({ size = 80 }) => (
  <svg className="cheditordeploymodal__bigicon" width={size} height={size * 0.86} viewBox="0 0 82 70" aria-hidden="true">
    <defs>
      <linearGradient id="cheditordeploymodal-warn" x1="0" y1="0" x2="82" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff2d55" /><stop offset="1" stopColor="#ffb03a" />
      </linearGradient>
    </defs>
    <path d="M40.76 14.7 68.51 62.63H13.02L40.76 14.7ZM40.76 0 .24 70h81.05L40.76 0Z" fill="url(#cheditordeploymodal-warn)" />
    <path d="M44.45 51.58h-7.37v7.37h7.37v-7.37ZM44.45 29.47h-7.37v18.42h7.37V29.47Z" fill="url(#cheditordeploymodal-warn)" />
  </svg>
);
const VerifiedBadge = () => (
  <svg className="cheditordeploymodal__verified" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 1.5 14.6 4l3.6-.3.6 3.6 3.1 1.9-1.6 3.3 1.6 3.3-3.1 1.9-.6 3.6-3.6-.3L12 22.5 9.4 20l-3.6.3-.6-3.6L2.1 14.8l1.6-3.3-1.6-3.3 3.1-1.9.6-3.6L9.4 3 12 1.5Z" fill="#1f87e5" />
    <path d="m8.4 12 2.5 2.5 4.7-4.7" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" />
  </svg>
);
const ParcelsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
  </svg>
);
const InfoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-12h2v2h-2V8Zm0 4h2v6h-2v-6Z" fill="currentColor" />
  </svg>
);
const CloseGlyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#242129" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const Loader = () => <span className="cheditordeploymodal__loader" aria-hidden="true" />;

function Step({ bulletText, name, description, state = "idle" }) {
  const bullet =
    state === "complete" ? "✓" : state === "failed" ? "✕" : bulletText;
  return (
    <div className={"cheditordeploymodal__step is-" + state}>
      <div className="cheditordeploymodal__bullet">{bullet}</div>
      <div className="cheditordeploymodal__stepbody">
        <h4>{name}</h4>
        <span>{description}</span>
      </div>
    </div>
  );
}
function ConnectedSteps({ steps }) {
  return (
    <div className="cheditordeploymodal__steps">
      {steps.map((s, i) => (
        <Step key={i} {...s} />
      ))}
    </div>
  );
}

function ProjectStepWrapper({ project, target, children }) {
  const isWorld = target === "world";
  return (
    <div className="cheditordeploymodal__wrap">
      <div className="cheditordeploymodal__chips">
        <div className="cheditordeploymodal__chip is-network">{project.network}</div>
        <div className="cheditordeploymodal__chip">{project.address}</div>
        {isWorld ? (
          <div className="cheditordeploymodal__chip cheditordeploymodal__chip--user">
            {project.username}
            <VerifiedBadge />
          </div>
        ) : (
          <div className="cheditordeploymodal__chip cheditordeploymodal__chip--parcel">
            <PinIcon />
            {project.base}
          </div>
        )}
        <div className="cheditordeploymodal__chip">{project.role}</div>
      </div>
      <div className="cheditordeploymodal__container">
        <div className="cheditordeploymodal__info">
          <div
            className="cheditordeploymodal__thumb"
            style={{ backgroundImage: `url(${project.thumbnail || asset("assets/scene-thumb.png")})` }}
          />
          <div className="cheditordeploymodal__infotext">
            <h6>{project.title}</h6>
            <span className="cheditordeploymodal__parcels">
              <ParcelsIcon />
              Scene size: {project.sceneSize}
            </span>
          </div>
        </div>
        <div className="cheditordeploymodal__content">{children}</div>
      </div>
    </div>
  );
}

function OptionBox({ thumb, title, description, buttonText, onPublish }) {
  return (
    <div className="cheditordeploymodal__optionbox">
      <div className="cheditordeploymodal__optthumb" style={{ backgroundImage: `url(${thumb})` }} />
      <h3>{title}</h3>
      <span className="cheditordeploymodal__optdesc">{description}</span>
      <button type="button" className="cheditordeploymodal__btn" onClick={onPublish}>
        {buttonText}
      </button>
      <span className="cheditordeploymodal__learnmore">Learn more</span>
    </div>
  );
}

export default function ChEditorDeployModal({
  state = "idle",
  project = DEFAULT_PROJECT,
  target = "land",
  onClose,
}) {
  const [skipWarning, setSkipWarning] = useState(false);
  const isWorld = target === "world";
  const p = { ...DEFAULT_PROJECT, ...project };

  const title =
    state === "select"
      ? `Publish "${p.title}"`
      : isWorld
        ? "Publish to your World"
        : "Publish to your Land";
  const subtitle =
    state === "select" ? "Where would you like to deploy your scene to?" : null;

  const jumpUrl = isWorld
    ? `decentraland://?realm=${p.name}&dclenv=org`
    : `decentraland://?position=${p.base}&dclenv=org`;

  const deployingSteps = [
    { bulletText: 1, name: "Uploading", state: "complete" },
    { bulletText: 2, name: "Converting", description: "In process...", state: "pending" },
    ...(isWorld ? [] : [{ bulletText: 3, name: "Optimizing", state: "idle" }]),
  ];
  const errorSteps = [
    { bulletText: 1, name: "Uploading", state: "complete" },
    { bulletText: 2, name: "Converting", description: "Error", state: "failed" },
    ...(isWorld ? [] : [{ bulletText: 3, name: "Optimizing", state: "idle" }]),
  ];

  const totalCount = p.files.length;

  const big = state !== "select";

  return (
    <div className="cheditordeploymodal" role="dialog" aria-modal="true">
      <div className="cheditordeploymodal__scrim" />
      <div
        className={
          "cheditordeploymodal__paper" + (big ? " is-large" : " is-small")
        }
      >
        <div className="cheditordeploymodal__head">
          {state !== "select" && (
            <button type="button" className="cheditordeploymodal__iconbtn" aria-label="back">
              <ChevronLeft size={16} />
            </button>
          )}
          <h5 className="cheditordeploymodal__title">{title}</h5>
          <button
            type="button"
            className="cheditordeploymodal__iconbtn cheditordeploymodal__close"
            aria-label="close"
            onClick={onClose}
          >
            <CloseGlyph />
          </button>
        </div>
        {subtitle && <p className="cheditordeploymodal__subtitle">{subtitle}</p>}

        <div className="cheditordeploymodal__body">
          {state === "select" ? (
            <div className="cheditordeploymodal__initial">
              <div className="cheditordeploymodal__options">
                <OptionBox
                  thumb={asset("assets/publish-worlds.png")}
                  title="Worlds"
                  description="Your own virtual space, separate from Genesis City. Claim yours when you get a NAME."
                  buttonText="Publish to a World"
                />
                <OptionBox
                  thumb={asset("assets/publish-land.png")}
                  title="My Land"
                  description="The parcels that make up Decentraland's Genesis City map. Buy or rent your own in the Marketplace."
                  buttonText="Publish to Land"
                />
              </div>
              <span className="cheditordeploymodal__altservers">
                Publish to a different server
              </span>
            </div>
          ) : state === "warning" ? (
            <div className="cheditordeploymodal__deploy">
              <div className="cheditordeploymodal__warncard">
                <div className="cheditordeploymodal__warncontent">
                  <WarningTriangle size={81} />
                  <div className="cheditordeploymodal__warnmsg">
                    PLEASE READ CAREFULLY:
                    <ul>
                      <li>After deployment, your scene will undergo processing before becoming available.</li>
                      <li>This process may take 15 minutes on average.</li>
                      <li>During this time, your scene will appear empty until it has been updated on the client.</li>
                    </ul>
                  </div>
                </div>
                <div className="cheditordeploymodal__warnactions">
                  <label className="cheditordeploymodal__dontshow">
                    <input
                      type="checkbox"
                      checked={skipWarning}
                      onChange={() => setSkipWarning(!skipWarning)}
                    />
                    Don't show again
                  </label>
                  <span className="cheditordeploymodal__warnbtns">
                    <button type="button" className="cheditordeploymodal__btn cheditordeploymodal__btn--outlined">
                      Go back
                    </button>
                    <button type="button" className="cheditordeploymodal__btn">
                      Continue
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="cheditordeploymodal__deploy">
              <ProjectStepWrapper project={p} target={target}>
                {state === "idle" && (
                  <div className="cheditordeploymodal__files">
                    <div className="cheditordeploymodal__filters">
                      <div className="cheditordeploymodal__count">{totalCount} files</div>
                      <div className="cheditordeploymodal__size">
                        Total Size <b>22.4 MB/300MB</b>
                      </div>
                    </div>
                    <div className="cheditordeploymodal__list">
                      {p.files.map((f) => (
                        <div className="cheditordeploymodal__file" key={f.name}>
                          <div className="cheditordeploymodal__filename" title={f.name}>
                            {f.name}
                          </div>
                          <div className="cheditordeploymodal__filesize">{f.size}</div>
                        </div>
                      ))}
                    </div>
                    <div className="cheditordeploymodal__actions">
                      <p className="cheditordeploymodal__error" />
                      <button type="button" className="cheditordeploymodal__btn cheditordeploymodal__btn--lg">
                        Publish
                        <DeployIcon />
                      </button>
                    </div>
                  </div>
                )}

                {state === "deploying" && (
                  <div className="cheditordeploymodal__deploying">
                    <div className="cheditordeploymodal__progresshead">
                      <Loader />
                      <span>Publishing...</span>
                    </div>
                    <ConnectedSteps steps={deployingSteps} />
                    <div className="cheditordeploymodal__notice">
                      <InfoIcon />
                      This process may take 15 minutes on average. During this time, your
                      scene may appear empty until it has been updated in the client.
                    </div>
                  </div>
                )}

                {state === "success" && (
                  <div className="cheditordeploymodal__success">
                    <div className="cheditordeploymodal__successcontent">
                      <SuccessIcon />
                      <div className="cheditordeploymodal__successmsg">
                        You scene is successfully published
                      </div>
                      <div className="cheditordeploymodal__jumpurl">
                        <label>The URL to jump in your {isWorld ? "World" : "Land"} is:</label>
                        <div className="cheditordeploymodal__url">
                          {jumpUrl}
                          <CopyIcon />
                        </div>
                      </div>
                    </div>
                    <div className="cheditordeploymodal__actions cheditordeploymodal__actions--end">
                      <button type="button" className="cheditordeploymodal__btn cheditordeploymodal__btn--lg">
                        Jump In
                        <JumpInIcon />
                      </button>
                    </div>
                  </div>
                )}

                {state === "error" && (
                  <div className="cheditordeploymodal__errorstep">
                    <div className="cheditordeploymodal__progresshead is-error">
                      <WarningTriangle size={30} />
                      <span>Publishing failed</span>
                    </div>
                    <p className="cheditordeploymodal__errordesc">
                      Deployment to the Catalyst nodes failed.{"\n"}Please retry or check
                      your internet connection.
                    </p>
                    <ConnectedSteps steps={errorSteps} />
                    <div className="cheditordeploymodal__actions cheditordeploymodal__actions--split">
                      <button type="button" className="cheditordeploymodal__btn cheditordeploymodal__btn--outlined cheditordeploymodal__btn--lg">
                        Report an issue
                      </button>
                      <button type="button" className="cheditordeploymodal__btn cheditordeploymodal__btn--lg">
                        Retry
                      </button>
                    </div>
                  </div>
                )}
              </ProjectStepWrapper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
