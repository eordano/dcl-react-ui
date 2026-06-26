import ChSignIn from "./ChSignIn.jsx";

export default {
  title: "CreatorHub/Workflows/Sign In",
  component: ChSignIn,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    verificationCode: "4921",
    expiresInSeconds: 281,
  },
};

export const AboutToExpire = {
  args: {
    verificationCode: "8307",
    expiresInSeconds: 17,
  },
};

export const Expired = {
  args: {
    verificationCode: "1562",
    expiresInSeconds: 0,
  },
};
