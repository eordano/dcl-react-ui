import ChModalWarning from "./ChModalWarning.jsx";

export default {
  title: "CreatorHub/Components/Modal: Warning",
  component: ChModalWarning,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
  },
};

export const DontShowAgainChecked = {
  args: {
    open: true,
    dontShowAgain: true,
  },
};

export const Loading = {
  args: {
    open: true,
    loading: true,
  },
};

export const Closed = {
  args: {
    open: false,
  },
};
