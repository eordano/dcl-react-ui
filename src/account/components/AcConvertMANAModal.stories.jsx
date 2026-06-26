import AcConvertMANAModal from "./AcConvertMANAModal.jsx";

export default {
  title: "Account/Components/Convert MANA",
  component: AcConvertMANAModal,
  parameters: { layout: "fullscreen" },
};

export const DepositForm = {
  args: { network: "ethereum", stage: "form" },
};

export const WithdrawCostGate = {
  args: { network: "matic", stage: "cost" },
};

export const WithdrawCostLoading = {
  args: { network: "matic", stage: "cost-loading" },
};

export const WithdrawForm = {
  args: { network: "matic", stage: "form" },
};

export const NoBalanceError = {
  args: { network: "ethereum", stage: "form-error" },
};

export const AuthorizationStep = {
  args: { network: "ethereum", stage: "auth" },
};
