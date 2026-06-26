import NftPrompt from "./NftPrompt.jsx";

export default {
  title: "Explorer/Components/NftPrompt",
  component: NftPrompt,
  tags: ["overlay"],
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <NftPrompt />,
};
