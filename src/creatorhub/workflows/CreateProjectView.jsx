import ChModalCreateProject from "../components/ChModalCreateProject.jsx";
import ChTemplates from "../pages/ChTemplates.jsx";
import OdInitScaffold from "../../opendcl/pages/OdInitScaffold.jsx";
import "./createprojectview.css";

export default function CreateProjectView({
  view = "naming",
  step = "name",
  name = "",
  path = "",
  takenPaths =([]),
  result =(undefined),
  error =(undefined),
  editorHref = "#",
  onSubmitDetails =(undefined),
  onClose =(undefined),
  onPickTemplate =(undefined),
  onBack =(undefined),
  onRetry =(undefined),
}) {
  return (
    <div className="create-project-wizard" data-step={step}>
      {(view === "naming" || view === "pathing") && (
        <ChModalCreateProject
          open
          initialValue={{ name, path }}
          takenPaths={takenPaths}
          onSubmit={onSubmitDetails}
          onClose={onClose}
        />
      )}

      {view === "templating" && (
        <>
          <ChTemplates
            difficulty={undefined}
            sort={undefined}
            onSelectTemplate={onPickTemplate}
          />
          <div
            className="create-project-wizard__controls"
            role="group"
            aria-label="Pick a starting template"
          >
            <button
              type="button"
              className="create-project-wizard__btn"
              onClick={onBack}
            >
              Back
            </button>
          </div>
        </>
      )}

      {view === "scaffolding" && (
        <div className="create-project-wizard__scaffold">
          <OdInitScaffold />
        </div>
      )}

      {view === "created" && (
        <div className="create-project-wizard__created-banner" role="status">
          <p className="create-project-wizard__created-title">
            Project created — {name}
          </p>
          <p className="create-project-wizard__created-sub">
            {result?.via === "download" ? (
              <>
                <strong>{result?.files.length ?? 0} files</strong>{" "}
                ({result?.folder}/) were downloaded to your computer.
                Open the scene in the web editor to start building.
              </>
            ) : (
              <>
                Wrote{" "}
                <strong>{result?.files.length ?? 0} files</strong> to{" "}
                <strong>{result?.folder}/</strong> on your disk
                (including scene.json + main.composite). Open it in the web editor
                to start building.
              </>
            )}
          </p>
          <div className="create-project-wizard__controls">
            <a
              className="create-project-wizard__btn create-project-wizard__btn--primary"
              href={editorHref}
            >
              Open in editor
            </a>
            <a className="create-project-wizard__btn" href="/create/scenes">
              Go to My Scenes
            </a>
          </div>
        </div>
      )}

      {view === "error" && (
        <div className="create-project-wizard__scaffold">
          <OdInitScaffold />
          <div className="create-project-wizard__controls">
            <p className="create-project-wizard__error" role="alert">
              Scaffolding failed: {error ?? "unknown error"}
            </p>
            <button
              type="button"
              className="create-project-wizard__btn create-project-wizard__btn--primary"
              onClick={onRetry}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
