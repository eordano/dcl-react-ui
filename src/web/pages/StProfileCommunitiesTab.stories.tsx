import type { Meta, StoryObj } from "@storybook/react-vite";
import StProfileCommunitiesTab from "./StProfileCommunitiesTab";
import type { Community, Profile } from "./StProfileCommunitiesTab";

const PROFILE: Profile = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  hasClaimedName: true,
  nameColor: "#FF8362",
  mutualCount: 3,
};

const COMMUNITIES: Community[] = [
  { id: "c1", name: "Neon District Builders", membersCount: 1284, role: "owner", thumb: "linear-gradient(135deg,#ff743a,#ff2d55)" },
  { id: "c2", name: "DCL Photographers Guild", membersCount: 642, role: "admin", thumb: "linear-gradient(135deg,#b05cff,#438fff)" },
  { id: "c3", name: "Wearable Designers Collective", membersCount: 3120, role: "member", thumb: "linear-gradient(135deg,#34ce76,#73d3d3)" },
  { id: "c4", name: "Genesis Plaza Regulars", membersCount: 87, role: "member", thumb: "linear-gradient(135deg,#ff4bed,#982de2)" },
  { id: "c5", name: "Event Hosts United", membersCount: 415, role: "member", thumb: "linear-gradient(135deg,#ffc95b,#ff743a)" },
  { id: "c6", name: "Music Lovers of Decentraland", membersCount: 2056, role: "member", thumb: null },
  { id: "c7", name: "Scene Jam Collective", membersCount: 198, role: "member", thumb: "linear-gradient(135deg,#57c2ff,#7434b1)" },
  { id: "c8", name: "Land Architects", membersCount: 53, role: "member", thumb: "linear-gradient(135deg,#73d3d3,#438fff)" },
];

const meta = {
  title: "Web/Pages/Profile/Communities Tab",
  component: StProfileCommunitiesTab,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StProfileCommunitiesTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StProfileCommunitiesTab profile={PROFILE} communities={COMMUNITIES} />,
};

export const OwnProfile: Story = {
  render: () => <StProfileCommunitiesTab profile={PROFILE} communities={COMMUNITIES} isOwnProfile />,
};

export const EmptyOwner: Story = {
  render: () => <StProfileCommunitiesTab profile={PROFILE} isOwnProfile communities={[]} />,
};

export const EmptyMember: Story = {
  render: () => <StProfileCommunitiesTab profile={PROFILE} communities={[]} />,
};

export const Loading: Story = {
  render: () => <StProfileCommunitiesTab profile={PROFILE} loading />,
};
