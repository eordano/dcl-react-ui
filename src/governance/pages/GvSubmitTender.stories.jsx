import GvSubmitTender from "./GvSubmitTender.jsx";

export default {
  title: "Governance/Pages/Submit Tender",
  component: GvSubmitTender,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { authState: "ready", account: "0x9f3c…7a21", votingPower: 12480 },
};

export const Published = {
  args: { authState: "ready", votingPower: 12480, initialPublished: true },
};

export const BelowThreshold = {
  args: { authState: "ready", account: "0x9f3c…7a21", votingPower: 240 },
};

export const LoggedOut = {
  args: { authState: "guest" },
};

export const Loading = {
  args: { authState: "loading" },
};
