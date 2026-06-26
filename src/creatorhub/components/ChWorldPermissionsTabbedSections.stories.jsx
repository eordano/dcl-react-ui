import ChWorldPermissionsTabbedSections from "./ChWorldPermissionsTabbedSections.jsx";

export default {
  title: "CreatorHub/Components/World Permissions tabs",
  component: ChWorldPermissionsTabbedSections,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { open: true, worldName: "myworld.dcl.eth", initialTab: "access" },
};

export const CollaboratorsTab = {
  args: { open: true, worldName: "myworld.dcl.eth", initialTab: "collaborators" },
};

export const ParcelsTab = {
  args: { open: true, worldName: "myworld.dcl.eth", initialTab: "parcels" },
};

export const EmptyCollaborators = {
  args: {
    open: true,
    worldName: "myworld.dcl.eth",
    initialTab: "collaborators",
    collaborators: [],
  },
};
