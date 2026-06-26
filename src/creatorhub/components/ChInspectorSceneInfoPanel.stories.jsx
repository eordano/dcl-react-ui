import ChInspectorSceneInfoPanel from "./ChInspectorSceneInfoPanel.jsx";

export default {
  title: "CreatorHub/Components/Inspector: Scene Info",
  component: ChInspectorSceneInfoPanel,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Loading = { args: { isLoading: true } };

export const Empty = { args: { content: false } };
