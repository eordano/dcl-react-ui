import BdNameDetail from "./BdNameDetail.jsx";

export default {
  title: "Builder/Pages/Name Detail",
  component: BdNameDetail,
  parameters: { layout: "fullscreen" },
};

const BASE = {
  name: "Aria",
  subdomain: "aria.dcl.eth",
  tokenId: "1024",
  nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  ensAddressRecord: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  landId: "-59,144",
  hue: 212,
};

export const Default = {};

export const UnassignedRecords = {
  args: {
    ens: {
      ...BASE,
      name: "Genesis",
      subdomain: "genesis.dcl.eth",
      ensAddressRecord: undefined,
      landId: undefined,
      hue: 28,
    },
    alias: "aria.dcl.eth",
  },
};

export const NotAlias = {
  args: {
    ens: { ...BASE, name: "NeonRider", subdomain: "neonrider.dcl.eth", hue: 300 },
    alias: "aria.dcl.eth",
  },
};

export const Unclaimed = {
  args: {
    ens: {
      ...BASE,
      name: "VaporWave",
      subdomain: "vaporwave.dcl.eth",
      ensOwnerAddress: "0x0000000000000000000000000000000000000000",
      hue: 160,
    },
    alias: "aria.dcl.eth",
  },
};

export const EstateLand = {
  args: {
    ens: { ...BASE, name: "Estate", subdomain: "estate.dcl.eth", landId: "Estate (143)", hue: 88 },
  },
};

export const Error = {
  args: { error: "Could not load NAME" },
};

export const NameUnavailable = {
  args: { error: "Name unavailable" },
};

export const Loading = {
  args: { isLoading: true },
};
