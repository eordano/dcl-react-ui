import Spinner from "./Spinner.jsx";

export default {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
};

export const Default = {
  args: { size: 28 },
};

export const Large = {
  args: { size: 64 },
};

export const Small = {
  args: { size: 16 },
};

export const GoldGallery = {
  args: { size: 40, color: "#ffb13d" },
};
