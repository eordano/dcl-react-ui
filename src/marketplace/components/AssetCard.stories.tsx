import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import AssetCard from "./AssetCard";

const meta = {
  title: "Marketplace/Components/AssetCard",
  component: AssetCard,
  parameters: {
    layout: "centered",
    backgrounds: { default: "market", values: [{ name: "market", value: "#0e0d10" }] },
  },
} satisfies Meta<typeof AssetCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children?: ReactNode }) => <div style={{ width: 220 }}>{children}</div>;

export const Default: Story = {
  render: () => (
    <Frame>
      <AssetCard name="Cyber Ronin Jacket" collection="NeonForge" price="1,250" rarity="legendary" tag="Mint" />
    </Frame>
  ),
};

export const NotForSale: Story = {
  render: () => (
    <Frame>
      <AssetCard name="Aurora Wings" collection="Skybound" rarity="mythic" />
    </Frame>
  ),
};

export const Rarities: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", width: 760 }}>
      {["common", "uncommon", "rare", "epic", "legendary", "mythic", "unique", "exotic"].map((r) => (
        <div key={r} style={{ width: 170 }}>
          <AssetCard name={r.charAt(0).toUpperCase() + r.slice(1)} collection="Sample Set" price="500" rarity={r} />
        </div>
      ))}
    </div>
  ),
};
