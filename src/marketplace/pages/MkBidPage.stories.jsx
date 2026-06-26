import MkBidPage from "./MkBidPage.jsx";

export default {
  title: "Marketplace/Pages/Bid (NFT)",
  component: MkBidPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {},
};

export const WithPrice = {
  args: {
    initialPrice: "1,250",
    initialExpiration: "2026-08-15",
    nft: {
      name: "Aurora Wings",
      category: "wearable",
      rarity: "mythic",
      network: "polygon",
    },
  },
};

export const InsufficientMana = {
  args: {
    initialPrice: "5,000",
    manaBalance: 1200,
    nft: {
      name: "Golden Crown",
      category: "wearable",
      rarity: "unique",
      network: "ethereum",
    },
  },
};

export const PriceTooLow = {
  args: {
    initialPrice: "0.5",
    notOnPolygon: true,
  },
};

export const Confirm = {
  args: {
    initialPrice: "980",
    initialStage: "confirm",
  },
};

export const Authorization = {
  args: {
    initialPrice: "980",
    needsAuthorization: true,
    initialStage: "authorize",
  },
};

export const Placing = {
  args: {
    initialPrice: "980",
    initialStage: "confirm",
    isPlacingBid: true,
  },
};

export const InvalidDate = {
  args: {
    initialPrice: "560",
    initialExpiration: "2020-01-01",
  },
};
