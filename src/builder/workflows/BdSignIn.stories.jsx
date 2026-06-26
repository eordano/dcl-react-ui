import BdSignIn from "./BdSignIn.jsx";

export default {
  title: "Builder/Workflows/Sign In",
  component: BdSignIn,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { isConnecting: false, isConnected: false, hasError: false },
};

export const Connecting = {
  args: { isConnecting: true, isConnected: false, hasError: false },
};

export const Error = {
  args: { isConnecting: false, isConnected: false, hasError: true },
};

export const Connected = {
  args: { isConnecting: false, isConnected: true, hasError: false },
};
