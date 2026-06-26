import StStorageScene from "./StStorageScene.jsx";

export default {
  title: "Web/Pages/Storage/Scene",
  component: StStorageScene,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { sceneKeys: [] },
};

export const Loading = {
  args: { loading: true },
};

export const AddDialog = {
  args: { initialDialog: "add" },
};

export const EditDialog = {
  args: { initialDialog: "edit" },
};
