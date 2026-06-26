import BdItemDetail, { SMART_WEARABLE, STANDARD_WEARABLE } from "./BdItemDetail.jsx";

export default {
  title: "Builder/Pages/Item Detail",
  component: BdItemDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const StandardWearable = { args: { item: STANDARD_WEARABLE } };

export const Emote = {
  args: {
    item: {
      ...SMART_WEARABLE,
      id: "i3",
      type: "emote",
      name: "Victory Dance",
      description: "A celebratory looping dance emote with a confetti VFX burst on the first frame.",
      utility: "",
      rarity: "rare",
      category: "dance",
      smart: false,
      isPublished: true,
      tokenId: "57",
      totalSupply: 61,
      maxSupply: 500,
      price: "30.0",
      hue: 196,
      tags: ["dance", "celebration"],
      metrics: { sequences: 1, duration: 3.42, frames: 102, fps: 30 },
      representations: [],
      requiredPermissions: [],
    },
  },
};

export const Loading = { args: { loading: true } };
