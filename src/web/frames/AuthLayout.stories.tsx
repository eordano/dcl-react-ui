import type { Meta, StoryObj } from "@storybook/react-vite";
import AuthLayout from "./AuthLayout";

const meta = {
  title: "Web/Frames/AuthLayout",
  component: AuthLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AuthLayout>
      <h1>Sign in to Decentraland</h1>
      <p>Sign in to enter the world.</p>
    </AuthLayout>
  ),
};

export const Centered: Story = {
  render: () => (
    <AuthLayout centered>
      <h1>Loading your avatar…</h1>
    </AuthLayout>
  ),
};

export const WithSlots: Story = {
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

export const Bare: Story = {
  render: () => (
    <AuthLayout hideBrand hideFooter>
      <h1>Minimal shell</h1>
    </AuthLayout>
  ),
};
