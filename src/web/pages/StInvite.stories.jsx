import StInvite from "./StInvite.jsx";

export default {
  title: "Web/Pages/Invite",
  component: StInvite,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    referrer: {
      name: "MetaPioneer",
      ethAddress: "0x8a3b2f19c4e7d05a6b1f9e2c3d4a5b6c7d8e9f01",
    },
    loading: false,
  },
};

export const Loading = {
  args: {
    referrer: {
      name: "MetaPioneer",
      ethAddress: "0x8a3b2f19c4e7d05a6b1f9e2c3d4a5b6c7d8e9f01",
    },
    loading: true,
  },
};

export const NoReferrer = {
  args: {
    referrer: null,
    loading: false,
  },
};
