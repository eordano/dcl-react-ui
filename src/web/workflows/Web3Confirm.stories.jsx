import Web3Confirm from "./Web3Confirm.jsx";

export default {
  title: "Web/Workflows/Web3Confirm",
  component: Web3Confirm,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <Web3Confirm />,
};

export const CustomCode = {
  render: () => <Web3Confirm code="482910" expiry="04:37" />,
};

export const Expiring = {
  render: () => <Web3Confirm code="007391" expiry="00:09" />,
};
