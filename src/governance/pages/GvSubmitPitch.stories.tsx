import type { Meta, StoryObj } from "@storybook/react-vite";
import GvSubmitPitch from "./GvSubmitPitch";

const meta = {
  title: "Governance/Pages/Submit Pitch",
  component: GvSubmitPitch,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof GvSubmitPitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    account: "0x9f3c…7a21",
  },
};

export const VpNotMet: Story = {
  args: {
    account: "0x9f3c…7a21",
    vpNotMet: true,
  },
};

export const Error: Story = {
  args: {
    account: "0x9f3c…7a21",
    error:
      "Error: proposal submission failed — the governance service returned 500 (Internal Server Error).",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const LoginGate: Story = {
  args: {
    account: "",
  },
};
