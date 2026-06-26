import MkListsPage from "./MkListsPage.jsx";

export default {
  title: "Marketplace/Pages/Lists",
  component: MkListsPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MkListsPage />,
};

export const Empty = {
  render: () => <MkListsPage lists={[]} />,
};

export const Error = {
  render: () => <MkListsPage error />,
};
