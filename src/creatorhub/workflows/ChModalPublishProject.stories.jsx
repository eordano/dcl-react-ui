import ChModalPublishProject from "./ChModalPublishProject.jsx";

export default {
  title: "CreatorHub/Workflows/Publish Project",
  component: ChModalPublishProject,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ChModalPublishProject step="initial" />,
};

export const AlternativeServers = {
  render: () => <ChModalPublishProject step="alternative-servers" />,
};

export const PublishToWorld = {
  render: () => <ChModalPublishProject step="publish-to-world" />,
};

export const PublishToLand = {
  render: () => <ChModalPublishProject step="publish-to-land" />,
};

export const DeployIdle = {
  render: () => <ChModalPublishProject step="deploy" deployState="idle" />,
};

export const DeployInProgress = {
  render: () => <ChModalPublishProject step="deploy" deployState="deploying" />,
};

export const DeploySuccess = {
  render: () => <ChModalPublishProject step="deploy" deployState="success" />,
};

export const DeployError = {
  render: () => <ChModalPublishProject step="deploy" deployState="error" />,
};

export const DeployWarning = {
  render: () => <ChModalPublishProject step="deploy" deployState="warning" />,
};
