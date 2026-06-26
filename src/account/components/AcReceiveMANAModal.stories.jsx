import AcReceiveMANAModal from "./AcReceiveMANAModal.jsx";

export default {
  title: "Account/Components/Receive MANA",
  component: AcReceiveMANAModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    address: "0x9f3c5b2a4e1d8f6c0b7a2e9d1c4f8a6b3d05a721",
  },
};

export const ShortAddress = {
  args: {
    address: "0x4b1a000000000000000000000000000000009c02",
  },
};
