import GvSubmitGrant from "./GvSubmitGrant.jsx";

export default {
  title: "Governance/Pages/Submit Grant",
  component: GvSubmitGrant,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvSubmitGrant />,
};

export const CategorySelected = {
  render: () => (
    <GvSubmitGrant
      initialCategory={{
        id: "Platform",
        tone: "fuchsia",
        desc: "Creation of tools and applications extending our platform and ecosystem",
      }}
    />
  ),
};
