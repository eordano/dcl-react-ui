import StStorageEnvironment from "./StStorageEnvironment.jsx";

export default {
  title: "Web/Pages/Storage/Environment",
  component: StStorageEnvironment,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StStorageEnvironment />,
};

// Empty list — KeyTable falls through to the centered Paper
export const Empty = {
  render: () => <StStorageEnvironment envKeys={[]} />,
};

export const Loading = {
  render: () => <StStorageEnvironment isLoading />,
};

export const RealmOnly = {
  render: () => (
    <StStorageEnvironment scope={{ realm: "buenosaires.dcl.eth", position: null }} />
  ),
};
