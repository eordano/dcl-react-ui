import BdNamesList from "./BdNamesList.jsx";

export default {
  title: "Builder/Pages/Names List",
  component: BdNamesList,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const SingleName = {
  args: {
    names: [
      {
        name: "Aria",
        subdomain: "aria.dcl.eth",
        tokenId: "1024",
        nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
        ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
        ensAddressRecord: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
        landId: "-59,144",
        hue: 212,
      },
    ],
    alias: "aria.dcl.eth",
  },
};

export const Empty = {
  args: { names: [], alias: null },
};

export const Loading = {
  args: { loading: true },
};
