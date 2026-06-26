import SkyboxHUD from "./SkyboxHUD.jsx";

export default {
  title: "Explorer/Components/SkyboxHUD",
  component: SkyboxHUD,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div style={{ minHeight: "100vh", background: "#1a1a1f" }}>
      <SkyboxHUD />
    </div>
  ),
};
