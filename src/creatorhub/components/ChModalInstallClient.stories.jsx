import ChModalInstallClient from "./ChModalInstallClient.jsx";

export default {
  title: "CreatorHub/Components/Install Client",
  component: ChModalInstallClient,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { os: "windows", withChrome: true },
};

export const MacOS = {
  args: { os: "macos", withChrome: true },
};

export const UnknownOS = {
  args: { os: "unknown", withChrome: true },
};

export const CardOnly = {
  args: { os: "windows", withChrome: false },
};
