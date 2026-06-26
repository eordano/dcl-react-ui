import AccountChip from "./AccountChip.jsx";

export default {
  title: "Components/AccountChip",
  component: AccountChip,
  parameters: { layout: "centered" },
};

// Dark-only surface: this chip lives in the always-dark account/marketplace top nav,
// so there's no light story — the Theme control doesn't flip it.
const Dark = ({ children }) => (
  <div style={{ background: "#000", padding: 20, display: "inline-flex" }}>{children}</div>
);

export const Default = { render: () => <Dark><AccountChip account="0x9f3c…7a21" /></Dark> };
