import MkBidPage2 from "./MkBidPage2.jsx";

export default {
  title: "Marketplace/Pages/Bid (Item)",
  component: MkBidPage2,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MkBidPage2 />,
};

export const Submitting = {
  render: () => <MkBidPage2 submitting />,
};

export const InsufficientMana = {
  render: () => <MkBidPage2 insufficientMana manaBalance="120.00" />,
};

export const LowPriceWarning = {
  render: () => <MkBidPage2 lowPriceWarn />,
};

export const Confirming = {
  render: () => <MkBidPage2 confirming />,
};
