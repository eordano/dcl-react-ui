import ManaPill from "./ManaPill.jsx";

export default {
  title: "Components/ManaPill",
  component: ManaPill,
  parameters: { layout: "centered" },
};

const Dark = ({ children }) => (
  <div style={{ background: "#000", padding: 20, display: "inline-flex" }}>{children}</div>
);

export const Default = { render: () => <Dark><ManaPill value="2,480.55" /></Dark> };
export const Zero = { render: () => <Dark><ManaPill value="0.00" /></Dark> };
