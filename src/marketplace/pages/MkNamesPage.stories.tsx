import type { Meta, StoryObj } from "@storybook/react-vite";
import MkNamesPage from "./MkNamesPage";

const CREDITS_NOTE =
  "Credits can't be used for NAMEs yet — Credits checkout only supports collection items.";

const meta = {
  title: "Marketplace/Pages/Names",
  component: MkNamesPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MkNamesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  render: () => <MkNamesPage />,
};

export const Checking: Story = {
  render: () => <MkNamesPage value="aurora" status={{ kind: "checking" }} />,
};

export const Invalid: Story = {
  render: () => (
    <MkNamesPage
      value="au rora"
      status={{ kind: "invalid", message: "NAMEs can't contain spaces." }}
    />
  ),
};

export const Claimable: Story = {
  render: () => (
    <MkNamesPage
      value="aurora"
      status={{ kind: "claimable", priceMana: "100" }}
      creditsNote={CREDITS_NOTE}
    />
  ),
};

export const Listed: Story = {
  render: () => (
    <MkNamesPage
      value="automotive"
      status={{ kind: "listed", name: "Automotive", priceMana: "5,000,000" }}
      creditsNote={CREDITS_NOTE}
    />
  ),
};

export const Taken: Story = {
  render: () => (
    <MkNamesPage value="wotc" status={{ kind: "taken", name: "WOTC" }} />
  ),
};

export const CheckError: Story = {
  render: () => (
    <MkNamesPage
      value="aurora"
      status={{
        kind: "error",
        message: "Couldn't check availability right now. Please try again.",
      }}
    />
  ),
};
