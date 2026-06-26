import DeToolbarPage from "./DeToolbar.jsx";

export default {
  title: "Editor/Frames/Toolbar",
  component: DeToolbarPage,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <DeToolbarPage /> };

export const MenuOpen = { render: () => <DeToolbarPage menuOpen /> };

export const Playing = { render: () => <DeToolbarPage playing /> };
