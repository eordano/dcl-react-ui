import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import SubmitProposalForm from "../components/SubmitProposalForm.jsx";
import { GOVERNANCE_FORMS } from "../../data/governanceForms.jsx";
import "./gvsubmitdraft.css";

const GATE_TITLE = GOVERNANCE_FORMS.draft.title;
const GATE_DESC = GOVERNANCE_FORMS.draft.description[0];

export default function GvSubmitDraft({
  account = "0x9f3c…7a21",
  vpMet = true,
  loggedIn = true,
  error = "",
}) {
  const [tab, setTab] = useState("proposals");

  if (!loggedIn) {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account={account}>
        <div className="gvsubmitdraft gvsubmitdraft--gate">
          <div className="gvsubmitdraft__login">
            <h1 className="gvsubmitdraft__h1">{GATE_TITLE}</h1>
            <p className="gvsubmitdraft__loginsub">{GATE_DESC}</p>
            <button type="button" className="gvsubmitdraft__connect">Connect your wallet</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab} account={account}>
      <SubmitProposalForm
        {...GOVERNANCE_FORMS.draft}
        disabled={!vpMet}
        vpNotice={!vpMet ? GOVERNANCE_FORMS.draft.vpNotice : undefined}
        error={error}
        errorLabel="There was an error submitting your proposal. Please try again later."
      />
    </GovernanceChrome>
  );
}
