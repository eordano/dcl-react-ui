import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { DeInspectorPanel as Inspector } from "./DeWorkspace.jsx";

export default function DeInspectorPage({ addOpen = false, inspector = {}, viewportSrc =(null), live = Boolean(viewportSrc) }) {
  return (
    <DclEditorChrome viewportSrc={viewportSrc}>
      <Inspector
        addOpen={addOpen}
        name={inspector.name}
        id={inspector.id}
        components={inspector.components}
        transform={inspector.transform}
        live={live}
      />
    </DclEditorChrome>
  );
}
