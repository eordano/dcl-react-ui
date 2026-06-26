import BdThirdPartyCollectionDetail from "./BdThirdPartyCollectionDetail.jsx";

export default {
  title: "Builder/Pages/Third Party Collection Detail",
  component: BdThirdPartyCollectionDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: {
    empty: true,
    collection: {
      id: "tpc-empty",
      name: "Empty Linked Collection",
      isPublished: false,
      isMappingComplete: true,
      itemCount: 0,
      linkedContractAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
      linkedContractNetwork: "MATIC",
    },
  },
};

export const NoResults = {
  args: {
    items: [],
    totalItems: 0,
    collection: {
      id: "tpc-1",
      name: "CryptoKitties Capsule",
      isPublished: false,
      isMappingComplete: false,
      itemCount: 4,
      linkedContractAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
      linkedContractNetwork: "MATIC",
    },
  },
};

export const Loading = { args: { loading: true } };
