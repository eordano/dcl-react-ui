import BdCollectionDetail from "./BdCollectionDetail.jsx";

export default {
  title: "Builder/Pages/Collection Detail (Standard)",
  component: BdCollectionDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const PublishedApproved = {
  args: {
    collection: {
      name: "Genesis Capsule Vol.1",
      status: "synced",
      isPublished: true,
      isApproved: true,
      isOnSale: true,
      isLocked: true,
    },
    wearables: [
      { id: "w1", name: "Cyber Visor", rarity: "epic", category: "eyewear", price: "75", supply: "42/100", status: "published", smart: false, hue: 212 },
      { id: "w2", name: "Neon Hoodie", rarity: "rare", category: "upper_body", price: "40", supply: "18/250", status: "published", smart: false, hue: 282 },
      { id: "w3", name: "Plasma Jetpack", rarity: "unique", category: "upper_body", price: "1200", supply: "1/1", status: "published", smart: true, hue: 150 },
    ],
    emotes: [
      { id: "e1", name: "Victory Dance", rarity: "rare", category: "dance", playMode: "loop", price: "30", supply: "61/500", status: "published", hue: 196 },
    ],
  },
};

export const UnsyncedNotice = {
  args: {
    collection: {
      name: "Genesis Capsule Vol.1",
      status: "unsynced",
      isPublished: true,
      isApproved: true,
      isOnSale: false,
      isLocked: true,
    },
    wearables: [
      { id: "w1", name: "Cyber Visor", rarity: "epic", category: "eyewear", price: "75", supply: "42/100", status: "unsynced", smart: false, hue: 212 },
      { id: "w2", name: "Neon Hoodie", rarity: "rare", category: "upper_body", price: "40", supply: "18/250", status: "published", smart: false, hue: 282 },
    ],
    emotes: [],
  },
};

export const Empty = {
  args: {
    collection: {
      name: "Untitled Collection",
      status: "unsynced",
      isPublished: false,
      isApproved: false,
      isOnSale: false,
      isLocked: false,
    },
    wearables: [],
    emotes: [],
  },
};

export const Loading = { args: { loading: true } };
