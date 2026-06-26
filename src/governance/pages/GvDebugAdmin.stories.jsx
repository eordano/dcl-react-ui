import GvDebugAdmin from "./GvDebugAdmin.jsx";

export default {
  title: "Governance/Pages/Debug Admin",
  component: GvDebugAdmin,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { authorized: true, version: "v3.41.0" },
};

export const LoginGate = {
  args: { authorized: false },
};
