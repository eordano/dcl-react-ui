import GvSubmitProjectUpdate from "./GvSubmitProjectUpdate.jsx";

export default {
  title: "Governance/Pages/Submit Project Update",
  component: GvSubmitProjectUpdate,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Filled = {
  args: {
    initialValues: {
      introduction:
        "This update covers our second development sprint, focused on the marketplace integration milestone.",
      highlights:
        "- Shipped the on-chain settlement flow\n- Closed 14 issues from the backlog\n- Onboarded two new contributors",
      blockers:
        "Waiting on the indexer migration before we can finalize the analytics dashboard. Mitigation: parallelizing the front-end work in the meantime.",
      next_steps:
        "Finalize the analytics dashboard, ship the public beta, and begin the security audit.",
      additional_notes: "Demo build available on our staging environment.",
    },
  },
};

export const SignedOut = {
  args: { signedIn: false },
};
