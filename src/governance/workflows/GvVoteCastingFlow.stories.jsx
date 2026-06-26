import GvVoteCastingFlow from "./GvVoteCastingFlow.jsx";

export default {
  title: "Governance/Workflows/Vote casting",
  component: GvVoteCastingFlow,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "survey", choice: "Yes" },
};

export const ReasonStep = {
  args: { state: "reason", choice: "Yes" },
};

export const SnapshotRedirect = {
  args: { state: "snapshot" },
};

export const VoteRegistered = {
  args: { state: "registered" },
};
