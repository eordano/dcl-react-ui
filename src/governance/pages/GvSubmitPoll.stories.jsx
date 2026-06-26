import GvSubmitPoll from "./GvSubmitPoll.jsx";

export default {
  title: "Governance/Pages/Submit Poll",
  component: GvSubmitPoll,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { loggedIn: true, vpMet: true },
};

export const LogInGate = {
  args: { loggedIn: false },
};

export const VpNotMet = {
  args: { loggedIn: true, vpMet: false },
};
