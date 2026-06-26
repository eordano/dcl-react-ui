import StWhatSOnAdminUsers from "./StWhatSOnAdminUsers.jsx";

export default {
  title: "Web/Pages/What's On/Admin Users",
  component: StWhatSOnAdminUsers,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { users: [] },
};

export const WithFeedback = {
  args: {
    initialFeedback: { message: "Permissions updated", severity: "success" },
  },
};

export const ErrorFeedback = {
  args: {
    initialFeedback: { message: "Unable to save permissions. Please try again.", severity: "error" },
  },
};
