import ChWorldPermissionsSetChangePasswordDialo from "./ChWorldPermissionsSetChangePasswordDialo.jsx";

export default {
  title: "CreatorHub/Components/World Permissions: Password",
  component: ChWorldPermissionsSetChangePasswordDialo,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { isChanging: false },
};

export const ChangePassword = {
  args: { isChanging: true },
};

export const RequirementsError = {
  args: { isChanging: false, initialPassword: "abc1" },
};

export const Mismatch = {
  args: { isChanging: false, initialPassword: "secret123", initialConfirm: "secret124" },
};

export const Valid = {
  args: { isChanging: true, initialPassword: "secret123", initialConfirm: "secret123" },
};
