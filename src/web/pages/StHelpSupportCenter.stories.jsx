import StHelpSupportCenter, { HelpTab, Status, SERVICES } from "./StHelpSupportCenter.jsx";

export default {
  title: "Web/Pages/Help & Support Center",
  component: StHelpSupportCenter,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StHelpSupportCenter />,
};

export const SupportUpdates = {
  render: () => <StHelpSupportCenter activeTab={HelpTab.SUPPORT_UPDATES} />,
};

export const StatusLoading = {
  render: () => <StHelpSupportCenter statusLoading />,
};

export const StatusDegraded = {
  render: () => (
    <StHelpSupportCenter
      services={SERVICES.map((s, i) => (i === 3 || i === 8 ? { ...s, status: Status.DOWN } : s))}
    />
  ),
};

export const StatusDown = {
  render: () => <StHelpSupportCenter services={SERVICES.map((s) => ({ ...s, status: Status.DOWN }))} />,
};
