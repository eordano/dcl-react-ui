import AcOptOutConfirmationModal from "./AcOptOutConfirmationModal.jsx";

export default {
  title: "Account/Components/Opt-Out Confirmation",
  component: AcOptOutConfirmationModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    error: null,
    isLoading: false,
  },
};

export const Loading = {
  args: {
    error: null,
    isLoading: true,
  },
};

export const Error = {
  args: {
    error: "internal server error",
    isLoading: false,
  },
};

export const AlreadyClaimedError = {
  args: {
    error: "cannot unregister after claiming credits",
    isLoading: false,
  },
};
