import MkClaimNamePage from "./MkClaimNamePage.jsx";

export default {
  title: "Marketplace/Pages/Claim Name",
  component: MkClaimNamePage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Available = {
  args: { initialName: "genesis", forceStatus: { kind: "available" } },
  render: (args) => <MkClaimNamePage {...args} />,
};

export const Unavailable = {
  args: { initialName: "decentraland", forceStatus: { kind: "unavailable" } },
};

export const InvalidTooShort = {
  args: {
    initialName: "x",
    forceStatus: {
      kind: "invalid",
      warn: true,
      message: "NAME too short: NAMEs must be at least 2 characters long.",
    },
  },
};

export const InsufficientMana = {
  args: {
    initialName: "genesis",
    forceStatus: { kind: "available" },
    insufficientMana: true,
  },
};
