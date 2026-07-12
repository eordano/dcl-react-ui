import type { Meta, StoryObj } from "@storybook/react-vite";
import Chat from "./Chat";

const meta = {
  title: "Explorer/Frames/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
    sceneBackdrop: false,
    docs: {
      description: {
        component:
          "**Chat is the canonical, live in-world chat.** This is the FUNCTIONAL " +
          "Nearby-chat island actually wired into the HUD: it has a controlled " +
          "input and submits via `sendBridge(\"SendChat\", …)`, and it is the chat " +
          "that `app/AppLayout.tsx` mounts at runtime. The full version renders " +
          "the left tool rail + minimap card around the log; the `bare` story shows " +
          "only the message panel. The log auto-scrolls to the newest message on " +
          "mount. Compare with **ChatWindow**, which is a static visual concept and " +
          "is NOT wired into the overlay — prefer Chat for any real integration.",
      },
    },
  },
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Chat bare />,
};
