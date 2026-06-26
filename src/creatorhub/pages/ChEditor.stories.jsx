import ChEditor from "./ChEditor.jsx";

export default {
  title: "CreatorHub/Pages/Editor",
  component: ChEditor,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { loading: false, title: "Genesis Plaza Demo" },
};

export const Loading = {
  args: { loading: true },
};
