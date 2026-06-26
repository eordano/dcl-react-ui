import MkAccountPage from "./MkAccountPage.jsx";

export default {
  title: "Marketplace/Pages/Account (My Assets)",
  component: MkAccountPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MkAccountPage />,
};

export const OnSale = {
  render: () => <MkAccountPage initialSection="on_sale" />,
};

export const Sales = {
  render: () => <MkAccountPage initialSection="sales" />,
};

export const Collections = {
  render: () => <MkAccountPage initialSection="collections" />,
};

export const Empty = {
  render: () => <MkAccountPage owned={[]} />,
};
