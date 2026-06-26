import ChPublishWizardPublishToWorld from "./ChPublishWizardPublishToWorld.jsx";

export default {
  title: "CreatorHub/Workflows/Publish to World",
  component: ChPublishWizardPublishToWorld,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ChPublishWizardPublishToWorld state="selection" />,
};

export const Empty = {
  render: () => <ChPublishWizardPublishToWorld state="empty" />,
};
