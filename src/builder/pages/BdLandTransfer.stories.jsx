import BdLandTransfer, { PARCEL_LAND, ESTATE_LAND } from "./BdLandTransfer.jsx";

export default {
  title: "Builder/Pages/Land Transfer",
  component: BdLandTransfer,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Estate = {
  args: { land: ESTATE_LAND },
};

export const Loading = {
  args: { loading: true },
};

export const NotFound = {
  args: { notFound: true },
};

export { PARCEL_LAND, ESTATE_LAND };
