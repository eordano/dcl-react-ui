import type { Meta, StoryObj } from "@storybook/react-vite";
import MkTransferPage from "./MkTransferPage";

const SAMPLE_NFT = {
  contractAddress: "0x09f1c2…b3d4",
  tokenId: "104500",
  name: "Cyber Ronin Jacket",
  category: "wearable",
  rarity: "legendary",
  network: "polygon",
};

const SAMPLE_TX_HASH = "0x7c9a4f2e1b6d8c0a3e5f7b9d1c2a4e6f8b0d2c4a6e8f0b2d4c6a8e0f2b4d6c8a";

const meta = {
  title: "Marketplace/Pages/Transfer",
  component: MkTransferPage,
  parameters: { layout: "fullscreen" },
  args: {
    nft: SAMPLE_NFT,
    txHash: SAMPLE_TX_HASH,
  },
} satisfies Meta<typeof MkTransferPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Emote: Story = {
  args: {
    nft: {
      contractAddress: "0x6a3b…f1c2",
      tokenId: "88",
      name: "Crab Rave",
      category: "emote",
      rarity: "epic",
      network: "polygon",
    },
  },
};

export const OnSale: Story = {
  name: "Error - On sale",
  args: { status: "for_sale" },
};

export const InvalidOwner: Story = {
  name: "Error - Not the owner",
  args: { status: "invalid_owner" },
};

export const Transferring: Story = {
  name: "Transaction pending",
  args: { status: "transferring" },
};

export const Success: Story = {
  name: "Transaction success",
  args: { status: "success" },
};
