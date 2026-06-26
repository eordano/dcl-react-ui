import MkMaintenanceScreen from "./MkMaintenanceScreen.jsx";

export default {
  title: "Marketplace/Pages/Maintenance",
  component: MkMaintenanceScreen,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const ShortNotice = {
  args: { notice: "We'll be back soon!" },
};
