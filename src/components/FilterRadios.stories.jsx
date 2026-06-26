import { useState } from "react";
import FilterRadios from "./FilterRadios.jsx";

export default {
  title: "Components/FilterRadios",
  component: FilterRadios,
  parameters: { layout: "centered" },
};

const Panel = ({ children }) => (
  <div style={{ width: 240, background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "var(--r-panel)", padding: 16 }}>
    {children}
  </div>
);

const OPTIONS = [
  { id: "all", label: "All" },
  { id: "sale", label: "On Sale" },
  { id: "notforsale", label: "Not for sale" },
];

export const Default = {
  render: () => {
    const [value, setValue] = useState("all");
    return (
      <Panel>
        <FilterRadios name="story-status" value={value} onChange={setValue} options={OPTIONS} />
      </Panel>
    );
  },
};
