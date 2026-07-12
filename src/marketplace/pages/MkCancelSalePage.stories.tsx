import type { Meta, StoryObj } from "@storybook/react-vite";
import MkCancelSalePage from "./MkCancelSalePage";

const meta = {
  title: "Marketplace/Pages/Cancel Sale",
  component: MkCancelSalePage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MkCancelSalePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nft: { name: "Cyber Ronin Jacket", category: "wearable", rarity: "legendary", network: "ethereum" },
    order: { price: "1,000", owner: "self" },
    ownership: "self",
    status: "confirmation",
  },
};

export const Authorization: Story = {
  args: { ...Default.args, status: "authorize" },
};

export const Pending: Story = {
  args: { ...Default.args, status: "pending" },
};

export const Success: Story = {
  args: { ...Default.args, status: "success" },
};

export const NotForSale: Story = {
  args: { ...Default.args, order: null, ownership: "none" },
};

export const InvalidOwner: Story = {
  args: { ...Default.args, ownership: "other" },
};
