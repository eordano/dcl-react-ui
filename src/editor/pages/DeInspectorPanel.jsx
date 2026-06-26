import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { DeInspectorPanel as Inspector } from "./DeWorkspace.jsx";

export default function DeInspectorPage({ addOpen = false }) {
  return (
    <DclEditorChrome>
      <Inspector addOpen={addOpen} />
    </DclEditorChrome>
  );
}
