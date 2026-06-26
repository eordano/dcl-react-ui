import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import SubmitProposalForm from "../components/SubmitProposalForm.jsx";
import { GOVERNANCE_FORMS } from "../../data/governanceForms.jsx";

export default function GvSubmitGovernanceProposal({
  submissionVpNotMet = false,
  initialError = "",
}) {
  const [tab, setTab] = useState("proposals");

  return (
    <GovernanceChrome active={tab} onTab={setTab}>
      <SubmitProposalForm
        {...GOVERNANCE_FORMS.governance}
        disabled={submissionVpNotMet}
        vpNotice={submissionVpNotMet ? GOVERNANCE_FORMS.governance.vpNotice : undefined}
        error={initialError}
        errorCollapsible
        errorLabel="There was an error while trying to create the proposal, please try again later."
      />
    </GovernanceChrome>
  );
}
