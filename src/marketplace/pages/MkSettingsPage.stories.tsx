import type { Meta, StoryObj } from "@storybook/react-vite";
import MkSettingsPage from "./MkSettingsPage";

const SAMPLE_ADDRESS = "0x9f3c5b1a4d2e8f7c0b6a9e3d1f7a4c8b2e0d5a21";

const SAMPLE_SELLING = [
  { id: "sell-mp-matic", contract: "Marketplace", token: "Wearables", network: "Polygon" },
  { id: "sell-mp-eth", contract: "Marketplace", token: "LAND", network: "Ethereum" },
];

const meta = {
  title: "Marketplace/Pages/Settings",
  component: MkSettingsPage,
  parameters: { layout: "fullscreen" },
  args: {
    address: SAMPLE_ADDRESS,
    selling: SAMPLE_SELLING,
  },
} satisfies Meta<typeof MkSettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Error: Story = {
  args: { hasError: true },
};

export const NoAuthorizations: Story = {
  args: { selling: [] },
};
