import ChSnackbarPersistentNotificationSystem from "./ChSnackbarPersistentNotificationSystem.jsx";

export default {
  title: "CreatorHub/Components/Snackbar",
  component: ChSnackbarPersistentNotificationSystem,
  parameters: { layout: "fullscreen" },
};

export const Default = { args: { state: "default" } };

export const Single = { args: { state: "single" } };

export const Error = { args: { state: "error" } };

export const Deploy = { args: { state: "deploy" } };

export const InstallingDependencies = {
  args: { state: "default", installing: true },
};
