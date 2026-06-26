import BdCuration from "./BdCuration.jsx";

export default {
  title: "Builder/Pages/Curation",
  component: BdCuration,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { collections: [] },
};

export const Loading = {
  args: { loading: true },
};
