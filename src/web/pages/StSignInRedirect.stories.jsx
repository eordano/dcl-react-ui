import StSignInRedirect from "./StSignInRedirect.jsx";

export default {
  title: "Web/Pages/Redirects/Sign In",
  component: StSignInRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

// No ?redirectTo= param: getRedirectPath falls back to current pathname+search.
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

// Terminal/no-JS state: auto-redirect never fired, so the manual button shows immediately.
export const ManualFallback = {
  args: { settled: true },
};
