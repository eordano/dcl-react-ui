import AcSeeAllTransactionsModal from "./AcSeeAllTransactionsModal.jsx";

export default {
  title: "Account/Components/See All Transactions",
  component: AcSeeAllTransactionsModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { network: "matic" },
};

export const Ethereum = {
  args: { network: "ethereum" },
};

export const Empty = {
  args: { network: "matic", transactions: [] },
};
