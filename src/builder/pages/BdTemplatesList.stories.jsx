import BdTemplatesList from "./BdTemplatesList.jsx";

export default {
  title: "Builder/Pages/Templates List",
  component: BdTemplatesList,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <BdTemplatesList />,
};

export const Loading = {
  render: () => <BdTemplatesList loading />,
};
