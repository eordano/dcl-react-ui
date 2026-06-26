import StDownload from "./StDownload.jsx";

export default {
  title: "Web/Workflows/Download/Client Onboarding",
  component: StDownload,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { signedIn: true, modalOpen: false },
};

export const SignedOut = {
  args: { signedIn: false, modalOpen: false },
};

export const DownloadModal = {
  args: { signedIn: true, modalOpen: true },
};
