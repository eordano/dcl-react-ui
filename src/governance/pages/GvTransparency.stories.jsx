import GvTransparency from "./GvTransparency.jsx";

export default {
  title: "Governance/Pages/Transparency",
  component: GvTransparency,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvTransparency />,
};

export const Loading = {
  render: () => <GvTransparency loading />,
};

export const Empty = {
  render: () => (
    <GvTransparency
      balances={[]}
      income={{ total: 0, previous: 0, details: [] }}
      expenses={{ total: 0, previous: 0, details: [] }}
      committees={[]}
    />
  ),
};
