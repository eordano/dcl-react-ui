import StBlogPost from "./StBlogPost.jsx";

export default {
  title: "Web/Pages/Blog/Post",
  component: StBlogPost,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StBlogPost />,
};

export const Loading = {
  render: () => <StBlogPost state="loading" />,
};

export const Error = {
  render: () => <StBlogPost state="error" />,
};

export const NoRelated = {
  render: () => <StBlogPost related={[]} />,
};
