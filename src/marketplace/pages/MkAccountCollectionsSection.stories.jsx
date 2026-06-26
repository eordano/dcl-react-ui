import MkAccountCollectionsSection from "./MkAccountCollectionsSection.jsx";

export default {
  title: "Marketplace/Pages/Account Collections",
  component: MkAccountCollectionsSection,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const ManyPages = {
  args: {
    count: 38,
  },
};

export const Empty = {
  args: {
    collections: [],
    count: 0,
  },
};

export const Loading = {
  args: {
    isLoading: true,
  },
};
