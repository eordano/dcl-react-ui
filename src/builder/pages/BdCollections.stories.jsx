import BdCollections from "./BdCollections.jsx";

export default {
  title: "Builder/Pages/Collections",
  component: BdCollections,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const ListView = {
  args: { view: "list" },
};

export const LinkedWearables = {
  args: { tab: "third_party_collections" },
};

export const SingleItems = {
  args: { tab: "orphan_items" },
};

export const Empty = {
  args: { collections: [], items: [] },
};

export const Loading = {
  args: { loading: true },
};
