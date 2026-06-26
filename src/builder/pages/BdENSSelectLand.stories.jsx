import BdENSSelectLand, { ENS, LAND_TILES } from "./BdENSSelectLand.jsx";

export default {
  title: "Builder/Pages/ENS Select Land",
  component: BdENSSelectLand,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const AlreadyAssigned = {
  args: {
    ens: { subdomain: "soloplot.dcl.eth", landId: "-45,12" },
    landTiles: [LAND_TILES[0]],
  },
};

export const Loading = {
  args: { isLoading: true },
};

export const NotFound = {
  args: { notFound: true },
};
