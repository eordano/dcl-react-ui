import AcNotificationGroupSettings from "./AcNotificationGroupSettings.jsx";

export default {
  title: "Account/Pages/Notification group settings",
  component: AcNotificationGroupSettings,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    email: "jamie@decentraland.org",
    hasEmail: true,
    isStreamingEnabled: true,
    isReferralEnabled: true,
  },
};

export const FlagsDisabled = {
  args: {
    email: "jamie@decentraland.org",
    hasEmail: true,
    isStreamingEnabled: false,
    isReferralEnabled: false,
  },
};

export const NoEmail = {
  args: {
    email: "",
    hasEmail: false,
    isStreamingEnabled: true,
    isReferralEnabled: true,
  },
};
