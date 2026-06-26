import Minimap from "./Minimap.jsx";

export default {
  title: "Explorer/Frames/Minimap",
  component: Minimap,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { place: "Genesis Plaza", coords: "0,0" },
};

export const NamedScene = {
  args: { place: "Wonderzone Meteorchaser", coords: "-58,124" },
};
