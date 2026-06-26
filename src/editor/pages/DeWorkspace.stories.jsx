import DeWorkspace from "./DeWorkspace.jsx";

export default {
  title: "Editor/Pages/Workspace",
  component: DeWorkspace,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <DeWorkspace /> };

export const WithAssets = { render: () => <DeWorkspace left="assets" /> };
