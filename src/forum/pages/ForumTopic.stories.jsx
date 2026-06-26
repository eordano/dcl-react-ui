import ForumTopic from "./ForumTopic.jsx";

export default {
  title: "Forum/Pages/Topic",
  component: ForumTopic,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <ForumTopic />,
};
