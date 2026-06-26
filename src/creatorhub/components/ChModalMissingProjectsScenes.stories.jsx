import ChModalMissingProjectsScenes from "./ChModalMissingProjectsScenes.jsx";

export default {
  title: "CreatorHub/Components/Missing Projects / Scenes",
  component: ChModalMissingProjectsScenes,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
    missing: [
      "/Users/me/Documents/decentraland/projects/winter-festival-2024/scene",
      "/home/creator/dcl/my-genesis-plaza-experience/build",
      "/Users/me/Documents/dcl-scenes/neon-plaza",
    ],
  },
};

export const SingleMissing = {
  args: {
    open: true,
    missing: ["/Users/me/Documents/dcl-scenes/neon-plaza"],
  },
};

export const Empty = {
  args: {
    open: true,
    missing: [],
  },
};
