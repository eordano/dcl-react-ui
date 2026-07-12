import type { ComponentProps, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import SubmitProposalForm from "./SubmitProposalForm";
import GovernanceChrome from "../frames/GovernanceChrome";
import { GOVERNANCE_FORMS } from "../../data/governanceForms";

const meta = {
  title: "Governance/Components/SubmitProposalForm",
  component: SubmitProposalForm,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SubmitProposalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

type SubmitProposalFormProps = ComponentProps<typeof SubmitProposalForm>;

const wrap = (node: ReactNode) => <GovernanceChrome active="proposals">{node}</GovernanceChrome>;
const story = (
  key: keyof typeof GOVERNANCE_FORMS,
  extra?: Partial<SubmitProposalFormProps>,
): Story => ({
  render: () => wrap(<SubmitProposalForm {...(GOVERNANCE_FORMS[key] as SubmitProposalFormProps)} {...extra} />),
});

export const Poll: Story = story("poll");
export const BanName: Story = story("banName", { error: "Name is already banned" });

export const Draft: Story = story("draft");
export const Governance: Story = story("governance");

export const Pitch: Story = story("pitch");
export const Tender: Story = story("tender");
export const CouncilDecisionVeto: Story = story("councilDecisionVeto");

export const CatalystAdd: Story = story("catalystAdd");
export const CatalystRemove: Story = story("catalystRemove");
export const PoiAdd: Story = story("poiAdd");
export const PoiRemove: Story = story("poiRemove");
export const HiringAdd: Story = story("hiringAdd");
export const HiringRemove: Story = story("hiringRemove");

export const LinkedWearables: Story = story("linkedWearables");

export const Grant: Story = story("grant");
export const Bid: Story = story("bid");
export const ProjectUpdate: Story = story("projectUpdate");

export const DisabledVpNotMet: Story = {
  render: () =>
    wrap(
      <SubmitProposalForm
        {...(GOVERNANCE_FORMS.poll as SubmitProposalFormProps)}
        disabled
        vpNotice="You don't meet the Voting Power requirement to submit this poll. You need at least 100 VP."
      />
    ),
};

export const ErrorCollapsible: Story = {
  render: () =>
    wrap(
      <SubmitProposalForm
        {...(GOVERNANCE_FORMS.governance as SubmitProposalFormProps)}
        error="500 — createProposal failed: gateway timeout. Please try again later."
      />
    ),
};
