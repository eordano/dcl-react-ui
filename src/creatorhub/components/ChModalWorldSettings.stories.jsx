import ChModalWorldSettings from "./ChModalWorldSettings.jsx";

export default {
  title: "CreatorHub/Components/World Settings",
  component: ChModalWorldSettings,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { tab: "details", isOwner: true },
};

export const Layout = {
  args: { tab: "layout", isOwner: true },
};

export const Misc = {
  args: { tab: "general", isOwner: true },
};

export const UnsavedChanges = {
  args: { tab: "details", isOwner: true, hasChanges: true },
};

export const EmptyWorld = {
  args: { tab: "layout", isOwner: true, layoutView: "empty" },
};

export const UnpublishConfirmation = {
  args: { tab: "layout", isOwner: true, layoutView: "unpublish" },
};

export const Collaborator = {
  args: { isOwner: false },
};

export const Loading = {
  args: { tab: "details", isOwner: true, isLoading: true },
};
