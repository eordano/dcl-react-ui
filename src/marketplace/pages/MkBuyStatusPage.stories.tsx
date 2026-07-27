import type { Meta, StoryObj } from "@storybook/react-vite";
import MkBuyStatusPage from "./MkBuyStatusPage";

const SAMPLE_ASSET = {
  name: "Cyber Ronin Jacket",
  rarity: "legendary",
  category: "wearable",
};

const meta = {
  title: "Marketplace/Pages/Buy Status",
  component: MkBuyStatusPage,
  parameters: { layout: "fullscreen" },
  args: { asset: SAMPLE_ASSET },
} satisfies Meta<typeof MkBuyStatusPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { status: "pending" },
};

export const Pending: Story = {
  args: { status: "pending" },
};

export const Success: Story = {
  args: { status: "complete" },
};

export const Failed: Story = {
  args: { status: "failed" },
};

export const Cancelled: Story = {
  args: { status: "cancelled" },
};

export const Refunded: Story = {
  args: { status: "refunded" },
};
