import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { DeAssetsPanel } from "./DeWorkspace.jsx";

export default function DeAssetsCatalog() {
  return (
    <DclEditorChrome>
      <DeAssetsPanel tab="catalog" />
    </DclEditorChrome>
  );
}
