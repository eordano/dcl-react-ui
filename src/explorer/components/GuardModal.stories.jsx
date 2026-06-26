import GuardModal, { DclMark } from "./GuardModal.jsx";

export default {
  title: "Explorer/Components/GuardModal",
  component: GuardModal,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    icon: <DclMark size={64} />,
    title: "Update required",
    body: "A new version of the explorer is available. Please refresh to continue.",
    actions: <button className="btn btn--primary">Refresh</button>,
  },
};

export const ConnectionError = {
  args: {
    icon: <DclMark size={64} />,
    title: "Connection lost",
    body: "We couldn't reach the server. Check your connection and try again.",
    actions: (
      <>
        <button className="btn">Retry</button>
        <button className="btn btn--primary">Reload</button>
      </>
    ),
    onClose: () => {},
  },
};

export const Narrow = {
  args: {
    width: 380,
    title: "Heads up",
    body: "A compact variant with just a title and body.",
    actions: <button className="btn btn--primary">OK</button>,
  },
};
