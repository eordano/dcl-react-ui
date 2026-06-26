import GvProjectsList from "./GvProjectsList.jsx";

export default {
  title: "Governance/Pages/Projects List",
  component: GvProjectsList,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Empty = {
  args: { projects: [] },
};
