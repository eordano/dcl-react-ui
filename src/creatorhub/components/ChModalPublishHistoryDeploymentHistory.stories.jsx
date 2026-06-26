import ChModalPublishHistoryDeploymentHistory from "./ChModalPublishHistoryDeploymentHistory.jsx";

export default {
  title: "CreatorHub/Components/Publish History / Deployment History",
  component: ChModalPublishHistoryDeploymentHistory,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ChModalPublishHistoryDeploymentHistory variant="publish" />,
};

export const DeploymentHistory = {
  render: () => <ChModalPublishHistoryDeploymentHistory variant="deployment" />,
};

export const Empty = {
  render: () => <ChModalPublishHistoryDeploymentHistory variant="empty" />,
};
