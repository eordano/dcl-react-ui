import StProfilePlacesTab from "./StProfilePlacesTab.jsx";

export default {
  title: "Web/Pages/Profile/Places Tab",
  component: StProfilePlacesTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StProfilePlacesTab />,
};

export const OwnProfile = {
  render: () => <StProfilePlacesTab isOwnProfile />,
};

export const EmptyOwnerPlaces = {
  render: () => <StProfilePlacesTab isOwnProfile emptyView="owner" />,
};

export const EmptyFavorites = {
  render: () => <StProfilePlacesTab isOwnProfile emptyView="favorites" />,
};

export const EmptyMember = {
  render: () => <StProfilePlacesTab emptyView="member" />,
};

export const Loading = {
  render: () => <StProfilePlacesTab loading />,
};
