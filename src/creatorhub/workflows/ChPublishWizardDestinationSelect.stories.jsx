import ChPublishWizardDestinationSelect from "./ChPublishWizardDestinationSelect.jsx";

export default {
  title: "CreatorHub/Workflows/Publish: Destination",
  component: ChPublishWizardDestinationSelect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ChPublishWizardDestinationSelect state="select" />,
};

export const SignIn = {
  render: () => <ChPublishWizardDestinationSelect state="signin" />,
};
