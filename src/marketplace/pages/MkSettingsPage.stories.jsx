import MkSettingsPage from "./MkSettingsPage.jsx";

export default {
  title: "Marketplace/Pages/Settings",
  component: MkSettingsPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Loading = {
  args: { isLoading: true },
};

export const Error = {
  args: { hasError: true },
};

export const NoAuthorizations = {
  args: { selling: [] },
};
