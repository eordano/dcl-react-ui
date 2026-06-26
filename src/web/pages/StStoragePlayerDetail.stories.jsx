import StStoragePlayerDetail, { DEFAULT_KEYS } from "./StStoragePlayerDetail.jsx";

export default {
  title: "Web/Pages/Storage/Player Detail",
  component: StStoragePlayerDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StStoragePlayerDetail keys={DEFAULT_KEYS} />,
};

export const Loading = {
  render: () => <StStoragePlayerDetail isLoading />,
};

export const Empty = {
  render: () => <StStoragePlayerDetail keys={[]} />,
};
