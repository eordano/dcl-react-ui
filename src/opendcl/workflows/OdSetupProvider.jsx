import OpenDclTerminal, { Line, Blank } from "../frames/OpenDclTerminal.jsx";
import { SelectRow } from "../pages/OdSlashCommands.jsx";

export const LOGIN_PROVIDERS = [
  "Anthropic (Claude Pro/Max)",
  "OpenAI (ChatGPT Plus/Pro)",
  "GitHub Copilot",
  "Google (Gemini)",
];

export const API_KEY_PROVIDERS = [
  "Anthropic (Claude)",
  "OpenAI (GPT)",
  "Google (Gemini)",
  "Groq",
  "Mistral",
  "xAI (Grok)",
  "OpenRouter",
  "Cerebras",
  "Hugging Face",
];

const LOGIN_SUFFIX = " (Login with subscription)";
const API_KEY_SUFFIX = " (API key)";

function ProviderList({ selected = 4 }) {
  const rows = [
    ...LOGIN_PROVIDERS.map((l) => l + LOGIN_SUFFIX),
    ...API_KEY_PROVIDERS.map((l) => l + API_KEY_SUFFIX),
  ];
  return (
    <OpenDclTerminal>
      <div className="od-box">
        <div className="od-box__title">Choose a provider</div>
        <div className="od-box__list">
          {rows.map((label, i) => (
            <SelectRow key={label} active={i === selected} marker="›" label={label} />
          ))}
        </div>
      </div>
    </OpenDclTerminal>
  );
}

function ApiKeyInputView() {
  return (
    <OpenDclTerminal>
      <div className="od-box">
        <div className="od-box__title">Paste your Anthropic (Claude) API key</div>
        <div className="od-box__list">
          <div className="od-row">
            <span className="od-row__marker od-accent">›</span>
            <span className="od-row__label od-dim">
              ••••••••••••••••••••••••••
              <span className="od-cursor" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
      <Blank />
      <Line tone="dim">Enter to confirm · Esc to cancel</Line>
    </OpenDclTerminal>
  );
}

function ConfiguredView() {
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <span className="od-notify od-notify--ok">
        <span className="od-notify__tag">✓</span> Anthropic (Claude) configured! Press Ctrl+P to select a model.
      </span>
    </OpenDclTerminal>
  );
}

export default function OdSetupProvider() {
  return <ProviderList />;
}

export { ProviderList, ApiKeyInputView, ConfiguredView };
