import SceneLoading from "./SceneLoading.jsx";

export default {
  title: "Explorer/Workflows/SceneLoading",
  component: SceneLoading,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <SceneLoading />,
};

export const JustStarted = {
  render: () => <SceneLoading progress={4} />,
};

export const AlmostDone = {
  render: () => <SceneLoading progress={92} />,
};
