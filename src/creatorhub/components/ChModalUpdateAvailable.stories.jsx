import ChModalUpdateAvailable from "./ChModalUpdateAvailable.jsx";

export default {
  title: "CreatorHub/Components/Update Available",
  component: ChModalUpdateAvailable,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
    version: "1.7.0",
  },
};

export const NewerBuild = {
  args: {
    open: true,
    version: "1.8.2-rc.1",
  },
};
