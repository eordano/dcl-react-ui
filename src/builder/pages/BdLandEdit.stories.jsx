import BdLandEdit, { PARCEL_LAND, ESTATE_LAND } from "./BdLandEdit.jsx";

export default {
  title: "Builder/Pages/Land Edit",
  component: BdLandEdit,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { land: PARCEL_LAND },
};

export const Estate = {
  args: { land: ESTATE_LAND },
};

export const Loading = {
  args: { loading: true },
};

export const OperatorRole = {
  args: {
    land: {
      ...PARCEL_LAND,
      role: "operator",
      roles: ["operator"],
      name: "Operated Plot",
      description: "A parcel you can edit content on but do not own.",
    },
  },
};
