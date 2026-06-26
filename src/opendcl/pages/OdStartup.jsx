import OpenDclTerminal, { Line, Blank, Tok, PromptLine } from "../frames/OpenDclTerminal.jsx";

const VERSION = "v0.4.0";
const CWD = "~/my-tavern-scene";

export const HEADER_ART = [
  "▗▄▄                                     ▗▄▖               ▗▖",
  "▐▛▀█                      ▐▌            ▝▜▌               ▐▌",
  "▐▌ ▐▌ ▟█▙  ▟██▖ ▟█▙ ▐▙██▖▐███  █▟█▌ ▟██▖ ▐▌   ▟██▖▐▙██▖ ▟█▟▌",
  "▐▌ ▐▌▐▙▄▟▌▐▛  ▘▐▙▄▟▌▐▛ ▐▌ ▐▌   █▘   ▘▄▟▌ ▐▌   ▘▄▟▌▐▛ ▐▌▐▛ ▜▌",
  "▐▌ ▐▌▐▛▀▀▘▐▌   ▐▛▀▀▘▐▌ ▐▌ ▐▌   █   ▗█▀▜▌ ▐▌  ▗█▀▜▌▐▌ ▐▌▐▌ ▐▌",
  "▐▙▄█ ▝█▄▄▌▝█▄▄▌▝█▄▄▌▐▌ ▐▌ ▐▙▄  █   ▐▙▄█▌ ▐▙▄ ▐▙▄█▌▐▌ ▐▌▝█▄█▌",
  "▝▀▀   ▝▀▀  ▝▀▀  ▝▀▀ ▝▘ ▝▘  ▀▀  ▀    ▀▀▝▘  ▀▀  ▀▀▝▘▝▘ ▝▘ ▝▀▝▘",
];

const TAG = "by RegenesisLabs";
const ART_WIDTH = HEADER_ART[2].length;
const TAG_PAD = " ".repeat(Math.max(0, ART_WIDTH - TAG.length));

export function Banner({ version = VERSION, cwd = CWD }) {
  return (
    <>
      <span className="od-pre od-accent" aria-label="Decentraland">
        {HEADER_ART.join("\n")}
      </span>
      <span className="od-pre od-dim">{TAG_PAD + TAG}</span>
      <Blank />
      <Line>
        <Tok tone="accent" bold>OpenDCL</Tok>
        <Tok tone="dim"> {version} — AI assistant for Decentraland SDK7</Tok>
      </Line>
      <Line tone="dim">{cwd}</Line>
    </>
  );
}

export default function OdStartup() {
  return (
    <OpenDclTerminal>
      <Banner />
      <Blank />
      <Line tone="dim">
        Type /setup to configure a provider, then describe the scene you want to build.
      </Line>
      <Blank />
      <PromptLine placeholder="" />
    </OpenDclTerminal>
  );
}
