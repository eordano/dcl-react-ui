import MkStoreSettingsEditor from "./MkStoreSettingsEditor.jsx";

export default {
  title: "Marketplace/Pages/Store Settings editor",
  component: MkStoreSettingsEditor,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: {
    store: {
      owner: "0x9f3c…7a21",
      cover: "",
      coverName: "",
      description: "",
      website: "",
      facebook: "",
      twitter: "",
      discord: "",
    },
  },
};

export const Loading = {
  args: { isLoading: true },
};

export const Saving = {
  args: { isSaving: true },
};

export const Error = {
  args: { error: "Could not save your store. Please try again." },
};
