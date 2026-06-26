import VoiceChat from "./VoiceChat.jsx";

export default {
  title: "Explorer/Components/VoiceChat",
  component: VoiceChat,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <VoiceChat bare />,
};
