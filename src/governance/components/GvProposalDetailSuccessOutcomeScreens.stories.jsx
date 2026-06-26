import GvProposalDetailSuccessOutcomeScreens from "./GvProposalDetailSuccessOutcomeScreens.jsx";

export default {
  title: "Governance/Components/Proposal-detail outcomes",
  component: GvProposalDetailSuccessOutcomeScreens,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { variant: "new" },
};

export const TenderPublished = {
  args: { variant: "pending" },
};

export const BidSubmitted = {
  args: { variant: "bid" },
};

export const UpdatePublished = {
  args: { variant: "update" },
};

export const Loading = {
  args: { variant: "new", loading: true },
};
