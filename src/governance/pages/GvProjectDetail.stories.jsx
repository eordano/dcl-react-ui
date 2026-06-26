import GvProjectDetail from "./GvProjectDetail.jsx";

export default {
  title: "Governance/Pages/Project Detail",
  component: GvProjectDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvProjectDetail />,
};

export const Finished = {
  render: () => (
    <GvProjectDetail
      project={{
        id: "9c1d…",
        proposal_id: "0xc1d2…proposal",
        title: "Decentraland SDK7 Migration Toolkit",
        status: "finished",
        ongoingDays: 0,
        about:
          "A toolkit and documentation suite to migrate legacy SDK6 scenes to SDK7. Delivered an automated converter, a compatibility linter, and three migration guides.",
        links: [
          { id: "l1", label: "Documentation", url: "https://docs.dcl" },
          { id: "l2", label: "Source Code", url: "https://github.com/example/sdk7-toolkit" },
        ],
        personnel: [
          { id: "p1", name: "Lena Cruz", address: "0x4a2b…99fe", role: "Lead Engineer", about: "Built the automated converter and the compatibility linter." },
        ],
        milestones: [
          { id: "m1", date: "2025-11-10", title: "Converter alpha", description: "First working pass of the SDK6→SDK7 converter." },
          { id: "m2", date: "2026-01-20", title: "Final release", description: "Stable converter, linter, and published guides." },
        ],
        funding: {
          enactedLabel: "8 months ago",
          endLabel: "1 month ago",
          total: "60,000",
          token: "USD",
          vestedAmount: "60,000",
          vestedPct: 100,
          releasedAmount: "60,000",
          releasedPct: 100,
          nextVested: { time: 0, unit: "days", amount: "0" },
        },
        vestings: [{ id: "v1", label: "Current vesting", url: "https://etherscan.io/address/0xv1" }],
      }}
    />
  ),
};

export const Loading = {
  render: () => <GvProjectDetail loading />,
};

export const NotFoundState = {
  render: () => <GvProjectDetail notFound />,
};
