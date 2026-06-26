import Button from "./Button.jsx";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
};

const Row = ({ children }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);

export const Default = () => <Button>Primary</Button>;

export const Variants = () => (
  <Row>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
  </Row>
);

export const Sizes = () => (
  <Row>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </Row>
);

export const Disabled = () => (
  <Row>
    <Button disabled>Primary</Button>
    <Button variant="secondary" disabled>Secondary</Button>
    <Button variant="ghost" disabled>Ghost</Button>
  </Row>
);
