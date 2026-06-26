import StBlogHome from "./StBlogHome.jsx";

export default {
  title: "Web/Pages/Blog/Home",
  component: StBlogHome,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StBlogHome />,
};

export const Loading = {
  render: () => <StBlogHome posts={[]} loading />,
};

export const Empty = {
  render: () => <StBlogHome posts={[]} />,
};

export const Error = {
  render: () => <StBlogHome error />,
};
