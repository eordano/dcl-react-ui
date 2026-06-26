import ChAppSettingsTabbedSections from "./ChAppSettingsTabbedSections.jsx";

export default {
  title: "CreatorHub/Components/App Settings: tabbed sections",
  component: ChAppSettingsTabbedSections,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { open: true, initialTab: "scenes" },
};

export const EditorTab = {
  args: { open: true, initialTab: "editor" },
};

export const AboutTab = {
  args: { open: true, initialTab: "about", updateState: "idle" },
};

export const UpdateUpToDate = {
  args: { open: true, initialTab: "about", updateState: "up_to_date" },
};

export const UpdateAvailable = {
  args: { open: true, initialTab: "about", updateState: "available" },
};

export const UpdateDownloading = {
  args: { open: true, initialTab: "about", updateState: "downloading", progress: 42 },
};

export const UpdateDownloaded = {
  args: { open: true, initialTab: "about", updateState: "downloaded" },
};

export const Error = {
  args: {
    open: true,
    initialTab: "scenes",
    initialError:
      "Folder doesn't exist or can't save files there. Please choose a different folder.",
  },
};
