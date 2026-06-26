import "./opendclterminal.css";

export default function OpenDclTerminal({
  children,
  title = "opendcl — ~/my-tavern-scene",
  status,
}) {
  return (
    <div className="od" role="region" aria-label="OpenDCL terminal">
      <div className="od__bar">
        <div className="od__lights" aria-hidden="true">
          <span className="od__light od__light--r" />
          <span className="od__light od__light--y" />
          <span className="od__light od__light--g" />
        </div>
        <div className="od__title">{title}</div>
      </div>

      <div className="od__body">{children}</div>

      {status != null && (
        <div className="od__foot">{status}</div>
      )}
    </div>
  );
}

export function Line({ tone, bold = false, right = false, children, className = "" }) {
  const cls =
    "od-line" +
    (tone ? " od-" + tone : "") +
    (bold ? " od-bold" : "") +
    (right ? " od-right" : "") +
    (className ? " " + className : "");
  return <span className={cls}>{children}</span>;
}

export function Blank() {
  return <span className="od-line od-line--blank"> </span>;
}

export function Tok({ tone, bold = false, children }) {
  const cls = (tone ? "od-" + tone : "") + (bold ? " od-bold" : "");
  return <span className={cls.trim()}>{children}</span>;
}

export function PromptLine({ caret = "›", text = "", placeholder, cursor = true }) {
  const empty = text === "" && placeholder != null;
  return (
    <div className="od-prompt">
      <span className="od-prompt__caret">{caret}</span>
      <span className={"od-prompt__text" + (empty ? " od-prompt__text--empty" : "")}>
        {empty ? placeholder : text}
        {cursor && <span className="od-cursor" aria-hidden="true" />}
      </span>
    </div>
  );
}

export function SpinnerLine({ phase = "Thinking", elapsed = "23s", tokens = "1.2k" }) {
  return (
    <span className="od-spin">
      <span className="od-spin__glyph">⠋</span>{" "}
      {phase}... ({elapsed} · ↓ {tokens} tokens)
    </span>
  );
}
