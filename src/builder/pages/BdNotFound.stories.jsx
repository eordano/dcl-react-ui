import BdNotFound from "./BdNotFound.jsx";

export default {
  title: "Builder/Pages/Not Found",
  component: BdNotFound,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { loading: false },
};

export const Loading = {
  args: { loading: true },
};
