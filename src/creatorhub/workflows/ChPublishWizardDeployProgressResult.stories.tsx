import type { Meta, StoryObj } from "@storybook/react-vite";
import ChPublishWizardDeployProgressResult from "./ChPublishWizardDeployProgressResult";

const meta = {
  title: "CreatorHub/Workflows/Publish: Deploy",
  component: ChPublishWizardDeployProgressResult,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChPublishWizardDeployProgressResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ChPublishWizardDeployProgressResult state="idle" />,
};

export const MaxFileSizeExceeded: Story = {
  render: () => <ChPublishWizardDeployProgressResult state="exceeded" />,
};

export const Deploying: Story = {
  render: () => <ChPublishWizardDeployProgressResult state="deploying" />,
};

export const Finishing: Story = {
  render: () => <ChPublishWizardDeployProgressResult state="finishing" />,
};

export const Complete: Story = {
  render: () => (
    <ChPublishWizardDeployProgressResult
      state="complete"
      isWorld
      url="https://decentraland.org/jump/?realm=neon-market.dcl.eth"
      onJumpIn={() => {}}
      onCopy={() => {}}
      onKeepEditing={() => {}}
    />
  ),
};

export const Error: Story = {
  render: () => <ChPublishWizardDeployProgressResult state="error" />,
};
