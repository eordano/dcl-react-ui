import BdLandDetail, {
  PARCEL_LAND,
  ESTATE_LAND,
  DEPLOYMENTS,
  ENS_LIST,
} from "./BdLandDetail.jsx";

export default {
  title: "Builder/Pages/Land Detail",
  component: BdLandDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Estate = {
  args: {
    land: ESTATE_LAND,
    deployments: DEPLOYMENTS,
    ensList: [],
  },
};

export const Rented = {
  args: {
    land: {
      ...PARCEL_LAND,
      role: "lessor",
      roles: ["lessor"],
    },
    rental: {
      lessor: PARCEL_LAND.owner,
      tenant: "0x71c7656ec7ab88b098defb751b7401b5f6d8976f",
      ended: false,
      endsIn: "about 2 months",
    },
  },
};

export const Empty = {
  args: {
    land: { ...PARCEL_LAND, description: "", operators: [] },
    deployments: [],
    ensList: [],
  },
};

export const Loading = {
  args: { loading: true },
};
