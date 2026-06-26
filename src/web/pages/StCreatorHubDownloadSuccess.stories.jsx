import StCreatorHubDownloadSuccess from "./StCreatorHubDownloadSuccess.jsx";

export default {
  title: "Web/Pages/Download/Creator Hub Success",
  component: StCreatorHubDownloadSuccess,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { os: "macos", loading: false },
};

export const Windows = {
  args: { os: "windows", loading: false },
};

export const Loading = {
  args: { os: "macos", loading: true },
};
