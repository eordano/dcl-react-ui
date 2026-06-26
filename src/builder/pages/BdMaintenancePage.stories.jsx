import BdMaintenancePage from "./BdMaintenancePage.jsx";

export default {
  title: "Builder/Pages/Maintenance",
  component: BdMaintenancePage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const LongerNotice = {
  args: {
    notice:
      "Builder is temporarily offline for scheduled maintenance. We're upgrading our systems and will be back online shortly — thanks for your patience!",
  },
};
