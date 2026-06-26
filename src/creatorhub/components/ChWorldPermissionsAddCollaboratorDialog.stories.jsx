import ChWorldPermissionsAddCollaboratorDialog from "./ChWorldPermissionsAddCollaboratorDialog.jsx";

export default {
  title: "CreatorHub/Components/World Permissions: Add Collaborator",
  component: ChWorldPermissionsAddCollaboratorDialog,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { value: "", error: null },
};

export const Filled = {
  args: { value: "0x4a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d", error: null },
};

export const InvalidAddress = {
  args: { value: "0x123", error: "Invalid address" },
};

export const BareForm = {
  args: { value: "", error: null, chrome: false },
};
