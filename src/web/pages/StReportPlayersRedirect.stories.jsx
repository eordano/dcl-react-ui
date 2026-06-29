import StReportPlayersRedirect from "./StReportPlayersRedirect.jsx";

export default {
  title: "Web/Pages/Redirects/Report Players",
  component: StReportPlayersRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { branch: "destination", signedIn: true },
};

export const Redirecting = {
  args: { branch: "redirect" },
};

export const ReportForm = {
  args: { branch: "destination", signedIn: false },
};

export const ReportFormSignedIn = {
  args: { branch: "destination", signedIn: true },
};
