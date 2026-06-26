import StProfileReferralRewardsTab from "./StProfileReferralRewardsTab.jsx";

export default {
  title: "Web/Pages/Profile/Referral Rewards Tab",
  component: StProfileReferralRewardsTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const JustStarted = {
  args: {
    data: { invitedUsersAccepted: 0, invitedUsersAcceptedViewed: 0, rewardImages: [] },
  },
};

export const AllUnlocked = {
  args: {
    data: { invitedUsersAccepted: 100, invitedUsersAcceptedViewed: 100, rewardImages: [] },
  },
};

export const Loading = {
  args: { state: "loading" },
};

export const Anonymous = {
  args: { state: "error" },
};
