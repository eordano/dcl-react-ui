import BackPill from "./BackPill.jsx";

export default {
  title: "Explorer/Components/BackPill",
  component: BackPill,
  parameters: {
    layout: "centered",
    backgrounds: { default: "purple", values: [{ name: "purple", value: "#380a5c" }] },
  },
};

export const Default = () => <BackPill />;

export const CustomLabel = () => <BackPill label="GO BACK" />;
