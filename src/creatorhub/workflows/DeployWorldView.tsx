import type { ComponentProps } from "react";

import ChPublishWizardPublishToWorld from "./ChPublishWizardPublishToWorld";
import ChPublishWizardDeployProgressResult from "./ChPublishWizardDeployProgressResult";
import Button from "../../atoms/Button";
import "./deployworldview.css";

type DeployWorldViewProps = {
  view?: string;
  step?: string;
  project?: ComponentProps<typeof ChPublishWizardPublishToWorld>["project"];
  owner?: ComponentProps<typeof ChPublishWizardPublishToWorld>["owner"];
  names?: string[];
  selectedName?: string;
  resultProps?: ComponentProps<typeof ChPublishWizardDeployProgressResult>;
  overQuota?: boolean;
  sizeLabel?: string;
  maxFileSizeMb?: number;
  error?: string;
  pendingName?: string;
  onRefresh?: () => void;
  onClose?: () => void;
  onBack?: () => void;
  onPickName?: (name: string) => void;
  onReview?: () => void;
  onClaimName?: () => void;
  onConfirm?: () => void;
  onJumpIn?: () => void;
  onRetry?: () => void;
};

export default function DeployWorldView({
  view = "destination",
  step = "destination",
  project = {},
  owner = {},
  names = [],
  selectedName = undefined,
  resultProps = {},
  overQuota = false,
  sizeLabel = "",
  maxFileSizeMb = 50,
  error = undefined,
  pendingName = undefined,
  onRefresh = undefined,
  onClose = undefined,
  onBack = undefined,
  onPickName = undefined,
  onReview = undefined,
  onClaimName = undefined,
  onConfirm = undefined,
  onJumpIn = undefined,
  onRetry = undefined,
}: DeployWorldViewProps) {
  return (
    <div className="deploy-world-wizard" data-step={step}>
      {view === "selectWorld" && (
        <ChPublishWizardPublishToWorld
          state="selection"
          inline
          project={project}
          owner={owner}
          names={names}
          selectedName={selectedName}
          world={null}
          pendingName={pendingName}
          onRefresh={onRefresh}
          onPickName={onPickName}
          onReview={onReview}
          onClose={onClose}
          onClaimName={onClaimName}
        />
      )}

      {view === "namesEmpty" && (
        <ChPublishWizardPublishToWorld
          state="empty"
          inline
          pendingName={pendingName}
          onRefresh={onRefresh}
          onClose={onClose}
          onClaimName={onClaimName}
        />
      )}

      {view === "review" && (
        <>
          {overQuota && (
            <div className="deploy-world-wizard__quota-banner" role="alert">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path
                  d="M12 3.2 22 20.5H2L12 3.2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M12 9.5v4.6M12 17v.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>
                This scene is <strong>{sizeLabel}</strong> — over the {maxFileSizeMb}MB
                world limit. Optimize or remove large files before you can publish.
              </span>
            </div>
          )}
          <ChPublishWizardDeployProgressResult
            state={overQuota ? "exceeded" : "idle"}
            {...resultProps}
          />
          <div className="deploy-world-wizard__controls" role="group" aria-label="Review and confirm">
            <Button variant="secondary" onClick={onBack}>
              Back
            </Button>
            <span className="deploy-world-wizard__quota">
              {sizeLabel} / {maxFileSizeMb}MB
              {overQuota ? " — over quota" : ""}
            </span>
            <Button variant="primary" disabled={overQuota} onClick={onConfirm}>
              Publish to {selectedName ?? "World"}
            </Button>
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
        <ChPublishWizardDeployProgressResult
          state="complete"
          {...resultProps}
          onJumpIn={onJumpIn}
        />
      )}
      {view === "unavailable" && (
        <div className="deploy-world-wizard__unavailable" role="alert">
          <h2 className="deploy-world-wizard__unavailable-title">
            Publishing from the web needs a bit more
          </h2>
          <p className="deploy-world-wizard__unavailable-body">
            To publish a scene to your World from the browser you need a
            connected wallet and your scene&apos;s project folder open on disk.
            Sign in and select the folder that contains your{" "}
            <code>scene.json</code>, then try again.
          </p>
          <div
            className="deploy-world-wizard__controls"
            role="group"
            aria-label="Publishing unavailable"
          >
            <Button variant="primary" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      )}
      {view === "error" && (
        <ChPublishWizardDeployProgressResult
          state="error"
          {...resultProps}
          error={error ? { message: error } : undefined}
          onRetry={onRetry}
        />
      )}
    </div>
  );
}
