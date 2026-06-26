import BdCollectionsItemsTab from "./BdCollectionsItemsTab.jsx";

export default {
  title: "Builder/Pages/Collections - Items Tab",
  component: BdCollectionsItemsTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const ListView = {
  args: { view: "list" },
};

export const Empty = {
  args: { items: [] },
};

export const Loading = {
  args: { loading: true },
};
