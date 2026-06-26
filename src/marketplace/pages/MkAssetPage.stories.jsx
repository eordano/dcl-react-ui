import MkAssetPage from "./MkAssetPage.jsx";

export default {
  title: "Marketplace/Pages/Asset (NFT)",
  component: MkAssetPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {},
};

export const NotForSale = {
  args: {
    nft: {
      name: "Aurora Wings",
      issuedId: 7,
      category: "upper_body",
      rarity: "mythic",
      bodyShape: "Unisex",
      isSmart: false,
      network: "ethereum",
      description: "Iridescent angelic wings with a slow shimmering bloom. A festival-only mint.",
      owner: { address: "0x2b7c1d0e9f8a3b4c5d6e7f8a9b0c1d2e3f4a5b6c", name: "halo.dcl" },
      collection: { name: "Celestial Drop", address: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0" },
      order: null,
    },
  },
};

export const EmptyListings = {
  args: {
    emptyListings: true,
  },
};
