import StWhatSOnCreateEditHangout from "./StWhatSOnCreateEditHangout.jsx";

export default {
  title: "Web/Pages/What's On/Create-Edit Hangout",
  component: StWhatSOnCreateEditHangout,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StWhatSOnCreateEditHangout mode="create" state="form" />,
};

export const Edit = {
  render: () => <StWhatSOnCreateEditHangout mode="edit" state="form" />,
};

export const Submitted = {
  render: () => <StWhatSOnCreateEditHangout mode="create" state="success" />,
};

export const SignInGate = {
  render: () => <StWhatSOnCreateEditHangout state="signin" />,
};
