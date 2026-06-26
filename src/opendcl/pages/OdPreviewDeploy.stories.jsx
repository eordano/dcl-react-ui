import OdPreviewDeploy, { DeployView } from "./OdPreviewDeploy.jsx";

export default {
  title: "OpenDCL/Pages/Preview & Deploy",
  component: OdPreviewDeploy,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <OdPreviewDeploy /> };
export const Deploy = { render: () => <DeployView /> };
