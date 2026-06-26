import OpenDclTerminal, { Line, Blank, Tok } from "../frames/OpenDclTerminal.jsx";

function Step({ children, done = true, pending = false }) {
  return (
    <span className="od-tree__row" style={{ margin: "2px 0" }}>
      <span className={"od-tree__mark" + (pending ? " od-dim" : "")}>
        {pending ? "·" : "✓"}
      </span>
      <span className={pending ? "od-tree__note" : "od-tree__name"}>{children}</span>
    </span>
  );
}

export default function OdPreviewDeploy() {
  return (
    <OpenDclTerminal status={<><Tok tone="accent">▶ dcl preview server</Tok>{"    claude-sonnet-4"}</>}>
      <span className="od-notify">
        <span className="od-notify__tag">›</span> Starting Bevy-web preview server...
      </span>
      <Blank />
      <Step>Compiled scene (esbuild) — 0 type errors</Step>
      <Step>Started preview server (Bevy Explorer Web)</Step>
      <Step>Opened browser</Step>
      <Blank />
      <Line>
        <Tok tone="green" bold>✓ Preview running at </Tok>
        <Tok tone="blue">http://localhost:8000</Tok>
      </Line>
      <Blank />
      <Line tone="dim">
        The server runs in the background — manage it with{" "}
        <Tok tone="accent">/tasks</Tok>. Keep describing changes and they'll
        hot-reload.
      </Line>
    </OpenDclTerminal>
  );
}

export function DeployView() {
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <span className="od-notify">
        <span className="od-notify__tag">›</span> Deploying to Genesis City (parcel -42,19)...
      </span>
      <Blank />
      <Step>Built production bundle (124 KB)</Step>
      <Step>Generated entity + content hashes</Step>
      <Step>Signed deployment with wallet 0x9f3c…7a21</Step>
      <Step>Uploaded 14 files to catalyst peer.decentraland.org</Step>
      <Step>Confirmed deployment on chain</Step>
      <Blank />
      <Line>
        <Tok tone="green" bold>✓ Deployed to Genesis City.</Tok>
      </Line>
      <Line tone="dim">
        Live at{" "}
        <Tok tone="blue">https://play.decentraland.org/?position=-42,19</Tok>
      </Line>
    </OpenDclTerminal>
  );
}
