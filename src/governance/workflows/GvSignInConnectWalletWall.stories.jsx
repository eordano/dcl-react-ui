import GvSignInConnectWalletWall from "./GvSignInConnectWalletWall.jsx";

export default {
  title: "Governance/Workflows/Sign-in / Connect Wallet wall",
  component: GvSignInConnectWalletWall,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { active: "profile" },
};

export const FromSubmit = {
  args: { active: "proposals" },
};

export const Connecting = {
  args: { active: "profile", isConnecting: true },
};

export const Error = {
  args: { active: "profile", hasError: true },
};

export const Mobile = {
  args: { active: "profile", mobile: true },
};
