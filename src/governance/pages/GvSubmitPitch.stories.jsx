import GvSubmitPitch from "./GvSubmitPitch.jsx";

export default {
  title: "Governance/Pages/Submit Pitch",
  component: GvSubmitPitch,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    account: "0x9f3c…7a21",
  },
};

export const VpNotMet = {
  args: {
    account: "0x9f3c…7a21",
    vpNotMet: true,
  },
};

export const Error = {
  args: {
    account: "0x9f3c…7a21",
    error:
      "Error: proposal submission failed — the governance service returned 500 (Internal Server Error).",
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

export const LoginGate = {
  args: {
    account: "",
  },
};
