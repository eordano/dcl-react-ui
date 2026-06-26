import PriceRange from "./PriceRange.jsx";

export default {
  title: "Marketplace/Components/PriceRange",
  component: PriceRange,
  parameters: { layout: "centered" },
};

const Panel = ({ children }) => (
  <div style={{ width: 240, background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "var(--r-panel)", padding: 16 }}>
    {children}
  </div>
);

export const Default = { render: () => <Panel><PriceRange /></Panel> };
