import Toggle from "./Toggle.jsx";

export default {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
};

export const Default = {
  args: { defaultChecked: false },
};

export const On = {
  args: { defaultChecked: true },
};

export const Off = {
  args: { defaultChecked: false },
};

export const Controlled = {
  args: { checked: true, onChange: () => {} },
};
