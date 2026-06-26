import GvEditProjectUpdate from "./GvEditProjectUpdate.jsx";

export default {
  title: "Governance/Pages/Edit Project Update",
  component: GvEditProjectUpdate,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvEditProjectUpdate />,
};

export const Empty = {
  render: () => (
    <GvEditProjectUpdate
      update={{
        health: "onTrack",
        introduction: "",
        highlights: "",
        blockers: "",
        next_steps: "",
        additional_notes: "",
        financial_records: [],
      }}
    />
  ),
};
