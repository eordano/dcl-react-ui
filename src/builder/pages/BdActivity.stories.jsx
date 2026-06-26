import BdActivity from "./BdActivity.jsx";

export default {
  title: "Builder/Pages/Activity",
  component: BdActivity,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { transactions: [] },
};

export const Loading = {
  args: { loading: true },
};

export const SignedOut = {
  args: { isLoggedIn: false },
};
