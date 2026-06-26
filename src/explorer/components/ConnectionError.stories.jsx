import ConnectionError from "./ConnectionError.jsx";

export default {
  title: "Explorer/Components/ConnectionError",
  component: ConnectionError,
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
        background: "#1b1226",
      }}
    >
      <ConnectionError />
    </div>
  ),
};
