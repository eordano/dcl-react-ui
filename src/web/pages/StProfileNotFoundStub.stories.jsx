import StProfileNotFoundStub from "./StProfileNotFoundStub.jsx";

export default {
  title: "Web/Pages/Profile/Not Found Stub",
  component: StProfileNotFoundStub,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StProfileNotFoundStub address="0xnot-a-valid-address" />,
};

export const NonAddressInput = {
  render: () => <StProfileNotFoundStub address="vitalik" />,
};

export const TooShortHex = {
  render: () => <StProfileNotFoundStub address="0x2fa1b3c4" />,
};

export const EmptyAddress = {
  render: () => <StProfileNotFoundStub address="" />,
};
