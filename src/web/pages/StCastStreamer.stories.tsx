import type { Meta, StoryObj } from "@storybook/react-vite";
import StCastStreamer from "./StCastStreamer";
import type { Toast } from "./StCastStreamer";

const DEMO_TOASTS: Toast[] = [
  {
    id: "ss",
    title: "Screen sharing failed",
    message: "Your screen share stopped. Click retry to share again.",
    action: { label: "Retry", onClick: () => {} },
  },
];

const meta = {
  title: "Web/Pages/Cast/Streamer",
  component: StCastStreamer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StCastStreamer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StCastStreamer
      state="live"
      displayName="ruby.dcl.eth"
      unreadMessages={2}
      participants={1}
      toasts={DEMO_TOASTS}
    />
  ),
};

export const Onboarding: Story = {
  render: () => <StCastStreamer state="onboarding" streamName="Genesis Plaza" toasts={[]} />,
};

export const Joining: Story = {
  render: () => <StCastStreamer state="joining" toasts={[]} />,
};

export const ConnectionError: Story = {
  render: () => <StCastStreamer state="error" toasts={[]} />,
};

export const LiveClean: Story = {
  render: () => (
    <StCastStreamer
      state="live"
      displayName="ruby.dcl.eth"
      unreadMessages={2}
      participants={1}
      toasts={[]}
    />
  ),
};
