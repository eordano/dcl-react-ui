import ManaMark from "./ManaMark.jsx";

export default {
  title: "Atoms/ManaMark",
  component: ManaMark,
  parameters: { layout: "centered" },
};

export const Default = {
  args: { size: 16 },
};

export const Inline = {
  args: { size: 13 },
};

export const Large = {
  args: { size: 64 },
};

export const Tinted = {
  args: { size: 40 },
  render: (args) => (
    <span style={{ color: "var(--brand)", display: "inline-flex", gap: 12 }}>
      <ManaMark {...args} />
      <span style={{ color: "var(--gold)", display: "inline-flex" }}>
        <ManaMark {...args} />
      </span>
    </span>
  ),
};
