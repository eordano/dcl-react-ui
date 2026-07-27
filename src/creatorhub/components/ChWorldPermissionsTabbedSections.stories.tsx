import ChWorldPermissionsTabbedSections from "./ChWorldPermissionsTabbedSections";

const WORLD_NAME = "myworld.dcl.eth";
const OWNER = "0x9f3c2b1a7d8e4c5f6a0b1c2d3e4f5a6b7c8d9e21";

const ACCESS_WALLETS = [
  { address: "0x2a8b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", name: "DesignLead.dcl.eth", role: "collaborator" },
  { address: "0x71c0ffee00d34dbeefcafe1234567890abcdef12", name: "alice.eth" },
  { address: "0x4b22f3a91d0e8c7b6a5f4e3d2c1b0a9f8e7d6c5b" },
  { address: "0x88aa77bb66cc55dd44ee33ff2211009988776655", name: "bob.eth" },
];

const COLLABORATORS = [
  { address: "0x2a8b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", name: "DesignLead.dcl.eth", deployment: "world-wide", parcelsCount: 0 },
  { address: "0x55de01ab23cd45ef67ab89cd01ef23ab45cd67ef", name: "builder.eth", deployment: "parcels", parcelsCount: 6 },
  { address: "0xc0ffee2548cafe9876543210fedcba0123456789", deployment: "none", parcelsCount: 0 },
];

export default {
  title: "CreatorHub/Components/World Permissions tabs",
  component: ChWorldPermissionsTabbedSections,
  parameters: { layout: "fullscreen" },
  args: {
    variant: "panel",
    open: true,
    worldName: WORLD_NAME,
    ownerAddress: OWNER,
    accessWallets: ACCESS_WALLETS,
    collaborators: COLLABORATORS,
  },
};

export const Default = {
  args: { initialTab: "access" },
};

export const CollaboratorsTab = {
  args: { initialTab: "collaborators" },
};

export const ParcelsTab = {
  args: { initialTab: "parcels" },
};

export const EmptyCollaborators = {
  args: {
    initialTab: "collaborators",
    accessWallets: [],
    collaborators: [],
  },
};
