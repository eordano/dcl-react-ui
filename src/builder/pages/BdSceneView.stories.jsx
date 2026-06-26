import BdSceneView from "./BdSceneView.jsx";

export default {
  title: "Builder/Pages/Scene View (Public)",
  component: BdSceneView,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Pool = {
  args: { variant: "pool" },
};

export const PoolLiked = {
  args: { variant: "pool", liked: true },
};

export const Sdk6 = {
  args: {
    scene: {
      id: "p-retro",
      title: "Retro Arcade",
      description: "An SDK 6 drag-and-drop build packed with classic cabinets.",
      parcels: 3,
      items: 96,
      sdk: 6,
      hue: 48,
      author: { name: "pixelpilot", address: "0x4a1b…9c30", hue: 200 },
    },
  },
};

export const NoDescription = {
  args: {
    scene: {
      id: "p-frost",
      title: "Frost Cabin",
      description: "",
      parcels: 1,
      items: 22,
      sdk: 7,
      hue: 192,
      author: { name: "snowmaker", address: "0x7d22…11ab", hue: 210 },
    },
  },
};

export const Loading = {
  args: { loading: true },
};
