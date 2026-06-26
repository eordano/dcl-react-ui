import ChatReactions from "./ChatReactions.jsx";

export default {
  title: "Explorer/Components/ChatReactions",
  component: ChatReactions,
  parameters: { layout: "fullscreen" },
  argTypes: {
    title: { control: "text" },
    enabled: { control: "boolean", name: "reactions toggle on" },
    showMore: { control: "boolean", name: "show more button" },
    reactions: { control: "object" },
  },
  args: {
    title: "Chat Reactions",
    enabled: true,
    showMore: true,
    reactions: ["♥", "👏", "👍", "👎", "🤣", "🔥", "😢"],
  },
  decorators: [
    (Story) => (
      <div className="rx-story">
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
