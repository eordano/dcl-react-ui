import DeEditorAppBar, { DeEditorControlsBar } from "./DeEditorAppBar.jsx";

export default {
  title: "Editor/Components/Editor App Bar",
  component: DeEditorAppBar,
  parameters: { layout: "fullscreen" },
};

const publishOptions = [
  { id: "publish-scene", label: "Publish Scene" },
  { id: "republish", label: "Republish to my-world.dcl.eth" },
];

export const Online = {
  render: () => (
    <DeEditorAppBar
      title="Genesis Plaza"
      viewportSrc="https://play.dcl.one"
      publishOptions={publishOptions}
      onExit={() => {}}
      onPublish={() => {}}
    />
  ),
};

export const PreviewOnly = {
  render: () => (
    <DeEditorAppBar
      title="Untitled scene"
      publishOptions={publishOptions}
      onExit={() => {}}
      onPublish={() => {}}
    />
  ),
};

export const ControlsBar = {
  render: () => (
    <DeEditorControlsBar label='Editing "Genesis Plaza"'>
      <button type="button" className="editor-wizard__btn editor-wizard__btn--primary">
        Open Assets
      </button>
      <button type="button" className="editor-wizard__btn">
        Save to disk
      </button>
    </DeEditorControlsBar>
  ),
};
