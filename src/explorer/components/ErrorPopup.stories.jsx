import ErrorPopup from "./ErrorPopup.jsx";

export default {
  title: "Explorer/Components/ErrorPopup",
  component: ErrorPopup,
  parameters: { layout: "fullscreen" },
  tags: ["overlay"],
};

export const Default = {
  render: () => <ErrorPopup />,
};
