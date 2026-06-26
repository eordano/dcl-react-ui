import StProfileCommunitiesTab from "./StProfileCommunitiesTab.jsx";

export default {
  title: "Web/Pages/Profile/Communities Tab",
  component: StProfileCommunitiesTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StProfileCommunitiesTab />,
};

export const OwnProfile = {
  render: () => <StProfileCommunitiesTab isOwnProfile />,
};

export const EmptyOwner = {
  render: () => <StProfileCommunitiesTab isOwnProfile communities={[]} />,
};

export const EmptyMember = {
  render: () => <StProfileCommunitiesTab communities={[]} />,
};

export const Loading = {
  render: () => <StProfileCommunitiesTab loading />,
};
