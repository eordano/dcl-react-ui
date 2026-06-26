import AccountDashboard from "./AccountDashboard.jsx";

export default {
  title: "Account/Pages/Dashboard",
  component: AccountDashboard,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <AccountDashboard />,
};
