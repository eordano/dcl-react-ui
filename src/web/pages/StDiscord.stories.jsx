import StDiscord from "./StDiscord.jsx";

export default {
  title: "Web/Pages/Discord",
  component: StDiscord,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    initialState: "captcha",
  },
};

export const Loading = {
  args: {
    initialState: "loading",
  },
};

export const Invitation = {
  args: {
    initialState: "invitation",
    inviteCode: "9fLddTpe2x",
  },
};

export const Error = {
  args: {
    initialState: "error",
  },
};
