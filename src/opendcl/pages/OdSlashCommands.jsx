import { useState } from "react";
import OpenDclTerminal, { Blank, PromptLine } from "../frames/OpenDclTerminal.jsx";

export const SLASH_COMMANDS = [
  { cmd: "/init", desc: "Scaffold a new Decentraland scene in the current directory" },
  { cmd: "/preview", desc: "Start the Bevy-web preview server and open the scene in browser" },
  { cmd: "/deploy", desc: "Deploy the scene to Genesis City or a World" },
  { cmd: "/tasks", desc: "Interactively manage running background processes" },
  { cmd: "/review", desc: "Review scene code for quality, performance, and SDK7 best practices" },
  { cmd: "/explain", desc: "Explain a Decentraland SDK7 concept (e.g. /explain tweens)" },
  { cmd: "/setup", desc: "Configure an LLM provider (login or API key)" },
  { cmd: "/status", desc: "Show session, provider, and model status" },
  { cmd: "/login", desc: "Authenticate with a provider subscription" },
  { cmd: "/clear", desc: "Clear the conversation history" },
  { cmd: "/help", desc: "List available commands and shortcuts" },
];

export function SelectRow({ active = false, marker, label, desc, children }) {
  return (
    <div className={"od-row" + (active ? " is-active" : "")}>
      {marker != null && <span className="od-row__marker">{active ? marker : " "}</span>}
      {label != null && <span className="od-row__label">{label}</span>}
      {desc != null && <span className="od-row__desc">{desc}</span>}
      {children}
    </div>
  );
}

export default function OdSlashCommands() {
  const [selected] = useState(1);
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <div className="od-box">
        <div className="od-box__list">
          {SLASH_COMMANDS.map((c, i) => (
            <SelectRow
              key={c.cmd}
              active={i === selected}
              marker="›"
              label={c.cmd}
              desc={c.desc}
            />
          ))}
        </div>
      </div>
      <Blank />
      <PromptLine text="/" />
    </OpenDclTerminal>
  );
}
