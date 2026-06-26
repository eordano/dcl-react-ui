import AcCreditsEmailRedirect from "./AcCreditsEmailRedirect.jsx";

export default {
  title: "Account/Pages/Credits Email redirect",
  component: AcCreditsEmailRedirect,
  parameters: { layout: "fullscreen" },
};

// Default — Turnstile OFF: the legacy link falls through to <CreditsEmail/>.
export const Default = {
  args: { branch: "confirmed" },
};

export const Redirecting = {
  args: { branch: "redirect" },
};
