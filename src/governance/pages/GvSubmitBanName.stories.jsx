import GvSubmitBanName from "./GvSubmitBanName.jsx";

export default {
  title: "Governance/Pages/Submit Ban Name",
  component: GvSubmitBanName,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { loggedIn: true },
};

export const LogInGate = {
  args: { loggedIn: false },
};

export const Error = {
  args: { loggedIn: true, submitError: "Name is already banned" },
};
