import BdScenesList from "./BdScenesList.jsx";

export default {
  title: "Builder/Pages/Scenes List",
  component: BdScenesList,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <BdScenesList />,
};

export const Empty = {
  render: () => <BdScenesList projects={[]} />,
};

export const Loading = {
  render: () => <BdScenesList loading />,
};
