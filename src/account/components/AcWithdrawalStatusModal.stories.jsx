import AcWithdrawalStatusModal from "./AcWithdrawalStatusModal.jsx";

export default {
  title: "Account/Components/Withdrawal Status",
  component: AcWithdrawalStatusModal,
  parameters: { layout: "fullscreen" },
};

const INIT_HASH =
  "0x4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8";
const FINAL_HASH =
  "0x7b2c4e1d8f6c0b7a2e9d1c4f8a6b3d05a721d9e4b5c6f8a0b1c2d3e4f5a6b7c8";

export const Default = {
  args: {
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: "checkpoint",
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
    cost: "0.0042",
  },
};

export const WithdrawInitialized = {
  args: {
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: "pending",
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
  },
};

export const ReadyToWithdraw = {
  args: {
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: "checkpoint",
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 942.75,
      timestamp: 1718841600000,
    },
    cost: "0.0051",
  },
};

export const LoadingCost = {
  args: {
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: "checkpoint",
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
    isLoadingCost: true,
  },
};

export const Finalizing = {
  args: {
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: null,
      status: "checkpoint",
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
    cost: "0.0042",
    isFinalizingWithdrawal: true,
  },
};

export const CompleteWithdrawal = {
  args: {
    withdrawal: {
      initializeHash: INIT_HASH,
      finalizeHash: FINAL_HASH,
      status: "complete",
      from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
      amount: 1500,
      timestamp: 1718841600000,
    },
    cost: "0.0042",
  },
};
