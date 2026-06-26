import Tabs from "./Tabs.jsx";

export default {
  title: "Explorer/Components/Tabs",
  component: Tabs,
  parameters: { layout: "fullscreen" },
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "items", label: "Items" },
  { id: "activity", label: "Activity" },
];

export const Default = {
  args: {
    tabs,
    active: "overview",
    variant: "pill",
  },
};

export const Underline = {
  args: {
    tabs,
    active: "items",
    variant: "underline",
  },
};

export const Uncontrolled = {
  args: {
    tabs,
    variant: "pill",
  },
};
