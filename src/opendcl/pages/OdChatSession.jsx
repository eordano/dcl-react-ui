import OpenDclTerminal, { Line, Blank, Tok, PromptLine, SpinnerLine } from "../frames/OpenDclTerminal.jsx";

export function WriteTool({ path, chars, lines }) {
  return (
    <span className="od-tool">
      <span className="od-tool__name">write</span>{" "}
      <span className="od-tool__path">{path}</span>
      <span className="od-tool__meta"> ({chars} chars, {lines} lines)</span>
    </span>
  );
}

export function ReadTool({ path, preview = [], more }) {
  return (
    <>
      <span className="od-tool">
        <span className="od-tool__name">read</span>{" "}
        <span className="od-tool__path">{path}</span>
      </span>
      <span className="od-preview">
        {preview.join("\n")}
        {more != null && (
          <span className="od-preview__more">{"\n"}... ({more} more lines, ctrl+o to expand)</span>
        )}
      </span>
    </>
  );
}

const SCENE_JSON_PREVIEW = [
  "{",
  '  "ecs7": true,',
  '  "display": {',
  '    "title": "My Tavern Scene",',
  '    "description": "A cozy medieval tavern"',
];

export default function OdChatSession() {
  return (
    <OpenDclTerminal status={<><Tok tone="accent">▶ preview</Tok>{"    claude-sonnet-4"}</>}>
      <PromptLine text="Add a click handler to the tavern door that opens it" cursor={false} />
      <Blank />
      <Line>
        I'll add a pointer event to the door entity so clicking it plays the open
        animation. First let me check the scene config, then wire up the handler in
        the entry point.
      </Line>
      <Blank />
      <ReadTool path="scene.json" preview={SCENE_JSON_PREVIEW} more={12} />
      <Blank />
      <WriteTool path="src/index.ts" chars={812} lines={24} />
      <Blank />
      <SpinnerLine phase="Generating" elapsed="23s" tokens="1.2k" />
    </OpenDclTerminal>
  );
}
