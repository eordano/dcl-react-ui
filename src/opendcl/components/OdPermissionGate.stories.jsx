import OdPermissionGate, { FileWriteGate } from "./OdPermissionGate.jsx";

export default {
  title: "OpenDCL/Components/Permission Gate",
  component: OdPermissionGate,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <OdPermissionGate /> };
export const FileWrite = { render: () => <FileWriteGate /> };
