import BdScenePoolSearch from "./BdScenePoolSearch.jsx";

export default {
  title: "Builder/Pages/Scene Pool / Search",
  component: BdScenePoolSearch,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const LoggedOut = {
  args: { isLoggedIn: false },
};

export const Empty = {
  args: { pools: [] },
};

export const Loading = {
  args: { loading: true },
};
