import type { Meta, StoryObj } from "@storybook/react-vite";
import SmartWearables from "./SmartWearables";

const meta = {
  title: "Explorer/Components/SmartWearables",
  component: SmartWearables,
  parameters: { layout: "fullscreen", overlay: true },
  argTypes: {
    name: { control: "text" },
    capability: { control: "text" },
    recurring: { control: "boolean" },
  },
  args: {
    name: "Magic Sneakers",
    capability: "your account wallet (buy, transfer)",
    recurring: false,
  },
} satisfies Meta<typeof SmartWearables>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Recurring: Story = {
  args: { recurring: true },
};
