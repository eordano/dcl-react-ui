import BdInspector from "./BdInspector.jsx";

export default {
  title: "Builder/Pages/Inspector",
  component: BdInspector,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <BdInspector state="ready" />,
};

export const Loading = {
  render: () => <BdInspector state="loading" />,
};

export const SignInRequired = {
  render: () => <BdInspector state="signin" />,
};
