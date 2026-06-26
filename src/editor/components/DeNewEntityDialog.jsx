import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import {
  DeToolbar,
  DeHierarchyPanel,
  DeInspectorPanel,
} from "../pages/DeWorkspace.jsx";

export default function DeNewEntityDialog({ parent = "active" }) {
  return (
    <DclEditorChrome>
      <DeToolbar />
      <DeHierarchyPanel />
      <DeInspectorPanel />

      <div className="eui-modal-backdrop">
        <div className="eui-modal">
          <div className="eui-modal-head">New entity</div>
          <div className="eui-modal-body">
            <input className="eui-input" placeholder="Entity name" defaultValue="" autoFocus />
            <div style={{ display: "flex", gap: 8 }}>
              <button className={"eui-btn" + (parent === "root" ? " active" : "")}>At scene root</button>
              <button className={"eui-btn" + (parent === "active" ? " active" : "")}>Child of Display Cube</button>
            </div>
          </div>
          <div className="eui-modal-foot">
            <button className="eui-btn">Cancel</button>
            <button className="eui-btn primary">Create</button>
          </div>
        </div>
      </div>
    </DclEditorChrome>
  );
}
