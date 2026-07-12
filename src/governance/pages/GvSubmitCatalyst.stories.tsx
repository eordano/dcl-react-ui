import type { Meta, StoryObj } from "@storybook/react-vite";
import GvSubmitCatalyst from "./GvSubmitCatalyst";

const meta = {
  title: "Governance/Pages/Submit Catalyst",
  component: GvSubmitCatalyst,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof GvSubmitCatalyst>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { catalystType: "add", state: "form" },
};

export const Remove: Story = {
  args: { catalystType: "remove", state: "form" },
};

export const LogInGate: Story = {
  args: { catalystType: "add", state: "login" },
};

export const SubmitError: Story = {
  args: { catalystType: "add", state: "form", showError: true },
};

export const NotFound: Story = {
  args: { state: "notfound" },
};
