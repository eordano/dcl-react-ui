import GvHomeLanding from "./GvHomeLanding.jsx";

export default {
  title: "Governance/Pages/Home",
  component: GvHomeLanding,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvHomeLanding />,
};

export const EmptyOpenProposals = {
  render: () => <GvHomeLanding endingSoon={[]} />,
};
