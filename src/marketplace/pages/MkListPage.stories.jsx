import MkListPage from "./MkListPage.jsx";

export default {
  title: "Marketplace/Pages/List",
  component: MkListPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const PrivateOwner = {
  args: {
    list: {
      id: "priv-001",
      name: "Secret Stash",
      description: "Items I'm keeping to myself for now.",
      isPrivate: true,
      itemsCount: 8,
      updatedAt: "5 hours ago",
      userAddress: "0x9f3c…7a21",
    },
  },
};

export const Wishlist = {
  args: {
    list: {
      id: "default",
      name: "Wishlist",
      description: "",
      isPrivate: false,
      itemsCount: 8,
      updatedAt: "just now",
      userAddress: "0x9f3c…7a21",
      isDefault: true,
    },
  },
};

export const PublicView = {
  args: {
    isPublicView: true,
    list: {
      id: "pub-77",
      name: "Best of Wearables 2024",
      description: "A community-favourite collection of standout pieces.",
      isPrivate: false,
      itemsCount: 8,
      updatedAt: "1 week ago",
      userAddress: "0x4b2a…9d10",
    },
  },
};

export const Empty = {
  args: {
    state: "empty",
    list: { ...{
      id: "empty-1",
      name: "New List",
      description: "Nothing saved here yet.",
      isPrivate: false,
      itemsCount: 0,
      updatedAt: "1 minute ago",
      userAddress: "0x9f3c…7a21",
    } },
  },
};

export const Loading = { args: { state: "loading" } };

export const Error = { args: { state: "error", errorType: "could_not_load" } };

export const NotFound = { args: { state: "error", errorType: "not_found" } };
