import GovernanceChrome from "./GovernanceChrome.jsx";

export default {
  title: "Governance/Frames/GovernanceChrome",
  component: GovernanceChrome,
  parameters: { layout: "fullscreen" },
};

const Body = () => (
  <div style={{ padding: 40, color: "#736e7d", fontSize: 14 }}>
    Page body renders here.
  </div>
);

export const Default = {
  render: () => (
    <GovernanceChrome active="proposals">
      <Body />
    </GovernanceChrome>
  ),
};

export const SignedIn = {
  render: () => (
    <GovernanceChrome active="proposals" signedIn>
      <Body />
    </GovernanceChrome>
  ),
};
