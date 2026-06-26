import Notifications from "./Notifications.jsx";

export default {
  title: "Explorer/Components/Notifications",
  component: Notifications,
  parameters: { layout: "fullscreen" },
};

// Full in-world notification center: HUD rail + notification panel.
export const Default = {
  render: () => <Notifications />,
};

// Just the notification panel, no HUD rail — render `bare`, opt out of scene backdrop.
export const Bare = {
  parameters: { layout: "centered", sceneBackdrop: false },
  render: () => <Notifications bare />,
};
