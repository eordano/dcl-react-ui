import MkAssetPage2 from "./MkAssetPage2.jsx";

export default {
  title: "Marketplace/Pages/Asset (Item)",
  component: MkAssetPage2,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Emote = {
  args: {
    item: {
      name: "Hyperdrift Spin",
      category: "emote",
      rarity: "epic",
      network: "matic",
      isSmart: false,
      loop: true,
      hasSound: true,
      hasGeometry: true,
      isSocialEmote: true,
      description:
        "A looping crowd-control emote with synced audio cue and a holographic prop ring. Trigger it to mark a spot on the dancefloor.",
      creator: "0xMoveLab",
      creatorHue: 188,
      collection: "Motion Pack Vol. 3",
      price: "350",
      fiat: "199.50",
      available: 230,
      maxSupply: 1000,
      permissions: [],
      buyOption: "MINT",
    },
  },
};

export const CheapestListing = {
  args: {
    item: { ...DEFAULT_AS_ARGS(), available: 0, buyOption: "BUY_LISTING" },
  },
};

export const Empty = {
  args: {
    item: { ...DEFAULT_AS_ARGS(), available: 0, buyOption: "EMPTY" },
    orders: [],
  },
};

function DEFAULT_AS_ARGS() {
  return {
    name: "Cyber Ronin Jacket",
    category: "wearable",
    rarity: "legendary",
    network: "matic",
    isSmart: true,
    loop: false,
    hasSound: false,
    hasGeometry: false,
    isSocialEmote: false,
    wearableCategory: "Upper Body",
    description:
      "A reactive smart wearable forged in the neon back-alleys of Genesis City. The jacket pulses with light synced to your movement and unlocks an emissive aura when you enter creator scenes.",
    creator: "0xRoninLabs",
    creatorHue: 268,
    collection: "Neon Frontier",
    price: "1200",
    fiat: "684.00",
    available: 84,
    maxSupply: 100,
    permissions: ["ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE", "USE_FETCH", "ALLOW_MEDIA_HOSTNAMES"],
    buyOption: "MINT",
  };
}
