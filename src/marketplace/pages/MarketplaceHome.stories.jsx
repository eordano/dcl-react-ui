import MarketplaceHome from "./MarketplaceHome.jsx";

export default {
  title: "Marketplace/Pages/Home",
  component: MarketplaceHome,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MarketplaceHome />,
};

export const EmptyTrending = {
  render: () => <MarketplaceHome trending={[]} />,
};
