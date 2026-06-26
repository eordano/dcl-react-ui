import StCastStreamer from "./StCastStreamer.jsx";

export default {
  title: "Web/Pages/Cast/Streamer",
  component: StCastStreamer,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StCastStreamer state="live" displayName="ruby.dcl.eth" />,
};

export const Onboarding = {
  render: () => <StCastStreamer state="onboarding" toasts={[]} />,
};

export const Joining = {
  render: () => <StCastStreamer state="joining" toasts={[]} />,
};

export const ConnectionError = {
  render: () => <StCastStreamer state="error" toasts={[]} />,
};

export const LiveClean = {
  render: () => <StCastStreamer state="live" displayName="ruby.dcl.eth" toasts={[]} />,
};
