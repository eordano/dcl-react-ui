import { useState } from "react";
import "./markdowneditor.css";

const DEFAULT_COMMANDS = [
  { k: "bold", label: "Bold", glyph: <b>B</b> },
  { k: "italic", label: "Italic", glyph: <i>I</i> },
  { k: "link", label: "Link", glyph: "↗" },
  { k: "list", label: "List", glyph: "•" },
];

export default function MarkdownEditor({
  value = "",
  onChange,
  placeholder,
  name,
  disabled = false,
  error = false,
  tall = false,
  minHeight,
  commands = DEFAULT_COMMANDS,
  toggle = "text",
  counter,
  fullscreen = false,
  className = "",
}) {
  const [preview, setPreview] = useState(false);

  const counterText =
    counter == null
      ? null
      : typeof counter === "string"
      ? counter
      : `(${counter.current} out of ${counter.limit} characters)`;

  const handle = (v) => onChange && onChange(v);

  return (
    <div
      className={
        "mde" +
        (error ? " is-error" : "") +
        (disabled ? " is-disabled" : "") +
        (className ? " " + className : "")
      }
      style={minHeight ? { "--mde-min": minHeight + "px" } : undefined}
    >
      <div className="mde__toolbar" role="toolbar" aria-label="Markdown commands">
        <div className="mde__cmds">
          {commands.map((c) => (
            <button
              key={c.k}
              type="button"
              className="mde__cmd"
              title={c.label}
              aria-label={c.label}
              tabIndex={-1}
              disabled={disabled}
            >
              {c.glyph}
            </button>
          ))}
        </div>
        <span className="mde__spacer" />
        <div className="mde__right">
          {counterText ? <span className="mde__count">{counterText}</span> : null}

          {toggle === "switch" ? (
            <label className="mde__switchlabel">
              <input
                type="checkbox"
                checked={preview}
                onChange={(e) => setPreview(e.target.checked)}
                disabled={disabled}
              />
              <span className="mde__switch" aria-hidden="true" />
              Preview
            </label>
          ) : toggle === "text" ? (
            <button
              type="button"
              className="mde__toggle"
              onClick={() => setPreview((p) => !p)}
              disabled={disabled}
              tabIndex={-1}
            >
              {preview ? "Edit" : "Preview"}
            </button>
          ) : null}

          {fullscreen ? (
            <button
              type="button"
              className="mde__cmd"
              title="Fullscreen"
              aria-label="Fullscreen"
              tabIndex={-1}
              disabled={disabled}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      {preview && toggle === "text" ? (
        <div className="mde__preview">{value || placeholder}</div>
      ) : (
        <textarea
          className={"mde__area" + (tall ? " is-tall" : "")}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error || undefined}
          onChange={(e) => handle(e.target.value)}
        />
      )}
    </div>
  );
}
