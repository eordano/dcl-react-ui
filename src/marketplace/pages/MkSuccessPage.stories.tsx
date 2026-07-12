import type { Meta, StoryObj } from "@storybook/react-vite";
import MkSuccessPage from "./MkSuccessPage";

const meta = {
  title: "Marketplace/Pages/Success",
  component: MkSuccessPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MkSuccessPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: "success",
    asset: { category: "ens", name: "myname", rarity: "rare" },
  },
};

export const SuccessWearable: Story = {
  args: {
    state: "success",
    asset: { category: "wearable", name: "Cyber Jacket", rarity: "epic" },
  },
};

export const SuccessLand: Story = {
  args: {
    state: "success",
    asset: { category: "parcel", name: "-45,12", rarity: "legendary" },
  },
};

export const Loading: Story = {
  args: {
    state: "loading",
    asset: { category: "ens", name: "myname", rarity: "rare" },
  },
};

export const Error: Story = {
  args: {
    state: "error",
  },
};
