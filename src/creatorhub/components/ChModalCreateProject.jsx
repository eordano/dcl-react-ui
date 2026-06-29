import { useCallback, useRef, useState } from "react";
import { useDialogKeys } from "../../components/useDialogKeys.js";
import "./chmodalcreateproject.css";

const COPY = {
  title: "Create Project",
  name: "Project Name",
  path: "Project Path",
  create: "Create",
  cancel: "Cancel",
  pathError:
    "Path already exists or can't save files there. Please choose a different folder.",
};

const CancelRoundedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.59 13.59L12 13.41l-3.59 3.59-1.42-1.41L10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12l3.59 3.59-1.41 1.41z"
    />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
    />
  </svg>
);

export default function ChModalCreateProject({
  open = true,
  initialValue = { name: "My Awesome Scene", path: "/Users/creator/Documents/Decentraland" },
  onClose = () => {},
  onSubmit = () => {},
  takenPaths = ["/Users/creator/Documents/Decentraland/Taken Scene"],
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const paperRef = useRef(null);
  useDialogKeys(paperRef, onClose);

  const validateProjectPath = useCallback(
    (path, name) =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve(!takenPaths.includes(`${path}/${name}`)),
          250,
        ),
      ),
    [takenPaths],
  );

  const selectNewProjectPath = useCallback(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve("/Users/creator/Projects"), 250),
      ),
    [],
  );

  const validate = useCallback(async () => {
    setLoading(true);
    const valid = await validateProjectPath(value.path, value.name);
    if (!valid) setError(COPY.pathError);
    setLoading(false);
    return valid;
  }, [value, validateProjectPath]);

  const handleChange = useCallback(
    (key) => (event) => {
      setError(null);
      const v = event.target.value;
      setValue((prev) => ({ ...prev, [key]: v }));
    },
    [],
  );

  const handleOpenFolder = useCallback(async () => {
    setError(null);
    setLoading(true);
    const folder = await selectNewProjectPath();
    setLoading(false);
    if (folder) setValue((prev) => ({ ...prev, path: folder }));
  }, [selectNewProjectPath]);

  const handleSubmit = useCallback(async () => {
    const valid = await validate();
    if (valid) onSubmit(value);
  }, [onSubmit, value, validate]);

  if (!open) return null;

  return (
    <div className="chmcp" role="presentation">
      <div
        className="chmcp__paper"
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title}
        tabIndex={-1}
        ref={paperRef}
      >
        <div className="chmcp__titlebar">
          <h2 className="chmcp__title">{COPY.title}</h2>
          <button
            type="button"
            className="chmcp__close"
            aria-label="close"
            onClick={onClose}
          >
            <CancelRoundedIcon />
          </button>
        </div>

        <div className="chmcp__content">
          <div className="chmcp__form">
            <p className="chmcp__label">{COPY.name}</p>
            <div className="chmcp__input">
              <input
                className="chmcp__field"
                type="text"
                value={value.name}
                onChange={handleChange("name")}
                onBlur={validate}
              />
            </div>

            <p className="chmcp__label">{COPY.path}</p>
            <div className="chmcp__input">
              <input
                className="chmcp__field"
                type="text"
                value={value.path}
                onChange={handleChange("path")}
                onBlur={validate}
              />
              <span className="chmcp__adornment">
                <button
                  type="button"
                  className="chmcp__folderbtn"
                  aria-label="choose folder"
                  onClick={handleOpenFolder}
                >
                  <FolderIcon />
                </button>
              </span>
            </div>

            {error && <p className="chmcp__error">{error}</p>}
          </div>
        </div>

        <div className="chmcp__actions">
          <button
            type="button"
            className="chmcp__btn chmcp__btn--secondary"
            onClick={onClose}
          >
            {COPY.cancel}
          </button>
          <button
            type="button"
            className="chmcp__btn chmcp__btn--primary"
            onClick={handleSubmit}
            disabled={loading || !!error}
          >
            {loading ? (
              <span className="chmcp__spinner" aria-label="loading" />
            ) : (
              COPY.create
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
