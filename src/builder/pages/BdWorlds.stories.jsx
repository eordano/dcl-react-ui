import BdWorlds from "./BdWorlds.jsx";

export default {
  title: "Builder/Pages/Worlds",
  component: BdWorlds,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const EnsDomains = {
  args: { tab: "ens" },
};

export const BlockedWarning = {
  args: { tab: "dcl", blocked: "warning" },
};

export const Blocked = {
  args: { tab: "dcl", blocked: "blocked" },
};

export const YourStorageModal = {
  args: { modal: "storage" },
};

export const PermissionsModal = {
  args: { modal: "permissions" },
};

export const EmptyDcl = {
  args: { tab: "dcl", dcl: [] },
};

export const EmptyEns = {
  args: { tab: "ens", ens: [] },
};

export const Loading = {
  args: { loading: true },
};
