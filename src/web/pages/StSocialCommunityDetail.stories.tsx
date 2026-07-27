import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import StSocialCommunityDetailRaw from "./StSocialCommunityDetail";

type CommunityDetailProps = {
  community?: {
    id: string;
    name: string;
    description: string;
    ownerAddress: string;
    ownerName: string;
    ownerProfilePicture: string;
    privacy: string;
    membersCount: number;
    thumbnail: string;
    role?: string;
  };
  members?: {
    memberAddress: string;
    name: string;
    role: string;
    hasClaimedName: boolean;
  }[];
  events?: {
    id: string;
    name: string;
    image: string;
    creatorName: string;
    timeLabel: string;
  }[];
  membersTotal?: number;
  isLoggedIn?: boolean;
  isMember?: boolean;
  hasPendingRequest?: boolean;
  isLoadingMembers?: boolean;
  isLoadingEvents?: boolean;
  state?: string;
  mobile?: boolean;
};

const StSocialCommunityDetail =
  StSocialCommunityDetailRaw as unknown as FC<CommunityDetailProps>;

const COMMUNITY: NonNullable<CommunityDetailProps["community"]> = {
  id: "bafkreicommunity",
  name: "Vroom Vroom Racing Club",
  description:
    "A home for builders and racers in Decentraland. We host weekly grand-prix nights on community tracks, share tuning setups, and run a friendly ladder. New drivers always welcome — grab a kart and say hi.",
  ownerAddress: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
  ownerName: "TurboNomad",
  ownerProfilePicture: "",
  privacy: "public",
  membersCount: 1842,
  thumbnail: "",
  role: "member",
};

const MEMBERS: NonNullable<CommunityDetailProps["members"]> = [
  { memberAddress: "0xa1", name: "TurboNomad", role: "owner", hasClaimedName: true },
  { memberAddress: "0xb2", name: "Pixel Drift", role: "moderator", hasClaimedName: true },
  { memberAddress: "0xc3", name: "NeonApex", role: "member", hasClaimedName: false },
  { memberAddress: "0xd4", name: "GridLockGail", role: "member", hasClaimedName: true },
  { memberAddress: "0xe5", name: "skidmark.eth", role: "member", hasClaimedName: false },
  { memberAddress: "0xf6", name: "Velvet Racer", role: "member", hasClaimedName: false },
  { memberAddress: "0xa7", name: "Chicane", role: "member", hasClaimedName: true },
];

const EVENTS: NonNullable<CommunityDetailProps["events"]> = [
  {
    id: "evt-1",
    name: "Friday Night Grand Prix",
    image: "",
    creatorName: "TurboNomad",
    timeLabel: "Starts in 2 hours",
  },
  {
    id: "evt-2",
    name: "Beginner Kart Clinic & Track Tour",
    image: "",
    creatorName: "Pixel Drift",
    timeLabel: "Tomorrow, 6:00 PM",
  },
  {
    id: "evt-3",
    name: "Community Track Showcase",
    image: "",
    creatorName: "NeonApex",
    timeLabel: "Sat, 8:00 PM",
  },
  {
    id: "evt-4",
    name: "Ladder Finals Watch Party",
    image: "",
    creatorName: "GridLockGail",
    timeLabel: "Sun, 4:00 PM",
  },
];

const meta = {
  title: "Web/Pages/Social/Community Detail",
  component: StSocialCommunityDetail,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StSocialCommunityDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StSocialCommunityDetail community={COMMUNITY} members={MEMBERS} events={EVENTS} />,
};

export const SignedInMember: Story = {
  render: () => (
    <StSocialCommunityDetail community={COMMUNITY} members={MEMBERS} events={EVENTS} isLoggedIn isMember />
  ),
};

export const PrivateGated: Story = {
  render: () => (
    <StSocialCommunityDetail
      community={{
        id: "bafkreiprivate",
        name: "Founders Lounge",
        description: "An invite-only space for early Decentraland builders.",
        ownerAddress: "0x1111222233334444555566667777888899990000",
        ownerName: "GenesisDAO",
        ownerProfilePicture: "",
        privacy: "private",
        membersCount: 312,
        thumbnail: "",
      }}
      isLoggedIn
    />
  ),
};

export const Empty: Story = {
  render: () => <StSocialCommunityDetail community={COMMUNITY} members={[]} events={[]} />,
};

export const MobileTabbed: Story = {
  render: () => <StSocialCommunityDetail community={COMMUNITY} members={MEMBERS} events={EVENTS} mobile />,
};

export const Loading: Story = {
  render: () => <StSocialCommunityDetail state="loading" />,
};

export const NotFound: Story = {
  render: () => <StSocialCommunityDetail state="notFound" />,
};
