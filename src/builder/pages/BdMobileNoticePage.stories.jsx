import BdMobileNoticePage from "./BdMobileNoticePage.jsx";

export default {
  title: "Builder/Pages/Mobile Notice",
  component: BdMobileNoticePage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Subscribed = {
  args: { subscribed: true },
};
