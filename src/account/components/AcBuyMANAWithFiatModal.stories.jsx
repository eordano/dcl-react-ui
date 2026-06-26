import AcBuyMANAWithFiatModal from "./AcBuyMANAWithFiatModal.jsx";

export default {
  title: "Account/Components/Buy MANA with Fiat",
  component: AcBuyMANAWithFiatModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { view: "select" },
};

export const ProviderSelection = {
  args: { view: "select" },
};

export const SelectionSingleNetwork = {
  args: { view: "select", selectedNetwork: "ethereum" },
};

export const EthereumGateways = {
  args: { view: "gateway", network: "ethereum" },
};

export const PolygonGateways = {
  args: { view: "gateway", network: "matic" },
};

export const SelectionError = {
  args: { view: "select", hasError: true },
};

export const Loading = {
  args: { view: "select", loading: true },
};

export const FeedbackPending = {
  args: { view: "feedback-pending", network: "ethereum", gateway: "moonPay" },
};

export const FeedbackSuccess = {
  args: { view: "feedback-success", network: "ethereum", gateway: "moonPay" },
};

export const FeedbackFailure = {
  args: { view: "feedback-failure", network: "matic", gateway: "transak" },
};
