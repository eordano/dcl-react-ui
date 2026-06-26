import { useCallback, useState } from "react";
import { asset } from "../../asset.js";
import "./chmodalappsettings.css";

const COPY = {
  title: "App Preferences",
  tabs: [
    { value: "scenes", label: "Scenes" },
    { value: "editor", label: "Editor" },
    { value: "about", label: "About" },
  ],
  scenesFolderLabel: "Scenes Folder",
  resetButton: "Reset",
  invalidPath:
    "Folder doesn't exist or can't save files there. Please choose a different folder.",
  dependenciesLabel: "Scene Dependencies",
  dependencies: [
    { value: "auto_update", label: "Auto-update all my scenes" },
    { value: "notify", label: "Notify me of new version updates" },
    { value: "do_nothing", label: "Do nothing" },
  ],
  codeEditorLabel: "Code editor of choice",
  chooseDevice: "Choose from your device...",
  selectPlaceholder: "Add or select a default editor",
  previewOptionsLabel: "Preview Options",
  debugger: "Open Debug Console",
  landscapeTerrain: "Enable Landscape Terrains",
  appWarningsLabel: "App Warnings",
  showWarnings:
    "Show a warning message each time you preview or publish a scene that contains custom code",
  aboutTitle: "Decentraland Creator Hub",
  viewChangelog: "View changelog",
  upToDate: "Creator Hub is up to date.",
  checkForUpdates: "Check for updates",
};

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
    />
  </svg>
);

const CloseRoundedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
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

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);

const ArrowDropDownIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M7 10l5 5 5-5z" />
  </svg>
);

const InfoOutlinedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    />
  </svg>
);

function Radio({ checked }) {
  return (
    <span className={"chmas__radio" + (checked ? " is-on" : "")}>
      <span className="chmas__radio-dot" />
    </span>
  );
}

function CheckboxBox({ checked }) {
  return (
    <span className={"chmas__check" + (checked ? " is-on" : "")}>
      {checked && (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            fill="#fff"
            d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
          />
        </svg>
      )}
    </span>
  );
}

function ScenesTab({ settings, error, isCustomScenesPath, onChange, onReset, onOpenFolder }) {
  return (
    <div className="chmas__form">
      <div className="chmas__group chmas__group--scenes">
        <p className="chmas__label">{COPY.scenesFolderLabel}</p>
        <div className="chmas__folderrow">
          <div className={"chmas__input" + (error ? " is-error" : "")}>
            <input
              className="chmas__field"
              type="text"
              value={settings.scenesPath}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="chmas__adornment">
              {isCustomScenesPath && (
                <button
                  type="button"
                  className="chmas__textbtn"
                  onClick={onReset}
                >
                  {COPY.resetButton}
                </button>
              )}
              <button
                type="button"
                className="chmas__iconbtn"
                aria-label="choose folder"
                onClick={onOpenFolder}
              >
                <FolderIcon />
              </button>
            </span>
          </div>
        </div>
        {error && <p className="chmas__error">{error}</p>}
      </div>

      <div className="chmas__group chmas__group--deps">
        <p className="chmas__label">{COPY.dependenciesLabel}</p>
        <div className="chmas__radiogroup" role="radiogroup">
          {COPY.dependencies.map((opt) => (
            <label key={opt.value} className="chmas__option">
              <Radio checked={settings.dependencyUpdateStrategy === opt.value} />
              <span className="chmas__optlabel">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorTab({ settings, editors, defaultEditor }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const selectedName =
    (editors.find((e) => e.path === defaultEditor) || {}).name ||
    COPY.selectPlaceholder;

  return (
    <div className="chmas__form">
      <div className="chmas__group chmas__group--editor">
        <p className="chmas__label">{COPY.codeEditorLabel}</p>
        <div className="chmas__select-wrap">
          <button
            type="button"
            className="chmas__select"
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={
                "chmas__select-value" +
                (selectedName === COPY.selectPlaceholder ? " is-placeholder" : "")
              }
            >
              {selectedName}
            </span>
            <span className="chmas__select-arrow">
              <ArrowDropDownIcon />
            </span>
          </button>
          {menuOpen && (
            <ul className="chmas__menu" role="listbox">
              {editors.map((editor) => (
                <li
                  key={editor.path}
                  className="chmas__menuitem"
                  role="option"
                  aria-selected={editor.path === defaultEditor}
                >
                  <span className="chmas__menuname">{editor.name}</span>
                  <span className="chmas__menuactions">
                    {editor.path === defaultEditor && (
                      <span className="chmas__defaulticon">
                        <CheckIcon />
                      </span>
                    )}
                    <button
                      type="button"
                      className="chmas__iconbtn chmas__iconbtn--small"
                      aria-label="remove editor"
                    >
                      <DeleteIcon />
                    </button>
                  </span>
                </li>
              ))}
              <li className="chmas__menuitem chmas__menuitem--custom" role="option">
                {COPY.chooseDevice}
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="chmas__group chmas__group--preview">
        <p className="chmas__label">{COPY.previewOptionsLabel}</p>
        <label className="chmas__option chmas__option--checkbox">
          <CheckboxBox checked={!!settings.previewOptions.debugger} />
          <span className="chmas__optlabel">{COPY.debugger}</span>
        </label>
        <label className="chmas__option chmas__option--checkbox">
          <CheckboxBox checked={!!settings.previewOptions.enableLandscapeTerrains} />
          <span className="chmas__optlabel">{COPY.landscapeTerrain}</span>
        </label>
      </div>

      <div className="chmas__group chmas__group--warnings">
        <p className="chmas__label">{COPY.appWarningsLabel}</p>
        <label className="chmas__option chmas__option--checkbox chmas__option--top">
          <CheckboxBox checked={!!settings.previewOptions.showWarnings} />
          <span className="chmas__optlabel">{COPY.showWarnings}</span>
        </label>
      </div>
    </div>
  );
}

function AboutTab({ version }) {
  return (
    <div className="chmas__about">
      <div className="chmas__abouthead">
        <img
          src={asset("assets/dcl-logo.png")}
          alt="Decentraland Creator Hub"
          className="chmas__aboutlogo"
        />
        <div className="chmas__aboutinfo">
          <h5 className="chmas__abouttitle">{COPY.aboutTitle}</h5>
          {version && (
            <div className="chmas__aboutversion">
              <span className="chmas__aboutver">{`v${version}`}</span>
              <button type="button" className="chmas__changelog">
                {COPY.viewChangelog}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="chmas__update">
        <div className="chmas__update-status">
          <p className="chmas__uptodate">{COPY.upToDate}</p>
        </div>
        <div className="chmas__update-buttons">
          <button type="button" className="chmas__btn chmas__btn--secondary chmas__btn--full">
            {COPY.checkForUpdates}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChModalAppSettings({
  open = true,
  initialTab = "scenes",
  version = "1.6.0",
  settings = {
    scenesPath: "/Users/creator/Documents/Decentraland",
    dependencyUpdateStrategy: "notify",
    previewOptions: {
      debugger: false,
      enableLandscapeTerrains: true,
      showWarnings: true,
    },
  },
  editors = [
    { name: "Visual Studio Code", path: "/usr/bin/code", isDefault: true },
    { name: "WebStorm", path: "/usr/bin/webstorm" },
  ],
  isCustomScenesPath = true,
  initialError = null,
  onClose = () => {},
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [scenes, setScenes] = useState(settings);
  const [error, setError] = useState(initialError);

  const defaultEditor = (editors.find((e) => e.isDefault) || {}).path || "";

  const handleScenesPath = useCallback((value) => {
    setScenes((prev) => ({ ...prev, scenesPath: value }));
    setError(null);
  }, []);

  const handleReset = useCallback(() => {
    setScenes((prev) => ({
      ...prev,
      scenesPath: "/Users/creator/Documents/Decentraland",
    }));
    setError(null);
  }, []);

  const handleOpenFolder = useCallback(() => {
    setScenes((prev) => ({ ...prev, scenesPath: "/Users/creator/Projects" }));
    setError(null);
  }, []);

  if (!open) return null;

  return (
    <div className="chmas" role="presentation">
      <div
        className="chmas__paper"
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title}
      >
        <div className="chmas__header">
          <div className="chmas__titlebox">
            <span className="chmas__titleicon">
              <SettingsIcon />
            </span>
            <h6 className="chmas__title">{COPY.title}</h6>
          </div>
          <button
            type="button"
            className="chmas__close"
            aria-label="close"
            onClick={onClose}
          >
            <CloseRoundedIcon />
          </button>
        </div>

        <div className="chmas__layout">
          <div className="chmas__tabs" role="tablist" aria-orientation="vertical">
            {COPY.tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={tab.value === activeTab}
                className={
                  "chmas__tab" + (tab.value === activeTab ? " is-selected" : "")
                }
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="chmas__content">
            {activeTab === "scenes" && (
              <ScenesTab
                settings={scenes}
                error={error}
                isCustomScenesPath={isCustomScenesPath}
                onChange={handleScenesPath}
                onReset={handleReset}
                onOpenFolder={handleOpenFolder}
              />
            )}
            {activeTab === "editor" && (
              <EditorTab
                settings={scenes}
                editors={editors}
                defaultEditor={defaultEditor}
              />
            )}
            {activeTab === "about" && <AboutTab version={version} />}
          </div>
        </div>
      </div>
    </div>
  );
}
