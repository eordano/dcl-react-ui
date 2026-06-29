import DclEditorChrome from "../frames/DclEditorChrome.jsx";
import DeInteractionsPanel from "./DeInteractionsPanel.jsx";

export default {
  title: "Editor/Components/InteractionsPanel",
  component: DeInteractionsPanel,
  parameters: { layout: "fullscreen" },
};

function Frame({ children }) {
  return (
    <DclEditorChrome>
      <div className="eui-panel eui-right">
        <div className="eui-panel-head">
          <div className="eui-head-text">
            <span className="eui-overline">Inspector</span>
            <span className="eui-title">Display Cube</span>
          </div>
          <span className="eui-id-badge">#520</span>
        </div>
        <div className="eui-panel-body">{children}</div>
      </div>
    </DclEditorChrome>
  );
}

export const Default = {
  render: () => (
    <Frame>
      <DeInteractionsPanel
        entityId="520"
        entityName="Display Cube"
        onWrite={(name, json) => console.log("[author]", name, json)}
      />
    </Frame>
  ),
};

export const PreviewOnly = {
  render: () => (
    <Frame>
      <DeInteractionsPanel entityId="520" entityName="Display Cube" />
    </Frame>
  ),
};

export const AppendToExisting = {
  render: () => (
    <Frame>
      <DeInteractionsPanel
        entityId="520"
        entityName="Display Cube"
        onWrite={(name, json) => console.log("[author]", name, json)}
        existingActions={{
          id: 520,
          value: [
            { name: "Open", type: "set_visibility", jsonPayload: JSON.stringify({ visible: true }) },
          ],
        }}
        existingTriggers={{
          value: [{ type: "on_click", actions: [{ id: 520, name: "Open" }] }],
        }}
      />
    </Frame>
  ),
};
