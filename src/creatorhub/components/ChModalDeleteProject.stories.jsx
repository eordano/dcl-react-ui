import ChModalDeleteProject from "./ChModalDeleteProject.jsx";

export default {
  title: "CreatorHub/Components/Delete Project",
  component: ChModalDeleteProject,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
    project: {
      id: "5f2a1c44-9d3e-4b8a-bf21-7c0e0a1d4e90",
      title: "Neon Plaza",
      path: "/Users/me/Documents/dcl-scenes/neon-plaza",
    },
  },
};

export const DeleteFilesChecked = {
  args: {
    open: true,
    deleteFiles: true,
    project: {
      id: "a71f9b22-4c18-4e7d-9a03-2b6e1f0c8d44",
      title: "Sunset Gallery",
      path: "/Users/me/Documents/dcl-scenes/sunset-gallery",
    },
  },
};

export const LongTitle = {
  args: {
    open: true,
    project: {
      id: "c0d3f00d-1234-5678-9abc-def012345678",
      title: "My Very Ambitious Multi-Parcel Festival Grounds Experience",
      path: "/Users/me/Documents/dcl-scenes/festival-grounds",
    },
  },
};

export const Closed = {
  args: {
    open: false,
  },
};
