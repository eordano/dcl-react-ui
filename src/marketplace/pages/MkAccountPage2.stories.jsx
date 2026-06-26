import MkAccountPage2 from "./MkAccountPage2.jsx";

export default {
  title: "Marketplace/Pages/Account (other user)",
  component: MkAccountPage2,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { state: "empty", items: [] },
};

export const Loading = {
  args: { state: "loading" },
};

export const Error = {
  args: { state: "error" },
};

export const Guest = {
  args: {
    account: {
      name: "0x742d…9f1c",
      address: "0x742d35cc6634c0532925a3b844bc9e7595f09f1c",
      description: "",
      cover: null,
      links: [],
    },
    items: [
      { name: "Vapor Tee", collection: "VaporWave", price: "45", rarity: "common" },
      { name: "Glitch Mask", collection: "404Wear", price: "199", rarity: "uncommon" },
    ],
  },
};
