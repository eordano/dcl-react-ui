import SubmitProposalForm from "./SubmitProposalForm.jsx";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import { GOVERNANCE_FORMS } from "../../data/governanceForms.jsx";

export default {
  title: "Governance/Components/SubmitProposalForm",
  component: SubmitProposalForm,
  parameters: { layout: "fullscreen" },
};

const wrap = (node) => <GovernanceChrome active="proposals">{node}</GovernanceChrome>;
const story = (key, extra) => ({
  render: () => wrap(<SubmitProposalForm {...GOVERNANCE_FORMS[key]} {...extra} />),
});

export const Poll = story("poll");
export const BanName = story("banName", { error: "Name is already banned" });

export const Draft = story("draft");
export const Governance = story("governance");

export const Pitch = story("pitch");
export const Tender = story("tender");
export const CouncilDecisionVeto = story("councilDecisionVeto");

export const CatalystAdd = story("catalystAdd");
export const CatalystRemove = story("catalystRemove");
export const PoiAdd = story("poiAdd");
export const PoiRemove = story("poiRemove");
export const HiringAdd = story("hiringAdd");
export const HiringRemove = story("hiringRemove");

export const LinkedWearables = story("linkedWearables");

export const Grant = story("grant");
export const Bid = story("bid");
export const ProjectUpdate = story("projectUpdate");

export const DisabledVpNotMet = {
  render: () =>
    wrap(
      <SubmitProposalForm
        {...GOVERNANCE_FORMS.poll}
        disabled
        vpNotice="You don't meet the Voting Power requirement to submit this poll. You need at least 100 VP."
      />
    ),
};

export const ErrorCollapsible = {
  render: () =>
    wrap(
      <SubmitProposalForm
        {...GOVERNANCE_FORMS.governance}
        error="500 — createProposal failed: gateway timeout. Please try again later."
      />
    ),
};
