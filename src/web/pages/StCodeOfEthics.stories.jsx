import StCodeOfEthics from "./StCodeOfEthics.jsx";

export default {
  title: "Web/Pages/Legal/Code of Ethics",
  component: StCodeOfEthics,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StCodeOfEthics />,
};

export const ViewedFromTermsRail = {
  render: () => <StCodeOfEthics activeSlug="/terms" />,
};
