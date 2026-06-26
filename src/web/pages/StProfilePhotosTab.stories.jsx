import StProfilePhotosTab from "./StProfilePhotosTab.jsx";

export default {
  title: "Web/Pages/Profile/Photos Tab",
  component: StProfilePhotosTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { isOwnProfile: false },
};

export const OwnProfile = {
  args: { isOwnProfile: true },
};

export const EmptyOwner = {
  args: { isOwnProfile: true, photos: [] },
};

export const EmptyMember = {
  args: { isOwnProfile: false, photos: [] },
};
