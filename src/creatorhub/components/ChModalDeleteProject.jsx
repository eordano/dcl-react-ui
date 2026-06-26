import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chmodaldeleteproject.css";

const COPY = {
  title: (t) => `Are you sure you want to delete ${t} from 'My Scenes'?`,
  filesCheckbox: "Also delete this scene's files from my computer",
  filesWarning:
    "Deleting scene files from your computer is permanent, you won't be able to access this scene again.",
  cancel: "Cancel",
  confirm: "Confirm",
};

const SAMPLE_PROJECT = {
  id: "5f2a1c44-9d3e-4b8a-bf21-7c0e0a1d4e90",
  title: "Neon Plaza",
  path: "/Users/me/Documents/dcl-scenes/neon-plaza",
};

function Checkbox({ checked }) {
  return (
    <span
      className={
        "chmodaldeleteproject__checkbox" +
        (checked ? " is-checked" : "")
      }
      aria-hidden="true"
    >
      {checked ? (
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M5 12.5l4.2 4.2L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

export default function ChModalDeleteProject({
  open = true,
  project = SAMPLE_PROJECT,
  deleteFiles = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [shouldDeleteFiles, setShouldDeleteFiles] = useState(deleteFiles);

  if (!open) {
    return <CreatorHubChrome active="scenes" />;
  }

  const handleSubmit = () => onSubmit(project, shouldDeleteFiles);

  return (
    <CreatorHubChrome active="scenes">
      <div
        className="chmodaldeleteproject__backdrop"
        onClick={onClose}
      >
        <div
          className="chmodaldeleteproject__paper"
          role="dialog"
          aria-modal="true"
          aria-label={COPY.title(project.title)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="chmodaldeleteproject__titlebox">
            <h5 className="chmodaldeleteproject__title">
              {COPY.title(project.title)}
            </h5>
          </div>

          <div className="chmodaldeleteproject__content">
            <label
              className="chmodaldeleteproject__delete-files"
              onClick={() => setShouldDeleteFiles((v) => !v)}
            >
              <Checkbox checked={shouldDeleteFiles} />
              <span>{COPY.filesCheckbox}</span>
            </label>

            {shouldDeleteFiles && (
              <p className="chmodaldeleteproject__delete-files-warning">
                {COPY.filesWarning}
              </p>
            )}
          </div>

          <div className="chmodaldeleteproject__actions">
            <button
              type="button"
              className="chmodaldeleteproject__btn chmodaldeleteproject__btn--secondary"
              onClick={onClose}
            >
              {COPY.cancel}
            </button>
            <button
              type="button"
              className="chmodaldeleteproject__btn chmodaldeleteproject__btn--primary"
              onClick={handleSubmit}
            >
              {COPY.confirm}
            </button>
          </div>
        </div>
      </div>
    </CreatorHubChrome>
  );
}
