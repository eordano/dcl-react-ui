import Verify from "./Verify.jsx";

export default {
  title: "Web/Workflows/Verify",
  component: Verify,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <Verify />,
};

export const CustomNumber = {
  render: () => <Verify number="482915" expiry="04:32" />,
};

export const Expiring = {
  render: () => <Verify number="007321" expiry="00:09" />,
};
