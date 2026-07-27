import type { Meta, StoryObj } from "@storybook/react-vite";
import StWhatSOnCreateEditHangout from "./StWhatSOnCreateEditHangout";

const meta = {
  title: "Web/Pages/What's On/Create-Edit Hangout",
  component: StWhatSOnCreateEditHangout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StWhatSOnCreateEditHangout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StWhatSOnCreateEditHangout mode="create" state="form" />,
};

export const Edit: Story = {
  render: () => <StWhatSOnCreateEditHangout mode="edit" state="form" />,
};

export const Submitted: Story = {
  render: () => <StWhatSOnCreateEditHangout mode="create" state="success" />,
};

export const SignInGate: Story = {
  render: () => <StWhatSOnCreateEditHangout state="signin" />,
};
