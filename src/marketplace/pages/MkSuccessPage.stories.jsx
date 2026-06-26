import MkSuccessPage from "./MkSuccessPage.jsx";

export default {
  title: "Marketplace/Pages/Success",
  component: MkSuccessPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    state: "success",
    asset: { category: "ens", name: "myname", rarity: "rare" },
  },
};

export const SuccessWearable = {
  args: {
    state: "success",
    asset: { category: "wearable", name: "Cyber Jacket", rarity: "epic" },
  },
};

export const SuccessLand = {
  args: {
    state: "success",
    asset: { category: "parcel", name: "-45,12", rarity: "legendary" },
  },
};

export const Loading = {
  args: {
    state: "loading",
    asset: { category: "ens", name: "myname", rarity: "rare" },
  },
};

export const Error = {
  args: {
    state: "error",
  },
};
