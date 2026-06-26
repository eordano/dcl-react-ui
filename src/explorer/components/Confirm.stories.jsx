import Confirm from "./Confirm.jsx";

export default {
  title: "Explorer/Components/Confirm",
  component: Confirm,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <Confirm backdrop={false} />,
};
