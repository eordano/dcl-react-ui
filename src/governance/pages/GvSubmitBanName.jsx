import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import SubmitProposalForm from "../components/SubmitProposalForm.jsx";
import { GOVERNANCE_FORMS } from "../../data/governanceForms.jsx";
import "./gvsubmitbanname.css";

const GATE_TITLE = GOVERNANCE_FORMS.banName.title;
const GATE_DESC = GOVERNANCE_FORMS.banName.description;

export default function GvSubmitBanName({
  account = "0x9f3c…7a21",
  loggedIn = true,
  submitError = "",
}) {
  const [tab, setTab] = useState("proposals");

  if (!loggedIn) {
    return (
      <GovernanceChrome active={tab} onTab={setTab} account={account}>
        <div className="gvsubmitbanname gvsubmitbanname--gate">
          <div className="gvsubmitbanname__login">
            <h1 className="gvsubmitbanname__h1">{GATE_TITLE}</h1>
            <p className="gvsubmitbanname__loginsub">{GATE_DESC}</p>
            <button type="button" className="gvsubmitbanname__connect">Connect your wallet</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab} account={account}>
      <SubmitProposalForm {...GOVERNANCE_FORMS.banName} error={submitError} />
    </GovernanceChrome>
  );
}
