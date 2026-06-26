import StContentPolicy from "./StContentPolicy.jsx";

export default {
  title: "Web/Pages/Legal/Content Policy",
  component: StContentPolicy,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StContentPolicy />,
};

export const SidebarOnTerms = {
  render: () => <StContentPolicy activeSlug="/terms" />,
};
