import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MkBidPage2 from "./MkBidPage2";

const SAMPLE_ITEM: NonNullable<ComponentProps<typeof MkBidPage2>["item"]> = {
  name: "Pioneer Jacket",
  collection: "Decentraland Wearables",
  rarity: "legendary",
  network: "MATIC",
};

const meta = {
  title: "Marketplace/Pages/Bid (Item)",
  component: MkBidPage2,
  parameters: { layout: "fullscreen" },
  args: {
    item: SAMPLE_ITEM,
    manaBalance: "2,480.55",
  },
} satisfies Meta<typeof MkBidPage2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Submitting: Story = {
  args: { submitting: true },
};

export const InsufficientMana: Story = {
  args: { insufficientMana: true, manaBalance: "120.00" },
};

export const LowPriceWarning: Story = {
  args: { lowPriceWarn: true },
};

export const Confirming: Story = {
  args: { confirming: true },
};
