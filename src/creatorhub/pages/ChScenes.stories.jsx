import ChScenes from "./ChScenes.jsx";

export default {
  title: "CreatorHub/Pages/Scenes",
  component: ChScenes,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "default" },
};

export const Empty = {
  args: { state: "empty" },
};

export const Loading = {
  args: { state: "loading" },
};
