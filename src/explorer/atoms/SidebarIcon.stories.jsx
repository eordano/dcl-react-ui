import SidebarIcon from "./SidebarIcon.jsx";

export default {
  title: "Explorer/Atoms/SidebarIcon",
  component: SidebarIcon,
  parameters: { layout: "centered" },
};

const NAMES = ["favorite", "park", "balance", "gift", "shield", "key", "redeem", "explore"];

export const Default = { args: { name: "shield", size: 32 } };

export const AllGlyphs = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", color: "#fff" }}>
    {NAMES.map((n) => (
      <SidebarIcon key={n} name={n} size={28} />
    ))}
  </div>
);
