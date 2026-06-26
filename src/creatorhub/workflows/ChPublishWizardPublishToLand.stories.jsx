import ChPublishWizardPublishToLand from "./ChPublishWizardPublishToLand.jsx";

export default {
  title: "CreatorHub/Workflows/Publish to Land",
  component: ChPublishWizardPublishToLand,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ChPublishWizardPublishToLand />,
};

export const Placed = {
  render: () => <ChPublishWizardPublishToLand initialPlacement={{ x: -14, y: 0 }} />,
};
