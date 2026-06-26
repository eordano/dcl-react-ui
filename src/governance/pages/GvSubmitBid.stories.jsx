import GvSubmitBid from "./GvSubmitBid.jsx";

export default {
  title: "Governance/Pages/Submit Bid",
  component: GvSubmitBid,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Submitted = {
  args: { submitted: true },
};
