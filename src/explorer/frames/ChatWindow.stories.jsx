import ChatWindow from "./ChatWindow.jsx";

export default {
  title: "Explorer/Frames/ChatWindow",
  component: ChatWindow,
  parameters: {
    layout: "centered",
    sceneBackdrop: false,
    docs: {
      description: {
        component:
          "**ChatWindow is a static visual concept — NOT the live chat.** It is a " +
          "newer, windowed redesign of Nearby chat (rounded titlebar with avatar + " +
          "status dot, a Genesis-Plaza location/minimap card, and message bubbles) " +
          "rendered over a daytime sky. It is purely presentational: the input is " +
          "uncontrolled and there is no `sendBridge` call, and nothing mounts it in " +
          "`overlay/Overlay.jsx` (it is only reachable as the standalone `chatwindow` " +
          "route). For the functional, overlay-wired chat see **Chat**, which is the " +
          "canonical implementation. Treat ChatWindow as a design exploration until " +
          "its layout is adopted by (or merged into) Chat.",
      },
    },
  },
};

export const Default = {
  render: () => <ChatWindow bare />,
};
