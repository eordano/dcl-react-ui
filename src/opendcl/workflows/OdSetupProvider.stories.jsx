import OdSetupProvider, { ApiKeyInputView, ConfiguredView } from "./OdSetupProvider.jsx";

export default {
  title: "OpenDCL/Workflows/Setup Provider",
  component: OdSetupProvider,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <OdSetupProvider /> };
export const ApiKeyInput = { render: () => <ApiKeyInputView /> };
export const Configured = { render: () => <ConfiguredView /> };
