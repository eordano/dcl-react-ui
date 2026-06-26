import StStoragePlayers from "./StStoragePlayers.jsx";

export default {
  title: "Web/Pages/Storage/Players",
  component: StStoragePlayers,
  parameters: { layout: "fullscreen" }
};

export const Default = {};

export const Loading = {
  args: { isLoading: true }
};

export const Empty = {
  args: { players: [], profileNames: new Map() }
};

export const PositionScoped = {
  args: { realm: null, position: "-50,72" }
};
