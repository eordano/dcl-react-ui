import type { Meta, StoryObj } from "@storybook/react-vite";
import StProfilePhotosTab from "./StProfilePhotosTab";

const meta = {
  title: "Web/Pages/Profile/Photos Tab",
  component: StProfilePhotosTab,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StProfilePhotosTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isOwnProfile: false },
};

export const OwnProfile: Story = {
  args: { isOwnProfile: true },
};

export const EmptyOwner: Story = {
  args: { isOwnProfile: true, photos: [] },
};

export const EmptyMember: Story = {
  args: { isOwnProfile: false, photos: [] },
};
