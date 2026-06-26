import StWhatSOnAdminPendingEvents from "./StWhatSOnAdminPendingEvents.jsx";

export default {
  title: "Web/Pages/What's On/Admin Pending Events",
  component: StWhatSOnAdminPendingEvents,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { pending: [], approved: [] },
};

export const Loading = {
  args: { loading: true },
};

export const Unauthorized = {
  args: { allowed: false },
};
