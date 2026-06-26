import ChPublishWizardDeployProgressResult from "./ChPublishWizardDeployProgressResult.jsx";

export default {
  title: "CreatorHub/Workflows/Publish: Deploy",
  component: ChPublishWizardDeployProgressResult,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ChPublishWizardDeployProgressResult state="idle" />,
};

export const MaxFileSizeExceeded = {
  render: () => <ChPublishWizardDeployProgressResult state="exceeded" />,
};

export const Deploying = {
  render: () => <ChPublishWizardDeployProgressResult state="deploying" />,
};

export const Finishing = {
  render: () => <ChPublishWizardDeployProgressResult state="finishing" />,
};

export const Complete = {
  render: () => <ChPublishWizardDeployProgressResult state="complete" />,
};

export const Error = {
  render: () => <ChPublishWizardDeployProgressResult state="error" />,
};
