import { useState } from "react";

import SceneLabChrome from "../../scenelab/frames/SceneLabChrome.jsx";
import { SlPromptPanel, SlEditorPanel } from "../../scenelab/pages/SlStudio.jsx";
import SlBuildFeedback from "../../scenelab/components/SlBuildFeedback.jsx";
import OpenDclTerminal, {
  Line,
  Blank,
  Tok,
  PromptLine,
  SpinnerLine,
} from "../../opendcl/frames/OpenDclTerminal.jsx";
import { WriteTool, ReadTool } from "../../opendcl/pages/OdChatSession.jsx";
import "./generatesceneview.css";

export default function GenerateSceneView({
  view = "prompting",
  step = "prompt",
  simulated = false,
  promptValue = "",
  samplePrompt = "",
  fileNames =([]),
  onSubmitPrompt =(undefined),
  onViewSnapshot =(undefined),
  onBuild =(undefined),
  onTogglePreview =(undefined),
  onRetryBuild =(undefined),
  onExitSnapshot =(undefined),
  onRevertSnapshot =(undefined),
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="ai-generate" data-step={step}>
      {simulated && (
        <p className="ai-generate__sim" role="note">
          Simulated preview — sample output, not a live AI run.
        </p>
      )}

      {view === "prompting" && (
        <>
          <SceneLabChrome
            left={<SlPromptPanel messages={[]} />}
            right={<SlEditorPanel mode="code" />}
          />
          <div className="ai-generate__controls" role="group" aria-label="Describe the scene">
            <textarea
              className="ai-generate__prompt"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={samplePrompt}
              aria-label="Describe the scene"
            />
            <button
              type="button"
              className="ai-generate__btn ai-generate__btn--primary"
              onClick={() => onSubmitPrompt?.(draft.trim() || samplePrompt)}
            >
              Send prompt
            </button>
          </div>
        </>
      )}

      {view === "generating" && (
        <OpenDclTerminal status={<><Tok tone="accent">▶ generating</Tok>{"    claude-opus-4"}</>}>
          <PromptLine text={promptValue} cursor={false} placeholder="" />
          <Blank />
          <Line tone="normal">
            I'll scaffold an SDK7 project, then add the scene entities you
            described. Reading the scene config first, then writing the entry point.
          </Line>
          <Blank />
          <ReadTool
            path="scene.json"
            preview={["{", '  "ecs7": true,', '  "display": {', '    "title": "Medieval Tavern",', '    "description": "A cozy medieval tavern"']}
            more={12}
          />
          <Blank />
          <WriteTool path="src/index.ts" chars={812} lines={24} />
          <Blank />
          <WriteTool path="src/tavern.ts" chars={1340} lines={41} />
          <Blank />
          <SpinnerLine phase="Generating" elapsed="23s" tokens="1.2k" />
        </OpenDclTerminal>
      )}

      {view === "generated" && (
        <>
          <SceneLabChrome
            left={<SlPromptPanel />}
            right={<SlEditorPanel mode="code" />}
          />
          <div className="ai-generate__controls" role="group" aria-label="Scene generated">
            <span className="ai-generate__files">Wrote {fileNames.join(", ")}</span>
            <button
              type="button"
              className="ai-generate__btn"
              onClick={() => onViewSnapshot?.("snap-1")}
            >
              View earlier snapshot
            </button>
            <button
              type="button"
              className="ai-generate__btn ai-generate__btn--primary"
              onClick={() => onBuild?.()}
            >
              Build Scene
            </button>
          </div>
        </>
      )}

      {view === "building" && (
        <SceneLabChrome
          left={<SlPromptPanel processing />}
          right={<SlEditorPanel mode="code" building />}
        />
      )}

      {view === "built" && (
        <>
          <SlBuildFeedback variant="build" />
          <div className="ai-generate__controls" role="group" aria-label="Build succeeded">
            <button
              type="button"
              className="ai-generate__btn"
              onClick={() => onViewSnapshot?.("snap-1")}
            >
              View earlier snapshot
            </button>
            <button
              type="button"
              className="ai-generate__btn ai-generate__btn--primary"
              onClick={() => onTogglePreview?.()}
            >
              Open preview
            </button>
          </div>
        </>
      )}

      {view === "buildError" && (
        <>
          <SlBuildFeedback variant="error" />
          <div className="ai-generate__controls" role="group" aria-label="Build failed">
            <button
              type="button"
              className="ai-generate__btn ai-generate__btn--primary"
              onClick={() => onRetryBuild?.()}
            >
              Retry build
            </button>
          </div>
        </>
      )}

      {view === "previewing" && (
        <>
          <SceneLabChrome
            left={<SlPromptPanel />}
            right={<SlEditorPanel mode="preview" />}
          />
          <div className="ai-generate__controls" role="group" aria-label="Preview running">
            <button
              type="button"
              className="ai-generate__btn"
              onClick={() => onTogglePreview?.()}
            >
              Back to code
            </button>
          </div>
        </>
      )}

      {view === "snapshot" && (
        <>
          <SceneLabChrome
            left={<SlPromptPanel viewingId={"m2"} />}
            right={<SlEditorPanel mode="code" snapshot />}
          />
          <div className="ai-generate__controls" role="group" aria-label="Viewing a snapshot">
            <button
              type="button"
              className="ai-generate__btn"
              onClick={() => onExitSnapshot?.()}
            >
              Back to latest
            </button>
            <button
              type="button"
              className="ai-generate__btn ai-generate__btn--primary"
              onClick={() => onRevertSnapshot?.()}
            >
              Revert to this snapshot
            </button>
          </div>
        </>
      )}
    </div>
  );
}
