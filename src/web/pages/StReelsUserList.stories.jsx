import StReelsUserList from "./StReelsUserList.jsx";

export default {
  title: "Web/Pages/Reels/User List",
  component: StReelsUserList,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { images: [] },
};

export const Loading = {
  args: { isLoading: true, images: [] },
};
