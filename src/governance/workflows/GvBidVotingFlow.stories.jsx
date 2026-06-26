import GvBidVotingFlow from "./GvBidVotingFlow.jsx";

export default {
  title: "Governance/Workflows/Bid voting",
  component: GvBidVotingFlow,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Casting = { args: { state: "casting" } };

export const Error = { args: { state: "error", retryTimer: "30s" } };

export const SnapshotRedirect = { args: { state: "redirect" } };
