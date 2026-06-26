import BdSettings, { WALLET_ADDRESS, AUTHORIZATIONS } from "./BdSettings.jsx";

export default {
  title: "Builder/Pages/Settings",
  component: BdSettings,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { address: WALLET_ADDRESS, authorizations: AUTHORIZATIONS },
};

export const NoAuthorizations = {
  args: { address: WALLET_ADDRESS, authorizations: [] },
};

export const Loading = {
  args: { loading: true },
};
