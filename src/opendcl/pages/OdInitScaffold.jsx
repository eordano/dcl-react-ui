import OpenDclTerminal, { Line, Blank, Tok } from "../frames/OpenDclTerminal.jsx";

export const SCAFFOLD_FILES = [
  { name: "scene.json", note: "scene metadata, parcels, spawn points" },
  { name: "package.json", note: "@dcl/sdk dependency + scripts" },
  { name: "tsconfig.json", note: "SDK7 TypeScript config" },
  { name: "src/index.ts", note: "main() entry point" },
  { name: ".gitignore", note: "node_modules, bin, .DS_Store" },
];

export default function OdInitScaffold() {
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <span className="od-notify">
        <span className="od-notify__tag">›</span> Initializing new Decentraland scene...
      </span>
      <Blank />
      <Line tone="dim">$ npx @dcl/sdk-commands init</Line>
      <Blank />
      <span className="od-tree">
        {SCAFFOLD_FILES.map((f) => (
          <span className="od-tree__row" key={f.name}>
            <span className="od-tree__mark">✓</span>
            <span className="od-tree__name">{f.name}</span>
            <span className="od-tree__note">— {f.note}</span>
          </span>
        ))}
      </span>
      <Blank />
      <Line>
        <Tok tone="green" bold>✓ Scene scaffolded.</Tok>
        <Tok tone="dim"> 5 files created in ~/my-tavern-scene</Tok>
      </Line>
      <Blank />
      <Line tone="dim">
        Run <Tok tone="accent">/preview</Tok> to launch the dev server, or just
        describe the scene you want to build.
      </Line>
    </OpenDclTerminal>
  );
}
