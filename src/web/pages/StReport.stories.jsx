import StReport from "./StReport.jsx";

export default {
  title: "Web/Pages/Report/Form",
  component: StReport,
  parameters: { layout: "fullscreen" },
};

const CONNECTED_WALLET = "0x71c7656ec7ab88b098defb751b7401b5f6d8976f";
const REPORTED_WALLET = "0x8ba1f109551bd432803012645ac136ddd64dba72";

export const Default = {
  args: {
    view: "form",
    walletAddress: CONNECTED_WALLET,
    hasValidIdentity: true,
  },
};

export const PrefilledReportedAddress = {
  args: {
    view: "form",
    walletAddress: CONNECTED_WALLET,
    reportedAddress: REPORTED_WALLET,
    hasValidIdentity: true,
  },
};

export const SignInRequired = {
  args: {
    view: "form",
    walletAddress: "",
    hasValidIdentity: false,
  },
};

export const WalletMismatch = {
  args: {
    view: "form",
    walletAddress: CONNECTED_WALLET,
    hasValidIdentity: true,
    walletMismatch: true,
  },
};

export const SubmitError = {
  args: {
    view: "form",
    walletAddress: CONNECTED_WALLET,
    hasValidIdentity: true,
    submitError: true,
  },
};

export const Submitting = {
  args: {
    view: "form",
    walletAddress: CONNECTED_WALLET,
    hasValidIdentity: true,
    isSubmitting: true,
  },
};

export const Success = {
  args: {
    view: "success",
  },
};
