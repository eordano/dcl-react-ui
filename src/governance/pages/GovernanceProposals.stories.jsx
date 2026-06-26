import GovernanceProposals from "./GovernanceProposals.jsx";

export default {
  title: "Governance/Pages/Proposals",
  component: GovernanceProposals,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GovernanceProposals />,
};

export const Empty = {
  render: () => <GovernanceProposals proposals={[]} />,
};
