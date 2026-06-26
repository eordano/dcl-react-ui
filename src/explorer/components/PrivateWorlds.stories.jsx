import PrivateWorlds from "./PrivateWorlds.jsx";

export default {
  title: "Explorer/Components/PrivateWorlds",
  component: PrivateWorlds,
  parameters: { layout: "fullscreen", overlay: true },
};

export const Default = {
  render: () => <PrivateWorlds />,
};
