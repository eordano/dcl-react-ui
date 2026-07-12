import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MkCollectionPage from "./MkCollectionPage";

type Props = ComponentProps<typeof MkCollectionPage>;

const SAMPLE_COLLECTION: NonNullable<Props["collection"]> = {
  name: "Neon Runners Wardrobe",
  isOnSale: true,
};

const SAMPLE_ITEMS: NonNullable<Props["items"]> = [
  { id: "i1", name: "Neon Pulse Visor", category: "wearable", sub: "hat", rarity: "legendary", available: 64, price: "180" },
  { id: "i2", name: "Circuit Bomber Jacket", category: "wearable", sub: "upper_body", rarity: "epic", available: 412, price: "95" },
  { id: "i3", name: "Glow Cargo Pants", category: "wearable", sub: "lower_body", rarity: "rare", available: 1820, price: "40" },
  { id: "i4", name: "Holo Runner Boots", category: "wearable", sub: "feet", rarity: "uncommon", available: 7340, price: "18" },
  { id: "i5", name: "Spectral Shades", category: "wearable", sub: "eyewear", rarity: "mythic", available: 3, price: "1,250" },
  { id: "i6", name: "Datastream Mohawk", category: "wearable", sub: "hair", rarity: "common", available: 41200, price: "6" },
  { id: "i7", name: "Voltage Helmet", category: "wearable", sub: "helmet", rarity: "unique", available: 1, price: "—" },
  { id: "e1", name: "Power Surge", category: "emote", sub: "dance", rarity: "epic", available: 380, price: "75" },
  { id: "e2", name: "Glitch Wave", category: "emote", sub: "fun", rarity: "rare", available: 2640, price: "32" },
  { id: "e3", name: "Neon Bow", category: "emote", sub: "greetings", rarity: "legendary", available: 88, price: "210" },
];

const meta = {
  title: "Marketplace/Pages/Collection",
  component: MkCollectionPage,
  parameters: { layout: "fullscreen" },
  args: {
    collection: SAMPLE_COLLECTION,
    items: SAMPLE_ITEMS,
  },
} satisfies Meta<typeof MkCollectionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CollectionOwner: Story = {
  args: { isOwner: true },
};

export const WearablesOnly: Story = {
  args: {
    items: [
      { id: "i1", name: "Neon Pulse Visor", category: "wearable", sub: "hat", rarity: "legendary", available: 64, price: "180" },
      { id: "i2", name: "Circuit Bomber Jacket", category: "wearable", sub: "upper_body", rarity: "epic", available: 412, price: "95" },
      { id: "i3", name: "Glow Cargo Pants", category: "wearable", sub: "lower_body", rarity: "rare", available: 1820, price: "40" },
      { id: "i7", name: "Voltage Helmet", category: "wearable", sub: "helmet", rarity: "unique", available: 1, price: "—" },
    ],
  },
};

export const Empty: Story = {
  args: { state: "empty" },
};

export const Loading: Story = {
  args: { state: "loading" },
};
