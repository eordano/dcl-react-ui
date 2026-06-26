import OpenDclTerminal, { Line, Blank, Tok, PromptLine } from "../frames/OpenDclTerminal.jsx";

const EXAMPLE = [
  [["od-tok-kw", "import"], ["od-tok-pun", " { "], ["od-tok-ty", "engine"], ["od-tok-pun", ", "], ["od-tok-ty", "pointerEventsSystem"], ["od-tok-pun", ", "], ["od-tok-ty", "InputAction"], ["od-tok-pun", " } "], ["od-tok-kw", "from"], ["od-tok-str", " '@dcl/sdk/ecs'"]],
  [],
  [["od-tok-ty", "pointerEventsSystem"], ["od-tok-pun", "."], ["od-tok-fn", "onPointerDown"], ["od-tok-pun", "("]],
  [["od-tok-pun", "  { entity: door, opts: { button: "], ["od-tok-ty", "InputAction"], ["od-tok-pun", ".IA_POINTER, hoverText: "], ["od-tok-str", "'Open'"], ["od-tok-pun", " } },"]],
  [["od-tok-pun", "  () => "], ["od-tok-ty", "Anim/* play open */"], ["od-tok-pun", "()"]],
  [["od-tok-pun", ")"]],
];

function Fence({ lines = EXAMPLE }) {
  return (
    <span className="od-fence" role="img" aria-label="code example">
      {lines.map((toks, i) => (
        <span key={i} style={{ display: "block" }}>
          {toks.length === 0
            ? " "
            : toks.map(([c, t], j) => (
                <span className={c} key={j}>{t}</span>
              ))}
        </span>
      ))}
    </span>
  );
}

export default function OdExplain() {
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <PromptLine text="/explain pointer events" cursor={false} />
      <Blank />

      <span className="od-h od-h--accent">What it is &amp; why it's useful</span>
      <Line>
        Pointer events are how SDK7 scenes react to player input on entities —
        clicks, hovers, and key presses aimed at a 3D object. They're the primary
        way to make a scene interactive (open a door, pick up an item, trigger UI)
        without polling input yourself each frame.
      </Line>
      <Blank />

      <span className="od-h od-h--accent">Minimal example</span>
      <Fence />
      <Blank />

      <span className="od-h od-h--accent">Common pitfalls</span>
      <Line tone="dim">• Forgetting the entity needs a collider/mesh to be clickable.</Line>
      <Line tone="dim">• Re-registering the same handler every frame inside a system.</Line>
      <Line tone="dim">• Using SDK6's OnClick component (removed in SDK7).</Line>
      <Blank />

      <span className="od-h od-h--accent">Related concepts</span>
      <Line>
        <Tok tone="accent">InputAction</Tok> ·{" "}
        <Tok tone="accent">PointerEvents</Tok> component ·{" "}
        <Tok tone="accent">MeshCollider</Tok> ·{" "}
        <Tok tone="accent">inputSystem.isTriggered</Tok>
      </Line>
    </OpenDclTerminal>
  );
}
