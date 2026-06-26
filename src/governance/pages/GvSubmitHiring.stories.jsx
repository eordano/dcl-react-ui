import GvSubmitHiring, {
  GvSubmitHiringLoading,
  GvSubmitHiringLogIn,
  GvSubmitHiringNotFound,
} from "./GvSubmitHiring.jsx";

export default {
  title: "Governance/Pages/Submit Hiring",
  component: GvSubmitHiring,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { request: "add" },
};

export const Remove = {
  args: { request: "remove" },
};

export const Loading = {
  render: () => <GvSubmitHiringLoading request="add" />,
};

export const LogIn = {
  render: () => <GvSubmitHiringLogIn request="add" />,
};

export const NotFound = {
  render: () => <GvSubmitHiringNotFound />,
};
