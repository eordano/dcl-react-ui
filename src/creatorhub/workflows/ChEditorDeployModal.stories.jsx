import ChEditorDeployModal from "./ChEditorDeployModal.jsx";

export default {
  title: "CreatorHub/Workflows/Editor: Deploy",
  component: ChEditorDeployModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "idle", target: "land" },
};

export const SelectDestination = {
  args: { state: "select" },
};

export const Deploying = {
  args: { state: "deploying", target: "land" },
};

export const Success = {
  args: { state: "success", target: "land" },
};

export const Error = {
  args: { state: "error", target: "land" },
};

export const Warning = {
  args: { state: "warning", target: "land" },
};

export const PublishToWorld = {
  args: { state: "deploying", target: "world" },
};
