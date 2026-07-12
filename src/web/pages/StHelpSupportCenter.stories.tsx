import type { Meta, StoryObj } from "@storybook/react-vite";
import StHelpSupportCenter, { HelpTab, Status, SERVICES } from "./StHelpSupportCenter";

const meta = {
  title: "Web/Pages/Help & Support Center",
  component: StHelpSupportCenter,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StHelpSupportCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StHelpSupportCenter services={SERVICES} />,
};

export const SupportUpdates: Story = {
  render: () => <StHelpSupportCenter activeTab={HelpTab.SUPPORT_UPDATES} services={SERVICES} />,
};

export const StatusLoading: Story = {
  render: () => <StHelpSupportCenter statusLoading />,
};

export const StatusDegraded: Story = {
  render: () => (
    <StHelpSupportCenter
      services={SERVICES.map((s, i) => (i === 3 || i === 8 ? { ...s, status: Status.DOWN } : s))}
    />
  ),
};

export const StatusDown: Story = {
  render: () => <StHelpSupportCenter services={SERVICES.map((s) => ({ ...s, status: Status.DOWN }))} />,
};
