import MkNamesPage from "./MkNamesPage.jsx";

export default {
  title: "Marketplace/Pages/Names",
  component: MkNamesPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MkNamesPage />,
};

export const Empty = {
  render: () => <MkNamesPage items={[]} />,
};
