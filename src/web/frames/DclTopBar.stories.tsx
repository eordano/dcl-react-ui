import type { Meta, StoryObj } from "@storybook/react-vite";
import DclTopBar from "./DclTopBar";

const meta = {
  title: "Web/Frames/DclTopBar",
  component: DclTopBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DclTopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {
  render: () => <DclTopBar active="shop" signedIn={false} />,
};

export const SignedIn: Story = {
  render: () => <DclTopBar active="shop" signedIn mana="2,480.55" account="0x9f3c…7a21" />,
};

export const DaoVariant: Story = {
  render: () => <DclTopBar variant="dao" active="vote" />,
};

export const SitesVariant: Story = {
  render: () => <DclTopBar variant="sites" active="whatson" />,
};
