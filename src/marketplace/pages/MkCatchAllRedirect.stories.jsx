import MkCatchAllRedirect from "./MkCatchAllRedirect.jsx";

export default {
  title: "Marketplace/Pages/Catch-all redirect",
  component: MkCatchAllRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { variant: "root" },
};

export const LegacyBrowseRedirect = {
  args: { variant: "browse" },
};

export const ManualFallback = {
  args: { variant: "root", manual: true },
};
