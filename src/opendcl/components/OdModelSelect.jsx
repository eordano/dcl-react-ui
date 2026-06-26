import OpenDclTerminal from "../frames/OpenDclTerminal.jsx";
import { SelectRow } from "../pages/OdSlashCommands.jsx";

export const MODEL_GROUPS = [
  { provider: "Anthropic", models: ["claude-sonnet-4", "claude-opus-4", "claude-haiku-4"] },
  { provider: "OpenAI", models: ["gpt-4o", "o1", "gpt-4o-mini"] },
  { provider: "Google", models: ["gemini-2.5-pro", "gemini-2.5-flash"] },
  { provider: "xAI", models: ["grok-2"] },
];

export default function OdModelSelect() {
  const active = "claude-sonnet-4";
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <div className="od-box">
        <div className="od-box__title">Select a model</div>
        <div className="od-box__list">
          {MODEL_GROUPS.map((g) => (
            <div key={g.provider}>
              <div className="od-box__group">{g.provider}</div>
              {g.models.map((m) => (
                <SelectRow key={m} active={m === active} marker="›" label={m} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </OpenDclTerminal>
  );
}
