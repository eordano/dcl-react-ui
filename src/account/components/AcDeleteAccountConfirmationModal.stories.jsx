import AcDeleteAccountConfirmationModal from "./AcDeleteAccountConfirmationModal.jsx";

export default {
  title: "Account/Components/Delete Account Confirmation",
  component: AcDeleteAccountConfirmationModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "default" },
};

export const ConfirmedInput = {
  args: { state: "typed" },
};

export const Loading = {
  args: { state: "loading" },
};

export const Error = {
  args: { state: "error" },
};
