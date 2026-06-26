import { useState } from "react";
import "./cheditorpreviewpublishmenudropdowns.css";

const PlayCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM9.5 16.5v-9l7 4.5z" />
  </svg>
);
const PublicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 17.93A8.01 8.01 0 0 1 4 12c0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41A8 8 0 0 1 17.9 17.39z" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zM14.6 16.6 19.2 12l-4.6-4.6L16 6l6 6-6 6z" />
  </svg>
);
const CaretIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m7 10 5 5 5-5z" />
  </svg>
);

function MuiCheckbox({ checked }) {
  return (
    <span className={"cheppm__cbx" + (checked ? " is-checked" : "")} aria-hidden="true">
      {checked ? (
        <svg viewBox="0 0 24 24">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <path d="M19 5v14H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
        </svg>
      )}
    </span>
  );
}

function CheckRow({ checked, onChange, label }) {
  return (
    <label className="cheppm__formrow">
      <span className="cheppm__control">
        <input
          type="checkbox"
          className="cheppm__nativecbx"
          checked={checked}
          onChange={onChange}
        />
        <MuiCheckbox checked={checked} />
      </span>
      <span className="cheppm__formlabel">{label}</span>
    </label>
  );
}

function PreviewOptions({ options, onChange, supportsMultiInstance = true }) {
  const set = (patch) => () => onChange({ ...options, ...patch });
  return (
    <div className="cheppm__popper cheppm__previewoptions" role="menu">
      <span className="cheppm__menutitle">Preview Options</span>
      <div className="cheppm__formgroup">
        <CheckRow
          checked={!!options.debugger}
          onChange={set({ debugger: !options.debugger })}
          label="Open Debug Console"
        />
        <CheckRow
          checked={!!options.enableLandscapeTerrains}
          onChange={set({ enableLandscapeTerrains: !options.enableLandscapeTerrains })}
          label="Enable Landscape Terrains"
        />
        {supportsMultiInstance && (
          <CheckRow
            checked={!!options.multiInstance}
            onChange={set({ multiInstance: !options.multiInstance })}
            label="Multi-Instance Preview"
          />
        )}
      </div>
      <div className="cheppm__divider" role="separator" />
      <button type="button" className="cheppm__listitem">
        <span className="cheppm__listtext">Show QR Code for Mobile</span>
      </button>
    </div>
  );
}

function PublishOptions({ options }) {
  return (
    <div className="cheppm__popper cheppm__publishoptions" role="menu">
      {options.map((opt) => (
        <button type="button" key={opt.id} className="cheppm__listitem">
          <span className="cheppm__listtext">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function ChEditorPreviewPublishMenuDropdowns({
  title = "Genesis Plaza Demo",
  publishOptions = [
    { id: "publish-scene", label: "Publish Scene" },
    { id: "deploy-world", label: "Republish to genesis-plaza.dcl.eth" },
  ],
  open = "both",
}) {
  const [previewOpen, setPreviewOpen] = useState(open === "preview" || open === "both");
  const [publishOpen, setPublishOpen] = useState(open === "publish" || open === "both");
  const [opts, setOpts] = useState({
    debugger: false,
    enableLandscapeTerrains: true,
    multiInstance: false,
  });

  return (
    <div className="cheppm">
      <div className="cheppm__header">
        <div className="cheppm__title">{title}</div>
        <div className="cheppm__actions">
          <button type="button" className="cheppm__btn cheppm__btn--secondary">
            <CodeIcon />
            Code
          </button>

          <div className="cheppm__group">
            <button
              type="button"
              className="cheppm__btn cheppm__btn--secondary cheppm__btn--main"
            >
              <PlayCircleIcon />
              Preview
            </button>
            <button
              type="button"
              className="cheppm__extra cheppm__extra--secondary"
              aria-label="Preview options"
              aria-expanded={previewOpen}
              onClick={() => setPreviewOpen((v) => !v)}
            >
              <CaretIcon />
            </button>
            {previewOpen && (
              <div className="cheppm__poppermount">
                <PreviewOptions options={opts} onChange={setOpts} supportsMultiInstance />
              </div>
            )}
          </div>

          <div className="cheppm__group">
            <button
              type="button"
              className="cheppm__btn cheppm__btn--primary cheppm__btn--main"
            >
              <PublicIcon />
              Publish
            </button>
            <button
              type="button"
              className="cheppm__extra cheppm__extra--primary"
              aria-label="Publish options"
              aria-expanded={publishOpen}
              onClick={() => setPublishOpen((v) => !v)}
            >
              <CaretIcon />
            </button>
            {publishOpen && (
              <div className="cheppm__poppermount">
                <PublishOptions options={publishOptions} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cheppm__caption">
        <span className="cheppm__captionpill">PreviewOptions</span>
        <span className="cheppm__captionpill">PublishOptions</span>
      </div>
    </div>
  );
}
