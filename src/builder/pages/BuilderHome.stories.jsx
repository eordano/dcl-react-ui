import BuilderHome from "./BuilderHome.jsx";

export default {
  title: "Builder/Pages/Home",
  component: BuilderHome,
  parameters: { layout: "fullscreen" },
};

export const Overview = {
  render: () => <BuilderHome />,
};
