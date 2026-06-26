import DeInspectorPage from "./DeInspectorPanel.jsx";

export default {
  title: "Editor/Pages/Inspector",
  component: DeInspectorPage,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <DeInspectorPage /> };

export const AddComponent = { render: () => <DeInspectorPage addOpen /> };
