import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ChPublishCollectionView from "./ChPublishCollectionView";
import type { ChCollection, ChCollectionItem } from "../pages/ChCollectionDetail";

type Props = ComponentProps<typeof ChPublishCollectionView>;
type Fee = NonNullable<Props["fee"]>;

const collection: ChCollection = {
  name: "Genesis Capsule Vol.1",
  status: "unsynced",
  isPublished: false,
  isApproved: false,
  isOnSale: false,
  isLocked: false,
};

const wearables: ChCollectionItem[] = [
  { id: "w1", name: "Cyber Visor", rarity: "epic", category: "eyewear", price: "75", supply: null, status: "ready", smart: false, hue: 212 },
  { id: "w2", name: "Neon Hoodie", rarity: "rare", category: "upper_body", price: "40", supply: null, status: "ready", smart: false, hue: 282 },
  { id: "w3", name: "Holo Sneakers", rarity: "legendary", category: "feet", price: null, supply: null, status: "not_ready", smart: false, hue: 24 },
  { id: "w4", name: "Pixel Crown", rarity: "mythic", category: "hat", price: "500", supply: null, status: "ready", smart: false, hue: 332 },
];

const emotes: ChCollectionItem[] = [
  { id: "e1", name: "Victory Dance", rarity: "rare", category: "dance", playMode: "loop", price: "30", supply: null, status: "ready", hue: 196 },
  { id: "e2", name: "Slow Clap", rarity: "common", category: "reaction_positive", playMode: "simple", price: "10", supply: null, status: "ready", hue: 48 },
];

const summary = { collection, wearables, emotes };

const fee: Fee = {
  lines: [
    { rarity: "mythic", count: 1, manaPerItem: 100, mana: 100 },
    { rarity: "legendary", count: 1, manaPerItem: 100, mana: 100 },
    { rarity: "epic", count: 1, manaPerItem: 100, mana: 100 },
    { rarity: "rare", count: 2, manaPerItem: 100, mana: 200 },
    { rarity: "common", count: 1, manaPerItem: 100, mana: 100 },
  ],
  itemCount: 6,
  manaPerItem: 100,
  totalMana: 600,
};

const noop = () => {};

const meta = {
  title: "CreatorHub/Workflows/Publish Collection",
  component: ChPublishCollectionView,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChPublishCollectionView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Review: Story = {
  render: () => (
    <ChPublishCollectionView
      step="summary"
      view="summary"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
      onNext={noop}
    />
  ),
};

export const Cost: Story = {
  render: () => (
    <ChPublishCollectionView
      step="cost"
      view="cost"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
      onNext={noop}
      onBack={noop}
    />
  ),
};

export const Terms: Story = {
  render: () => (
    <ChPublishCollectionView
      step="terms"
      view="terms"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
      accepted={false}
      onBack={noop}
      onAccept={noop}
      onAcceptedChange={noop}
    />
  ),
};

export const TermsAccepted: Story = {
  render: () => (
    <ChPublishCollectionView
      step="terms"
      view="terms"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
      accepted
      onBack={noop}
      onAccept={noop}
      onAcceptedChange={noop}
    />
  ),
};

export const Pay: Story = {
  render: () => (
    <ChPublishCollectionView
      step="pay"
      view="pay"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
    />
  ),
};

export const Submitted: Story = {
  render: () => (
    <ChPublishCollectionView
      step="submitted"
      view="submitted"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
      txHash="0x9f3c4d1e7a2188cf90b3a6e7c4d5f6a7b8c9d0e1"
      onDone={noop}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ChPublishCollectionView
      step="error"
      view="error"
      collectionName={collection.name}
      summary={summary}
      fee={fee}
      error="MetaMask: user rejected the transaction."
      onBack={noop}
      onRetry={noop}
    />
  ),
};

export const BlockedEmpty: Story = {
  render: () => (
    <ChPublishCollectionView
      step="blocked"
      view="blocked"
      collectionName="Empty Draft Collection"
      fee={fee}
    />
  ),
};
