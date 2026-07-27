import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MkBuyFlow from "./MkBuyFlow";

const SAMPLE_ASSET: NonNullable<ComponentProps<typeof MkBuyFlow>["asset"]> = {
  name: "Cyber Ronin Jacket",
  rarity: "legendary",
  network: "MATIC",
  kind: "wearable",
  priceMana: "1,250",
  priceUsd: "387.5000",
};

const SAMPLE_COSTS = {
  tokenBalance: "2,480.55",
  itemCostToken: "1,250",
  itemCostUsd: "387.5000",
  feeCostToken: "0.0241",
  feeCostUsd: "0.0182",
  totalToken: "1,250",
  totalUsd: "387.5182",
  exchangeRate: "0.3100",
  duration: "Normal ≈ 20s",
};

const meta = {
  title: "Marketplace/Workflows/Buy",
  component: MkBuyFlow,
  parameters: { layout: "fullscreen" },
  args: {
    asset: SAMPLE_ASSET,
    ...SAMPLE_COSTS,
  },
} satisfies Meta<typeof MkBuyFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CrossChain: Story = {
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

export const LoadingRoute: Story = {
  args: { state: "loadingRoute" },
};

export const Buying: Story = {
  args: { state: "buying" },
};

export const NotEnoughMana: Story = {
  args: { state: "insufficient" },
};

export const RouteUnavailable: Story = {
  args: {
    state: "routeUnavailable",
    tokenSymbol: "USDC",
    chainName: "Ethereum",
    chainHue: 210,
    showFeeCovered: false,
  },
};

export const PriceTooLow: Story = {
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

export const BuyWithCard: Story = {
  args: { state: "card" },
};
