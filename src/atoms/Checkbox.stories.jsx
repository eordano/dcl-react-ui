import Checkbox from "./Checkbox.jsx";

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
};

export const Default = {
  args: {
    children: "Accept terms",
  },
};

export const Checked = {
  args: {
    children: "Subscribe to updates",
    defaultChecked: true,
  },
};

export const Unchecked = {
  args: {
    children: "Remember me",
    defaultChecked: false,
  },
};

export const ControlledOn = {
  args: {
    children: "Controlled (always on)",
    checked: true,
  },
};
