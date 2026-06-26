import AcEmailConfirmationErrorStates from "./AcEmailConfirmationErrorStates.jsx";

export default {
  title: "Account/Pages/Email Confirmation/Error states",
  component: AcEmailConfirmationErrorStates,
  parameters: { layout: "fullscreen" },
  argTypes: {
    state: { control: "select", options: ["invalid-link", "invalid-source", "missing-address"] },
  },
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
