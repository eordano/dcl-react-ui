import StCreate from "./StCreate.jsx";

export default {
  title: "Web/Pages/Create",
  component: StCreate,
  parameters: { layout: "fullscreen" },
};

// The real /create/about landing page, sections from built-in defaults.
export const Default = {
  render: () => <StCreate />,
};
