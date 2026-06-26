import { useState } from "react";
import FilterBox from "./FilterBox.jsx";

export default {
  title: "Components/FilterBox",
  component: FilterBox,
  parameters: { layout: "centered" },
};

const Shell = ({ children }) => (
  <div
    style={{
      width: 256,
      background: "var(--panel)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-panel)",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

function Demo({ size }) {
  const [open, setOpen] = useState({ category: true, rarity: true, price: false });
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  return (
    <Shell>
      <FilterBox title="Category" size={size} open={open.category} onToggle={() => toggle("category")}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Head", "Upper body", "Lower body", "Feet"].map((c) => (
            <span key={c} style={{ color: "var(--ink-7)", fontSize: 13, fontWeight: 600 }}>{c}</span>
          ))}
        </div>
      </FilterBox>
      <FilterBox title="Rarity" size={size} open={open.rarity} onToggle={() => toggle("rarity")}>
        <span style={{ color: "var(--ink-7)", fontSize: 13 }}>Common · Rare · Epic · Legendary</span>
      </FilterBox>
      <FilterBox title="Price" size={size} open={open.price} onToggle={() => toggle("price")}>
        <span style={{ color: "var(--ink-7)", fontSize: 13 }}>Min — Max</span>
      </FilterBox>
    </Shell>
  );
}

export const Caps = () => <Demo size="caps" />;

export const Title = () => <Demo size="title" />;
