import AcUnifiedEmailConfirmation from "./AcUnifiedEmailConfirmation.jsx";

export default {
  title: "Account/Pages/Unified Email Confirmation",
  component: AcUnifiedEmailConfirmation,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "challenge", source: "account" },
};

export const CreditsChallenge = {
  args: { state: "challenge", source: "credits" },
};

export const Confirming = {
  args: { state: "confirming", source: "account" },
};

export const ConfirmedAccount = {
  args: { state: "confirmed", source: "account" },
};

export const ConfirmedCredits = {
  args: { state: "confirmed", source: "credits" },
};

export const InvalidLink = {
  args: { state: "invalid-link" },
};

export const InvalidSource = {
  args: { state: "invalid-source" },
};

export const MissingAddress = {
  args: { state: "missing-address" },
};
