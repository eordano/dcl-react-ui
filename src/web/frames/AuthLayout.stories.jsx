import AuthLayout from "./AuthLayout.jsx";

export default {
  title: "Web/Frames/AuthLayout",
  component: AuthLayout,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <AuthLayout>
      <h1>Sign in to Decentraland</h1>
      <p>Connect your wallet to enter the world.</p>
    </AuthLayout>
  ),
};

export const Centered = {
  render: () => (
    <AuthLayout centered>
      <h1>Loading your avatar…</h1>
    </AuthLayout>
  ),
};

export const WithSlots = {
  render: () => (
    <AuthLayout
      topLeft={<button>← Back</button>}
      bottomLeft={<span>editor version</span>}
      brandGlyph
    >
      <h1>Verify your account</h1>
    </AuthLayout>
  ),
};

export const Bare = {
  render: () => (
    <AuthLayout hideBrand hideFooter>
      <h1>Minimal shell</h1>
    </AuthLayout>
  ),
};
