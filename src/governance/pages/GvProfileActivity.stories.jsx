import GvProfileActivity from "./GvProfileActivity.jsx";

export default {
  title: "Governance/Pages/Profile / Activity",
  component: GvProfileActivity,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const MemberProfile = {
  args: {
    username: "luna.dcl",
    address: "0x3e…c901",
    isOwnProfile: false,
    bio: "Wearable creator and frequent voter. Delegating to community stewards.",
  },
};

export const NoBio = {
  args: { bio: "" },
};
