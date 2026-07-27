import ChWorldSettingsTabbedSections, {
  type WorldSceneVM,
} from "./ChWorldSettingsTabbedSections";

const WORLD_NAME = "mystore.dcl.eth";

const SAMPLE_SCENES: WorldSceneVM[] = [
  { entityId: "s1", title: "Main Plaza", parcelCount: 4, coord: "0, 0", canUnpublish: true },
  { entityId: "s2", title: "Wearable Gallery", parcelCount: 2, coord: "2, 0", canUnpublish: true },
  { entityId: "s3", title: "Rooftop Stage", parcelCount: 6, coord: "0, 2", canUnpublish: false },
];

export default {
  title: "CreatorHub/Components/World Settings tabs",
  component: ChWorldSettingsTabbedSections,
  parameters: { layout: "fullscreen" },
  args: { variant: "panel", worldName: WORLD_NAME, scenes: SAMPLE_SCENES },
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
  args: { tab: "layout", isOwner: true, layoutView: "empty", scenes: [] },
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
