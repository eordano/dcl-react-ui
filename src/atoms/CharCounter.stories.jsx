import CharCounter from "./CharCounter.jsx";

export default {
  title: "Atoms/CharCounter",
  component: CharCounter,
  parameters: { layout: "centered" },
};

const Col = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 220, color: "#fff" }}>
    {children}
  </div>
);

export const Default = { args: { current: 12, max: 15, format: "slash" } };

export const Formats = () => (
  <Col>
    <CharCounter current={12} max={15} format="slash" />
    <CharCounter current={12} max={15} format="spaced" />
    <CharCounter current={12} max={15} format="words" />
  </Col>
);

export const OverLimit = () => (
  <Col>
    <CharCounter current={18} max={15} format="slash" />
    <CharCounter current={120} max={80} format="spaced" />
  </Col>
);
