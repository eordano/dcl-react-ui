import ChPublishWizardDestinationSelect from "./ChPublishWizardDestinationSelect.jsx";
import ChPublishWizardPublishToWorld from "./ChPublishWizardPublishToWorld.jsx";
import ChPublishWizardDeployProgressResult from "./ChPublishWizardDeployProgressResult.jsx";
import "./deployworldview.css";

export default function DeployWorldView({
  view = "destination",
  step = "destination",
  project =({}),
  owner =({}),
  names =([]),
  selectedName =(undefined),
  resultProps =({}),
  overQuota = false,
  sizeLabel = "",
  maxFileSizeMb = 50,
  simulatedJumpUrl =(undefined),
  onChooseWorlds =(undefined),
  onPublishLand =(undefined),
  onAltServers =(undefined),
  onClose =(undefined),
  onBack =(undefined),
  onPickName =(undefined),
  onReview =(undefined),
  onClaimName =(undefined),
  onConfirm =(undefined),
  onJumpIn =(undefined),
  onRetry =(undefined),
}) {
  return (
    <div className="deploy-world-wizard" data-step={step}>
      {view === "destination" && (
        <ChPublishWizardDestinationSelect
          state="select"
          projectTitle={project.title}
          onPublishWorld={onChooseWorlds}
          onPublishLand={onPublishLand}
          onAltServers={onAltServers}
          onBack={onClose}
          onClose={onClose}
        />
      )}

      {view === "selectWorld" && (
        <ChPublishWizardPublishToWorld
          state="selection"
          project={project}
          owner={owner}
          names={names}
          selectedName={selectedName}
          world={null}
          onPickName={onPickName}
          onReview={onReview}
          onBack={onBack}
          onClose={onClose}
          onClaimName={onClaimName}
        />
      )}

      {view === "namesEmpty" && (
        <ChPublishWizardPublishToWorld
          state="empty"
          onBack={onBack}
          onClaimName={onClaimName}
        />
      )}

      {view === "review" && (
        <>
          <ChPublishWizardDeployProgressResult
            state={overQuota ? "exceeded" : "idle"}
            {...resultProps}
          />
          <div className="deploy-world-wizard__controls" role="group" aria-label="Review and confirm">
            <button
              type="button"
              className="deploy-world-wizard__btn"
              onClick={onBack}
            >
              Back
            </button>
            <span className="deploy-world-wizard__quota">
              {sizeLabel} / {maxFileSizeMb}MB
              {overQuota ? " — over quota" : ""}
            </span>
            <button
              type="button"
              className="deploy-world-wizard__btn deploy-world-wizard__btn--primary"
              disabled={overQuota}
              onClick={onConfirm}
            >
              Publish to {selectedName ?? "World"}
            </button>
          </div>
        </>
      )}

      {view === "deploying" && (
        <ChPublishWizardDeployProgressResult state="deploying" {...resultProps} />
      )}
      {view === "finishing" && (
        <ChPublishWizardDeployProgressResult state="finishing" {...resultProps} />
      )}
      {view === "complete" && (
        <>
          <ChPublishWizardDeployProgressResult
            state="complete"
            {...resultProps}
            onJumpIn={onJumpIn}
          />
          {simulatedJumpUrl && (
            <p className="deploy-world-wizard__note">
              Simulated deploy — no scene was uploaded (the deployer is
              read-only). Jump-in URL:{" "}
              <code>{simulatedJumpUrl}</code>
            </p>
          )}
        </>
      )}
      {view === "error" && (
        <>
          <ChPublishWizardDeployProgressResult state="error" />
          <div className="deploy-world-wizard__controls">
            <button
              type="button"
              className="deploy-world-wizard__btn deploy-world-wizard__btn--primary"
              onClick={onRetry}
            >
              Retry
            </button>
          </div>
        </>
      )}
    </div>
  );
}
