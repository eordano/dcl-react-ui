import RewardPanel from "./RewardPanel.jsx";

export default {
  title: "Explorer/Components/RewardPanel",
  component: RewardPanel,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div style={{ minHeight: "100vh", background: "#0d0d12" }}>
      <RewardPanel />
    </div>
  ),
};
