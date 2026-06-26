import StCastNotFound from "./StCastNotFound.jsx";

export default {
  title: "Web/Pages/Cast/Not Found",
  component: StCastNotFound,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StCastNotFound />,
};

export const ShortCopy = {
  render: () => (
    <StCastNotFound
      title="404 - Page Not Found"
      description="This Cast 2.0 stream doesn't exist."
    />
  ),
};
