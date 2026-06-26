import GvSubmitGovernanceProposal from "./GvSubmitGovernanceProposal.jsx";

export default {
  title: "Governance/Pages/Submit Governance Proposal",
  component: GvSubmitGovernanceProposal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvSubmitGovernanceProposal />,
};

export const VPNotMet = {
  render: () => <GvSubmitGovernanceProposal submissionVpNotMet />,
};

export const Error = {
  render: () => (
    <GvSubmitGovernanceProposal initialError="Request failed with status code 500: could not create proposal." />
  ),
};
