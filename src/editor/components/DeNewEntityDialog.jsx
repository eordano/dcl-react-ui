import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import {
  DeToolbar,
  DeHierarchyPanel,
  DeInspectorPanel,
} from "../pages/DeWorkspace.jsx";

export default function DeNewEntityDialog({
  parent = "active",
  title,
  tree,
  inspector = {},
  viewportSrc =(null),
  parentName = "Display Cube",
  live = Boolean(viewportSrc),
  tool = "translate",
  onTool = undefined,
  hideLeft = false,
  hideRight = false,
}) {
  return (
    <DclEditorChrome viewportSrc={viewportSrc}>
      <DeToolbar live={live} tool={tool} onTool={onTool} hideLeft={hideLeft} hideRight={hideRight} />
      {!hideLeft && <DeHierarchyPanel title={title} tree={tree} live={live} />}
      {!hideRight && (
        <DeInspectorPanel
          name={inspector.name}
          id={inspector.id}
          components={inspector.components}
          transform={inspector.transform}
          live={live}
        />
      )}

      <div className="eui-modal-backdrop">
        <div className="eui-modal">
          <div className="eui-modal-head">New entity</div>
          <div className="eui-modal-body">
            <input className="eui-input" placeholder="Entity name" defaultValue="" autoFocus />
            <div style={{ display: "flex", gap: 8 }}>
              <button className={"eui-btn" + (parent === "root" ? " active" : "")}>At scene root</button>
              <button className={"eui-btn" + (parent === "active" ? " active" : "")}>Child of {parentName}</button>
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
