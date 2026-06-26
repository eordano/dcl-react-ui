import ChEditorPreviewPublishMenuDropdowns from "./ChEditorPreviewPublishMenuDropdowns.jsx";

export default {
  title: "CreatorHub/Components/Editor: Preview & Publish menus",
  component: ChEditorPreviewPublishMenuDropdowns,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { open: "both", title: "Genesis Plaza Demo" },
};

export const PreviewOptionsMenu = {
  args: { open: "preview", title: "Genesis Plaza Demo" },
};

export const PublishOptionsMenu = {
  args: { open: "publish", title: "Genesis Plaza Demo" },
};

export const PublishToLand = {
  args: {
    open: "publish",
    title: "Parcel 8,12",
    publishOptions: [
      { id: "publish-scene", label: "Publish Scene" },
      { id: "deploy-land", label: "Republish to 8,12" },
    ],
  },
};
