import ChTemplates from "./ChTemplates.jsx";

export default {
  title: "CreatorHub/Pages/Templates",
  component: ChTemplates,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const FilteredByDifficulty = {
  args: { difficulty: "Hard" },
};

export const SortedByNewest = {
  args: { sortBy: "Newest" },
};

export const EmptyFilter = {
  args: { templates: [], difficulty: "Hard" },
};

export const CreateProjectModal = {
  args: { modalOpen: true },
};
