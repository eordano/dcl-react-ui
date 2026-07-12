import type { Meta, StoryObj } from "@storybook/react-vite";
import ExplorePanel from "./ExplorePanel";

const meta = {
  title: "Explorer/Pages/ExplorePanel",
  component: ExplorePanel,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ExplorePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ExplorePanel />,
};
