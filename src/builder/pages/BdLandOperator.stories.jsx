import BdLandOperator, {
  PARCEL_LAND,
  ESTATE_LAND,
  EXISTING_OPERATOR,
} from "./BdLandOperator.jsx";

export default {
  title: "Builder/Pages/Land Operator",
  component: BdLandOperator,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    land: PARCEL_LAND,
    initialOperator: EXISTING_OPERATOR,
  },
};

export const New = {
  args: {
    land: PARCEL_LAND,
    initialOperator: "",
  },
};

export const Estate = {
  args: {
    land: ESTATE_LAND,
    initialOperator: "",
  },
};

export const Loading = {
  args: { loading: true },
};

export const NotFound = {
  args: { notFound: true },
};
