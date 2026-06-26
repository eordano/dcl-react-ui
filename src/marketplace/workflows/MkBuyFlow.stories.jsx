import MkBuyFlow from "./MkBuyFlow.jsx";

export default {
  title: "Marketplace/Workflows/Buy",
  component: MkBuyFlow,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const CrossChain = {
  args: {
    crossChain: true,
    tokenSymbol: "USDC",
    chainName: "Ethereum",
    chainHue: 210,
    tokenBalance: "640.20",
    itemCostToken: "387.5000",
    itemCostUsd: "387.5000",
    feeCostToken: "4.21",
    feeCostUsd: "4.2100",
    totalToken: "391.71",
    totalUsd: "391.7100",
    exchangeRate: "3.2258",
    duration: "Normal ≈ 20s",
    showFeeCovered: false,
  },
};

export const LoadingRoute = {
  args: { state: "loadingRoute" },
};

export const Buying = {
  args: { state: "buying" },
};

export const NotEnoughMana = {
  args: { state: "insufficient" },
};

export const RouteUnavailable = {
  args: {
    state: "routeUnavailable",
    tokenSymbol: "USDC",
    chainName: "Ethereum",
    chainHue: 210,
    showFeeCovered: false,
  },
};

export const PriceTooLow = {
  args: {
    state: "priceTooLow",
    asset: {
      name: "Pixel Sticker",
      rarity: "common",
      network: "MATIC",
      kind: "emote",
      priceMana: "0.5",
      priceUsd: "0.1550",
    },
    itemCostToken: "0.5",
    itemCostUsd: "0.1550",
    totalToken: "0.5",
    totalUsd: "0.1550",
    showFeeCovered: false,
  },
};

export const BuyWithCard = {
  args: { state: "card" },
};
