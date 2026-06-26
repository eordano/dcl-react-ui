import ForumCategories from "./ForumCategories.jsx";

export default {
  title: "Forum/Pages/Categories",
  component: ForumCategories,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ForumCategories />,
};
