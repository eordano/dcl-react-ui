import ChModalCreateProject from "./ChModalCreateProject.jsx";

export default {
  title: "CreatorHub/Components/Create Project",
  component: ChModalCreateProject,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
    initialValue: {
      name: "My Awesome Scene",
      path: "/Users/creator/Documents/Decentraland",
    },
  },
};

export const Empty = {
  args: {
    open: true,
    initialValue: { name: "", path: "" },
  },
};

export const Error = {
  args: {
    open: true,
    initialValue: {
      name: "Taken Scene",
      path: "/Users/creator/Documents/Decentraland",
    },
    takenPaths: ["/Users/creator/Documents/Decentraland/Taken Scene"],
  },
};
