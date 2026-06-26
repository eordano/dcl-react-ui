import Sidebar from "./Sidebar.jsx";

export default {
  title: "Explorer/Frames/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <Sidebar />,
};
