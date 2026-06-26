import GvSubmitDraft from "./GvSubmitDraft.jsx";

export default {
  title: "Governance/Pages/Submit Draft",
  component: GvSubmitDraft,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const VotingPowerNotMet = {
  args: { vpMet: false },
};

export const LoggedOut = {
  args: { loggedIn: false },
};

export const SubmitError = {
  args: { error: "linked_proposal_id must NOT have fewer than 36 characters" },
};
