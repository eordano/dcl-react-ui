import GvNotFound from "./GvNotFound.jsx";

export default {
  title: "Governance/Pages/Not Found",
  component: GvNotFound,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvNotFound />,
};

export const ProposalNotFound = {
  render: () => (
    <GvNotFound description="The proposal you are looking for doesn't exist..." />
  ),
};
