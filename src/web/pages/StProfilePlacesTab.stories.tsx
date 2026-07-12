import type { Meta, StoryObj } from "@storybook/react-vite";
import StProfilePlacesTab from "./StProfilePlacesTab";
import type { Place, Profile } from "./StProfilePlacesTab";

const PROFILE: Profile = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  hasClaimedName: true,
  nameColor: "#FF8362",
  mutualCount: 3,
};

const PLACES: Place[] = [
  {
    id: "p1",
    title: "Nomad's Plaza",
    description:
      "An open-air gathering spot with rotating DJ sets every evening. Grab a seat by the fountain, browse the gallery wall, or jump into one of the nightly scene jams. Built and curated by PixelNomad.",
    image: "linear-gradient(150deg, hsl(280 70% 52%) 0%, hsl(320 60% 28%) 100%)",
    base_position: "-42,18",
    likes: 1280,
    user_count: 34,
    owner: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    contact_name: "PixelNomad",
  },
  {
    id: "p2",
    title: "Aurora Gardens",
    description:
      "A calm botanical world for contemplative wandering. No quests, no noise — just light, sound and shifting colour.",
    image: "linear-gradient(150deg, hsl(170 70% 50%) 0%, hsl(210 60% 28%) 100%)",
    world: true,
    world_name: "aurora.dcl.eth",
    likes: 642,
    user_count: 9,
    owner: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    contact_name: "PixelNomad",
  },
  {
    id: "p3",
    title: "The Glitch Arcade",
    description: "Retro cabinets, leaderboard wars and a hidden speakeasy upstairs.",
    image: "linear-gradient(150deg, hsl(20 80% 54%) 0%, hsl(350 60% 30%) 100%)",
    base_position: "73,-12",
    likes: 305,
    user_count: 2,
    owner: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    contact_name: "PixelNomad",
  },
  {
    id: "p4",
    title: "Founders Hall",
    description: "",
    image: "linear-gradient(150deg, hsl(45 75% 55%) 0%, hsl(30 60% 30%) 100%)",
    base_position: "12,12",
    likes: 88,
    user_count: 0,
    owner: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    contact_name: "PixelNomad",
  },
];

const meta = {
  title: "Web/Pages/Profile/Places Tab",
  component: StProfilePlacesTab,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StProfilePlacesTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StProfilePlacesTab profile={PROFILE} places={PLACES} />,
};

export const OwnProfile: Story = {
  render: () => <StProfilePlacesTab profile={PROFILE} places={PLACES} isOwnProfile />,
};

export const EmptyOwnerPlaces: Story = {
  render: () => <StProfilePlacesTab profile={PROFILE} isOwnProfile emptyView="owner" />,
};

export const EmptyFavorites: Story = {
  render: () => <StProfilePlacesTab profile={PROFILE} isOwnProfile emptyView="favorites" />,
};

export const EmptyMember: Story = {
  render: () => <StProfilePlacesTab profile={PROFILE} emptyView="member" />,
};

export const Loading: Story = {
  render: () => <StProfilePlacesTab profile={PROFILE} loading />,
};
