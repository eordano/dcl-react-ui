import ChPublishWizardDeployProgressResult from "./ChPublishWizardDeployProgressResult.jsx";
import "./altdeployview.css";

export default function AltDeployView({
  view = "intro",
  step = "alternative-servers",
  kind = "test",
  customUrl = "",
  urlError = false,
  knownServers =([]),
  target =(undefined),
  result =(undefined),
  onOpen =(undefined),
  onKindChange =(undefined),
  onCustomUrlChange =(undefined),
  onSubmitServer =(undefined),
  onBack =(undefined),
  onConfirm =(undefined),
  onRetry =(undefined),
}) {
  return (
    <div className="alt-deploy-wizard" data-step={step}>
      {view === "intro" && (
        <div className="alt-deploy-wizard__controls" role="group" aria-label="Open alternative servers">
          <button
            type="button"
            className="alt-deploy-wizard__btn alt-deploy-wizard__btn--primary"
            onClick={onOpen}
          >
            Publish to a different server
          </button>
        </div>
      )}

      {view === "selecting" && (
        <div className="alt-deploy-wizard__controls" role="group" aria-label="Choose a server">
            <fieldset className="alt-deploy-wizard__choice">
              <label>
                <input
                  type="radio"
                  name="alt-server-kind"
                  checked={kind === "test"}
                  onChange={() => onKindChange?.("test")}
                />
                Test Server
              </label>
              <label>
                <input
                  type="radio"
                  name="alt-server-kind"
                  checked={kind === "custom"}
                  onChange={() => onKindChange?.("custom")}
                />
                Custom Server
              </label>
            </fieldset>
            {kind === "custom" && (
              <label className="alt-deploy-wizard__urlfield">
                Content-server URL
                <input
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  value={customUrl}
                  list="alt-deploy-known-servers"
                  onChange={(e) => onCustomUrlChange?.(e.target.value)}
                />
                {urlError && (
                  <span className="alt-deploy-wizard__error" role="alert">
                    Invalid URL
                  </span>
                )}
                <datalist id="alt-deploy-known-servers">
                  {knownServers.map((s) => (
                    <option key={s.baseUrl} value={s.baseUrl} />
                  ))}
                </datalist>
              </label>
            )}
            <button
              type="button"
              className="alt-deploy-wizard__btn alt-deploy-wizard__btn--primary"
              onClick={onSubmitServer}
            >
              {kind === "test" ? "Publish to Test Server" : "Publish to Custom Server"}
            </button>
        </div>
      )}

      {view === "reviewing" && (
        <div className="alt-deploy-wizard__controls" role="group" aria-label="Confirm target">
            <p className="alt-deploy-wizard__review">
              Deploying to <strong>{target?.kind === "custom" ? "Custom Server" : "Test Server"}</strong>
              {" — "}
              <code>{target?.baseUrl}</code>
            </p>
            <button
              type="button"
              className="alt-deploy-wizard__btn"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="button"
              className="alt-deploy-wizard__btn alt-deploy-wizard__btn--primary"
              onClick={onConfirm}
            >
              Confirm and deploy
            </button>
        </div>
      )}

      {view === "deploying" && (
        <ChPublishWizardDeployProgressResult state="deploying" />
      )}
      {view === "finishing" && (
        <ChPublishWizardDeployProgressResult state="finishing" />
      )}
      {view === "complete" && (
        <>
          <ChPublishWizardDeployProgressResult state="complete" />
          {result?.jumpUrl && (
            <p className="alt-deploy-wizard__jump">
              Simulated deploy — no scene was uploaded (the deployer is
              read-only). Jump-in URL:{" "}
              <code>{result.jumpUrl}</code>
            </p>
          )}
        </>
      )}
      {view === "error" && (
        <>
          <ChPublishWizardDeployProgressResult state="error" />
          <div className="alt-deploy-wizard__controls">
            <button
              type="button"
              className="alt-deploy-wizard__btn alt-deploy-wizard__btn--primary"
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
