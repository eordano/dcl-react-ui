import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { DeAssetsPanel } from "./DeWorkspace.jsx";

export default function DeAssetsLocal() {
  return (
    <DclEditorChrome>
      <DeAssetsPanel tab="local" />
    </DclEditorChrome>
  );
}
