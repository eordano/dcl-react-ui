import MarketplaceChrome from "./MarketplaceChrome.jsx";

export default {
  title: "Marketplace/Frames/MarketplaceChrome",
  component: MarketplaceChrome,
  parameters: { layout: "fullscreen" },
};

const Body = () => (
  <div style={{ padding: 40, color: "rgba(255,255,255,.55)", fontSize: 14 }}>
    Page body renders here.
  </div>
);

export const Default = {
  render: () => (
    <MarketplaceChrome active="overview">
      <Body />
    </MarketplaceChrome>
  ),
};

export const SignedIn = {
  render: () => (
    <MarketplaceChrome active="overview" signedIn>
      <Body />
    </MarketplaceChrome>
  ),
};
