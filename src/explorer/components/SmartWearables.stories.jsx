import SmartWearables from "./SmartWearables.jsx";

export default {
  title: "Explorer/Components/SmartWearables",
  component: SmartWearables,
  parameters: { layout: "fullscreen", overlay: true },
  argTypes: {
    name: { control: "text" },
    capability: { control: "text" },
    recurring: { control: "boolean" },
  },
  args: {
    name: "Magic Sneakers",
    capability: "your account wallet (buy, transfer)",
    recurring: false,
  },
};

// First request: a simple yes/no.
export const Default = {};

// Seen before: a heavier dialog with persistent-decision options.
export const Recurring = {
  args: { recurring: true },
};
