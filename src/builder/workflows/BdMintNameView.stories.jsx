import BdMintNameView from "./BdMintNameView.jsx";

const ens = {
  name: "myWorld",
  subdomain: "myworld.dcl.eth",
  tokenId: "0",
  nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  ensAddressRecord: "",
  landId: "",
  hue: 200,
};

export default {
  title: "Builder/Workflows/Mint NAME",
  component: BdMintNameView,
  parameters: { layout: "fullscreen" },
  args: {
    activeName: "myWorld",
    ens,
    draft: "myWorld",
    draftValid: true,
    names: [ens],
    alias: ens.subdomain,
    priceMana: 100,
    maxNameSize: 15,
  },
};

export const Searching = { args: { value: "searching", step: "search" } };
export const Checking = { args: { value: "checking", step: "check" } };
export const Preview = { args: { value: "preview", step: "preview" } };
export const Approving = { args: { value: "approving", step: "approve" } };
export const Minting = { args: { value: "minting", step: "mint" } };
export const Error = {
  args: { value: "error", step: "error", error: "insufficient MANA" },
};
export const Blocked = {
  args: { value: "blocked", step: "blocked", reason: "myWorld.dcl.eth is taken." },
};
export const Done = {
  args: { value: "done", step: "done", resultTxHash: "0xabcdef1234567890" },
};
