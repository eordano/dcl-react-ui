import type { Meta, StoryObj } from "@storybook/react-vite";
import StProfileReferralRewardsTab from "./StProfileReferralRewardsTab";
import type { ReferralProfile } from "./StProfileReferralRewardsTab";

const PROFILE: ReferralProfile = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  hasClaimedName: true,
  nameColor: "#FF8362",
};

const meta = {
  title: "Web/Pages/Profile/Referral Rewards Tab",
  component: StProfileReferralRewardsTab,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StProfileReferralRewardsTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profile: PROFILE,
    data: { invitedUsersAccepted: 22, invitedUsersAcceptedViewed: 22, rewardImages: [] },
  },
};

export const JustStarted: Story = {
  args: {
    profile: PROFILE,
    data: { invitedUsersAccepted: 0, invitedUsersAcceptedViewed: 0, rewardImages: [] },
  },
};

export const AllUnlocked: Story = {
  args: {
    profile: PROFILE,
    data: { invitedUsersAccepted: 100, invitedUsersAcceptedViewed: 100, rewardImages: [] },
  },
};

export const Loading: Story = {
  args: { profile: PROFILE, state: "loading" },
};

export const Anonymous: Story = {
  args: { profile: PROFILE, state: "error" },
};
