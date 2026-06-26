import AcLoginModal from "./AcLoginModal.jsx";

export default {
  title: "Account/Workflows/Login",
  component: AcLoginModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "default" },
};

export const Loading = {
  args: { state: "loading" },
};

export const Error = {
  args: { state: "error" },
};
