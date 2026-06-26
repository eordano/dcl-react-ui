import Dropdown from "./Dropdown.jsx";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: { layout: "fullscreen" },
};

const Frame = (story) => (
  <div style={{ minHeight: "100vh", background: "#0e0e10", padding: 48 }}>
    {story}
  </div>
);

export const Default = {
  render: () => (
    <Dropdown options={["Newest", "Oldest", "Price: Low to High", "Price: High to Low"]} />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const WithDefaultValue = {
  render: () => (
    <Dropdown
      options={["All", "Wearables", "Emotes", "Names", "Land"]}
      defaultValue="Emotes"
    />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const Controlled = {
  render: () => (
    <Dropdown
      options={["Day", "Week", "Month", "All time"]}
      value="Week"
      onChange={() => {}}
    />
  ),
  decorators: [(Story) => Frame(<Story />)],
};
