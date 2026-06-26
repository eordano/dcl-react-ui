import StProfileMeRedirect from "./StProfileMeRedirect.jsx";

export default {
  title: "Web/Pages/Redirects/Profile Me",
  component: StProfileMeRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { variant: "redirect" },
};

export const NoTab = {
  args: { variant: "redirect", tab: undefined },
};

export const SignInGate = {
  args: { variant: "signin" },
};

export const SignInGateWithTab = {
  args: { variant: "signin", tab: "assets" },
};

export const ManualFallback = {
  args: { variant: "redirect", settled: true },
};
