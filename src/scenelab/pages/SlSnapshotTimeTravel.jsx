import SceneLabChrome from "../frames/SceneLabChrome.jsx";
import { SlPromptPanel, SlEditorPanel, SAMPLE_CONVO } from "./SlStudio.jsx";

export default function SlSnapshotTimeTravel() {
  return (
    <SceneLabChrome
      left={<SlPromptPanel messages={SAMPLE_CONVO} viewingId="m2" />}
      right={<SlEditorPanel mode="code" snapshot />}
    />
  );
}
