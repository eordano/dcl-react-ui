import PageHeader from "./PageHeader.jsx";

export default {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
    backgrounds: { default: "light", values: [{ name: "light", value: "#f3f2f5" }] },
  },
};

const Frame = (story) => (
  <div style={{ background: "#fff", padding: 24, maxWidth: 820, borderRadius: 12 }}>
    {story}
  </div>
);

const CancelBtn = (
  <button
    type="button"
    style={{
      border: "1px solid var(--gv-line, #dddce0)",
      background: "transparent",
      color: "var(--gv-ink, #16141a)",
      borderRadius: 999,
      height: 36,
      padding: "0 20px",
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    Cancel
  </button>
);

const ClearBtn = (
  <button
    type="button"
    style={{
      border: 0,
      background: "none",
      color: "var(--gv-muted, #736e7d)",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
    }}
  >
    Clear History
  </button>
);

export const Hero = {
  render: () => (
    <PageHeader
      size="hero"
      title="Submit Proposal"
      subtitle="Select a proposal category to get started"
    />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const WithLeadingAndActions = {
  render: () => (
    <PageHeader
      title="Request a Grant"
      leading={
        <span
          aria-hidden="true"
          style={{ width: 28, height: 28, borderRadius: 6, background: "var(--brand)", display: "inline-block" }}
        />
      }
      actions={CancelBtn}
    />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const Section = {
  render: () => (
    <PageHeader size="section" title="Latest Activity" actions={ClearBtn} />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const TitleAndSubtitle = {
  render: () => (
    <PageHeader title="My Lists" subtitle="12 Lists" />
  ),
  decorators: [(Story) => Frame(<Story />)],
};
