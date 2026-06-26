import StProfileAccountsRedirect from "./StProfileAccountsRedirect.jsx";

export default {
  title: "Web/Pages/Redirects/Profile Accounts (legacy)",
  component: StProfileAccountsRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { variant: "redirect" },
};

export const AddressOnly = {
  args: { variant: "redirect", tab: undefined },
};

export const NoAddressFallback = {
  args: { variant: "fallback" },
};

export const ManualFallback = {
  args: { variant: "redirect", settled: true },
};
