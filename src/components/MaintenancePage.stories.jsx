import MaintenancePage from "./MaintenancePage.jsx";

export default {
  title: "Components/MaintenancePage",
  component: MaintenancePage,
  parameters: { layout: "fullscreen" },
};

const Frame = ({ children }) => <div style={{ minHeight: "100vh" }}>{children}</div>;

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
