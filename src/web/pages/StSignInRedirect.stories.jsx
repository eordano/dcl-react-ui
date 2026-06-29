import StSignInRedirect from "./StSignInRedirect.jsx";

export default {
  title: "Web/Pages/Redirects/Sign In",
  component: StSignInRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const NoRedirectParam = {
  args: {
    location: {
      origin: "https://decentraland.org",
      hostname: "decentraland.org",
      pathname: "/profile/0xa1b2c3",
      search: "",
    },
  },
};

export const ManualFallback = {
  args: { settled: true },
};
