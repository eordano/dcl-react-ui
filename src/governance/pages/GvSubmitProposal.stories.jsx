import GvSubmitProposal from "./GvSubmitProposal.jsx";

export default {
  title: "Governance/Pages/Submit Proposal",
  component: GvSubmitProposal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvSubmitProposal />,
};

export const GrantsActive = {
  render: () => <GvSubmitProposal grantActive />,
};
