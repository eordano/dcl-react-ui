import StCreatorHubDownload, { ICON } from "./StCreatorHubDownload.jsx";

const WINDOWS_ICON = ICON.Windows;
const MACOS_ICON = ICON.macOS;

const REL = "https://github.com/decentraland/creator-hub/releases/latest";

export default {
  title: "Web/Pages/Download/Creator Hub",
  component: StCreatorHubDownload,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const WindowsPrimary = {
  args: {
    primaryOption: { text: "Windows", image: WINDOWS_ICON, link: REL, arch: "amd64" },
    secondaryOptions: [{ text: "macOS", image: MACOS_ICON, link: REL, arch: "arm64" }],
  },
};

export const OnlyPrimary = {
  args: {
    primaryOption: { text: "macOS", image: MACOS_ICON, link: REL, arch: "arm64" },
    secondaryOptions: [],
  },
};
