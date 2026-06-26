import MkBuyStatusPage from "./MkBuyStatusPage.jsx";

export default {
  title: "Marketplace/Pages/Buy Status",
  component: MkBuyStatusPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { status: "pending" },
};

export const Pending = {
  args: { status: "pending" },
};

export const Success = {
  args: { status: "complete" },
};

export const Failed = {
  args: { status: "failed" },
};

export const Cancelled = {
  args: { status: "cancelled" },
};

export const Refunded = {
  args: { status: "refunded" },
};
