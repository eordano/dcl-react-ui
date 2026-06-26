import StProfileMyAssetsTab from "./StProfileMyAssetsTab.jsx";

export default {
  title: "Web/Pages/Profile/My Assets",
  component: StProfileMyAssetsTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Names = {
  args: { category: "ens" },
};

export const Empty = {
  args: { empty: true },
};

export const Loading = {
  args: { loading: true },
};
