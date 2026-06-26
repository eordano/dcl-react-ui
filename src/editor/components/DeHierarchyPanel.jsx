import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { DeHierarchyPanel as Hierarchy } from "../pages/DeWorkspace.jsx";

export default function DeHierarchyPage({ empty = false, contextMenu = null }) {
  return (
    <DclEditorChrome>
      <Hierarchy empty={empty} contextMenu={contextMenu} />
    </DclEditorChrome>
  );
}
