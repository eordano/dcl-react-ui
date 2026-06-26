import MarketplaceBrowse from "./MarketplaceBrowse.jsx";

export default {
  title: "Marketplace/Pages/Browse",
  component: MarketplaceBrowse,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MarketplaceBrowse />,
};

export const Empty = {
  render: () => <MarketplaceBrowse items={[]} />,
};
