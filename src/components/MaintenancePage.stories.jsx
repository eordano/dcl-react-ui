import MaintenancePage from "./MaintenancePage.jsx";

export default {
  title: "Components/MaintenancePage",
  component: MaintenancePage,
  parameters: { layout: "fullscreen" },
};

// Full-height wrapper only; MaintenancePage paints its own themed page bg (flips with the Theme control).
const Frame = ({ children }) => <div style={{ minHeight: "100vh" }}>{children}</div>;

// One footer for both themes — renders inside .maintenance, so its colors flip with the Theme control.
const Footer = (
  <footer
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "16px 32px",
      fontSize: 13,
      color: "var(--maintenance-muted)",
      borderTop: "1px solid var(--maintenance-card-border)",
    }}
  >
    <span>English</span>
    <span>© 2026 Decentraland</span>
  </footer>
);

// Theme-driven: toggle the Theme control (Dark/Light) for the dark and upstream-light looks. No surface prop.
export const Default = {
  render: () => (
    <Frame>
      <MaintenancePage footer={Footer} />
    </Frame>
  ),
};

export const Sign = {
  render: () => (
    <Frame>
      <MaintenancePage
        sign
        title="We're currently under maintenance, we'll be back soon!"
        description="Hang tight — the rest of Decentraland is still open below."
      />
    </Frame>
  ),
};

export const SignWithFooter = {
  render: () => (
    <Frame>
      <MaintenancePage
        sign
        title="We're currently under maintenance, we'll be back soon!"
        footer={Footer}
      />
    </Frame>
  ),
};

export const MessageOnly = {
  render: () => (
    <Frame>
      <MaintenancePage showAreas={false} />
    </Frame>
  ),
};

// Forced light surface (surface override) regardless of the Theme control — e.g. the always-light governance page.
export const GovernanceHeading = {
  render: () => (
    <Frame>
      <MaintenancePage
        surface="light"
        title="Site under maintenance"
        description="We will be back soon, sorry for the inconvenience..."
      />
    </Frame>
  ),
};
