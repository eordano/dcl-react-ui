import SearchField from "./SearchField.jsx";

export default {
  title: "Atoms/SearchField",
  component: SearchField,
  parameters: { layout: "centered" },
};

export const Default = {
  args: {
    placeholder: "Search",
    onChange: (v) => console.log("search:", v),
  },
};

export const WithValue = {
  args: {
    defaultValue: "Genesis Plaza",
    placeholder: "Search places",
    onChange: (v) => console.log("search:", v),
  },
};
