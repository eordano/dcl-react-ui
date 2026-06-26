import AcTransactionDetailModal from "./AcTransactionDetailModal.jsx";

export default {
  title: "Account/Components/Transaction Detail",
  component: AcTransactionDetailModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Deposit = {
  args: {
    description: "Deposit to Polygon MANA",
    transaction: {
      hash: "0xa1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90",
      type: "deposit",
      status: "confirmed",
      amount: 500,
      data: {
        hash: "0xa1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90",
        status: "complete",
        from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
        amount: 500,
        timestamp: 1718700000000,
      },
    },
  },
};

export const Withdrawal = {
  args: {
    description: "Withdrawal to Ethereum MANA",
    transaction: {
      type: "withdrawal",
      status: "confirmed",
      amount: 2750.25,
      data: {
        initializeHash: "0x11aa22bb33cc44dd55ee66ff77001122334455667788990011223344556677ab",
        finalizeHash: "0x99ff88ee77dd66cc55bb44aa33221100ffeeddccbbaa99887766554433221100",
        status: "complete",
        from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
        amount: 2750.25,
        timestamp: 1718600000000,
      },
    },
    withdrawals: [
      {
        initializeHash: "0x11aa22bb33cc44dd55ee66ff77001122334455667788990011223344556677ab",
        finalizeHash: "0x99ff88ee77dd66cc55bb44aa33221100ffeeddccbbaa99887766554433221100",
        status: "complete",
        from: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
        amount: 2750.25,
        timestamp: 1718600000000,
      },
    ],
  },
};

export const Purchase = {
  args: {
    description: "Add tokens via Transak",
    transaction: {
      type: "purchase",
      status: "confirmed",
      amount: 1000,
      data: {
        txHash: "0xcafe1234beef5678dead9012feed3456cafe1234beef5678dead9012feed3456",
        network: "MATIC",
        status: "complete",
        timestamp: 1718500000000,
      },
    },
  },
};

export const Pending = {
  args: {
    description: "Send tokens to",
    transaction: {
      hash: "0x4f1e8a7c9b2d3e6f0a1c5b8d7e4f2a9c6b3d05a721e8f4c7b2a9d6e3f1c0b5a82",
      type: "transfer",
      status: "pending",
      amount: 320.5,
      data: {
        to: "0x1234abcd5678ef901234abcd5678ef901234abcd",
        hash: "0x4f1e8a7c9b2d3e6f0a1c5b8d7e4f2a9c6b3d05a721e8f4c7b2a9d6e3f1c0b5a82",
        network: "MATIC",
        chainId: 137,
        status: "pending",
        timestamp: 1718800200000,
      },
    },
  },
};
