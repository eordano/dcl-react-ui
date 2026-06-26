import AcSignIn from "./AcSignIn.jsx";

export default {
  title: "Account/Workflows/Sign In",
  component: AcSignIn,
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
