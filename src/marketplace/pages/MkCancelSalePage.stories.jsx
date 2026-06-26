import MkCancelSalePage from "./MkCancelSalePage.jsx";

export default {
  title: "Marketplace/Pages/Cancel Sale",
  component: MkCancelSalePage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    nft: { name: "Cyber Ronin Jacket", category: "wearable", rarity: "legendary", network: "ethereum" },
    order: { price: "1,000", owner: "self" },
    ownership: "self",
    status: "confirmation",
  },
};

export const Authorization = {
  args: { ...Default.args, status: "authorize" },
};

export const Pending = {
  args: { ...Default.args, status: "pending" },
};

export const Success = {
  args: { ...Default.args, status: "success" },
};

export const NotForSale = {
  args: { ...Default.args, order: null, ownership: "none" },
};

export const InvalidOwner = {
  args: { ...Default.args, ownership: "other" },
};
