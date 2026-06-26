import BdErrorBoundaryPage, { SAMPLE_STACK } from "./BdErrorBoundaryPage.jsx";

export default {
  title: "Builder/Pages/Error Boundary",
  component: BdErrorBoundaryPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { stackTrace: SAMPLE_STACK },
};

export const NoDetails = {
  args: { stackTrace: "No details available" },
};
