import GvSubmitCouncilDecisionVeto from "./GvSubmitCouncilDecisionVeto.jsx";

export default {
  title: "Governance/Pages/Submit Council Decision Veto",
  component: GvSubmitCouncilDecisionVeto,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <GvSubmitCouncilDecisionVeto
      votingPower={4200}
      coAuthors={["0x7c…a4e1"]}
      initialReasons={
        "The Council's decision to defer the Q2 grants disbursement was made without an open " +
        "discussion period, contradicting the precedent set by prior treasury actions."
      }
    />
  ),
};

export const InsufficientVotingPower = {
  render: () => <GvSubmitCouncilDecisionVeto votingPower={820} />,
};

export const LoggedOut = {
  render: () => <GvSubmitCouncilDecisionVeto loggedIn={false} />,
};

export const SubmitError = {
  render: () => (
    <GvSubmitCouncilDecisionVeto
      votingPower={4200}
      initialDecisionUrl="https://snapshot.org/#/dao-council.eth/proposal/0x91ab…"
      initialReasons={"This decision should be reconsidered for the reasons outlined above."}
      serverError="Error: proposal submission failed (snapshot id not found in Council space)"
    />
  ),
};
