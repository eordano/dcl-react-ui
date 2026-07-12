import type { Meta, StoryObj } from "@storybook/react-vite";
import EmoteWheel from "./EmoteWheel";

const meta = {
  title: "Explorer/Components/EmoteWheel",
  component: EmoteWheel,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof EmoteWheel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EmoteWheel />,
};
