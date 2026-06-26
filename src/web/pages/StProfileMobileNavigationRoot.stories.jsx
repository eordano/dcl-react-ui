import StProfileMobileNavigationRoot from "./StProfileMobileNavigationRoot.jsx";

export default {
  title: "Web/Pages/Profile/Mobile Navigation",
  component: StProfileMobileNavigationRoot,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StProfileMobileNavigationRoot />,
};

export const OwnProfile = {
  render: () => <StProfileMobileNavigationRoot isOwnProfile />,
};

export const NoMutuals = {
  render: () => (
    <StProfileMobileNavigationRoot
      profile={{
        address: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
        name: "VoxelDrifter",
        nameColor: "#73d3d3",
        mutualCount: 0,
        mutualColors: [],
      }}
    />
  ),
};
