import StProfileOverviewTab from "./StProfileOverviewTab.jsx";

export default {
  title: "Web/Pages/Profile/Overview Tab",
  component: StProfileOverviewTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StProfileOverviewTab />,
};

export const OwnProfile = {
  render: () => <StProfileOverviewTab isOwnProfile />,
};

export const Empty = {
  render: () => (
    <StProfileOverviewTab
      profile={{
        address: "0x9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
        name: "newcomer",
        hasClaimedName: false,
        nameColor: "#73D3D3",
        mutualCount: 0,
        badges: [],
        bio: "",
        info: [],
        links: [],
        equipped: [],
      }}
    />
  ),
};

export const EmptyOwnProfile = {
  render: () => (
    <StProfileOverviewTab
      isOwnProfile
      profile={{
        address: "0x9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
        name: "newcomer",
        hasClaimedName: false,
        nameColor: "#FFC95B",
        mutualCount: 0,
        badges: [],
        bio: "",
        info: [],
        links: [],
        equipped: [],
      }}
    />
  ),
};

export const Loading = {
  render: () => <StProfileOverviewTab loading />,
};
