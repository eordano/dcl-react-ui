import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import NewShopAssetCard from "./NewShopAssetCard";

const meta = {
  title: "Marketplace/NewShop/AssetCard",
  component: NewShopAssetCard,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="mk" style={{ width: 220, background: "var(--lm-bg)", padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: "Golden Sneakers",
    meta: "5d 12h ago",
    price: "500",
    rarity: "legendary",
    network: "polygon",
    onToggleFavorite: fn(),
    onOpen: fn(),
    onBuy: fn(),
  },
} satisfies Meta<typeof NewShopAssetCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Favorited: Story = { args: { favorited: true } };

export const NotForSale: Story = { args: { price: undefined, rarity: "rare", onBuy: undefined } };

export const Ethereum: Story = {
  args: { name: "Vintage Hat", rarity: "epic", network: "ethereum", price: "1,250" },
};

export const Rarities: Story = {
  render: () => (
    <div
      className="mk"
      style={{ display: "grid", gridTemplateColumns: "repeat(4, 200px)", gap: 16, background: "var(--lm-bg)", padding: 16 }}
    >
      {["common", "uncommon", "rare", "epic", "legendary", "mythic", "unique", "exotic"].map((r) => (
        <NewShopAssetCard key={r} name={r} meta="2h ago" price="500" rarity={r} onBuy={fn()} onOpen={fn()} onToggleFavorite={fn()} />
      ))}
    </div>
  ),
};
