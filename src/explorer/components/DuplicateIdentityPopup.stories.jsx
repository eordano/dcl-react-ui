import DuplicateIdentityPopup from "./DuplicateIdentityPopup.jsx";

export default {
  title: "Explorer/Components/DuplicateIdentityPopup",
  component: DuplicateIdentityPopup,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => (
    <div style={{ minHeight: "100vh", background: "#0d0d12" }}>
      <DuplicateIdentityPopup />
    </div>
  ),
};
