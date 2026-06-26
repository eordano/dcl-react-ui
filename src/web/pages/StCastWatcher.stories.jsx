import StCastWatcher from "./StCastWatcher.jsx";

export default {
  title: "Web/Pages/Cast/Watcher",
  component: StCastWatcher,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StCastWatcher state="live" sidebarOpen unreadCount={3} />,
};

export const LiveFullscreen = {
  render: () => <StCastWatcher state="live" sidebarOpen={false} />,
};

export const Onboarding = {
  render: () => <StCastWatcher state="onboarding" streamName="Genesis Plaza" />,
};

export const Joining = {
  render: () => <StCastWatcher state="joining" />,
};

export const Waiting = {
  render: () => <StCastWatcher state="waiting" sidebarOpen={false} />,
};

export const WithToast = {
  render: () => (
    <StCastWatcher
      state="live"
      sidebarOpen={false}
      toasts={[
        {
          title: "Video couldn't play",
          message: "We couldn't start playback. Click retry to try again.",
          action: "Retry",
        },
      ]}
    />
  ),
};
