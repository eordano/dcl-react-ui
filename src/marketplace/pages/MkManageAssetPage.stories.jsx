import MkManageAssetPage from "./MkManageAssetPage.jsx";

export default {
  title: "Marketplace/Pages/Manage asset",
  component: MkManageAssetPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const NoListings = {
  args: { order: null, rental: null },
};

export const Selling = {
  args: { rental: null },
};

export const ActiveRental = {
  args: {
    order: null,
    rental: {
      status: "executed",
      price: "25",
      tenant: "0x4b2a…d091",
      startRel: "2 months ago",
      startDate: "Apr 18, 2026",
      endRel: "in about 1 month",
      endDate: "Jul 18, 2026",
      endDateLong: "Saturday, July 18, 2026",
    },
  },
};

export const ClaimBack = {
  args: {
    asset: {
      name: "Skyline Estate",
      category: "estate",
      coords: "Estate #842",
      network: "Ethereum",
      owner: "0x9f3c…7a21",
      description:
        "A 9-parcel estate near the fashion district. Currently unclaimed after a finished rental.",
      proximities: [{ type: "district", text: "Adjacent" }],
    },
    order: null,
    rental: { status: "claimable" },
  },
};

export const UpgradeWarning = {
  args: { showUpgradeWarning: true },
};

export const LandLocked = {
  args: {
    locked: true,
    order: null,
    rental: {
      status: "executed",
      price: "40",
      tenant: "0x4b2a…d091",
      startRel: "1 month ago",
      startDate: "May 18, 2026",
      endRel: "in 5 months",
      endDate: "Nov 18, 2026",
    },
  },
};
