import type { Meta, StoryObj } from "@storybook/react-vite";
import StCastWatcher from "./StCastWatcher";

const meta = {
  title: "Web/Pages/Cast/Watcher",
  component: StCastWatcher,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StCastWatcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StCastWatcher state="live" sidebarOpen unreadCount={3} />,
};

export const LiveFullscreen: Story = {
  render: () => <StCastWatcher state="live" sidebarOpen={false} />,
};

export const Onboarding: Story = {
  render: () => <StCastWatcher state="onboarding" streamName="Genesis Plaza" />,
};

export const Joining: Story = {
  render: () => <StCastWatcher state="joining" />,
};

export const Waiting: Story = {
  render: () => <StCastWatcher state="waiting" sidebarOpen={false} />,
};

export const WithToast: Story = {
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
