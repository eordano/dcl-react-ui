import Chat from "./Chat.jsx";

export default {
  title: "Explorer/Frames/Chat",
  component: Chat,
  // Render `bare` (no HUD scene) and opt out of the scene backdrop decorator (sceneBackdrop: false).
  parameters: {
    layout: "centered",
    sceneBackdrop: false,
    docs: {
      description: {
        component:
          "**Chat is the canonical, live in-world chat.** This is the FUNCTIONAL " +
          "Nearby-chat island actually wired into the HUD: it has a controlled " +
          "input and submits via `sendBridge(\"SendChat\", …)`, and it is the chat " +
          "that `overlay/Overlay.jsx` mounts at runtime. The full version renders " +
          "the left tool rail + minimap card around the log; the `bare` story shows " +
          "only the message panel. The log auto-scrolls to the newest message on " +
          "mount. Compare with **ChatWindow**, which is a static visual concept and " +
          "is NOT wired into the overlay — prefer Chat for any real integration.",
      },
    },
  },
};

export const Default = {
  render: () => <Chat bare />,
};
