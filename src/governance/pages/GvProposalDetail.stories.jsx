import GvProposalDetail from "./GvProposalDetail.jsx";

export default {
  title: "Governance/Pages/Proposal Detail",
  component: GvProposalDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Finished = {
  args: {
    proposal: {
      id: "0x12-9f0c",
      type: "poll",
      toneClass: "orange",
      catLabel: "Poll",
      catTone: "orange",
      status: "passed",
      statusLabel: "Passed",
      statusTone: "green",
      title: "Should we lower the Grant proposal vote-power threshold to 1M VP?",
      author: "0x12…9f0c",
      authorHue: 30,
      published: "Apr 12, 2026 09:30",
      start: "Apr 14, 2026 00:00",
      finish: "Apr 28, 2026 00:00",
      snapshot: "#7af0d31",
      threshold: "1,000,000",
      thresholdReached: true,
      yourVp: "12,480",
      budget: { size: "—", beneficiary: "—", tier: "—" },
    },
  },
};

export const Loading = { args: { state: "loading" } };

export const NotFound = { args: { state: "error" } };
