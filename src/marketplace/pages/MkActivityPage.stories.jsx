import MkActivityPage from "./MkActivityPage.jsx";

export default {
  title: "Marketplace/Pages/Activity",
  component: MkActivityPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { feed: [] },
};

export const Loading = {
  args: { feed: [], loading: true },
};

export const Paging = {
  args: { paging: true },
};
