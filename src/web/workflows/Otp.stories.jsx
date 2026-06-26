import Otp from "./Otp.jsx";

export default {
  title: "Web/Workflows/Otp",
  component: Otp,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    email: "your@email.com",
    onBack: () => {},
    onExit: () => {},
  },
};

export const CustomEmail = {
  args: {
    email: "eordano@gmail.com",
    onBack: () => {},
    onExit: () => {},
  },
};
