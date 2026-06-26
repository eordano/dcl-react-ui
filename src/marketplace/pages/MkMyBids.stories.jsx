import MkMyBids from "./MkMyBids.jsx";

export default {
  title: "Marketplace/Pages/My Bids",
  component: MkMyBids,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Loading = {
  args: {
    isLoading: true,
    sellerBids: [],
    archivedBids: [],
    bidderBids: [],
  },
};

export const Empty = {
  args: {
    isLoading: false,
    sellerBids: [],
    archivedBids: [],
    bidderBids: [],
  },
};

export const Connecting = {
  args: { isConnecting: true },
};
