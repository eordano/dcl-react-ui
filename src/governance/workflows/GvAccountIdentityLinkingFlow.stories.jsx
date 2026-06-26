import GvAccountIdentityLinkingFlow from "./GvAccountIdentityLinkingFlow.jsx";

export default {
  title: "Governance/Workflows/Identity linking",
  component: GvAccountIdentityLinkingFlow,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { initial: "choose" },
};

export const WithLinkedAccount = {
  args: { initial: "unlink-row" },
};

export const ForumConnectionFlow = {
  args: { initial: "forum" },
};

export const DiscordConnectionFlow = {
  args: { initial: "discord" },
};

export const PushSubscribing = {
  args: { initial: "push" },
};

export const PostConnectionSuccess = {
  args: { initial: "post-success" },
};

export const PostConnectionError = {
  args: { initial: "post-error" },
};

export const UnlinkConfirmation = {
  args: { initial: "unlink-confirm" },
};
