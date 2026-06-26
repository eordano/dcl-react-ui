import AcWithdrawalStatusModalSubStates from "./AcWithdrawalStatusModalSubStates.jsx";

export default {
  title: "Account/Components/Withdrawal status sub-states",
  component: AcWithdrawalStatusModalSubStates,
  parameters: { layout: "fullscreen" },
};

export const Default = { args: {} };

export const WithdrawInitialized = { args: { only: "initialized" } };

export const ReadyToWithdraw = { args: { only: "ready" } };

export const CompleteWithdrawal = { args: { only: "complete" } };
