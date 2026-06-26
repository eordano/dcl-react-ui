import StDownloadSuccess from "./StDownloadSuccess.jsx";

export default {
  title: "Web/Pages/Download/Success",
  component: StDownloadSuccess,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { os: "macos", loading: false },
};

export const Windows = {
  args: { os: "windows", loading: false },
};

export const Downloading = {
  args: { os: "macos", loading: true, progress: null },
};

export const DownloadingProgress = {
  args: { os: "macos", loading: true, progress: 62 },
};
