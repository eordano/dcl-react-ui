import TeleportPrompt from "./TeleportPrompt.jsx";

export default {
  title: "Explorer/Components/TeleportPrompt",
  component: TeleportPrompt,
  parameters: { layout: "fullscreen" },
  tags: ["overlay"],
};

export const Default = {
  render: () => <TeleportPrompt />,
};
