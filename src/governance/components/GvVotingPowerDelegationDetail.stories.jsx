import GvVotingPowerDelegationDetail from "./GvVotingPowerDelegationDetail.jsx";

export default {
  title: "Governance/Components/Voting Power delegation",
  component: GvVotingPowerDelegationDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Loading = {
  args: { loading: true },
};

export const NoVotes = {
  args: {
    votes: [],
    matchPercentage: 0,
  },
};
