import BdSignInRequiredGate from "./BdSignInRequiredGate.jsx";

export default {
  title: "Builder/Pages/Sign-In Required Gate",
  component: BdSignInRequiredGate,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { active: "land", pathname: "/activity" },
};

export const OnSettings = {
  args: { active: "land", pathname: "/settings" },
};

export const OnActivity = {
  args: { active: "land", pathname: "/activity" },
};
