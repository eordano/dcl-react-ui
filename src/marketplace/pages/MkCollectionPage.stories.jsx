import MkCollectionPage from "./MkCollectionPage.jsx";

export default {
  title: "Marketplace/Pages/Collection",
  component: MkCollectionPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const CollectionOwner = {
  args: { isOwner: true },
};

export const WearablesOnly = {
  args: {
    items: [
      { id: "i1", name: "Neon Pulse Visor", category: "wearable", sub: "hat", rarity: "legendary", available: 64, price: "180" },
      { id: "i2", name: "Circuit Bomber Jacket", category: "wearable", sub: "upper_body", rarity: "epic", available: 412, price: "95" },
      { id: "i3", name: "Glow Cargo Pants", category: "wearable", sub: "lower_body", rarity: "rare", available: 1820, price: "40" },
      { id: "i7", name: "Voltage Helmet", category: "wearable", sub: "helmet", rarity: "unique", available: 1, price: "—" },
    ],
  },
};

export const Empty = {
  args: { state: "empty" },
};

export const Loading = {
  args: { state: "loading" },
};
