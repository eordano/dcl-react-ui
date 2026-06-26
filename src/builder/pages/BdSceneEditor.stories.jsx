import BdSceneEditor from "./BdSceneEditor.jsx";

export default {
  title: "Builder/Pages/Scene Editor",
  component: BdSceneEditor,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const PackSelected = {
  args: { selectedPack: "ap-nature" },
};

export const SidebarClosed = {
  args: { isSidebarOpen: false },
};

export const Preview = {
  name: "Preview / Play mode",
  args: { isPreviewing: true },
};
