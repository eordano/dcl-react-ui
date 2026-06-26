import BdLandSelectENS from "./BdLandSelectENS.jsx";

export default {
  title: "Builder/Pages/Land Select ENS",
  component: BdLandSelectENS,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { empty: true },
};

export const Loading = {
  args: { isLoading: true },
};
