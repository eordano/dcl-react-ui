import UpdateRequired from "./UpdateRequired.jsx";

export default {
  title: "Explorer/Components/UpdateRequired",
  component: UpdateRequired,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    current: "v0.146.0-alpha-main",
    latest: "0.151.0-alpha",
  },
};

export const MajorVersionGap = {
  args: {
    current: "v0.120.0-alpha-main",
    latest: "0.151.0-alpha",
  },
};
