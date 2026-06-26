import SectionIcon from "./SectionIcon.jsx";

export default {
  title: "Explorer/Atoms/SectionIcon",
  component: SectionIcon,
  parameters: { layout: "centered" },
};

export const Default = { args: { n: 1 } };

export const Steps = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", color: "#fff" }}>
    <SectionIcon n={1} validated />
    <SectionIcon n={2} validated />
    <SectionIcon n={3} />
    <SectionIcon n={4} />
  </div>
);
