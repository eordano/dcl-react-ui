import ConnectionStatus from "./ConnectionStatus.jsx";

export default {
  title: "Explorer/Components/ConnectionStatus",
  component: ConnectionStatus,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
      }}
    >
      <ConnectionStatus />
    </div>
  ),
};
