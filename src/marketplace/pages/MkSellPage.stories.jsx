import MkSellPage from "./MkSellPage.jsx";

export default {
  title: "Marketplace/Pages/Sell",
  component: MkSellPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {},
};

export const Update = {
  args: {
    isUpdate: true,
    initialPrice: "1,250",
    initialExpiration: "2026-08-15",
    nft: {
      name: "Aurora Wings",
      category: "wearable",
      rarity: "mythic",
      network: "ethereum",
    },
  },
};

export const CancelOrder = {
  args: {
    isUpdate: true,
    shouldRemoveListing: true,
    initialPrice: "1,250",
    nft: {
      name: "Golden Crown",
      category: "wearable",
      rarity: "unique",
      network: "ethereum",
    },
  },
};

export const Confirm = {
  args: {
    initialPrice: "980",
  },
  render: (args) => <MkSellPage {...args} />,
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form");
    if (form) form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit"));
  },
};

export const ConfirmError = {
  args: {
    initialPrice: "980",
    confirmError: "Something went wrong while listing your item. Please try again.",
  },
  render: (args) => <MkSellPage {...args} />,
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form");
    if (form) form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit"));
  },
};

export const InvalidDate = {
  args: {
    initialPrice: "560",
    initialExpiration: "2020-01-01",
  },
};
