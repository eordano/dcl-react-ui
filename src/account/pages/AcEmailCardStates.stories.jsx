import AcEmailCardStates from "./AcEmailCardStates.jsx";

export default {
  title: "Account/Pages/Email card states",
  component: AcEmailCardStates,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { showAllStates: true },
};

export const NoEmail = {
  args: {
    showAllStates: false,
    email: "",
    unconfirmedEmail: "",
    hasConfirmEmail: false,
  },
};

export const PendingApproval = {
  args: {
    showAllStates: false,
    email: "",
    unconfirmedEmail: "user@decentraland.org",
    hasConfirmEmail: false,
  },
};

export const Confirmed = {
  args: {
    showAllStates: false,
    email: "user@decentraland.org",
    unconfirmedEmail: "",
    hasConfirmEmail: true,
    isIgnoringAllEmail: false,
  },
};

export const Loading = {
  args: {
    showAllStates: false,
    email: "",
    unconfirmedEmail: "user@decentraland.org",
    hasConfirmEmail: false,
    isLoading: true,
  },
};
