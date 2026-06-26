import SceneLabChrome from "../frames/SceneLabChrome.jsx";
import { SlPromptPanel, SlEditorPanel } from "../pages/SlStudio.jsx";

const MESSAGES = {
  build: "✅ Build successful! Scene compiled and ready.",
  error: "❌ Build failed: type error in src/index.ts (line 11)",
  reset: "🔄 Conversation reset. Starting fresh!",
};

export default function SlBuildFeedback({ variant = "build" }) {
  return (
    <>
      <SceneLabChrome left={<SlPromptPanel />} right={<SlEditorPanel mode="code" />} />
      <div className="sl-alert__scrim">
        <div className="sl-alert" role="alertdialog" aria-label="Scene Lab notice">
          <div className="sl-alert__host">scene-lab.decentraland.org says</div>
          <div className="sl-alert__msg">{MESSAGES[variant]}</div>
          <div className="sl-alert__foot">
            <button type="button" className="sl-alert__ok">OK</button>
          </div>
        </div>
      </div>
    </>
  );
}
