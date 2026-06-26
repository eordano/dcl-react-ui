import MkLandsPage from "./MkLandsPage.jsx";

export default {
  title: "Marketplace/Pages/Lands",
  component: MkLandsPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const AtlasMap = {
  args: { mode: "map" },
};

export const Empty = {
  args: { items: [], state: "empty" },
};

export const Loading = {
  args: { state: "loading" },
};
