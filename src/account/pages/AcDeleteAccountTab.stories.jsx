import AcDeleteAccountTab from "./AcDeleteAccountTab.jsx";

export default {
  title: "Account/Pages/Delete Account",
  component: AcDeleteAccountTab,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    address: "0x9f3c4a1d8b2e6f0c7a21d9e4b5c6f8a0b1c2d3e4",
  },
};

export const NoAddress = {
  args: {
    address: undefined,
  },
};
