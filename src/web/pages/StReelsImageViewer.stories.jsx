import StReelsImageViewer from "./StReelsImageViewer.jsx";

export default {
  title: "Web/Pages/Reels/Image Viewer",
  component: StReelsImageViewer,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const MetadataHidden = {
  args: { metadataVisible: false },
};

export const Loading = {
  args: { loading: true },
};

export const NotFound = {
  args: { notFound: true },
};
