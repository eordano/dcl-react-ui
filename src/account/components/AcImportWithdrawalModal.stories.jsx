import AcImportWithdrawalModal from "./AcImportWithdrawalModal.jsx";

export default {
  title: "Account/Components/Import Withdrawal",
  component: AcImportWithdrawalModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
  },
};

export const Loading = {
  args: {
    open: true,
    isLoading: true,
  },
};

export const Error = {
  args: {
    open: true,
    error: "Not found",
  },
};
