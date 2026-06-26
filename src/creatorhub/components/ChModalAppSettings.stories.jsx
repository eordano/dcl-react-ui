import ChModalAppSettings from "./ChModalAppSettings.jsx";

export default {
  title: "CreatorHub/Components/App Settings",
  component: ChModalAppSettings,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { open: true, initialTab: "scenes" },
};

export const EditorTab = {
  args: { open: true, initialTab: "editor" },
};

export const AboutTab = {
  args: { open: true, initialTab: "about" },
};

export const Error = {
  args: {
    open: true,
    initialTab: "scenes",
    initialError:
      "Folder doesn't exist or can't save files there. Please choose a different folder.",
  },
};
