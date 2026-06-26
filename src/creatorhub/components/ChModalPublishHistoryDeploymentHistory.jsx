import { useMemo } from "react";
import { ChevronDownAlt } from "../../atoms/icons.jsx";
import "./chmodalpublishhistorydeploymenthistory.css";

const CheckIcon = ({ size = 22, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = ({ size = 22, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
  </svg>
);
const CancelRoundedIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#242129" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WarningArt = ({ size = 40 }) => (
  <svg className="chh__warnicon" viewBox="0 0 82 70" width={(size * 82) / 70} height={size} aria-hidden="true">
    <defs>
      <linearGradient id="chh-warn" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FF2D55" />
        <stop offset="1" stopColor="#C640CD" />
      </linearGradient>
    </defs>
    <path d="M40.8 14.7 68.5 62.6H13L40.8 14.7Zm0-14.7L.2 70h81L40.8 0Z" fill="url(#chh-warn)" />
    <path d="M44.4 51.6h-7.4v7.4h7.4v-7.4Z" fill="url(#chh-warn)" />
    <path d="M44.4 29.5h-7.4v18.4h7.4V29.5Z" fill="url(#chh-warn)" />
  </svg>
);

function Modal({ title, size = "tiny", children }) {
  return (
    <div className="chh__backdrop">
      <div
        className={"chh__modal chh__modal--" + size}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="chh__header">
          <h2 className="chh__titletext">{title}</h2>
          <button type="button" className="chh__close" aria-label="close">
            <CancelRoundedIcon />
          </button>
        </header>
        <div className="chh__content">{children}</div>
      </div>
    </div>
  );
}

const PUBLISH_DEPLOYMENTS = [
  {
    date: "12/10/2024 - 5:36 pm",
    failed: true,
    steps: [
      { time: "5:36 pm", ok: true, label: "Uploading" },
      { time: "6:19 pm", ok: true, label: "Converting" },
      { time: "6:49 pm", ok: false, label: "Optimizing" },
    ],
  },
  {
    date: "12/08/2024 - 2:14 pm",
    failed: false,
    steps: [
      { time: "2:14 pm", ok: true, label: "Uploading" },
      { time: "2:51 pm", ok: true, label: "Converting" },
      { time: "3:08 pm", ok: true, label: "Optimizing" },
    ],
  },
];

function PublishDeployment({ date, failed, steps }) {
  return (
    <div className="chh__deployment">
      <h3 className="chh__phead">
        {failed ? (
          <CloseIcon className="chh__icon chh__icon--error" />
        ) : (
          <CheckIcon className="chh__icon chh__icon--success" />
        )}{" "}
        {date}
      </h3>
      <div className="chh__rows">
        {steps.map((s, i) => (
          <div className="chh__row" key={i}>
            <span>{s.time}</span>
            {s.ok ? (
              <CheckIcon className="chh__icon chh__icon--success" />
            ) : (
              <CloseIcon className="chh__icon chh__icon--error" />
            )}{" "}
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function PublishHistory() {
  return (
    <Modal title="Publish History" size="tiny">
      <div className="chh__publishhistory">
        {PUBLISH_DEPLOYMENTS.map((d, i) => (
          <PublishDeployment key={i} {...d} />
        ))}
      </div>
    </Modal>
  );
}

function Step({ bulletText, name, description, state = "idle" }) {
  const bullet =
    state === "complete" ? (
      <CheckIcon size={18} />
    ) : state === "failed" ? (
      <CloseIcon size={18} />
    ) : (
      bulletText
    );
  return (
    <div className={"chh__step chh__step--" + state}>
      <div className="chh__bullet">{bullet}</div>
      <div className="chh__stepbody">
        <h4>{name}</h4>
        {description ? <span>{description}</span> : null}
      </div>
    </div>
  );
}
function ConnectedSteps({ steps }) {
  return (
    <div className="chh__steps">
      {steps.map((s, i) => (
        <Step key={i} {...s} />
      ))}
    </div>
  );
}

const DEPLOYMENTS = [
  {
    id: "dep-3",
    overallStatus: "pending",
    isCurrent: true,
    isWorld: false,
    target: "Land: 12,-34",
    date: "12/10/2024, 05:36 PM",
    error: null,
    componentsStatus: { catalyst: "complete", assetBundle: "pending", lods: "idle" },
  },
  {
    id: "dep-2",
    overallStatus: "failed",
    isCurrent: false,
    isWorld: true,
    target: "World: mystore.dcl.eth",
    date: "12/08/2024, 02:14 PM",
    error: {
      message: "Deployment to the Catalyst nodes failed.\nPlease retry or check your internet connection.",
      cause:
        "Error: request to https://peer.decentraland.org/content/entities failed, reason: connect ETIMEDOUT 18.230.x.x:443",
    },
    componentsStatus: { catalyst: "failed", assetBundle: "idle" },
  },
  {
    id: "dep-1",
    overallStatus: "complete",
    isCurrent: false,
    isWorld: false,
    target: "Land: 12,-34",
    date: "12/05/2024, 09:02 AM",
    error: null,
    componentsStatus: { catalyst: "complete", assetBundle: "complete", lods: "complete" },
  },
];

const STEP_DESCRIPTION = {
  pending: "In process...",
  failed: "Error",
};

function buildSteps(componentsStatus, isWorld) {
  const { catalyst, assetBundle, lods } = componentsStatus;
  const steps = [
    { bulletText: "1", name: "Uploading", description: STEP_DESCRIPTION[catalyst], state: catalyst },
    { bulletText: "2", name: "Converting", description: STEP_DESCRIPTION[assetBundle], state: assetBundle },
  ];
  if (!isWorld) {
    steps.push({ bulletText: "3", name: "Optimizing", description: STEP_DESCRIPTION[lods], state: lods });
  }
  return steps;
}

function deploymentTitle(overallStatus) {
  if (overallStatus === "failed") return "Publishing failed";
  if (overallStatus === "complete") return "You scene is successfully published";
  return "Publishing...";
}

function DeploymentCard({ deployment }) {
  const { overallStatus, isCurrent, isWorld, target, date, error, componentsStatus } = deployment;
  const steps = useMemo(() => buildSteps(componentsStatus, isWorld), [componentsStatus, isWorld]);
  const title = deploymentTitle(overallStatus);

  return (
    <div className="chh__card">
      <div className="chh__cardheader">
        <div className="chh__headerleft">
          <div className="chh__title">
            {overallStatus === "failed" ? (
              <WarningArt size={40} />
            ) : overallStatus === "pending" ? (
              <span className="chh__loader" aria-hidden="true" />
            ) : null}
            <span className="chh__titlecopy">{title}</span>
          </div>
          {error ? (
            <span className="chh__error">
              {error.message}
              {error.cause ? (
                <span className="chh__expand">
                  <button type="button" className="chh__expandtoggle" aria-label="Details">
                    <ChevronDownAlt size={22} />
                  </button>
                  <span className="chh__expandtitle">Details</span>
                </span>
              ) : null}
            </span>
          ) : null}
          <div className="chh__meta">
            <span>{date}</span>
            <span>{target}</span>
          </div>
        </div>
        {isCurrent ? <div className="chh__badge">Current</div> : null}
      </div>
      <div className="chh__stepscontainer">
        <ConnectedSteps steps={steps} />
      </div>
    </div>
  );
}

function DeploymentHistory({ empty = false }) {
  return (
    <Modal title="Deployment History" size="large">
      <div className="chh__container">
        {empty ? (
          <div className="chh__nodeployments">
            No deployment history available for this project.
          </div>
        ) : (
          DEPLOYMENTS.map((d) => <DeploymentCard key={d.id} deployment={d} />)
        )}
      </div>
    </Modal>
  );
}

export default function ChModalPublishHistoryDeploymentHistory({ variant = "publish" }) {
  if (variant === "deployment") return <DeploymentHistory />;
  if (variant === "empty") return <DeploymentHistory empty />;
  return <PublishHistory />;
}
