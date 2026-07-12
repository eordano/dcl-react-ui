import type { Meta, StoryObj } from "@storybook/react-vite";
import GvProposalDetailSuccessOutcomeScreens from "./GvProposalDetailSuccessOutcomeScreens";

const meta = {
  title: "Governance/Components/Proposal-detail outcomes",
  component: GvProposalDetailSuccessOutcomeScreens,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof GvProposalDetailSuccessOutcomeScreens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "new" },
};

export const TenderPublished: Story = {
  args: { variant: "pending" },
};

export const BidSubmitted: Story = {
  args: { variant: "bid" },
};

export const UpdatePublished: Story = {
  args: { variant: "update" },
};

export const Loading: Story = {
  args: { variant: "new", loading: true },
};
