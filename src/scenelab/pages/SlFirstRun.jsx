import SceneLabChrome from "../frames/SceneLabChrome.jsx";
import { SlPromptPanel, SlEditorPanel } from "./SlStudio.jsx";

export default function SlFirstRun() {
  return (
    <SceneLabChrome
      left={<SlPromptPanel messages={[]} />}
      right={<SlEditorPanel mode="code" />}
    />
  );
}
