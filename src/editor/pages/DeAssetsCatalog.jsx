import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import { DeAssetsPanel } from "./DeWorkspace.jsx";

export default function DeAssetsCatalog({ models, local, viewportSrc =(null) }) {
  const catalog = models
    ? models.map((m) => ({ id: m.id, name: m.name, pack: m.pack, hue: m.hue }))
    : undefined;
  return (
    <DclEditorChrome viewportSrc={viewportSrc}>
      <DeAssetsPanel tab="catalog" catalog={catalog} local={local} />
    </DclEditorChrome>
  );
}
