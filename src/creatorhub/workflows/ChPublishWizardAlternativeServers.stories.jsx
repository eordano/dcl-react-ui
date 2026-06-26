import ChPublishWizardAlternativeServers from "./ChPublishWizardAlternativeServers.jsx";

export default {
  title: "CreatorHub/Workflows/Publish: Alternative Servers",
  component: ChPublishWizardAlternativeServers,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { option: "test" },
};

export const CustomUrl = {
  args: { option: "custom" },
};

export const CustomUrlError = {
  args: { option: "custom", error: true },
};
