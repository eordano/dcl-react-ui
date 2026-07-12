import type { Meta, StoryObj } from "@storybook/react-vite";
import GvAccountIdentityLinkingFlow from "./GvAccountIdentityLinkingFlow";

const meta = {
  title: "Governance/Workflows/Identity linking",
  component: GvAccountIdentityLinkingFlow,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof GvAccountIdentityLinkingFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { initial: "choose" },
};

export const WithLinkedAccount: Story = {
  args: { initial: "unlink-row" },
};

export const ForumConnectionFlow: Story = {
  args: { initial: "forum" },
};

export const DiscordConnectionFlow: Story = {
  args: { initial: "discord" },
};

export const PushSubscribing: Story = {
  args: { initial: "push" },
};

export const PostConnectionSuccess: Story = {
  args: { initial: "post-success" },
};

export const PostConnectionError: Story = {
  args: { initial: "post-error" },
};

export const UnlinkConfirmation: Story = {
  args: { initial: "unlink-confirm" },
};
