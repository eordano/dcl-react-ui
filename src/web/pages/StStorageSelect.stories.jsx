import StStorageSelect from "./StStorageSelect.jsx";

export default {
  title: "Web/Pages/Storage/Select",
  component: StStorageSelect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StStorageSelect />,
};

export const Loading = {
  render: () => <StStorageSelect loading />,
};

export const Empty = {
  render: () => <StStorageSelect worlds={[]} lands={[]} />,
};
