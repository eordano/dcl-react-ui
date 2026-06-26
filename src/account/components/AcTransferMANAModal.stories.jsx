import AcTransferMANAModal from "./AcTransferMANAModal.jsx";

export default {
  title: "Account/Components/Transfer MANA modal",
  component: AcTransferMANAModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { network: "ethereum" },
};

export const Filled = {
  args: {
    network: "ethereum",
    initialAmount: 250,
    initialTo: "0x9f3c5d2a1b4e6f8c0a7d2e1f4b6c8a0d9e3f7a21",
  },
};

export const PolygonNetwork = {
  args: {
    network: "matic",
    initialAmount: 500,
    initialTo: "0x9f3c5d2a1b4e6f8c0a7d2e1f4b6c8a0d9e3f7a21",
  },
};

export const Loading = {
  args: {
    network: "ethereum",
    initialAmount: 100,
    initialTo: "0x9f3c5d2a1b4e6f8c0a7d2e1f4b6c8a0d9e3f7a21",
    loading: true,
  },
};

export const InvalidAddress = {
  args: {
    network: "ethereum",
    initialAmount: 100,
    initialTo: "0x1234",
    forceError: "invalid_address",
  },
};

export const InsufficientBalance = {
  args: {
    network: "ethereum",
    initialAmount: 9999,
    forceError: "no_balance",
  },
};
