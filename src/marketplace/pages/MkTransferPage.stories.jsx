import MkTransferPage from "./MkTransferPage.jsx";

export default {
  title: "Marketplace/Pages/Transfer",
  component: MkTransferPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Emote = {
  args: {
    nft: {
      contractAddress: "0x6a3b…f1c2",
      tokenId: "88",
      name: "Crab Rave",
      category: "emote",
      rarity: "epic",
      network: "polygon",
    },
  },
};

export const OnSale = {
  name: "Error - On sale",
  args: { status: "for_sale" },
};

export const InvalidOwner = {
  name: "Error - Not the owner",
  args: { status: "invalid_owner" },
};

export const Transferring = {
  name: "Transaction pending",
  args: { status: "transferring" },
};

export const Success = {
  name: "Transaction success",
  args: { status: "success" },
};
