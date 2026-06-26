import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import {
  DeToolbar,
  DeHierarchyPanel,
  DeInspectorPanel,
} from "./DeWorkspace.jsx";

export function DePlayWorkspace({ children }) {
  return (
    <DclEditorChrome>
      <DeToolbar playing />
      <DeHierarchyPanel />
      <DeInspectorPanel />
      <div className="eui-play-frame" aria-hidden="true">
        <span className="eui-play-badge">● PLAYING — changes won&rsquo;t be saved</span>
      </div>
      {children}
    </DclEditorChrome>
  );
}

export default function DePlayMode() {
  return <DePlayWorkspace />;
}
