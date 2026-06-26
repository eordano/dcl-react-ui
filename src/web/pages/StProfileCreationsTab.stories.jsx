import StProfileCreationsTab from "./StProfileCreationsTab.jsx";

export default {
  title: "Web/Pages/Profile/Creations Tab",
  component: StProfileCreationsTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { empty: true },
};

export const Loading = {
  args: { loading: true },
};
