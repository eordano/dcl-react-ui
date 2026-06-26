import GvMaintenanceScreen from "./GvMaintenanceScreen.jsx";

export default {
  title: "Governance/Pages/Maintenance",
  component: GvMaintenanceScreen,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvMaintenanceScreen active="proposals" />,
};

export const OnProfileTab = {
  render: () => <GvMaintenanceScreen active="profile" />,
};
