import MkSignInPage from "./MkSignInPage.jsx";

export default {
  title: "Marketplace/Workflows/Sign in",
  component: MkSignInPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { status: "connect" },
};

export const Connecting = {
  args: { status: "connecting" },
};

export const Connected = {
  args: { status: "connected" },
};

export const Error = {
  args: { status: "error" },
};

export const ProviderSelection = {
  args: { status: "connect", showModal: true },
};

export const ProviderLoading = {
  args: { status: "connect", showModal: true, modalLoading: true },
};

export const ProviderError = {
  args: { status: "connect", showModal: true, modalError: true },
};
