import type { Meta, StoryObj } from "@storybook/react-vite";
import StDownloadSuccess from "./StDownloadSuccess";

const meta = {
  title: "Web/Pages/Download/Success",
  component: StDownloadSuccess,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StDownloadSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { os: "macos", loading: false },
};

export const Windows: Story = {
  args: { os: "windows", loading: false },
};

export const Downloading: Story = {
  args: { os: "macos", loading: true, progress: null },
};

export const DownloadingProgress: Story = {
  args: { os: "macos", loading: true, progress: 62 },
};
