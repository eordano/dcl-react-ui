import BdLandAssignENS, { PARCEL_LAND, ENS_NAME } from "./BdLandAssignENS.jsx";

export default {
  title: "Builder/Workflows/Land Assign ENS",
  component: BdLandAssignENS,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { land: PARCEL_LAND, ens: ENS_NAME },
};

export const Estate = {
  args: {
    land: {
      ...PARCEL_LAND,
      id: "estate-204",
      tokenId: "204",
      type: "estate",
      size: 6,
      name: "Aurora Estate",
      parcels: [
        { x: 20, y: -8 },
        { x: 21, y: -8 },
        { x: 22, y: -8 },
        { x: 20, y: -9 },
        { x: 21, y: -9 },
        { x: 22, y: -9 },
      ],
    },
    ens: { ...ENS_NAME, name: "aurora", subdomain: "aurora.dcl.eth" },
  },
};

export const Loading = {
  args: { loading: true },
};
