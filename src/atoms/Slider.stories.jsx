import Slider from "./Slider.jsx";

export default {
  title: "Atoms/Slider",
  component: Slider,
  parameters: { layout: "centered" },
};

export const Default = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    ariaLabel: "Volume",
  },
};

export const Stepped = {
  args: {
    defaultValue: 6,
    min: 0,
    max: 10,
    step: 2,
    ariaLabel: "Quality",
  },
};

export const Percentage = {
  args: {
    defaultValue: 75,
    min: 0,
    max: 100,
    step: 5,
    ariaLabel: "Opacity",
    format: (v) => `${Math.round(v)}%`,
  },
};
