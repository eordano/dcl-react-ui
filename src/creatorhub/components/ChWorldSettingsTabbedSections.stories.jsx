import ChWorldSettingsTabbedSections from "./ChWorldSettingsTabbedSections.jsx";

export default {
  title: "CreatorHub/Components/World Settings tabs",
  component: ChWorldSettingsTabbedSections,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { tab: "details", isOwner: true },
};

export const DetailsTab = {
  args: { tab: "details", isOwner: true },
};

export const LayoutTab = {
  args: { tab: "layout", isOwner: true },
};

export const GeneralTab = {
  args: { tab: "general", isOwner: true },
};

export const LayoutWorldMap = {
  args: { tab: "layout", isOwner: true, layoutView: "map" },
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
