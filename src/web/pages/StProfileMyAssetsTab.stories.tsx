import type { Meta, StoryObj } from "@storybook/react-vite";
import StProfileMyAssetsTab from "./StProfileMyAssetsTab";
import type { AssetItem, NameItem, Profile } from "./StProfileMyAssetsTab";

const PROFILE: Profile = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  hasClaimedName: true,
  nameColor: "#FF8362",
};

const WEARABLES: AssetItem[] = [
  { id: "w1", name: "Cyber Halo", rarity: "epic", price: "350", network: "MATIC", category: "hat", bodyShape: "unisex", isSmart: false },
  { id: "w2", name: "Aurora Jacket", rarity: "legendary", price: "1,200", network: "MATIC", category: "upper_body", bodyShape: "female", isSmart: false },
  { id: "w3", name: "Glitch Sneakers", rarity: "rare", price: null, network: "MATIC", category: "feet", bodyShape: "male", isSmart: false },
  { id: "w4", name: "Founders Crown", rarity: "mythic", price: null, network: "ETHEREUM", category: "tiara", bodyShape: "unisex", isSmart: false },
  { id: "w5", name: "Neon Visor", rarity: "uncommon", price: "42", network: "MATIC", category: "eyewear", bodyShape: "unisex", isSmart: true },
  { id: "w6", name: "Plasma Gauntlets", rarity: "exotic", price: "5,000", network: "MATIC", category: "hands_wear", bodyShape: "male", isSmart: false },
  { id: "w7", name: "Void Cloak", rarity: "unique", price: null, network: "ETHEREUM", category: "upper_body", bodyShape: "unisex", isSmart: false },
  { id: "w8", name: "Static Mask", rarity: "common", price: "18", network: "MATIC", category: "mask", bodyShape: "unisex", isSmart: false },
];

const NAMES: NameItem[] = [
  { id: "n1", stem: "pixelnomad" },
  { id: "n2", stem: "neondreams" },
  { id: "n3", stem: "plaza42" },
];

const meta = {
  title: "Web/Pages/Profile/My Assets",
  component: StProfileMyAssetsTab,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StProfileMyAssetsTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { profile: PROFILE, wearables: WEARABLES, names: NAMES },
};

export const Names: Story = {
  args: { profile: PROFILE, wearables: WEARABLES, names: NAMES, category: "ens" },
};

export const Empty: Story = {
  args: { profile: PROFILE, empty: true },
};

export const Loading: Story = {
  args: { profile: PROFILE, loading: true },
};
