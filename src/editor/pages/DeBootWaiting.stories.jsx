import DeBootWaiting from "./DeBootWaiting.jsx";

export default {
  title: "Editor/Pages/Boot",
  component: DeBootWaiting,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <DeBootWaiting phase="engine" /> };

export const WaitingScene = { render: () => <DeBootWaiting phase="scene" /> };
