import DeHierarchyPage from "./DeHierarchyPanel.jsx";

export default {
  title: "Editor/Components/Hierarchy",
  component: DeHierarchyPage,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <DeHierarchyPage /> };

export const Empty = { render: () => <DeHierarchyPage empty /> };

export const ContextMenu = {
  render: () => <DeHierarchyPage contextMenu={{ x: 130, y: 230, kids: 3 }} />,
};
