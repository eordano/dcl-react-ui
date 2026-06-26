import BdItemEditor from "./BdItemEditor.jsx";

export default {
  title: "Builder/Pages/Item Editor",
  component: BdItemEditor,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <BdItemEditor />,
};

export const Reviewing = {
  render: () => <BdItemEditor mode="reviewing" />,
};
