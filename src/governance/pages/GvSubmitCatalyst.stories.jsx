import GvSubmitCatalyst from "./GvSubmitCatalyst.jsx";

export default {
  title: "Governance/Pages/Submit Catalyst",
  component: GvSubmitCatalyst,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { catalystType: "add", state: "form" },
};

export const Remove = {
  args: { catalystType: "remove", state: "form" },
};

export const LogInGate = {
  args: { catalystType: "add", state: "login" },
};

export const SubmitError = {
  args: { catalystType: "add", state: "form", showError: true },
};

export const NotFound = {
  args: { state: "notfound" },
};
