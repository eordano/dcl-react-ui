import BdLand from "./BdLand.jsx";

export default {
  title: "Builder/Pages/Land",
  component: BdLand,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const AtlasView = {
  args: { view: "atlas" },
};

export const SingleLand = {
  args: {
    view: "atlas",
    lands: [
      {
        id: "p1",
        type: "parcel",
        role: 1,
        name: "My First Parcel",
        x: -52,
        y: 14,
        operators: ["0x9f3c…7a21"],
        deployments: ["Cozy Gallery"],
      },
    ],
  },
};

export const Empty = {
  args: { lands: [] },
};

export const Loading = {
  args: { isLoading: true },
};
