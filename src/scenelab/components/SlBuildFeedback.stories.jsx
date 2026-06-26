import SlBuildFeedback from "./SlBuildFeedback.jsx";

export default {
  title: "SceneLab/Components/Action Feedback",
  component: SlBuildFeedback,
  parameters: { layout: "fullscreen" },
};

export const BuildSuccess = { render: () => <SlBuildFeedback variant="build" /> };
export const BuildFailed = { render: () => <SlBuildFeedback variant="error" /> };
export const ConversationReset = { render: () => <SlBuildFeedback variant="reset" /> };
