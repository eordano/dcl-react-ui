import MkOnSaleOnRentAccountSections from "./MkOnSaleOnRentAccountSections.jsx";

export default {
  title: "Marketplace/Pages/On Sale / On Rent",
  component: MkOnSaleOnRentAccountSections,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { type: "sale" },
};

export const OnRent = {
  args: { type: "rent" },
};

export const Empty = {
  args: { type: "sale", isEmpty: true },
};

export const Loading = {
  args: { type: "sale", isLoading: true },
};
