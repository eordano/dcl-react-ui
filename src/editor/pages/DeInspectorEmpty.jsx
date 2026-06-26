import DclEditorChrome from "../frames/DclEditorChrome.jsx";

export default function DeInspectorEmpty() {
  return (
    <DclEditorChrome>
      <div className="eui-panel eui-right">
        <div className="eui-panel-head">
          <div className="eui-head-text">
            <span className="eui-overline">Inspector</span>
            <span className="eui-title dim">Nothing selected</span>
          </div>
        </div>
        <div className="eui-panel-body">
          <div className="eui-empty">Select an entity to edit it</div>
        </div>
      </div>
    </DclEditorChrome>
  );
}
