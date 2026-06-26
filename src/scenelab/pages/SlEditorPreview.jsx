import SceneLabChrome from "../frames/SceneLabChrome.jsx";
import { SlPromptPanel, SlEditorPanel } from "./SlStudio.jsx";

export default function SlEditorPreview() {
  return (
    <SceneLabChrome
      left={<SlPromptPanel />}
      right={<SlEditorPanel mode="preview" />}
    />
  );
}
