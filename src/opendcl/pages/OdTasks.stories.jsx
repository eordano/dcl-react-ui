import OdTasks, { StopConfirmView } from "./OdTasks.jsx";

export default {
  title: "OpenDCL/Pages/Tasks",
  component: OdTasks,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <OdTasks /> };
export const StopConfirm = { render: () => <StopConfirmView /> };
