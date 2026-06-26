import StReportPlayersRedirect from "./StReportPlayersRedirect.jsx";

export default {
  title: "Web/Pages/Redirects/Report Players",
  component: StReportPlayersRedirect,
  parameters: { layout: "fullscreen" },
};

// Canonical post-redirect view for a signed-in user; no dev switcher pills.
export const Default = {
  args: { branch: "destination", signedIn: true },
};

export const Redirecting = {
  args: { branch: "redirect" },
};

// Logged-out destination: the form is gated behind a single Sign In button.
export const ReportForm = {
  args: { branch: "destination", signedIn: false },
};

// Logged-in destination: the full report form, pre-filled.
export const ReportFormSignedIn = {
  args: { branch: "destination", signedIn: true },
};
